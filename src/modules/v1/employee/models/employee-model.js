import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * * EmployeeSchema
 * @description Employee model
 */
const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
    employee_id: {
        type: String,
        required: [true, 'Employee id must not be empty'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email must not be empty'],
        unique: true
    },
    status: {
        type: Number,
        default: true,
    },
    password: {
        type: String,
        required: [true, 'password must not be empty'],
    },
    type: {
        type: Number,
        required: [true, 'type must not be empty']
    },
    role: {
        type: Number,
        required: [true, 'role must not be empty']
    },
    team: {
        type: ObjectId,
        ref: 'team'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false }, { timestamps: false });

// UserSchema.plugin(mongoosePaginate);

// UserSchema.index({ name: 'text' });

export const Employee = mongoose.model('employee', EmployeeSchema);