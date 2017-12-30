require('dotenv').config();
const sql = require('mssql');
const request = new sql.Request();

const config = {
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  server: process.env.HOSTNAME,
  port: process.env.PORT,
  database: process.env.DATABASE
};

// sql
//   .connect(config)
//   .then(() => {
//     request.input('myval', sql.VarChar, '-- commented');
//     request.query('select @myval as myval', (err, result) => {
//       console.dir(result);
//     });

//     return sql.query`select author from Comments (NOLOCK) where dirty = 'False' and json_metadata LIKE('%"malaysia"%') and datediff(day, created, GETDATE()) between 0 and 1`;
//   })
//   .then(result => {
//     console.dir(result);
//     return result.recordsets;
//   })
//   .then(data => {
//     data[0].map(d => {
//       console.log(d.author);
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });

// sql.on('error', err => {
//   console.log(err);
// });

new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    return pool.query`select author from Comments (NOLOCK) where dirty = 'False' and json_metadata LIKE('%"malaysia"%') and datediff(day, created, GETDATE()) between 0 and 1`;
  })
  .then(result => {
    console.dir(result);
  })
  .catch(err => {
    console.log('ERR', err);
    // ... error checks
  });
