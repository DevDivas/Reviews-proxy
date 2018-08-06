const axios = require('axios');

const getReviews = (room_id, cb) => {
  axios.get(`http://ec2-18-222-90-155.us-east-2.compute.amazonaws.com/rooms/${room_id}/reviews`)
    .then((response) => {
      cb(null, response);
    })
    .catch((error) => {
      cb(error, null);
    });
}

module.exports = {
  getReviews
}