const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/category.controller.js');

router.post('/create', categoryController.createCategory);
router.get('/parents', categoryController.getParentCategories);
router.get('/tree', categoryController.getCategoryTree);
router.get('/', categoryController.getCategories);
router.put('/:id', categoryController.editCategory);
router.get('/:id', categoryController.getCategoryById);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
