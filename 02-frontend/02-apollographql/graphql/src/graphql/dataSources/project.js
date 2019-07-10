import Database from '../../db';
import stringGen from 'crypto-random-string';

export default class projectSource {
    // our methods go here, we are going to discuss them below

    async getDatabase() {
        if (!this._db) {
            this._db = new Database();
            await this._db.connect();
        }

        return this._db;
    }

    async get(title) {
    const db = await this.getDatabase();
    return db.getItem({
        TableName: 'datascrapeds',
        Key: {
            title: {
                S: title.toString(),
            },
        },
    });
	}

	async delete(title) {
    const db = await this.getDatabase();
    await db.deleteItem({
        TableName: 'datascrapeds',
        Key: {
            title: {
                S: title.toString(),
            },
        },
    });
}
}