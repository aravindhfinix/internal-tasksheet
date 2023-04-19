import express from 'express';
import loginController from '../controllers/login-controller';
import signupController from '../controllers/signup-controller';
import logoutController from '../controllers/logout-controller';
import deleteEmployee from '../controllers/delete-employee';
import employeeValidator from '../validators/employee-validator';
import idValidator from '../../../../utils/id-validator';
import listEmployee from '../controllers/list-employee';
import getEmployee from '../controllers/get-employee';
import updateEmployee from '../controllers/update-employee';


const employeeRoutes = express.Router();


/**
 * * user routes
 * @description user routes
 */

employeeRoutes.post('/login', employeeValidator.loginValidator, loginController.login);
employeeRoutes.post('/signup', employeeValidator.validator, signupController.create);
employeeRoutes.get('/logout', logoutController.logout);
employeeRoutes.delete('/admin/delete/:id',idValidator.validator ,deleteEmployee.delete);
employeeRoutes.get('/list', listEmployee.list);
employeeRoutes.patch('/update/:id', idValidator.validator, updateEmployee.update);
employeeRoutes.get('/get-employee/:id', idValidator.validator, getEmployee.get);

module.exports = employeeRoutes;