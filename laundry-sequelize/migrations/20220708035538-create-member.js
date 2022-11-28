'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Member', {
      id_member: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_member: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.TEXT
      },
      jenis_kelamin : {
        type : Sequelize.ENUM('laki-laki', 'perempuan')
      },
      telepon: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Member');
  }
};