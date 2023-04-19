import express from 'express';
import createProject from '../controllers/create-project';
import getProject from '../controllers/get-project';
import listProject from '../controllers/list-project';
import updateProject from '../controllers/update-project';
import deleteProject from '../controllers/delete-project';
import projectValidator from '../validators/project-validator';
import idValidator from '../../../../utils/id-validator';


const projectRoutes = express.Router();


/**
 * * project routes
 * @description project routes
 */

projectRoutes.post('/admin/create-project', projectValidator.validator, createProject.create);
projectRoutes.get('/get-project/:id', idValidator.validator, getProject.get);
projectRoutes.get('/list-projects', listProject.list);
projectRoutes.patch('/admin/update-project/:id', idValidator.validator, projectValidator.updateValidator, updateProject.update);
projectRoutes.delete('/admin/delete-project/:id', idValidator.validator, deleteProject.delete);

module.exports = projectRoutes;