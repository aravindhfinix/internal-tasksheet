import responseHandler from "../../../../utils/response-handler";
import { decrypt } from "../../../../utils/encrypt";
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
            Employee.findOne({ email: req.body.email }).exec((err, result) => {
                if (err) responseHandler.errorResponse(res, {}, err.message, 400);
                if (result) {
                    if (req.body.password === decrypt(result.password)) {
                        responseHandler.successResponse(res, result, 'Employee logged in successfully');
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
