const express = require('express');
const { body, validationResult } = require('express-validator');
const { handleInputErrors: errMiddleware } = require('./modules/middleware');
const { getProducts: getAllProducts, getOneProduct, updateProduct, creatProduct, deletProduct } = require('./handlers/product');

const router = express.Router();
/** 
 * Product
**/
router.get('/product', getAllProducts, getAllProducts);
router.get('/product/:id', getOneProduct);
router.put('/product/:id', body('name').optional(), errMiddleware, updateProduct);
router.post('/product', body('name').exists().isString(), errMiddleware, creatProduct);
router.delete('/product/:id', deletProduct);
/** 
 * Update
**/
router.get('/update', (req, res) => {

});
router.get('/update/:id', (req, res) => {

});
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('varsion').optional(),
    body('asset').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPING', 'DEPRECATED']),
    errMiddleware,
    (req, res) => {
    });
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('varsion').exists().isString(),
    body('asset').exists().isString(),
    errMiddleware,
    (req, res) => {

    });
router.delete('/update/:id', (req, res) => {

});
/** 
 * UpdatebPoint
**/
router.get('/updatepoint', (req, res) => {

});
router.get('/updatepoint/:id', (req, res) => {

});
router.put('/updatepoint/:id', body('name').optional().isString(), body('description').optional(), errMiddleware, (req, res) => {

});
router.post('/updatepoint', body('name').exists().isString(), body('description').exists().isString(), body('updateId').exists().isString(), errMiddleware, (req, res) => {

});
router.delete('/updatepoint/:id', (req, res) => {

});

module.exports = router