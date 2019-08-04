# H1 intro

1. checkout repo
2. modify compose-example.yml to compose.yml and enter the correct details for it to access the dynamo db you setup for MS "04-webcrawler"
3. run "docker-compose -f compose.yml up"
4. 


#H1 Instructions

Add/update

mutation {
  putProject(data: {
    url   : "https://testing.com"
    rank : 100
    title: "the wonderfull world of testing"
    points: 10
    username: "Spock"
    comments: 999
  }) {
    error
  }
}

delete

mutation {
  deleteProject(url   : "https://testing.com") {
    error
  }
}

#H! Testing



#H3 References

#info on graphql/dynamo
https://www.apollographql.com/docs/apollo-server/features/graphql-playground/
https://www.npmjs.com/package/apollo-server-lambda
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
https://medium.com/@awesome1888/how-to-use-dynamodb-with-apollo-graphql-and-nodejs-serverless-offline-and-in-production-52f9b55a9c53