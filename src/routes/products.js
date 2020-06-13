import  {Router} from "express";
const router = Router(); //es lo que se importara, y utilizara

import { createProduct, getProducts, deleteProduct } from "../controllers/product.controller";

// /api/products
router.post("/", createProduct);
router.get("/", getProducts);
router.delete("/:sku", deleteProduct);

export default router;