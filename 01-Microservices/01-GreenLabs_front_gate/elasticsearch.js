var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: '192.168.1.134:9200',
    log: 'info'
});

var indexName = "randomindex";

/**
* Delete an existing index
*/
function deleteIndex() {
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function initMapping() {
    return elasticClient.indices.putMapping({
        index: indexName,
        type: "document",
        body: {
            properties: {
                title: { type: "string" },
                content: { type: "string" },
                suggest: {
                    type: "completion",
                    analyzer: "simple",
                    search_analyzer: "simple",
                    payloads: true
                }
            }
        }
    });
}
exports.initMapping = initMapping;

function getTasks(callback) {
    elasticClient.search({
        index: 'tasks',
        type: 'task',
        body: {
            query: {
                "match_all": {}
            }
        }
    }, callback);
} 

function addTask(task) {

    return elasticClient.index({
        index: 'tasks' ,
        type: 'task',
        body: {
            task: task.task,
            urgency: task.urgency,
            requester: task.requester
        }
    });
}

function deleteTask(task_id, callback) {

    return elasticClient.delete({
        index: 'tasks',
        type: 'task',
        id: task_id,
    }, callback);
}

exports.getTasks = getTasks;
exports.addTask = addTask;
exports.deleteTask = deleteTask;