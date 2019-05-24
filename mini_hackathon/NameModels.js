const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const NameSchema = new Schema({
    name1: { type: String, required: true },
    name2: { type: String, required: true },
    name3: { type: String, required: true },
    name4: { type: String, required: true }
}, {
	timestamps: true // createdAt & updatedAt
});

const NameModel = model("question", NameSchema);

module.exports = NameModel;