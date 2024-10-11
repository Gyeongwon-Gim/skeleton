import { ErrorMessage } from "./consts/Error.js";
import Parser from "./Parser.js";

export function select({ distinct, cols, from, where, groupBy, having, orderBy, limit, join }) {
    distinct = distinct ? Parser.distinct(distinct) : "";
    cols = Parser.cols(cols);
    from = Parser.from(from);
    join = join ? Parser.join(join) : "";
    where = where ? Parser.where(where) : "";
    groupBy = groupBy ? Parser.groupBy(groupBy) : "";
    having = having ? Parser.having(having) : "";
    orderBy = orderBy ? Parser.orderBy(orderBy) : "";
    limit = limit ? Parser.limit(limit) : "";
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
    set = Parser.set(set);
    where = where ? `${Parser.where(where)}` : ""; // WHERE 구문은 선택 사항
    orderBy = orderBy ? `${Parser.orderBy(orderBy)}` : ""; // ORDER BY 선택 사항
    limit = limit ? `${Parser.limit(limit)}` : ""; // LIMIT 선택 사항

    return `UPDATE ${[from, set, where, orderBy, limit].filter((e) => e).join(" ")}`
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

export function insert({ cols, into, values, where }) {
    if (!Array.isArray(cols) || cols.length === 0) {
        throw new TypeError(ErrorMessage.cols);
    }

    cols = Parser.cols(cols); // cols 인자를 올바르게 처리
    into = Parser.into(into); // 테이블 이름 변환
    values = Parser.values(values); // 값을 변환
    where = where ? `${Parser.where(where)}` : ""; // WHERE 구문 선택 처리

    return `INSERT ${into} ${cols} ${values} ${where}`.trim();
}