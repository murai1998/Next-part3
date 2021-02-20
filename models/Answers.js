const mongoose = require('mongoose');
const AnswersSchema = new mongoose.Schema({
    form_id: {
        type: String,
      
    },
email: {
    type: String
},
name: {
    type: String 
},
answers: {
    type: [Object]
}
})
module.exports = mongoose.models.Answers || mongoose.model('Answers', AnswersSchema)

