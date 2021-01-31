const mongoose = require('mongoose');
const SurveySchema = new mongoose.Schema({
    user_id: {
        type: String,
      
    },
title: {
    type: String,
    maxlength: [50, 'Name cannot be longer than 50 characters']
},
questions: {
    type: [Object]
},
comment: {
    type: String,
}
})
module.exports = mongoose.models.Survey || mongoose.model('Survey', SurveySchema)

