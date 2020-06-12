import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const Product = sequelize.define("products", {
    sku: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT
    },
    description: {
        type: Sequelize.TEXT
    },
    stock: {
        type: Sequelize.INTEGER
    }
});

export default Product;