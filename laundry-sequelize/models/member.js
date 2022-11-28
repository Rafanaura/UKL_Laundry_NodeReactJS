'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //association for table transaksi
      this.hasMany(models.Transaksi, {
        foreignKey:"id_member",
        as: "member"
      })
    }
  }
  Member.init({
    id_member : {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull: false
    },
    nama_member: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    jenis_kelamin : DataTypes.ENUM('Laki-laki', 'Perempuan'),
    telepon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Member',
    tableName:'Member'
  });
  return Member;
};