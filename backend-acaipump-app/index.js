const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const productRouter = require('./routes/product');
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const orderRouter = require('./routes/orders')
const cartRouter = require('./routes/cart')
const port = 3000; 

dotenv.config()

// Check if Database is Connected 
mongoose.connect(process.env.MONGO_URL).then(() => console.log("db connected")).catch((err) => console.log(err))

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/products', productRouter);
app.use('/api/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);


// Route to print "Hello, world!" on the browser
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT || port}!`));
