var faker = require("faker");

//10 fake products iteratively
console.log(">>>>>>>>>>>>");
console.log("Welcome to my Store");
console.log("<<<<<<<<<<<<");
for(var i = 0; i < 10; i++) {
    console.log(faker.commerce.productName() + " - $" +faker.finance.amount())   
}