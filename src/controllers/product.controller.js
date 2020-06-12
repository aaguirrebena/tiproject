import Product from '../models/product';

export async function getProducts(req, res) {
    try{
        const products = await Product.findAll();
        res.json({
            Bodega: products
        });
    } catch(e){
        console.log(e)
        res.status(400).json({
            message: "Something goes wrong",
            data: {}
        });

    }
};

export async function createProduct(req, res){
    console.log(req.body);
    const {sku, name, description, stock} = req.body;
    try {
        let newProduct = await Product.create({
            sku,
            name,
            description,
            stock
        }, {
            fields: ["sku", "name", "description", "stock"]
        }); // Es asincrono, agrego el await para eso
        if (newProduct){
            res.json({
                message: "Product created successfully",
                data: newProduct
            })
        }
    } catch(e) {
        console.log(e)
        res.status(400).json({
            message: "Something goes wrong",
            data: {}
        });
    }
}
