import * as sql from 'mssql';

//Function to connect to database and execute query
export const executeQuery = function(res, query) {
  const config = {
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    server: process.env.HOSTNAME,
    port: process.env.PORTNO,
    database: process.env.DATABASE
  };

  new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
      console.log('connected');
      return pool.request().query(query);
    })
    .then(result => {
      const rows = result.recordset;
      res.json(rows);
      sql.close();
    })
    .catch(err => {
      console.log(
        `${process.env.HOSTNAME} ${process.env.PORT} ${process.env.USERNAME} ${
          process.env.PASSWORD
        } ${process.env.DATABASE} `
      );
      console.log(err);
      res.status(400).json({ err: `${err}` });
    });
};
