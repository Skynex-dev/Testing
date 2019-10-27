const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    rp = require('request-promise'),
    mongoose = require('mongoose'),
    Newscard = require('./models/newscard')

mongoose.connect('mongodb://localhost:27017/bioworlds', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));

var newinfo = {
    title: 'Bulls on the Run',
    des: 'New all time highs have hit the markets around the world after deal with China'
}

Newscard.create(newinfo, (err, newcard)=>{
    if(err){
        console.log(err)
    }
})


app.get('/', (req, res)=>{
    res.redirect('home')
})

app.get('/home', (req, res)=>{
    Newscard.find({}, (err, newscard) => {
        if (err) {
            console.log(err)
        } else {
            res.render('home', {
                newscard: newscard
            });
        }
    })
})



var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});

