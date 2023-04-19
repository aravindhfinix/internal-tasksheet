import { createSession, encrypt } from "../../../../utils/encrypt";
import responseHandler from "../../../../utils/response-handler";
import { Employee } from "../models/employee-model";

class SignupController {

    constructor() {
    }
    /**
     * @description   api to employee signup
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        try {
            req.body.password = encrypt(req.body.password)
            Employee.create(req.body, async (err, result) => {
                if (err) {
                    return responseHandler.errorResponse(res, err, err.message, 400);
                } else {
                    const session = await createSession(result)
                    return responseHandler.successResponse(res, { result, session }, "Employee created successfully", 201);
                }
            })
        } catch (err) {
            responseHandler.errorResponse(res, err);
        }
    }
}

export default new SignupController();


