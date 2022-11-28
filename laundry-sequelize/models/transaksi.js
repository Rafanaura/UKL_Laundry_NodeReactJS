'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

       //association for table detail
       this.hasMany(models.Detail_Transaksi, {
        foreignKey: "id_transaksi",
        as:"Detail_Transaksi"
      })
      //association from table member
      this.belongsTo(models.Member, {
        foreignKey: "id_member",
        as:"Member"
      })

      //association from table user
      this.belongsTo(models.User, {
        foreignKey: "id_user",
        as:"User"
      })

     
    }
  }
  Transaksi.init({
    id_transaksi: {
      type: DataTypes.INTEGER,
      allowNull : false,
      primaryKey: true,
      autoIncrement: true
    },
    id_member: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_user: {
      type : DataTypes.INTEGER,
      allowNull :false
    },
    tanggal: DataTypes.DATE,
    batas_waktu: DataTypes.DATE,
    tanggal_bayar: DataTypes.DATE,
    status : DataTypes.ENUM('baru', 'proses', 'selesai', 'diambil'),
    dibayar : DataTypes.ENUM('dibayar', 'belum_dibayar'),
    totalAkhir : DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Transaksi',
    tableName: 'Transaksi'
  });
  return Transaksi;
};