const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const buildingSchema = new Schema({

    building_id: {
        type: String,
        required: true
    },
    buiding_name: {
        type: String,
        required: true
    },

}, {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'update_at'
        }
    });

const Building = mongoose.model('building', buildingSchema, 'building');

module.exports = Building;