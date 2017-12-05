const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database')
const path = require('path');
const authentication = require('../youtube-playlist/client/routes/authentication.js')(router);
const bodyParser = require('body-parser');

const cors = require('cors');
const userModel = require("./client/models/user");


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could NOT connect to database', err);
    } else {
        console.log(config.secret)
        console.log('Connected to database: ' + config.db);
    }
});
// Middleware
//Cross origin
app.use(cors({
    origin: 'http://localhost:4200'
 
}))

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);
// app.get('/video', function(res,req){
    // User.findOne({ _id: req.decoded.userId }).select('username email videoArray').exec((err, user) => {
    //     if (err) {
    //       res.json({ success: false, message: err});
    //     } else {
    //       if (!user) {
    //         res.json({ success: false, message: 'User not found'});
    //       } else {
    //         res.json({ success: true, user: user });
    //       }
    //     }
    //   })
    // console.log('Test')
    // var username = 'test'

    // userModel.findByIdAndUpdate({ _id: '5a257bbd522c74ee6d406e30' }, { $set: {videoArray: username }}, function(err, user) {
    //         if (err){
    //             console.log(err)
    //         }
    //         console.log(user)
       
    // })
// })     
    // app.use('/authentication', authentication)
    // var videoUrl = req.body,
    //     m = userModel;
    //     app.get('/authentication/dashboard', function(req, res){
    //         console.log(req.body._id)
    //     })
    // // once you have a user id
    // userModel.findOneAndUpdate({ _id: userId }, { videoArray: { $addToSet: { videoUrl}}}, { new: true }, function(err, user) {
    //     return res.status(200).json({ success: true });
    // });
    // console.log(req.body)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
  });
  
  app.listen(8080, () => {
      console.log('Listening on port 8080')
  });