const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=9332c4a5cb8dd513c7da0eebbb18250b&query=" +
    encodeURIComponent(address);
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect api service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
    //   const geoData = body;
      if (body.data.length === 0) {
        callback("Data not available for this location", undefined);
        // console.log('data not found')
      } else {
      // console.log('18',body)

        callback(undefined, {
          latitude: body.data[0].latitude,
          longitude: body.data[0].longitude,
          location: body.data[0].name,
        });
        // console.log('data found')
      }
    }
  });
};
module.exports = geoCode;
