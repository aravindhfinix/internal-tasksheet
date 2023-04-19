import responseHandler from "../../../../utils/response-handler";
import {File} from "../models/fileupload-model";
require('dotenv').config();
const path = require('path');

class FileUpload {

    constructor() {}

    /**
     * @description  API for File upload
     * @param {*} req 
     * @param {*} res 
    **/
    async create(req, res) {

        try {
            const host = process.env.MONGODB_HOST
            console.log(req.files)
            const service_type = req.body.service_type
            if (!req.files || Object.keys(req.files).length === 0) {
                responseHandler.errorResponse(res, {}, "Please upload a valid media", 400);
            }
            const errors = [];
            const successUploads = [];
            const file = (req.files).file
            if (Array.isArray(req.files.file) === false) {

                console.log("single File")
                const mediaType = getFileType(file.name.split(".")[1]);
                console.log(mediaType)
                if (mediaType == 0) {
                    errors.push({file: file.name, error: 'Unknown file format'});
                    return responseHandler.errorResponse(res, {}, "Document Media Type is Not Valid", 400);
                }
                if (mediaType === "IMAGE") {
                    const storeFile = await moveToImageFolder(file, mediaType, service_type, host).catch((error) => {
                        errors.push(error);
                    });
                    successUploads.push(storeFile);
                }
                if (mediaType === "FILE") { // upload file
                    const storeFile = await moveToFile(file, mediaType, service_type).catch((error) => {
                        errors.push(error);
                    });
                    successUploads.push(storeFile);
                }
                if (mediaType === "VIDEO") { // upload file
                    const storeFile = await moveToVideoFolder(file, mediaType, service_type).catch((error) => {
                        errors.push(error);
                    });
                    successUploads.push(storeFile);
                }
                if (mediaType === "AUDIO") { // upload file
                    const storeFile = await moveToAudioFolder(file, mediaType, service_type).catch((error) => {
                        errors.push(error);
                    });
                    successUploads.push(storeFile);
                }
                const fileDetails = new File({file: successUploads})
                const result = await fileDetails.save()
                if (! result) {
                    return responseHandler.errorResponse(res, errors);
                } else {
                    console.log(result)
                    return responseHandler.successResponse(res, result, "Files Uploaded Successfully")
                }
            } else { // file type validation
                for (let i = 0; i < file.length; i++) { // file type validation
                    const mediaType = getFileType(file[i].name.split(".")[1]);
                    console.log(mediaType)
                    if (mediaType == 0) {
                        errors.push({file: file[i].name, error: 'Unknown file format'});
                        return responseHandler.errorResponse(res, {}, "Document Media Type is Not Valid", 400);
                    }
                    if (mediaType === "IMAGE") {
                        const storeFile = await moveToImageFolder(file[i], mediaType, service_type, host).catch((error) => {
                            errors.push(error);
                        });
                        successUploads.push(storeFile);
                    }
                    if (mediaType === "FILE") { // upload file
                        const storeFile = await moveToFile(file[i], mediaType, service_type).catch((error) => {
                            errors.push(error);
                        });
                        successUploads.push(storeFile);
                    }
                    if (mediaType === "VIDEO") { // upload file
                        const storeFile = await moveToVideoFolder(file[i], mediaType, service_type).catch((error) => {
                            errors.push(error);
                        });
                        successUploads.push(storeFile);
                    }
                    if (mediaType === "AUDIO") { // upload file
                        const storeFile = await moveToAudioFolder(file[i], mediaType, service_type).catch((error) => {
                            errors.push(error);
                        });
                        successUploads.push(storeFile);
                    }
                    if (i == file.length - 1) {
                        const fileDetails = new File({file: successUploads})
                        const result = await fileDetails.save()
                        if (! result) {
                            return responseHandler.errorResponse(res, errors);
                        } else {
                            console.log(result)
                            return responseHandler.successResponse(res, result, "Files Uploaded Successfully")
                        }
                    }
                }
            }
        } catch (err) {
            console.log(err);
            responseHandler.errorResponse(res, err);
        }
    }
}

// ImageFile move to Image Folder
const moveToImageFolder = (file, mediaType, service_type, host) => {
    return new Promise((resolve, reject) => {

        const imageFolderName = new Date().valueOf();
        const fileName = new Date().valueOf() + '.' + file.mimetype.split("/")[1];
        const document = `assets/images/${service_type}/${imageFolderName}`

        file.mv(`/var/www/html/assets/images/${service_type}/${imageFolderName}/` + fileName, function (err) {
            if (err) {
                reject(err);
            } else {
                const result = {
                    Url: `http://${host}/${document}/` + fileName,
                    mediaType
                }
                console.log(result)
                resolve(result);
            }
        });
    })
}
// pdf,doc File move to Documents Folder

const moveToFile = (file, mediaType, service_type) => {
    return new Promise((resolve, reject) => {
        const documentFolderName = new Date().valueOf() + '.' + file.mimetype.split("/")[1];
        const fileName = new Date().valueOf() + '.' + file.mimetype.split("/")[1];
        const document = `assets/documents/${service_type}/${documentFolderName}`

        file.mv(`/var/www/html/assets/documents/${service_type}/${documentFolderName}/` + fileName, function (err) {
            if (err) {
                reject(err);
            } else {
                const result = {
                    Url: `http://${host}/${document}/` + fileName,
                    mediaType
                }
                console.log(result)
                resolve(result);
            }
        });
    })
}


// Video move to Videos Folder

const moveToVideoFolder = (file, mediaType, service_type) => {
    return new Promise((resolve, reject) => {
        const videoFolderName = new Date().valueOf() + '.' + file.mimetype.split("/")[1];
        const fileName = new Date().valueOf() + '.' + file.mimetype.split("/")[1];
        const document = `assets/videos/${service_type}/${videoFolderName}`

        file.mv(`/var/www/html/assets/videos/${service_type}/${videoFolderName}/` + fileName, function (err) {
            if (err) {
                reject(err);
            } else {
                const result = {
                    Url: `http://${host}/${document}/` + fileName,
                    mediaType
                }
                console.log(result)
                resolve(result);
            }
        });
    })
}

// Audio move to Audio Folder

const moveToAudioFolder = (file, mediaType, service_type) => {
    return new Promise((resolve, reject) => {
        const audioFolderName = new Date().valueOf() + '.' + file.mimetype.split("/")[1];
        const fileName = new Date().valueOf() + '.' + file.mimetype.split("/")[1];
        const document = `assets/audios/${service_type}/${audioFolderName}`

        file.mv(`/var/www/html/assets/audios/${service_type}/${audioFolderName}/` + fileName, function (err) {
            if (err) {
                reject(err);
            } else {
                const result = {
                    Url: `http://${host}/${document}/` + fileName,
                    mediaType
                }
                console.log(result)
                resolve(result);
            }
        });
    })
}
// Get File Type from extension

const getFileType = (extension) => {

    switch (extension) {
        case 'jpg':
        case 'png':
        case 'jpeg':
        case 'gif':
        case 'tiff':
        case 'ico':
        case 'svg':
        case 'webp':
        case 'avif':

            return "IMAGE";

        case 'mp3':
        case 'wav':

            return "AUDIO";

        case 'mp4':
        case 'mov':
        case 'MOV':
        case 'ogg':
        case 'wmv':
        case 'webm':

            return "VIDEO";

        case 'pdf':
        case 'doc':
        case 'docx':
        case 'odt': 
        case 'rtf':
        case 'txt':
            
            return "FILE";

        default:
            return 0;
    }
}
export default new FileUpload();
