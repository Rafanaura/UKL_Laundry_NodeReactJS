'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transaksi', {
      id_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_member : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : "Member",
          key : "id_member"
        }
      },
      id_user : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model: "User",
          key:"id_user"
        }
      },
      tanggal: {
        type: Sequelize.DATE
      },
      batas_waktu: {
        type: Sequelize.DATE
      },
      tanggal_bayar: {
        type: Sequelize.DATE
      },
      status: {
        type :Sequelize.ENUM('baru', 'proses', 'selesai', 'diambil')
      },
      dibayar: {
        type : Sequelize.ENUM('dibayar', 'belum_dibayar')
      },
      totalAkhir : {
        type : Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transaksi');
  }
};