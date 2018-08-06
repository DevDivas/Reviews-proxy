const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const getReviews = require('./getReviews.js');
const axios = require('axios');
// const proxy = require('http-proxy-middleware');
// app.use(cors());

// app.use(proxy({
//   router: {
//     '/related/**' : 'http://localhost:3001',
//     '/images/**' : 'http://localhost:3002',
//     '/products/**' : 'http://localhost:3003',
//     '/rooms/reviews/**' : 'http://localhost:3004',
//   }
// }));

const app = express();

app.use('/rooms/:room_id', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/rooms/:room_id/reviews', (req, res) => {
  axios.get(`http://ec2-18-222-90-155.us-east-2.compute.amazonaws.com/rooms/${req.params.room_id}/reviews`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get('/rooms/:roomId/pics', (req, res) => {
  const roomId = Number(req.params.roomId);

  axios.get(`http://ec2-18-206-94-95.compute-1.amazonaws.com/rooms/${roomId}/pics`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('proxy get error');
      res.status(500).send();
    });
});

app.get('/rooms/:id/bookings', (req, res) => {
  axios.get(`http://ec2-54-172-249-154.compute-1.amazonaws.com/rooms/${req.params.id}/bookings`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/rooms/:id/room', (req, res) => {
  axios.get(`http://ec2-54-172-249-154.compute-1.amazonaws.com/rooms/${req.params.id}/room`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/rooms/:id/bookings', (req, res) => {
  axios.post(`http://ec2-54-172-249-154.compute-1.amazonaws.com/rooms/${req.params.id}/bookings`, {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    }).then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/rooms/:roomId/x', (req, res) => {
  const roomId = req.params.roomId;
  axios.get(`http://ec2-18-222-100-246.us-east-2.compute.amazonaws.com/rooms/${roomId}/x`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
});

// app.get('/', (req, res) => {
//   res.redirect('/1');
// })

module.exports = app;