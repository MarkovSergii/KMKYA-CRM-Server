let variables = require('./CONST');

let tables = [
    {
        variables:variables,
        table:'Seasons',
        insert1:{name:"2001"},
        insert2:{name:"2002"},
        update:{name:"1995"},
        fieldTestUpdate:"name"
    },
    {
        variables:variables,
        table:'Access_types',
        insert1:{name:"2001"},
        insert2:{name:"2002"},
        update:{name:"1995"},
        fieldTestUpdate:"name"
    }
];

module.exports = tables;