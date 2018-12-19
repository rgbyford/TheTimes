// const con = require('./connection.js');

// const orm = {
//     selectAll: function (cb) {
//         // get the list of burgers
//         con.query('SELECT * FROM burgers', function (err, result) {
//             if (err) {throw err;}
//             //            console.log ('sA: ', result);     // works
//             cb(result);
//         });
//     },

//     insertOne: async function (name, qty) {
//         // add a new one to the list
//         let query = `INSERT INTO burgers (burger_name, devoured) `;
//         query += `VALUES ('${name}', ${qty});`;
//         await con.query(query, (err) => {
//             if (err) {throw err;}
//             return;
//         });
//     },

//     updateOne: async function (name) {
//         // increase the quantity devoured
//         let query = `UPDATE burgers SET devoured = devoured + 1 WHERE `;
//         query += `burger_name = '${name}';`;
//         await con.query(query, (err) => {
//             if (err) {throw err;}
//             return;
//         });
//     }
// };

// module.exports = orm;