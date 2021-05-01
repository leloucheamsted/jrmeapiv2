'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

    async create(ctx) {

        let data = ctx.data;

        let role = await strapi.query('role', 'users-permissions').findOne({type: "student"}, []);

    
        data.role = role._id


        console.log(role._id);

        let entity = await strapi.services.student.create(data);

        const token = jwt.sign({
            data: { student_id: entity._id }
        }, process.env.JWT_SECRET);


        return ctx.send({ token: token, user: entity }, 200);


    },

    async verifnumber(ctx) {

        const data = ctx.request.body;

        const number = data.number;

        if (!number) {
            return ctx.send({ message: "bas data" }, 400);
        }

        let student = await strapi.services.student.findOne({ number });

        if (student) {
            return ctx.send({ code: 402 }, 200);
        }

        return ctx.send({ code: 200 }, 200);


    },

    async login(ctx) {

        const data = ctx.request.body;

        const number = data.number;
        let password = data.password;


        if (!password) {
            return ctx.send({ message: "Invalid password" }, 403);
        }


        let student = await strapi.services.student.findOne({ number });

        if (student == null) {
            return ctx.send({ message: "Invalid credentials" }, 403);
        }

        let isValidPassword = await bcrypt.compare(password, student.password);

        if (isValidPassword) {
            return ctx.send({ message: "Invalid credentials" }, 403);
        }

        const token = jwt.sign( {id: student._id }, process.env.JWT_SECRET);

        return ctx.send({ token: token, user: student }, 200);


    },

    async subjects(ctx) {

        console.log(ctx.state.user);

        let serie = await strapi.services.serie.findOne({_id: ctx.state.user.serie._id}, ["subjects"]);

        return ctx.send({ subjects:  serie.subjects}, 200);


    },

    async me(ctx) {



    }

};
