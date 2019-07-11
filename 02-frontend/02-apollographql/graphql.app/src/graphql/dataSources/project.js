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


}