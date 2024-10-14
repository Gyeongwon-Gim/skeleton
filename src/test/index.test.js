import skeleton, { TYPE } from "../skeleton.js";
import express from "express";
import mysql from "mysql2/promise";

const conn = await mysql.createConnection({
    host: "localhost",
    password: "root",
    user: "root",
    database: "BookStore",
    dateStrings: true,
});

const mariadb = new skeleton.QueryExecutor(conn);

const app = express();
app.listen(3000);

const sql = {
    type: TYPE.SELECT,
    cols: [],
    from: ["books"],
};

const fetchAllBooks = async (req, res) => {
    const [results] = await mariadb.query(sql);
    console.log(results);
    res.json(results);
};

app.get("/books", fetchAllBooks);
