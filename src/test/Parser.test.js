import Parser from "../Parser.js";
import { ErrorMessage } from "../consts/Error.js";
import { JOIN } from "../consts/Join.js";

function colsTest() {
    // given
    const inputs = [["name", "age"], ["name", 123], "name", []];
    // when
    const results = inputs.map((cols) => {
        let result;
        try {
            result = Parser.cols(cols);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
        "`name`, `age`",
        new TypeError(ErrorMessage.cols),
        new TypeError(ErrorMessage.cols),
        "*",
    ];
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });

    console.log(`cols : ${isPass}`);
}

function joinTest() {
    // given
    const inputs = [
        [
            {
                type: JOIN.LEFT,
                from: "orders",
                on: "customers.customer_id = orders.customer_id",
            },
            {
                type: JOIN.RIGHT,
                from: "order_items",
                on: "orders.order_id = order_items.order_id",
            },
            {
                type: JOIN.LEFT,
                from: "products",
                on: "order_items.product_id = products.product_id",
            },
        ],
        [
            {
                type: JOIN.LEFT,
                from: "orders",
            },
        ],
        [
            {
                type: "SOMTHING",
                from: "orders",
                on: "customers.customer_id = orders.customer_id",
            },
        ],
        "JOIN",
    ];
    // when
    const results = inputs.map((join) => {
        let result;
        try {
            result = Parser.join(join);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
        `LEFT JOIN \`orders\` ON \`customers\`.\`customer_id\` = \`orders\`.\`customer_id\`
RIGHT JOIN \`order_items\` ON \`orders\`.\`order_id\` = \`order_items\`.\`order_id\`
LEFT JOIN \`products\` ON \`order_items\`.\`product_id\` = \`products\`.\`product_id\``,
        new TypeError(ErrorMessage.join.property),
        new TypeError(ErrorMessage.join.type),
        new TypeError(ErrorMessage.join.array),
    ];
    // console.log("Results: ", results);
    // console.log("Expected: ", expected);

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });

    console.log(`join : ${isPass}`);
}

function distinctTest() {
    // given
    const inputs = [true, false, "true"];
    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = Parser.distinct(input);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = ["DISTINCT", "", new TypeError(ErrorMessage.distinct)];
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
    console.log(`distinct : ${isPass}`);
}

function intoTest() {
    // given
    const input = ["books", 123];
    // when
    const results = input.map((e) => {
        let result;
        try {
            result = Parser.into(e);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = ["`books`", new TypeError(ErrorMessage.into)];
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
    console.log(`into : ${isPass}`);
}

function fromTest() {
    // given
    const inputs = [["books", "categories"], "books", ["books", 123], 123];

    // when
    const results = inputs.map((from) => {
        let result;
        try {
            result = Parser.from(from);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
        "books, categories", // 정상 처리
        "books", // 정상처리
        new TypeError("배열의 원소 타입은 문자형이어야 합니다"),
        new TypeError("매개변수의 타입이 배열이나 문자 형태여야 합니다."),
    ];

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
    console.log(`from: ${isPass}`);
}
function whereTest() {
    // given
    const inputs = [
        "books.category_id = category.id AND books.price > 10",
        "books.title LIKE 'Harry Potter'",
    ];

    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = Parser.where(input);
        } catch (e) {
            result = e;
        }
        return result;
    });

    // then
    const expected = [
        "WHERE `books`.`category_id` = `category`.`id` AND `books`.`price` > 10",
        "WHERE `books`.`title` LIKE 'Harry Potter'",
    ];

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.toString() === expected[i].toString();
        } else {
            return result === expected[i];
        }
    });
    console.log(`where: ${isPass}`);
}

function valuesTest() {
    // given
    const inputs = [
        [
            ["Alice", "alice@gmail.com", 30],
            ["Bob", "bob@gmail.com", 25],
        ],
        [["Alice", "alice@gmail.com", 30]],
        // 123,
    ];

    // when
    const results = inputs.map((values) => {
        let result;
        try {
            result = Parser.values(values);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
        "('Alice', 'alice@gmail.com', 30), ('Bob', 'bob@gmail.com', 25)",
        "('Alice', 'alice@gmail.com', 30)",
        // 123,
    ]; // 정상처리

    console.log(results);
}

function groupByTest() {
    // given
    const inputs = [
        { cols: ["category", "author"] },
        { cols: ["author"] },
        { cols: ["category"] },
        "invalid", // 올바르지 않은 입력
    ];

    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = Parser.groupBy(input);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
        "GROUP BY (`category`, `author`)",
        "GROUP BY (`author`)",
        "GROUP BY (`category`)",
        new TypeError(ErrorMessage.groupBy.property),
    ];

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });

    console.log(`groupBy : ${isPass}`);
}

function havingTest() {
    // given
    const inputs = ["COUNT(*) > 1"];

    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = Parser.having(input);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = ["HAVING COUNT(*) > 1"];

    // 결과와 기대값 출력
    // console.log("Results:", results);
    // console.log("Expected:", expected);

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });

    console.log(`having : ${isPass}`);
}

function orderByTest() {
    // given
    const inputs = [
        { cols: ["name", "age"], order: ["ASC", "DESC"] },
        { cols: ["name", 123], order: ["ASC", "DESC"] },
    ];
    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = Parser.orderBy(input);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
        "ORDER BY `name` ASC, `age` DESC",
        new TypeError("컬럼명은 모두 문자형이어야 함니다"),
    ];
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
    // console.log(results);
    console.log(`orderBy: ${isPass}`);
}

function limitTest() {
    // given
    const inputs = [
        { base: 10, offset: 20 }, // 정상
        { base: 5 }, // 정상
        { base: "invalid", offset: 20 }, // base가 유효하지 않음
        123, // 잘못된 형식
    ];

    // when
    const results = inputs.map((limit) => {
        let result;
        try {
            result = Parser.limit(limit);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
        "LIMIT 10, 20", // 정상적인 출력
        "LIMIT 5", // 정상적인 출력
        new TypeError(ErrorMessage.limit.base), // base 값이 잘못된 경우
        new TypeError(ErrorMessage.limit.property), // 잘못된 limit 형식
    ];

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
    console.log(`limit : ${isPass}`);
}

function setTest() {
    // given
    const inputs = [
        { name: "John", age: 25, active: true }, // 정상적인 객체 리터럴
        {}, // 프로퍼티가 없는 객체 (에러 발생 예상)
        "invalid", // 객체 리터럴이 아닌 값 (에러 발생 예상)
        { salary: 5000, position: "Manager" }, // 숫자와 문자열이 혼합된 객체
        { invalidKey: null }, // null 값이 포함된 객체 (정상 처리 예상)
        new Map(), // 객체 리터럴이 아닌 값 (에러 발생 예상)
    ];

    // when
    const results = inputs.map((set) => {
        let result;
        try {
            result = Parser.set(set);
        } catch (e) {
            result = e;
        }
        return result;
    });

    // then
    const expected = [
        "`name` = 'John', `age` = 25, `active` = true", // 정상 처리 예상
        new TypeError(ErrorMessage.set.property), // 프로퍼티가 없는 객체, 에러 발생
        new TypeError(ErrorMessage.set.object), // 객체 리터럴이 아닌 값, 에러 발생
        "`salary` = 5000, `position` = 'Manager'", // 정상 처리 예상
        "`invalidKey` = null", // null 값 정상 처리 예상
        new TypeError(ErrorMessage.set.object), // Map 객체, 에러 발생
    ];

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
    // 테스트 결과 출력
    console.log(`setTest: ${isPass}`);
}

whereTest();
groupByTest();
limitTest();
colsTest();
joinTest();
distinctTest();
intoTest();
havingTest();
setTest();
valuesTest();
fromTest();
orderByTest();
