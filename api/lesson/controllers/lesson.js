'use strict';

module.exports = {

    async create(ctx) {

        const data = ctx.request.body;

        const intitule = data.intitule;
        let description = data.description;
        let chapitre_id = data.chapitre_id;

        if (intitule && description && chapitre_id) {
            ctx.send({ message: "Données manquantes" }, 400);
        }

        try {

            let lesson = await strapi.services.lesson.create(data);

            let chapitre = await strapi.services.chapitres.findOne({ _id: chapitre_id });

            chapitre.lessons.push(lesson._id);

            await strapi.services.chapitres.update({ _id: chapitre_id }, { lessons: chapitre.lessons });

            return ctx.send({ message: "OK" }, 200);

        }
        catch (error) {

            return ctx.send({ message: "Une erreur c'est produite" }, 500);

        }

    },


    find: ctx => {
        return strapi.query('lesson').find(ctx.query, [
            {
                path: 'questions'
            },
            {
                path: 'fiches'
            },
        ]);
    },

    findOne: ctx => {
        return strapi.query('lesson').findOne(ctx.query, [
            {
                path: 'questions'
            },
            {
                path: 'fiches'
            },
        ]);
    }
};

