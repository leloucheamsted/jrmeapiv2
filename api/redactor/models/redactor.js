'use strict';

const bcrypt = require('bcrypt');

module.exports = {
    lifecycles: {

        async beforeCreate(data) {
            data.password = await bcrypt.hash(data.password, 10);
        },

        async beforeUpdate(params, data) {
            if(data.password)data.password = await bcrypt.hash(data.password, 10);
        },
    },
};
