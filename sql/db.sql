CREATE TABLE IF NOT EXISTS products(
    sku INTEGER PRIMARY KEY,
    name text NOT NULL,
    description text,
    stock INTEGER
);

-- crear Bodega, pedido (orden de compra)

INSERT INTO products (sku, name, description, stock)
    VALUES (1004, 'Fideos Corbata 400 grs', 'bolsa de 400 grs', 0),
    VALUES (1006, 'Fideos Espirales 400 grs', 'bolsa de 400 grs', 0),
    VALUES (1008, 'Fideos Spaghetti 5 400 grs', 'bolsa de 400 grs', 0);
