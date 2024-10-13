import { select, insert, remove, update } from "./CRUD.js";
import { type } from "./consts/Type.js";
import { ErrorMessage } from "./consts/Error.js";

function literalize(sql) {
    switch (sql.type) {
        case type.SELECT:
            return select(sql);
        case type.INSERT:
            return insert(sql);
        case type.DELETE:
            return remove(sql);
        case type.UPDATE:
            return update(sql);
        default:
            throw TypeError(ErrorMessage.type);
    }
}
