import responseHandler from "../../../../utils/response-handler";
import { createSession, decrypt } from "../../../../utils/encrypt";
import { Employee } from "../models/employee-model";


class LoginController {

    constructor() {
    }
    /**
      * @description   api to Employee login
      * @param {*} req
      */
    login(req, res) {
        try {
            Employee.findOne({ email: req.body.email }).exec(async (err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    if (req.body.password === decrypt(result.password)) {
                        const session = await createSession(result)
                        responseHandler.successResponse(res, { result, session }, 'Employee logged in successfully');
                    } else {
                        responseHandler.errorResponse(res, {}, 'invalid password', 400);
                    }
                } else {
                    responseHandler.errorResponse(res, {}, 'No Employee associated with this email address', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new LoginController();
