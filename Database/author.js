const mongoose = require("mongoose");

const AuthorShema = mongoose.Schema({
    ID : String,
    name : String,
    books : [String]
});

const AuthorModel = mongoose.model("Authors", AuthorShema);

module.exports = AuthorModel;