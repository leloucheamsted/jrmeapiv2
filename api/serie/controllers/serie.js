'use strict';

module.exports = {
    async create(ctx){
        
        let data = ctx.request.body;

        const intitule = data.intitule;
        let description = data.description;
        let classe = data.classe_id;
        data.classe = classe;

        if(intitule && description && classe){
            ctx.send({message: "Données manquantes"}, 400);
        }

        if(1) {

            let serie = await strapi.services.serie.create(data);

            return ctx.send({message: "OK"}, 200);
            
        }
        else{

            return ctx.send({message: "Une erreur c'est produite"}, 500);
            
        }

      

        
 
    },

    findOne: ctx => {
        const { id } = ctx.params;
        let user = ctx.state.user;
        if(user.role.type==='redactor'){
            return strapi.query('serie').findOne({ _id: id, redactor: user });
        }
        else{
            return strapi.query('serie').findOne({ _id: id});
        }
        
    },
};
