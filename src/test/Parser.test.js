import Parser from "../Parser.js";
import { ErrorMessage } from "../Error.js";

function colsTest() {
    // given
    const inputs = [["name", "age"], ["name", 123], "name"];
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
        "(`name`, `age`)",
        new TypeError(ErrorMessage.cols),
        new TypeError(ErrorMessage.cols),
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
                type: "INNER",
                from: "orders",
                on: "customers.customer_id = orders.customer_id",
            },
            {
                type: "OUTER",
                from: "order_items",
                on: "orders.order_id = order_items.order_id",
            },
            {
                type: "FULL",
                from: "products",
                on: "order_items.product_id = products.product_id",
            },
        ],
        [
            {
                type: "INNER",
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
        `INNER JOIN \`orders\` ON \`customers\`.\`customer_id\` = \`orders\`.\`customer_id\`
OUTER JOIN \`order_items\` ON \`orders\`.\`order_id\` = \`order_items\`.\`order_id\`
FULL JOIN \`products\` ON \`order_items\`.\`product_id\` = \`products\`.\`product_id\``,
        new TypeError(ErrorMessage.join.property),
        new TypeError(ErrorMessage.join.type),
        new TypeError(ErrorMessage.join.array),
    ];

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

function valuesTest() {
    // given
    const inputs = [
        [
            ["Alice", "alice@gmail.com", 30],
            ["Bob", "bob@gmail.com", 25],
        ],
        ["Alice", "alice@gmail.com", 30],
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

// colsTest();
// joinTest();
// distinctTest();
// intoTest();

fromTest();
// valuesTest();
orderByTest();
