import responseHandler from "../../../../utils/response-handler";
import { File } from "../models/fileupload-model";
const path = require('path'); 
const fs = require('fs');
const url = require('url');
const Jimp = require('jimp');


class FileResizeController {

    constructor() {
    }
    /**
     * @description  API for File compression
     * @param {*} req 
     * @param {*} res 
    **/
    async get (req, res) {

        try {
            
             // Remove headers info
             res.removeHeader('Transfer-Encoding');
             res.removeHeader('X-Powered-By');

             const imageFolderName = req.query.folder
             const query = url.parse(req.url, true).query;
             let file = req.params.imagename
             let filePath = path.join(__dirname, '../', `public/assets/images/${query.service_type}/${imageFolderName}/${file}`);

             if (!fs.existsSync(filePath)) {
                 filePath = path.join(__dirname, '../', `public/assets/images/${query.service_type}/${imageFolderName}/${file}`);
             }

             const height = parseInt(query.h) || 0; // Get height from query string
             const width = parseInt(query.w) || 0; // Get width from query string
             const quality = parseInt(query.q) < 100 ? parseInt(query.q) : 99; // Get quality from query string
             const folder = `h${height}_w${width} `;
             const out_file = `./public/assets/images/${query.service_type}/${imageFolderName}/${folder}/${file}`;
             
             if (fs.existsSync(path.resolve(out_file))) {
                return responseHandler.errorResponse(res,{}, "Files Already Exist with Same Resolution",400) //file
             }
            
             // If no height or no width display original image
             if (!height || !width) {
                return responseHandler.errorResponse(res,{}, "Resolution Not Get",400) //file
                 
             }

             // Use jimp to resize image
             Jimp.read(path.resolve(`public/assets/images/${query.service_type}/${imageFolderName}/${file}`))
                
                 .then((response) => {

                     response.resize(width, height); // resize
                     response.quality(quality); // set JPEG quality

                     response.write(path.resolve(out_file), () => {
                        //  fs.createReadStream(path.resolve(out_file)).pipe(res);
                         return responseHandler.successResponse(res,file, "Files Compressed Successfully")
                     }); 
                 })
                 .catch(err => {
                    console.log("error",err)
                    return responseHandler.errorResponse(res,err)
                 });
 
         } catch (err) {
             console.log(err);
             responseHandler.errorResponse(res, err);
         }
     }
 }

 export const fileResizeController = new FileResizeController();