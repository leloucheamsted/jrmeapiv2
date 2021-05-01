'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

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

    },

    async quiz(ctx) {
        const { id } = ctx.params;

        const { nb_question } = ctx.params;

        let res=[];

        let lesson = await strapi.services.lesson.findOne({ _id: id }, [
            {
                path: 'questions'
            }
        ]);

        let questions = lesson.questions;

        if (questions.length >= nb_question) {

            questions = getRandom(questions, nb_question);

            questions.forEach((question) => {
                var s = {};
                s.question_id = String(question._id);
                s.question = question.question;

                s.goodAnswer = question.goodAnswer;

                s.answers = shuffle(question.answers);

                res.push(s);
            });

            ctx.send({quizs: res}, 200);

        }
        else{
            ctx.send({message: "Insufucient question"}, 401);
        }
    }
};
