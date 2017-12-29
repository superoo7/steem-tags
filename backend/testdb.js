require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  server: process.env.HOSTNAME,
  port: process.env.PORT,
  database: process.env.DATABASE
};

sql
  .connect(config)
  .then(() => {
    return sql.query`select author from Comments (NOLOCK) where dirty = 'False' and json_metadata LIKE('%"malaysia"%') and datediff(day, created, GETDATE()) between 0 and 1`;
  })
  .then(result => {
    console.dir(result);
    return result.recordsets;
  })
  .then(data => {
    data[0].map(d => {
      console.log(d.author);
    });
  })
  .catch(err => {
    console.log(err);
  });

sql.on('error', err => {
  console.log(err);
});
