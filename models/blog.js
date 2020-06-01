module.exports = (sequelize, DataTypes) => {
    let Blog = sequelize.define('Blog', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        // score: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
    });
    return Blog;
};