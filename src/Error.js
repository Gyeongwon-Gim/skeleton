export const ErrorMessage = {
    cols: "cols 는 string[] | [undefined] 타입이어야 합니다.",
    into: "into 는 string 타입이어야 합니다.",
    distinct: "distinct 는 boolean 타입이어야 합니다.",
    join: {
        array: "join 은 배열이어야 합니다.",
        property: "join배열의 각 원소는 type, from, on 속성을 갖는 객체이어야 합니다.",
        type: "join의 type은 LEFT, RIGHT, SELF, INNER, OUTER, FULL 중 하나여야 합니다.",
    },
    values: {
        twoDimensionArray: "values는 2차원 배열이어야 합니다.",
        array: "value 는 배열이어야 합니다.",
        type: "value 의 각 요소는 number, stirng, boolean, Date 타입 중 하나여야 합니다.",
    },
    from: "from은 string[] 타입이어야 합니다.",
    orderBy: {
        property: "orderBy는 cols, order 속성을 갖는 객체이어야 합니다.",
        cols: "orderBy.cols 는 string[] | number[] 타입이어야 합니다.",
        order: "orderBy.order 은 ('ASC'|'DESC')[] 타입이어야 합니다.",
    },
    groupBy: {
        property: "groupBy는 cols 속성을 갖는 객체이어야 합니다.",
        cols: "groupBy.cols 는 string[] | [undefined] 타입이어야 합니다.",
    },
    having: "having 은 string 타입이어야 합니다.",
    where: "where 은 string 타입이어야 합니다.",
    limit: {
        property: "limit 은 base, offset 속성을 갖는 객체이어야 합니다.",
        base: "limit.base 는 number 타입이어야 합니다.",
        offset: "limit.offset 은 number 타입이어야 합니다.",
    },
    set: {
        object: "set은 객체 리터럴이어야 합니다.",
        property: "set 객체는 하나 이상의 key-value 를 갖고 있어야 합니다.",
    },
    select: {
        required: "select 구문에는 최소 cols 와 from 이 존재해야 합니다.",
    },
};
