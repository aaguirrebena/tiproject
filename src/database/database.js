import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    "pocho", // database
    "pocho", // username
    "pocho", // password
    {
        host: "localhost",
        dialect: "postgres",
        define: {
            timestamps: false
        },
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false // quitar para ver operaciones por consola
    }
)