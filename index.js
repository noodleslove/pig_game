const express = require('express');


// Setup app
const app = express();
const server = app.listen(8000, () => {
    console.log('listening to port 8000');
});


// Setup static file
app.use(express.static('public'));


// Setup routing
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});
