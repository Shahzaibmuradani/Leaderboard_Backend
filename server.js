const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => res.send('API Running'));

app.use(express.json({ extended: false }));

app.use('/api/participant', require('./routes/ParticipantApi/participant'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
