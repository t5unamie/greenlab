export default {
    TableName: 'datascrapeds',
    KeySchema: [
        {
            AttributeName: 'url',
            KeyType: 'HASH',
        },
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'url',
            AttributeType: 'S',
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
};
