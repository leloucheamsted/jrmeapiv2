'use strict';

module.exports = {

    async create(ctx){
        
        const data = ctx.request.body;

        const intitule = data.intitule;
        let content = data.content;
        let lesson_id = data.lesson_id;

        if(intitule && content && lesson_id){
            ctx.send({message: "Données manquantes"}, 400);
        }

        try {

            let fiche = await strapi.services.fiche.create(data);

            let lesson = await strapi.services.lesson.findOne({ _id: lesson_id });

            lesson.fiches.push(fiche._id);

            await strapi.services.lesson.update({ _id: lesson_id }, {fiches: lesson.fiches});

            return ctx.send({message: "OK"}, 200);
            
        }
        catch (error) {

            return ctx.send({message: "Une erreur c'est produite"}, 500);
            
        }
 
    }
};
