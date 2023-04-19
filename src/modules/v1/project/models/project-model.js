import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;


/**
 * * ProjectSchema
 * @description Project model
 */
const ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
    description: {
        type: String,
        required: [true, 'description must not be empty'],
    },
    client_name: {
        type: String,
        required: [true, 'client name must not be empty'],
    },
    priority: {
        type: Number,
        default: 1,
    },
    status: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false }, { timestamps: false });

// UserSchema.plugin(mongoosePaginate);

// UserSchema.index({ name: 'text' });

export const Project = mongoose.model('project', ProjectSchema);