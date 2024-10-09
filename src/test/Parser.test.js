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

function whereTest() {
    // given
    const inputs = [
        "books.category_id = category.id AND books.price > 10",
        "books.title LIKE Harry Potter",
        12345
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
        new TypeError(ErrorMessage.where)
    ];

    // 출력해서 확인
    console.log("Results:", results);
    console.log("Expected:", expected);

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.toString() === expected[i].toString();
        } else {
            return result === expected[i];
        }
    });

    console.log(`where : ${isPass}`);
}

whereTest();
// colsTest();
// joinTest();
// distinctTest();
// intoTest();
