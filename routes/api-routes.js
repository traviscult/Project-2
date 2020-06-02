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
  app.post("/api/signup",function(req, res) {
    console.log ("Signup Req Info:", req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      accessLevel: req.body.accessLevel,
      geoLat: req.body.geoLat,
      geoLong: req.body.geoLong

    })
      .then( function () {
        console.log ("Now trying to login...");
        res.redirect(307, "/api/login");
      })
      .catch(function(err){
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
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/getUser", async (req, res) => {
   const Users = await db.User.findAll({
    include: [{ model: db.AccessLevel, model: db.Blog }]    
  });
  res.json(Users);
  });

  // Our api routes go here
<<<<<<< HEAD
  app.get('/api/history', async (req,res) => {
    const History = await db.History.findAll({
      include: [{ model: db.User }]
    });
    res.json(History);
  });

  app.post('/api/blogs', async (req, res) => {
    console.log('Blog post:', req.body);
    const Blog = await db.Blog.create({
      title: req.body.title,
      review: req.body.review,
      score: req.body.score
    })
    res.json(Blog);
    });

    app.put('/api/blogs/:id', async (req,res) => {
      const blog = await db.Blog.update({
        score: req.body.score
      },
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.json(blog);
    });
  
};
=======
};
>>>>>>> master
