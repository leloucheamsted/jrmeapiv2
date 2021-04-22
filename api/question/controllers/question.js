'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(ctx) {

        const data = ctx.request.body;

        const question = data.question;
        const goodAnswer = data.goodAnswer;
        let answers = data.answers;
        let lesson_id = data.lesson_id

        if (!(question || goodAnswer || answers.length || lesson_id)) {

            return ctx.send({ message: "Manque de données" }, 400);

        }

        let i = 1;

        if (answers.length < 4) {

            return ctx.send({ message: "Veuillez ajouter au moins quatre questions!" }, 400);

        }


        answers.forEach((ans) => {
            if (ans.content == "") {
                if (i < 4) {

                    return ctx.send({ message: "Veuillez remplir les quatre premières questions!" }, 400)
                }
                else {
                    answers.pop();
                }

            }
            i += 1;
        })

        let questionE = await strapi.services.question.create({ question: question, goodAnswer: goodAnswer, answers: answers });


        let lesson = await strapi.services.lesson.findOne({ _id: lesson_id });


        lesson.questions.push(questionE._id);
        await strapi.services.lesson.update({ _id: lesson_id }, { questions: lesson.questions });

        return ctx.send({ message: "ok" }, 200);

    }
};
