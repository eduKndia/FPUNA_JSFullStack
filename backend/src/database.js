const mongoose =  require('mongoose');

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log('DB is conected'))
.catch(err => console.log(err));