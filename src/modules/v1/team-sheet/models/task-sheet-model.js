import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * * TeamSheetSchema
 * @description Team sheet model
 */
const TeamSheetSchema = new Schema({
    employee_id: {
        type: ObjectId,
        required: [true, 'employee_id must not be empty'],
        ref:'employee'
    },
    project_id: {
        type: ObjectId,
        required: [true, 'employee_id must not be empty'],
        ref:'project'
    },
    task_description: {
        type: String,
        required: [true, 'description must not be empty'],
    },
    date: {
        type: Date,
        required: [true, 'date name must not be empty'],
    },
    estimated_hours: {
        type: Number,
        default: 1,
    },
    worked_hours: {
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

// TeamSheetSchema.plugin(mongoosePaginate);

// TeamSheetSchema.index({ name: 'text' });

export const TeamSheet = mongoose.model('teamSheet', TeamSheetSchema);