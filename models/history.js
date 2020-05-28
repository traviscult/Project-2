module.exports = (sequelize, DataTypes) => {
    let History = sequelize.define('History', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nps_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        nws_url: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
    return History;
};