var express = require('express')
var app = express()


var twilio = require('twilio');

// Find your account sid and auth token in your Twilio account Console.
var client = twilio('SID', 'TOKEN');

//Send the text message.
// client.sendMessage({
//   to: '+14165297263',
//   from: '+16477244597',
//   body: 'Hello from craig!'
// });


// adam's phone 14168848100
//Send the text message.


app.get('/send-sms', function(req, res, next) {
    console.log(req.query.phonenumber)
    console.log(req.query.imageurl)
    client.sendMessage({
      to: req.query.phonenumber,
      from: '+16477244597',
      body: 'Hello from request!',
      mediaUrl: req.query.imageurl
    }, function(err, message){
      console.log(err);
      console.log(message.sid)
    });
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: yay</p>')
    res.end()

})


app.get('/test-fn', function(req, res, next) {

    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: yay</p>')
    res.end()

})

app.listen(5555, function () {

  console.log('Example app listening on port 5555!')
})
