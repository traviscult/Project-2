module.exports = (sequelize, DataTypes) => {
    let AccessLevel = sequelize.define("AccessLevel", {
        Admin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Moderator: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Noob: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return AccessLevel;
};