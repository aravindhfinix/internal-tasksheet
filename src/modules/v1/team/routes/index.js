import express from 'express';
import createTeam from '../controllers/create-team';
import getTeam from '../controllers/get-team';
import listTeams from '../controllers/list-teams';
import updateTeam from '../controllers/update-team';
import deleteTeam from '../controllers/delete-team';
import teamValidator from '../validators/team-validator';
import idValidator from '../../../../utils/id-validator';

const teamRoutes = express.Router();


/**
 * * team routes
 * @description team routes
 */

teamRoutes.post('/admin/create-team', teamValidator.validator, createTeam.create);
teamRoutes.get('/get-team/:id', idValidator.validator, getTeam.get);
teamRoutes.get('/list-teams', listTeams.list);
teamRoutes.patch('/admin/update-team/:id', idValidator.validator, teamValidator.updateValidator, updateTeam.update);
teamRoutes.delete('/admin/delete-team/:id', idValidator.validator, deleteTeam.delete);

module.exports = teamRoutes;