// import { responseHandler } from "../../../../utils/response-handler";
// import { Session } from "../models/session-model";
// import { Admin } from "../models/admin-model"


// class AdminAuthentication {

//     constructor() {
//     }

//     check(req, res, next) {

//         try {
//             if (req.headers.authorization) {
//                 req.headers.authorization = req.headers.authorization.split(" ")[1];
//                 Session.findOne({ session_token: req.headers.authorization, status: 1 }).exec(async (err, result) => {
//                     if (err) {
//                         return responseHandler.errorResponse(res, {}, err.message, 400);
//                     }
//                     if (result) {
//                         const admin = await Admin.findById(result.user_id)
//                         if (!admin) {
//                             responseHandler.errorResponse(res, {}, 'Admin access denied', 401);
//                         } else {
//                             if (result.session_token === req.headers.authorization) {
//                                 next()
//                             } else {
//                                 return responseHandler.errorResponse(res, {}, 'invalid session', 401);
//                             }
//                         }
//                     } else {
//                         return responseHandler.errorResponse(res, {}, 'invalid session', 401);
//                     }
//                 })
//             } else {
//                 return responseHandler.errorResponse(res, {}, 'authentication failed', 401);
//             }

//         }

//         catch (err) {
//             return responseHandler.errorResponse(res, {}, 'invalid session', 401);
//         }

//     }
// }

// export default new AdminAuthentication();

