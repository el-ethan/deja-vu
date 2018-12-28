const { Schema, model } = require('mongoose');

const models = {};

const incidentSchema = new Schema(
    {
        solution: String,
        problem: String,
    }
);

const Incident = new model('Incident', incidentSchema);
models.Incident = Incident;

module.exports = models;
