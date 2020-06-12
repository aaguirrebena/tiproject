import  {Router} from "express";
const router = Router(); //es lo que se importara, y utilizara

import { createProduct, getProducts } from "../controllers/product.controller";

// /api/products
router.post(`/`, createProduct);
router.get(`/`, getProducts);

export default router;