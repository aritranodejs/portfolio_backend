const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('./middleware/rateLimiter');
const hpp = require('hpp');
const sanitize = require('express-sanitizer');

dotenv.config();

const app = express();

app.use(helmet()); // secure headers (set security-related HTTP headers)
app.use(cors({
  origin: ['https://aritranodejs.github.io/portfolio', 'http://localhost:3000']
})); // cors (cross-origin resource sharing) prevents cross-origin requests
app.use(express.json()); // parse json bodies (parse the request body as JSON)
app.use(express.urlencoded({ extended: true })); // parse urlencoded bodies (parse the request body as URL encoded)
app.use(compression()); // compress responses
app.use(rateLimit); // rate limit requests (limit the number of requests from an IP address) prevents brute force attacks and DOS attacks   
app.use(morgan('dev')); // log requests
app.use(hpp()); // prevent parameter pollution (duplicate parameters) eg. ?a=1&a=2 
app.use(sanitize()); // sanitize request bodies (remove dangerous characters) eg. <script>alert('XSS')</script>  prevents XSS attacks

const aiRoutes = require('./routes/ai');
const contactRoutes = require('./routes/contact');

app.use('/api/ai', aiRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
