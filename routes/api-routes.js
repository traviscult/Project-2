// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {
        // console.log("Signup Req Info:", req.body);
        db.User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                accessLevel: req.body.accessLevel,
                geoLat: req.body.geoLat,
                geoLong: req.body.geoLong
            })
            .then(function() {
                // console.log("Now trying to login...");
                res.redirect(307, "/api/login");
            })
            .catch(function(err) {
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                name: req.user.name,
                email: req.user.email,
                id: req.user.id,
                lat: req.user.geoLat,
                long: req.user.geoLong
            });
        }
    });

    app.get("/api/users", async(req, res) => {
        const Users = await db.User.findAll({
            include: [{ model: db.AccessLevel, model: db.Blog, model: db.History }]
        });
        res.json(Users);
    });

    // Our api routes go here

    app.get("/api/blogs", async(req, res) => {
        const blogs = await db.Blog.findAll({

        })
        res.json(blogs)
    })

    app.post('/api/blogs', (req, res) => {
        // For some reason postman requires this to be req.query, final code may well need
        // req.body
        console.log('Blog post: ', req.body);
        const Blog = db.Blog.create({
            title: req.body.title,
            review: req.body.review,
            email: req.body.email // EXS save email
                // score: req.body.score
        })
        res.json(Blog);
    });

    app.put('/api/blogs/:id', async(req, res) => {
        const blog = await db.Blog.update({
            title: req.body.title,
            review: req.body.review,
            // score: req.body.score
        }, {
            where: {
                id: req.params.id
            }
        })
        res.json(blog);
    });

    app.delete('/api/blogs/:id', async(req, res) => {
        const blog = await db.Blog.delete({
            where: {
                id: req.params.id
            }
        });
        res.json(blog)
    });


    app.get('/api/history', async(req, res) => {
        const History = await db.History.findAll({
            include: [{ model: db.User }]
        });
        res.json(History);
    });

    app.post('/api/history', async(req, res) => {
        console.log('Hitsory', req.body);
        const History = await db.History.create({
            name: req.body.name,
            code: req.body.code,
            npsUrl: req.body.npsUrl,
            nwsUrl: req.body.nwsUrl
        })
        res.json(History);
    });

    app.put('/api/history/:id', async(req, res) => {
        const histroy = await db.History.update({
            name: req.body.name,
            code: req.body.code,
            npsUrl: req.body.npsUrl,
            nwsUrl: req.body.nwsUrl
        }, {
            where: {
                id: req.params.id
            }
        })
        res.json(histroy);
    });

    app.delete('/api/history/:id', async(req, res) => {
        const histroy = await db.History.delete({
            where: {
                id: req.params.id
            }
        });
        res.json(histroy);
    });
};