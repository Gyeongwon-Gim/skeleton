import { select, insert, remove, update } from "./CRUD.js";

function literalize(sql) {
    switch (sql.type) {
        case "SELECT":
            select(sql);
            break;

        case "INSERT":
            insert(sql);
            break;

        case "DELETE":
            remove(sql);
            break;

        case "UPDATE": {
            update(sql);
            break;
        }
    }
}
