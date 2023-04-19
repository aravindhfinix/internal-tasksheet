import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * * File Upload Schema
 * @description FileUpload model
 */
const FileUploadSchema = new Schema({
    
    file: {
        type: Array,
        required: true
    },
    service_type: {
        type: String
    }
    
    
}, { versionKey: false }, { timestamps: true });


export const File = mongoose.model('File', FileUploadSchema);