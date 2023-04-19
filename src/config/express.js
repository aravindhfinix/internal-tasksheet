import cors from 'cors';
import xss from 'xss-clean';
import express from 'express';
import fileUpload from 'express-fileupload';


export default class Express {

    constructor() {
        this.express = express;
        this.app = new express();
        // sanitize request data
        this.app.use(xss());
        // enable cors
        this.app.use(cors());
        // parse urlencoded request body
        this.app.use(this.express.urlencoded({ extended: true }));
        // parse response body
        this.app.use(this.express.json());
           // to handle uploading files
        this.app.use(fileUpload({
            createParentPath: true,
            // debug : true
        }));
    }
}