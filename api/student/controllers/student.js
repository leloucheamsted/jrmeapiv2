'use strict';

const jwt = require('jsonwebtoken');

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

    async create(ctx) {

        const data = ctx.data;

        let entity = await strapi.services.student.create(data);

        const token = jwt.sign({
            data: { student_id: entity._id }
        }, process.env.JWT_SECRET);


        ctx.send({token: token}, 200);


    },

    async me(ctx){

        

    }

};
