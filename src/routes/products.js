import  {Router} from "express";
const router = Router(); //es lo que se importara, y utilizara

import { createProduct, getProducts, deleteProduct, getG } from "../controllers/product.controller";

// /api/products
router.post("/", createProduct);
// router.get("/", getProducts);
router.delete("/:sku", deleteProduct);
router.get("/", getG);

export default router;