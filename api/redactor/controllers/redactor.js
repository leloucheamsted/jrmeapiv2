'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    async login(ctx) {
        const data = ctx.request.body;

        const number = data.number;
        let password = data.password;

        


        if(!password){
            return ctx.send({message: "Invalid password"}, 403);
        }

        
        let redactor = await strapi.services.redactor.findOne({ number });

        if(redactor == null){
            return ctx.send({message: "Invalid credentials"}, 403);
        }

        let isValidPassword =  await bcrypt.compare(password, redactor.password);

        if(!isValidPassword){
            return ctx.send({message: "Invalid password"}, 403);
        }

        const token = jwt.sign({id: redactor._id }, process.env.JWT_SECRET);

        return ctx.send({token: token}, 200);

    },

    async me(ctx){

    }
};
