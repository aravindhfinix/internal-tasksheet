import express from 'express';
import fileUploadController from '../controllers/file-upload-controller';
import { fileResizeController} from '../controllers/file-resize-controller'

const fileRouter = express.Router();


/**
 * * file routes
 * @description file routes
 */


fileRouter.post('/document', fileUploadController.create);
fileRouter.get('/:imagename',fileResizeController.get)


module.exports = fileRouter;