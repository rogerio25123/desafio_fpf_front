const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/mymoney-ui'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/mymoney-ui/index.html');
});

app.listen(process.env.PORT || 4200 );