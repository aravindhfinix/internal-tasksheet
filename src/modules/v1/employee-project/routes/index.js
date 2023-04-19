import express from 'express';
import createEmployeeProject from '../controllers/create-employee-project';
import getEmployeeProject from '../controllers/get-employee-project';
import listEmployeeProject from '../controllers/list-employee-project';
import updateEmployeeProject from '../controllers/update-employee-project';
import deleteEmployeeProject from '../controllers/delete-employee-project';
import employeeProjectValidator from '../validators/employee-project-validator';
import idValidator from '../../../../utils/id-validator';

const employeeProjectRoutes = express.Router();


/**
 * * employeeProject routes
 * @description employeeProject routes
 */

employeeProjectRoutes.post('/admin/create', employeeProjectValidator.validator, createEmployeeProject.create);
employeeProjectRoutes.get('/admin/details/:id', idValidator.validator, getEmployeeProject.get);
employeeProjectRoutes.get('/list', listEmployeeProject.list);
employeeProjectRoutes.patch('/admin/update/:id', idValidator.validator, updateEmployeeProject.update);
employeeProjectRoutes.delete('/admin/delete/:id', idValidator.validator, deleteEmployeeProject.delete);

module.exports = employeeProjectRoutes;