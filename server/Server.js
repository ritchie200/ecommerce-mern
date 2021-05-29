import express from 'express'
import mongoose from 'mongoose';
const app = express();
import userRouter from './routers/UserRouter.js';
import productRouter from './routers/ProductRouter.js';
import orderRouter from './routers/OrderRouter.js';
import path from 'path';
import uploadRouter from './routers/UploadRouter.js';
import config from './config';
import bodyParser from 'body-parser';
var cors = require('cors')

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   // const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3001', 'https://denisakart.appmediatek.com'];
//   // const origin = req.headers.referer;
//   // if (allowedOrigins.includes(origin)) {
//   //      res.setHeader('Access-Control-Allow-Origin', origin);
//   // }
//   res.header('Access-Control-Allow-Origin', 'https://denisakart.appmediatek.com');
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS,POST,DELETE,PUT,PATCH');
//   res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,Accept,X-Requested-With, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
})

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/',(req,res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use(express.static(path.join(__dirname, '/../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:2000');
});