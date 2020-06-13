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

export async function deleteProduct(req, res){
    const { sku } = req.params;
    try{
        const data = await Product.destroy({
            where:{
                sku
            }
        });
        res.json({
            message: "Product deleted succesfully"
        })
    } catch(e) {
        console.log(e)
        res.status(400).json({
            message: "Something goes wrong",
            data: {}
        });
    }
}