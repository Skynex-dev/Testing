var mongoose = require('mongoose')

var newscardSchema = new mongoose.Schema({
    title: String,
    des: String,
    created: {
        type: Date,
        default: Date.now
    }
});


var Newscard = mongoose.model("newscard", newscardSchema);

module.exports = Newscard;