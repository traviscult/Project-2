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
        npsUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        nwsUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    // History.associate = models => {
    //     History.belongsTo(models.User, {
    //         foreignKey: 'id'
    //     });
    // }

    return History;
};