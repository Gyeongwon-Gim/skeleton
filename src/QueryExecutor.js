import skeleton from "./skeleton.js";

class QueryExecutor {
    constructor(db) {
        this.db = db;
    }
    async query(sql) {
        try {
            const queryString = skeleton.literalize(sql);
            return this.db.query(queryString);
        } catch (error) {
            console.error(error);
        }
    }
}
export default QueryExecutor;
