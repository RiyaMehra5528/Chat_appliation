const Sequelize = require("sequelize");

const sequelize = new Sequelize(
   'db_sdirect',
   'sdirect',
   'Sm@rtPu92023',
    {
      host: '192.168.0.2',
      dialect: 'mysql'
    }
  );

const db=sequelize;
module.exports=db;