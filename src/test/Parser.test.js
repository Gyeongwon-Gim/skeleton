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
    const input = [
        {
            type: "INNER",
            from: "orders",
            on: "customers.customer_id = orders.customer_id",
        },
        {
            type: "OUTTER",
            from: "order_items",
            on: "orders.order_id = order_items.order_id",
        },
        {
            type: "FULL",
            from: "products",
            on: "order_items.product_id = products.product_id",
        },
    ];
    // when
    const result = Parser.join(input);
    // then
    const expected = `INNER JOIN \`orders\` ON \`customers\`.\`customer_id\` = \`orders\`.\`customer_id\`
OUTTER JOIN \`order_items\` ON \`orders\`.\`order_id\` = \`order_items\`.\`order_id\`
FULL JOIN \`products\` ON \`order_items\`.\`product_id\` = \`products\`.\`product_id\``;
    const isPass = result === expected;
    console.log(`join : ${isPass}`);
}

function distinctTest() {
    // given
    const inputs = [true, false];
    // when
    const results = inputs.map((input) => Parser.distinct(input));
    // then
    const expected = ["DISTINCT", ""];
    const isPass = results.every((result, i) => result === expected[i]);
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

colsTest();
joinTest();
distinctTest();
intoTest();
