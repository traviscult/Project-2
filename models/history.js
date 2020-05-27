module.exports = (sequelize, DataTypes) => {
    let History = sequelize.define('History', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });
    return History;
};