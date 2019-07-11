import Database from '../../db';

export default class ProjectSource {
    // our methods go here, we are going to discuss them below

        async put(data) {

        const item = {
            url: {
                S: data.url.toString(),
            },
            title: {
                S: data.title.toString(),
            },
            username: {
                S: data.username.toString(),
            },
            points: {
                N: data.points ? data.points.toString() : '0',
            },
            rank: {
                N: data.rank ? data.rank.toString() : '0',
            },
            comments: {
                N: data.comments ? data.comments.toString() : '0',
            }
        };

        const db = await this.getDatabase();
        await db.putItem({
            TableName: 'datascrapeds',
            Item: item,
        });
    }

    async get(url) {
    const db = await this.getDatabase();
    return db.getItem({
        TableName: 'datascrapeds',
        Key: {
            url: {
                S: url.toString(),
            },
        },
    });
    }

    async delete(url) {
    const db = await this.getDatabase();
    await db.deleteItem({
        TableName: 'datascrapeds',
        Key: {
            url: {
                S: url.toString(),
            },
        },
    });
    }

    async getDatabase() {
        if (!this._db) {
            this._db = new Database();
            await this._db.connect();
        }

        return this._db;
    }

    async getForproject(url) {
    const db = await this.getDatabase();
    const result = await db.scan({
        TableName: 'datascrapeds',
        ExpressionAttributeValues: {
            ':url': {
                S: url,
            },
        },
        FilterExpression: 'contains(project, :url)',
    });

    if (result && result.Items) {
        // need to "decode" the items, i know this is annoying
        return result.Items.map((item) => {

            const p = item.parameters ? item.parameters.M : {};
            const parameters = [];
            Object.keys(p).forEach((k) => {
                parameters.push({
                    name: k,
                    value: p[k].S,
                });
            });

            return {
                url: item.url.S,
                rank: item.rank.N,
                title: item.title.S,
                points: item.points.N,
                username: item.username.S,
                comments: item.comments.N
            };
        });
    }

    return [];
}


}