import { select, insert, remove, update } from "./CRUD.js";
import { TYPE } from "./consts/Type.js";
import { ErrorMessage } from "./consts/Error.js";
import QueryExecutor from "./src/QueryExecutor";
import { createDatabase } from "./dbConnection.js";

function literalize(sql) {
    switch (sql.type) {
        case TYPE.SELECT:
            return select(sql);
        case TYPE.INSERT:
            return insert(sql);
        case TYPE.DELETE:
            return remove(sql);
        case TYPE.UPDATE:
            return update(sql);
        default:
            throw TypeError(ErrorMessage.type);
    }
}

export default { QueryExecutor, createDatabase, literalize };
