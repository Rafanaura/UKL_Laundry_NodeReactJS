'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail_Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //association for table transaksi
      this.belongsTo(models.Transaksi, {
        foreignKey: "id_transaksi",
        as: "Transaksi"
      })

      //association for table paket
      this.belongsTo(models.Paket, {
        foreignKey: "id_paket",
        as: "Paket"
      })

    }
  }
  Detail_Transaksi.init({
    id_detail: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    id_transaksi: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    id_paket: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    qty: DataTypes.INTEGER,
    totalAwal: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Detail_Transaksi',
    tableName: 'Detail_Transaksi'
  });
  return Detail_Transaksi;
};