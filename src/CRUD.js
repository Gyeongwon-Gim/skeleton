import Parser from "./Parser.js";

export function select({ distinct, cols, from, where, groupBy, having, orderBy, limit }) {
    distinct = Parser.distinct();
    cols = Parser.cols();
    from = Parser.from();
    where = Parser.where();
    groupBy = Parser.groupBy();
    having = Parser.having();
    orderBy = Parser.orderBy();
    limit = Parser.limit();
}

export function update({ from, set, where, orderBy, limit }) {
    from = Parser.from();
    set = Parser.set();
    where = where ? `WHERE ${Parser.where(where)}` : ''; // WHERE 구문은 선택 사항
    orderBy = orderBy ? `ORDER BY ${Parser.orderBy(orderBy)}` : ''; // ORDER BY 선택 사항
    limit = limit ? `LIMIT ${Parser.limit(limit)}` : ''; // LIMIT 선택 사항

    return `UPDATE ${from} SET ${set} ${where} ${orderBy} ${limit}`.trim();
}

export function remove({ from, where, orderBy, limit }) {
    // delete 가 예약어이므로 remove로 변경함
    // 필수
    from = Parser.from(from);
    // 선택
    where = Parser.where(where);
    orderBy = Parser.orderBy(orderBy);
    limit = Parser.limit(limit);
    // return `DELETE FROM ${from} ${where} ${orderBy} ${limit}`;
    return `DELETE FROM ${from}${where}${orderBy}${limit}`;
}

export function insert({ cols, from, values, where }) {
    cols = Parser.cols();
    from = Parser.from();
    values = Parser.values();
    where = where ? `WHERE ${Parser.where(where)}` : ''; // WHERE 구문은 선택 사항

    return `INSERT INTO ${from} ${cols} VALUES ${values} ${where}`.trim();
}
