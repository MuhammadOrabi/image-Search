// Define Modal
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('img',{
		term: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1,250]
			}
		}
	});
}