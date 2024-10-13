import db from "./db";
import { literalize } from "./literalize";

class QueryExecutor {
    async query(sql) {
        const queryString = literalize(sql);
        try {
            return await db.query(queryString);
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = QueryExecutor;