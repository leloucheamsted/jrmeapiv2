'use strict';

module.exports = {

    async create(ctx){
        
        const data = ctx.request.body;

        const intitule = data.intitule;
        let description = data.description;
        let subject_id = data.subject_id;

        if(intitule && description && subject_id){
            ctx.send({message: "Données manquantes"}, 400);
        }

        try {

            let chapitre = await strapi.services.chapitres.create(data);

            let subject = await strapi.services.subject.findOne({ _id: subject_id });


           
            subject.chapitres.push(chapitre._id);

            await strapi.services.subject.update({ _id: subject_id }, {chapitres: subject.chapitres});

            return ctx.send({message: "OK"}, 200);
            
        }
        catch (error) {

            return ctx.send({message: "Une erreur c'est produite"}, 500);
            
        }
 
    }
};
