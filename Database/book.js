const mongoose = require("mongoose");

const BookShema = mongoose.Schema({
    ISBN : String,
    title : String,
    pubDate : String,
    language : String,
    numPage : Number,
    author : [String],
    publication : [String],
    category : [String]
});

const BookModel = mongoose.model("Books", BookShema);

module.exports = BookModel;