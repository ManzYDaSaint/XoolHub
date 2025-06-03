const express = require('express');
const api = require('./routes/apiRoutes.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const whatsAppController = require('./controller/whatsAppController.js');

const app = express();
app.use(fileUpload());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'REST API working successfully!',
  });
});

// All routes goes here
app.use('/api/', api);

// WhatsApp routes goes here
app.use('/webhook', whatsAppController);

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

const port = process.env.PORT || 5000;

// All routes goes here
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
