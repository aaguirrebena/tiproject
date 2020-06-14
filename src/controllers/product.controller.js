import Product from '../models/product';

function convertir(dic){
    var lista =[];
    for (var el of Object.keys(dic)){
        if (dic[el]!==0){
            lista.push({"sku": el, "stock": dic[el]})}
    }
    //console.log("LISTA ES: ",lista);
    return lista;
}

function hashh(texto){
    var crypto    = require('crypto');
    var text      = texto; //accion + parámetro
    var secret    = 'NKYdTX@YXJtxwWi';
    var algorithm = 'sha1';
    var hash, hmac;
    hmac = crypto.createHmac(algorithm, secret);
    hmac.update(text);
    hash = hmac.digest('base64');
    return hash;
}

async function obtener_almacenes(){
    var hash = hashh('GET');
    var stock= {1004:0,1006:0,1008:0,1010:0,1009:0,1014:0,1016:0,1017:0,1020:0,1023:0,1025:0,1027:0,1035:0}
    var url = 'http://integracion-2020-dev.herokuapp.com/bodega/almacenes';
    var headers = {'Content-Type': 'application/json', 'Authorization': 'INTEGRACION grupo15:' + hash};
    
    var fetch = require('node-fetch');
    const respuesta = await fetch(url, {
        method: 'GET',
        headers: headers
      }).then(
        response => response.json()
        );
    for (const elemento of respuesta) {
        hash = hashh('GET'+ elemento["_id"]);
        url = 'http://integracion-2020-dev.herokuapp.com/bodega/skusWithStock?almacenId='+elemento["_id"]; 
        headers = { 'Content-Type': 'application/json', 'Authorization': 'INTEGRACION grupo15:'+hash};
        const respuesta2 = await fetch(url, {
            method: 'GET',
            headers: headers
          }).then(
             response2 => response2.json()
            ).then((data) => {
                for (const producto of data) {
                    stock[producto['_id']] += producto['total'];
                        }
                })
        }
    return convertir(stock);
}

export async function getG(req, res){
    const pro = await obtener_almacenes();
    res.json(pro);
}

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
}

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