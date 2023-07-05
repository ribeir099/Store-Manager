const express = require('express');
const { salesProductsController, salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesProductsController.create);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);

module.exports = router;