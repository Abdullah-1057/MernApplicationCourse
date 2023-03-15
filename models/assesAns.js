var mongoose = require('mongoose');
 
var pdfSchema = new mongoose.Schema({
    name: String,
    photo:
    {
        data: Buffer,
        contentType: String
    }
});
  
module.exports = new mongoose.model('PDF', pdfSchema);