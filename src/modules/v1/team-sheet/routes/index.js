import express from 'express';
import createTeamSheet from '../controllers/create-team-sheet';
import getTeamSheet from '../controllers/get-team-sheet';
import listTeamsSheet from '../controllers/list-teams-sheet';
import updateTeamSheet from '../controllers/update-team-sheet';
import deleteTeamSheet from '../controllers/delete-team-sheet';
import teamSheetValidator from '../validators/team-sheet-validator';
import idValidator from '../../../../utils/id-validator';
import filterTeamSheet from '../controllers/filter-team-sheet';

const teamSheetRoutes = express.Router();


/**
 * * team routes
 * @description team routes
 */

teamSheetRoutes.post('/create', teamSheetValidator.validator, createTeamSheet.create);
teamSheetRoutes.get('/details/:id', idValidator.validator, getTeamSheet.get);
teamSheetRoutes.get('/filter', filterTeamSheet.list);
teamSheetRoutes.get('/list', listTeamsSheet.list);
teamSheetRoutes.patch('/update/:id', idValidator.validator, teamSheetValidator.updateValidator, updateTeamSheet.update);
teamSheetRoutes.delete('/delete/:id', idValidator.validator, deleteTeamSheet.delete);

module.exports = teamSheetRoutes;