let variables = require('./CONST');

let tableListValues = require('./tables');

require('./all-test/auth')(variables);

tableListValues.map((item)=>require('./all-test/simple-list')(item));



    