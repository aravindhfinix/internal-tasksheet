import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;


/**
 * * TeamSchema
 * @description Team model
 */
const TeamSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name must not be empty'],
        unique:true
    },
    description: {
        type: String,
        required: [true, 'description must not be empty'],
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

export const Team = mongoose.model('team', TeamSchema);