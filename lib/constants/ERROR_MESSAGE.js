const ERROR_MESSAGE = {
    TYPE: "type은 SELECT, DELETE, INSERT, UPDATE 중 하나여야 합니다.",
    COLS: "cols 는 string[] | [undefined] 타입이어야 합니다.",
    INTO: "into 는 string 타입이어야 합니다.",
    DISTINCT: "distinct 는 boolean 타입이어야 합니다.",
    JOIN: {
        ARRAY: "join 은 배열이어야 합니다.",
        PROPERTY: "join배열의 각 원소는 type, from, on 속성을 갖는 객체이어야 합니다.",
        TYPE: "join의 type은 LEFT, RIGHT 중 하나여야 합니다.",
        FROM: "join의 from은 string 타입이어야 합니다.",
    },
    VALUES: {
        TWO_DIMENSION_ARRAY: "values는 2차원 배열이어야 합니다.",
        ARRAY: "value 는 배열이어야 합니다.",
        TYPE: "value 의 각 요소는 number, stirng, boolean, Date 타입 중 하나여야 합니다.",
    },
    FROM: "from은 string[] 타입이어야 합니다.",
    ORDER_BY: {
        PROPERTY: "orderBy는 cols, order 속성을 갖는 객체이어야 합니다.",
        COLS: "orderBy.cols 는 string[] | number[] 타입이어야 합니다.",
        ORDER: "orderBy.order 은 ('ASC'|'DESC')[] 타입이어야 합니다.",
    },
    GROUP_BY: {
        PROPERTY: "groupBy는 cols 속성을 갖는 객체이어야 합니다.",
        COLS: "groupBy.cols 는 string[] | [undefined] 타입이어야 합니다.",
    },
    HAVING: "having 은 string 타입이어야 합니다.",
    WHERE: "where 은 string 타입이어야 합니다.",
    LIMIT: {
        PROPERTY: "limit 은 base, offset 속성을 갖는 객체이어야 합니다.",
        BASE: "limit.base 는 number 타입이어야 합니다.",
        OFFSET: "limit.offset 은 number 타입이어야 합니다.",
    },
    SET: {
        OBJECT: "set은 객체 리터럴이어야 합니다.",
        PROPERTY: "set 객체는 하나 이상의 key-value 를 갖고 있어야 합니다.",
    },
    SELECT: {
        REQUIRED: "select 구문에는 최소 cols 와 from 이 존재해야 합니다.",
    },
};

export default ERROR_MESSAGE;
