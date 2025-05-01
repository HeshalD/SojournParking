
const express = require('express');
const router = express.Router();

const Complaint = require('../Models/ComplaintModel');
const ComplaintController = require('../Controllers/ComplaintController');

router.get('/', ComplaintController.getAllComplaint);
router.post('/', ComplaintController.DisComplaint);
router.get('/:id', ComplaintController.getById);
router.put('/:id', ComplaintController.updateComplaint);
router.delete('/:id', ComplaintController.deleteComplaint);

module.exports = router;
