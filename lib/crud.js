import Parser from "./Parser.js";

export function select({ distinct, cols, from, where, groupBy, having, orderBy, limit, join }) {
    distinct = distinct ? (Parser.distinct(distinct) ? "DISTINCT" : "") : "";
    cols = Parser.cols(cols);
    from = `FROM ${Parser.from(from)}`;
    join = join ? Parser.join(join) : "";
    where = where ? `WHERE ${Parser.where(where)}` : "";
    groupBy = groupBy ? `GROUP BY ${Parser.groupBy(groupBy)}` : "";
    having = having ? `HAVING ${Parser.having(having)}` : "";
    orderBy = orderBy ? `ORDER BY ${Parser.orderBy(orderBy)}` : "";
    limit = limit ? `LIMIT ${Parser.limit(limit)}` : "";
    /*
        순서
        1. distinct
        2. cols
        3. from
        4. join
        5. where
        6. group by
        7. having
        8. order by
        9. limit
    */
    return `SELECT ${[distinct, cols, from, join, where, groupBy, having, orderBy, limit].filter((e) => e).join(" ")}`;
}

export function update({ from, set, where, orderBy, limit }) {
    from = Parser.from(from);
    set = `SET ${Parser.set(set)}`;
    where = where ? `WHERE ${Parser.where(where)}` : ""; // WHERE 구문은 선택 사항
    orderBy = orderBy ? `ORDER BY ${Parser.orderBy(orderBy)}` : ""; // ORDER BY 선택 사항
    limit = limit ? `LIMIT ${Parser.limit(limit)}` : ""; // LIMIT 선택 사항

    return `UPDATE ${[from, set, where, orderBy, limit].filter((e) => e).join(" ")}`;
}

export function remove({ from, where, orderBy, limit }) {
    // delete 가 예약어이므로 remove로 변경함
    // 필수
    from = `FROM ${Parser.from(from)}`;
    // 선택
    where = where ? `WHERE ${Parser.where(where)}` : "";
    orderBy = orderBy ? `ORDER BY ${Parser.orderBy(orderBy)}` : "";
    limit = limit ? `LIMIT ${Parser.limit(limit)}` : "";
    return `DELETE ${[from, where, orderBy, limit].filter((e) => e).join(" ")}`;
}

export function insert({ cols, into, values }) {
    into = `INTO ${Parser.into(into)}`; // 테이블 이름 변환
    values = `VALUES ${Parser.values(values)}`; // 값을 변환
    cols = cols ? `(${Parser.cols(cols)})` : ""; // cols 인자를 올바르게 처리
    return `INSERT ${[into, cols, values].filter((e) => e).join(" ")}`;
}
