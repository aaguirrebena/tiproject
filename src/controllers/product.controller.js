import Product from '../models/product';

export async function getProducts(req, res) {
    try{
        const products = await Product.findAll();
        res.json({
            Bodega: products
        });
    } catch(e){
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
        res.status(400).json({
            message: "Something goes wrong",
            data: {}
        });
    }
}

export function deleteProduct(req, res){
    Product.destroy({where: req.params})
    .then(result => {
        if (result){
            res.status(200).json({msg: "Product deleted"})
        }
        else{
            res.status(404).json({msg: "Not Found"})
        }
    })
}