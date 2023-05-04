// const { url } = require("inspector");
const request = require("postman-request");

const foreCast = (lat, long, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=39e665425bdc9e55ad11fe41e92a1003&units=metric";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect api service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      // const data = body;
      // const curTemp = data.main.temp;
      // const feelTemp = data.main.feels_like;
      // console.log('20',body)
      callback(
        undefined,
        "It is currently " +
          body.main.temp +
          "°C in " +
          body.name +
          ". It feels like " +
          body.main.feels_like
      );
    }
  });
};

module.exports = foreCast;
