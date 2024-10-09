import Parser from "../Parser.js";
import { ErrorMessage } from "../Error.js";

function colsTest() {
    // given
    const input = [["name", "age"], ["name", 123], "name"];
    // when
    const results = input.map((cols) => {
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
    const join = [
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
    const results = Parser.join(join);
    // then
    const expected = `INNER JOIN \`orders\` ON \`customers\`.\`customer_id\` = \`orders\`.\`customer_id\`
OUTTER JOIN \`order_items\` ON \`orders\`.\`order_id\` = \`order_items\`.\`order_id\`
FULL JOIN \`products\` ON \`order_items\`.\`product_id\` = \`products\`.\`product_id\``;
    console.log(`join : ${results === expected}`);
}

function distinctTest() {
    // given
    const distinct = [true, false];
    // when
    const results = JSON.stringify(distinct.map((e) => Parser.distinct(e)));
    // then
    const expected = JSON.stringify(["DISTINCT", ""]);
    console.log(`distinct : ${results === expected}`);
}

colsTest();
joinTest();
distinctTest();
