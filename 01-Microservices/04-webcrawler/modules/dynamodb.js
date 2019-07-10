var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath('modules/credentials.json');

module.exports = dynamo