'use strict';

module.exports = {
    async create(ctx){
        
        const data = ctx.request.body;

        const intitule = data.intitule;
        let description = data.description;
        let classe_id = data.classe_id;

        if(intitule && description && classe_id){
            ctx.send({message: "Données manquantes"}, 400);
        }

        try {

            let serie = await strapi.services.serie.create(data);

            let classe = await strapi.services.classe.findOne({ _id: classe_id });

            
            classe.series.push(serie._id);

            await strapi.services.classe.update({ _id: classe_id }, {series: classe.series});

            return ctx.send({message: "OK"}, 200);
            
        }
        catch (error) {

            return ctx.send({message: "Une erreur c'est produite"}, 500);
            
        }

      

        
 
    }
};
