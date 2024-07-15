// const express =require('express');
// require("./config/dbConnect");
// const usersRoute = require('./routes/adminRoute');
//    const app=express();

//    //middlewares
   

// // routes
// // user routes
// app.use("/api/v1/users",usersRoute);


//    //Error handlers


//    //listen to the server.
//    const port = process.env.PORT||3001;
//    app.listen(port,console.log(`SERVER IS UP AND RUNNING ON PORT ${port}`));

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false
}));

// Dummy admin credentials
const adminUsername = 'admin';
const adminPassword = 'adminpassword';

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === adminUsername && password === adminPassword) {
    req.session.loggedIn = true;
    res.redirect('/update-dishes'); // Redirect to dish update page
  } else {
    res.send('Invalid username or password');
  }
});

// Middleware to protect routes
function requireLogin(req, res, next) {
  if (req.session.loggedIn) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.redirect('/login'); // Redirect to login page if not authenticated
  }
}

// Route for updating dishes, protected by requireLogin middleware
app.get('/update-dishes', requireLogin, (req, res) => {
  // Render your dish update form or logic here
  res.send('Update dishes page');
});

// Login form
app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
