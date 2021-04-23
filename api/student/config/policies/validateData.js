module.exports = async (ctx, next) => {
    // if (ctx.state.user) {
    //     // Go to next policy or will reach the controller's action.
    //     return await next();
    // }



    let data = ctx.request.body;

    const number = data.number;
    const password = data.password;

    const names = data.names;
    const prenames = data.prenames;
    const birthday = data.birthday;
    const country_iso2 = data.country_iso2;
    const etablissement = data.etablissement;
    const orientation = data.orientation;
    const classe = data.classe_id;
    const serie = data.serie_id;
    const city = data.city;
    const genre = data.genre;
    data.serie = data.serie_id;
    data.classe = data.classe_id;

    


    if (number.length == 9 && /^[0-9]*$/.test(number) ) {
        let isNumberfree = await strapi.services.student.findOne({ number }) ? false : true;
        if (password.length >= 6 && isNumberfree) {

            let isValidClasseid = await strapi.services.classe.findOne({ classe }) ? true : false;


            if (isValidClasseid) {

                if (serie && names && classe && prenames && birthday && country_iso2 && etablissement && orientation && city && String(genre)) {

                    ctx.data=data;
                    return await next();
                }
                else{
                    ctx.send({
                        message: 'Emptydata'
                    }, 400);
                }
                
            }
            else {
                ctx.send({
                    message: 'Bad classe'
                }, 400);
            }

        }
        else {
            ctx.send({
                message: 'Bad password'
            }, 400);
        }
    }
    else {
        ctx.send({
            message: 'Bad number'
        }, 400);
    }
};