import connect from '../../../utils/connect.js'
import Survey from '../../../models/Survey.js'

connect()

export default async(req, res) =>{
const {
    query: {id},
    method
} = req

switch (method) {
    case 'GET':
        try {
            const survey = await Survey.find();
if(!survey) res.status(400).json({ success: false });
            res.status(200).json({ success: true, data: survey })
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
//     case 'PUT':
//         try {
//             const review = await Review.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
//             if(!review) res.status(400).json({ success: false });
//             res.status(200).json({ success: true, data: review })
//         } catch (error) {
//             res.status(400).json({ success: false, error: error });
//         }
//         break;
//         case 'DELETE':
//             try {
//                 const review = await Review.deleteOne({_id: id});
//     if(!review) res.status(400).json({ success: false });
//                 res.status(200).json({ success: true, data: {} })
//             } catch (error) {
//                 res.status(400).json({ success: false });
//             }
//             break;
    case 'POST':
        try {
            const new_survey ={
                user_id: id,
                title: req.body.survey.title,
                questions: req.body.survey.questions,
                comment: req.body.survey.comment
            }
            console.log(req.body)
            const survey = await Survey.create(new_survey);
            res.status(201).json({ success: true, data: survey })
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
    default:
        res.status(400).json({ success: false });
        break;
}

}