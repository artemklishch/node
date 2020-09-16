const path = require("path");

//Base file name
console.log(path.basename(__filename));

//Directory name
console.log(__dirname);
console.log(path.dirname(__filename));

//File extansion
console.log(path.extname(__filename));

//Path object
console.log(path.parse(__filename));

//Concatinate paths
console.log(path.join(__dirname, "test", "hello.html"));
