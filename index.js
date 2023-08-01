var WhatapAgent = require('whatap').NodeAgent;
const express = require('express');
const app = express();
const port = 3000;
const db = require('./dbConnect');

app.use(express.json())

// GET: getProducts
app.get('/products', async (req, res) => {
    try {
        const connection = await db;
        const [results] = await connection.query('SELECT * FROM whatap_products');

        res.json({success: true, products: results});
    } catch (e) {
        console.error(e);
        res.status(500).json({success: false, message: 'An error occurred while searching.'});
    }
});

// GET: getProduct
app.get('/products/:id', async (req, res) => {
    try {
        const connection = await db;
        const [results] = await connection.query('SELECT * FROM whatap_products WHERE id = ?', [req.params.id]);

        res.json({success: true, product: results[0]});
    } catch (e) {
        console.error(e);
        res.status(500).json({success: false,message: 'An error occurred while searching.'});
    }
});

// POST: addProduct
app.post('/products', async (req, res) => {
    try {
        const date = new Date().toISOString();
        let product = { name: req.body.name, price: Number(req.body.price), description: req.body.description, created_at: date, updated_at: date};
        const connection = await db;
        const [results] = await connection.query('INSERT INTO whatap_products SET ?', product);

        product.id = results.insertId;

        // res.json({ id: results.insertId, ...product });
        res.json({success: true, product });
    } catch (e) {
        console.error(e);
        res.status(500).json({success: false, message: 'An error occurred while inserting.' });
    }
});

// PUT: updateProduct
app.put('/products/:id', async (req, res) => {
    try {
        if(!req.body || (req.body && Object.keys(req.body).length === 0))
            res.json({success: false, message: 'Items to be updated have not been entered.'});

        const connection = await db;
        const [existingProduct] = await connection.query('SELECT * FROM whatap_products WHERE id = ?', [req.params.id]);
        const date = new Date().toISOString();

        if (existingProduct.length > 0) {
            const { name, price, description } = req.body;
            const product = {
                ...(name && { name }),
                ...(price && { price }),
                ...(description && { description }),
                updated_at: date
            };

            await connection.query('UPDATE whatap_products SET ? WHERE id = ?', [product, req.params.id]);

            res.json({success: true, message: 'Product has been updated.', ...product });
        } else {
            res.status(404).json({success: false, message: 'Product not found.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({success: false, message: 'An error occurred while updating.' });
    }
});

// DELETE: deleteProduct
app.delete('/products/:id', async (req, res) => {
    try {
        const connection = await db;
        const [results] = await connection.query('SELECT * FROM whatap_products WHERE id = ?', [req.params.id]);

        if (results.length > 0) {
            await connection.query('DELETE FROM whatap_products WHERE id = ?', [req.params.id]);
            res.json({success: true, message: 'Product has been deleted.' });
        } else {
            res.status(404).json({success: false, message: 'Product not found.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({success: false, message: 'An error occurred while deleting.'});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
