import BaseConfig from "../config/base";
import teamRoutes from '../modules/v1/team/routes'
import teamSheetRoutes from '../modules/v1/team-sheet/routes'
import projectRoutes from '../modules/v1/project/routes'
import employeeProjectRoutes from '../modules/v1/employee-project/routes'
import employeeRoutes from '../modules/v1/employee/routes'
import responseHandler from "../utils/response-handler";


export default class RouteServiceProvider extends BaseConfig {

    constructor() {
        super();
        this.loadRoutes();
        this.routeNotFound();
    }

    /**
     * 
     * @param {*} route functions 
     */
    loadRoutes() {
        this.app.get('/', (req, res) => { res.send('Application api working'); });
        // Employee routes
        this.app.use('/api/v1/employee', employeeRoutes);

        // Team routes
        this.app.use('/api/v1/team', teamRoutes);

        // Project routes
        this.app.use('/api/v1/project', projectRoutes);

        // Employee project routes
        this.app.use('/api/v1/employee-project', employeeProjectRoutes);

        // Team sheet routes
        this.app.use('/api/v1/team-sheet', teamSheetRoutes);

        // this.app.use('/api/v1/file-upload', fileRouter);
    }

    routeNotFound() {
        this.app.use((req, res, next) => {
            return responseHandler.errorResponse(res, {}, 'Requested route not found', 404);
        });
    }
}