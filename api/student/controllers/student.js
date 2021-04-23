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


       return ctx.send({token: token, user: entity}, 200);


    },

    async verifnumber(ctx){

        const data = ctx.request.body;

        const number = data.number;

        if(!number){
            return ctx.send({message: "bas data"}, 400);
        }

        let student = await strapi.services.student.findOne({number});

        if(student){
            return ctx.send({code: 402}, 200);
        }

        return ctx.send({code: 200}, 200);


    },

    async me(ctx){

        

    }

};
