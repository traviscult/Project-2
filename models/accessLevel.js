module.exports = (sequelize, DataTypes) => {
    const accessLevel = sequelize.define("accessLevel", {
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
    return accessLevel;
}