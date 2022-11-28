'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //association for table detail
      this.hasMany(models.Detail_Transaksi, {
        foreignKey: "id_paket",
        as: "Paket"
      })
    }
  }
  Paket.init({
    id_paket : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    jenis : DataTypes.ENUM('kiloan', 'selimut', 'bed_cover', 'kaos'),
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Paket',
    tableName: 'Paket'
  });
  return Paket;
};