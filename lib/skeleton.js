import { select, insert, remove, update } from "./crud.js";
import TYPE from "./constants/TYPE.js";
import ERROR_MESSAGE from "./constants/ERROR_MESSAGE.js";
import QueryExecutor from "./QueryExecutor.js";

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
            throw TypeError(ERROR_MESSAGE.TYPE);
    }
}

export default { QueryExecutor, literalize };
