const mongoose = require('mongoose')

const Addressschema = mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true}
})

module.exports = mongoose.model('Address', Addressschema)