module.exports = (sequelize, DataTypes) => {
    let AccessLevel = sequelize.define("AccessLevel", {
        Admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Moderator: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Noob: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });

    return AccessLevel;
};