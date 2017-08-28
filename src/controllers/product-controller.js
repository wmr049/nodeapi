'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repositorie')


exports.get = async(req, res, next) => {

    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }


}

exports.getBySlug = async(req, res, next) => {

    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByTag = async(req, res, next) => {

    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

}

exports.getById = async(req, res, next) => {

    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O descrição deve conter pelo menos 3 caracteres');

    //se os dados forem invalidados
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        var data = await repository.create(req.body);
        res.status(201).send({
            message: 'Produto criado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }    
};

exports.put = async(req, res, next) => {

    try {
        var data = await repository.update(req.params.id, req.body);
        res.status(201).send({
            message: 'Produto Atualizado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }      
};

exports.delete = async(req, res, next) => {

    try {
        var data = await repository.delete(req.body.id);
        res.status(201).send({
            message: 'Produto excluido com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }    
}