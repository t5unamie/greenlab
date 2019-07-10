/**
 *  In the code above we make sure that import/export, arrow functions,
 *  string templates, async/await and all other fancy stuff really works.
 */

import moment from 'moment';

const handler = async (event, context) => {
    const body = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Hello, this is your lambda speaking. Today is ${moment().format('dddd')}!`);
        }, 2000);
    });
    return {
        statusCode: 200,
        body,
    };
};

export default handler;
