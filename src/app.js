const path = require("path");
const express = require("express");
const hbs = require('hbs');
const app = express();
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');


console.log(__dirname);
console.log(__filename);
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirPath));
// app.get("", (req, res) => {
//   res.send('TEST');
// });

// app.get("/help", (req, res) => {
//   res.send([{ title: "Help", msg: "We are happy to hell you" },{title:'Error', msg:'Error..!'}]);
// });

// app.get("/about", (req, res) => {
//   res.send("About page");
// });

// app.get("/weather", (req, res) => {
//   res.send("Weather page");
// });

app.set("view engine", "hbs");
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ashish",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ashish",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide a address'
    })
  }
  // console.log(req.query.address)
  geocode(req.query.address, (error, { latitude, longitude, location }= {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })
  
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some helpful text',
    name: "Ashish"
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    helpText: 'Help article not found',
    name: "Ashish"
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: "404",
    errorMessage: 'Page not found',
    name: "Ashish"
  })
})

app.listen(3000, () => {
  console.log("Server is run up on port:3000");
});

//app.com
