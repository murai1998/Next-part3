import connect from '../../../utils/connect.js'
import Answers from '../../../models/Answers.js'

connect()

export default async(req, res) =>{
const {
    query: {id},
    method
} = req

switch (method) {
    case 'GET':
        try {
            const answers = await Answers.find();
if(!answers) res.status(400).json({ success: false });
            res.status(200).json({ success: true, data: answers })
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
            const new_answers ={
                form_id: id,
                answers: req.body.send_obj.answers
            }
            console.log(req.body)
            const answers = await Answers.create(new_answers);
            res.status(201).json({ success: true, data: answers })
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
    default:
        res.status(400).json({ success: false });
        break;
}

}