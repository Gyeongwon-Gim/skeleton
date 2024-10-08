const db = require("../config/database");

const User = {
    getAll: (callback) => {
        db.all("SELECT * FROM users", callback);
    },
};
