const socket = io.connect('http://localhost:3000')

var path = require('path');

app.get('/views', function(req, res) {
    res.sendFile(path.join(__dirname + '/historyLog_2.html'));
})