const { MongoClient, ObjectId } = require('mongodb');
const { collection } = require('../models/users');
require('dotenv').config();

class DB {

    client;
    dbName;

    constructor() {
        this.client = new MongoClient(process.env.DB_URI);
        this.dbName = process.env.DB_NAME;
    }
    
    async FindAll(collection, query = {}, projection = {}) {
        try {
            await this.client.connect();
            return await this.client.db(this.dbName).collection(collection).find(query, projection).toArray();
        } catch (error) {
            return error;
        }
        finally {
            await this.client.close();
        }
    }

    async FindByID(collection, id) {
        try {
            await this.client.connect();
            return await this.client.db(this.dbName).collection(collection).findOne({ _id: new ObjectId(id) });
        } catch (error) {
            return error;
        }
        finally {
            await this.client.close();
        }
    }

    async FindEmail(collection, email) {
        try {
            await this.client.connect();
            return await this.client.db(this.dbName).collection(collection).findOne({ email: email });
        } catch (error) {
            return error;
        } 
        finally {
            await this.client.close();
        }
    }

    async FindUsername(collection, username) {
        try {
            await this.client.connect();
            return await this.client.db(this.dbName).collection(collection).findOne({ username: username });
        } catch (error) {
            return error;
        } 
        finally {
            await this.client.close();
        }
    }

    async Insert(collection, doc) {
        try {
            await this.client.connect();
            return await this.client.db(this.dbName).collection(collection).insertOne(doc);
        } catch (error) {
            return error;
        } finally {
            await this.client.close();
        }
    }

}

module.exports = DB;