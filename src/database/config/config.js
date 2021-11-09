module.exports = {
    "development": {
      "username": process.env.DB_USER || "root",
      "password": process.env.DB_PASSWORD || "",
      "database": process.env.DB_NAME || "database_development",
      "host": process.env.DB_HOST || "localhost",
      "port": process.env.DB_PORT || "3306",
      "dialect": "mysql"
    },
    "test": {
      "username": process.env.DB_USER || "root",
      "password": process.env.DB_PASSWORD || "",
      "database": process.env.DB_NAME || "database_test",
      "host": process.env.DB_HOST || "localhost",
      "port": process.env.DB_PORT || "3306",
      "dialect": "mysql"
    },
    "production": {
        "username": process.env.DB_USER || "root",
        "password": process.env.DB_PASSWORD || "",
        "database": process.env.DB_NAME || "database_production",
        "host": process.env.DB_HOST || "localhost",
        "port": process.env.DB_PORT || "3306",
        "dialect": "mysql"
      },
  }