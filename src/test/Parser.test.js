import Parser from "../Parser.js";

function colsTest() {
    // given
    const cols = ["name", "age"];
    // when
    const results = Parser.cols(cols);
    // then
    const expected = "(`name`, `age`)";
    console.log(`cols : ${results === expected}`);
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
OUTTER JOIN \`orders_items\` ON \`orders\`.\`order_id\` = \`order_items\`.\`order_id\`
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
