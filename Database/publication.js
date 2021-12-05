const mongoose = require("mongoose");

const PublicationShema = mongoose.Schema({
    ID : String,
    name : String,
    books : [String]
});

const PublicationModel = mongoose.model("Publications", PublicationShema);

module.exports = PublicationModel;