import responseHandler from "../../../../utils/response-handler";


class UserLogoutController {

    constructor() {
    }
    /**
     * @description   api to logout user
     * @param {*} req 
     * @param {*} res 
     */
    logout(req, res) {
        try {
            responseHandler.successResponse(res,{}, 'User Logged Out successfully');

        } catch (err) {
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new UserLogoutController();