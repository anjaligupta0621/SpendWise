const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3000;
const {mongoUrl} = require('./keys');

require('./models/User');
const requireToken = require('./middleware/requireToken'); 

const authRoutes = require('./routes/authRoutes');
app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
})

mongoose.connection.on('error', (err) => {
    console.log('Error in connecting to mongo instance', err);
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Hello World!');
});

app.get('/', requireToken, (req, res) => {
    res.send("Your email is " + req.user.email);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})