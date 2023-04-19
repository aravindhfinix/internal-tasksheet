import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


/**
 * * EmployeeProjectSchema
 * @description EmployeeProject model
 */
const EmployeeProjectSchema = new Schema({
    employee_id: {
        type: ObjectId,
        ref: 'employee',
        unique:true
    },
    project_id: [{
        type: ObjectId,
        ref: 'project',
    }],
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

export const EmployeeProject = mongoose.model('employee-Project', EmployeeProjectSchema);