require('dotenv').config();
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./controllers/chatsupport')(io);


//import routes
const authRoute = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const activityRoutes = require("./routes/activity");
const cartRoutes = require("./routes/cart");
const prodcatRoutes = require("./routes/prodcat");
const orderRoutes = require("./routes/order");

//app middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))



//routes middleware
app.use('/api', authRoute);
app.use('/api', userRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", activityRoutes);
app.use("/api", cartRoutes);
app.use("/api", prodcatRoutes);
app.use("/api", orderRoutes);

mongoose.connect(process.env.DATABASE, {  useNewUrlParser: true,
                                          useUnifiedTopology: true,
                                          useCreateIndex: true,
                                          useFindAndModify: false })
   .then(
     () => console.log('Connected to DB'))
   .catch(
     (error) => console.log(error));

const Port = process.env.PORT || 8080;
server.listen(Port, () => console.log(`Listening to ${Port}`));
