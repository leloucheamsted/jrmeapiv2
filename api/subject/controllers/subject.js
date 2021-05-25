'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(ctx){
        
        const data = ctx.request.body;

        const intitule = data.intitule;
        let description = data.description;
        let serie_id = data.serie_id;

        let user = ctx.state.user;
        

        if(intitule && description && serie_id){
            ctx.send({message: "Données manquantes"}, 400);
        }

        try {

            

            let subject = await strapi.services.subject.create(data);

            let serie = await strapi.services.serie.findOne({ _id: serie_id });
           
            serie.subjects.push(subject._id);
           
            await strapi.services.subject.update({_id: subject._id}, {redactor: user});
            await strapi.services.serie.update({ _id: serie_id }, {subjects: serie.subjects});
            

            return ctx.send({message: "OK"}, 200);
            
        }
        catch (error) {

            return ctx.send({message: "Une erreur c'est produite"}, 500);
            
        }
 
    },

    findOne: ctx => {
        const { id } = ctx.params;
        return strapi.query('subject').findOne({_id: id}, [
            {
                path: 'chapitres',
                populate: {
                    path: 'lessons',
                },
            }
        ]);
    }
};
