'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'O titulo é obrigatório'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'o slug é obrigatório'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'A descrição é obrigatória'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'O preço é obrigatório']
    },
    active: {
        type: Boolean,
        required: [true, 'O Status é obrigatório'],
        default: true
    },
    tags: [{
        type: String,
        required: [true, 'As tags são obrigatório']
    }],
    image: {
        type: String,        
        trim: true
    }
});

module.exports = mongoose.model('Product', schema);
