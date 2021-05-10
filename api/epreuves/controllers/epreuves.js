'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {


            const { data, files } = parseMultipartData(ctx);

            let subject_id = data.subject;

            // data=JSON.parse(data)

            if (!(data.subject && data.intitule && data.type)) {
                ctx.send({ message: "Bad data" }, 400);
            }

            let epreuve = await strapi.services.epreuves.create(data, { files });

            let subject = await strapi.services.subject.findOne({ _id: subject_id });



            subject.epreuves.push(epreuve._id);

            await strapi.services.subject.update({ _id: subject_id }, {epreuves: subject.epreuves});

            ctx.send({message: "Ok"}, 200);

            
            
        } else {
            ctx.send({message: "bad data"}, 400);
        }
        return sanitizeEntity(entity, { model: strapi.models.epreuves });
    },



};
