const express = require('express');
const path = require ('path'); 
const routes = require ('./controllers'); 
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection'); 
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express(); 
const PORT = process.env.PORT || 3001; 

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  // you can stop expiring sessions (cancel the interval). Example using Mocha:
// after("clean up resources", () => {
//   myStore.stopExpiringSessions();
// });


app.use(session(sess));
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json()); 
app.use(express.urlencoded({ urlencoded: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes); 

sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
}); 
