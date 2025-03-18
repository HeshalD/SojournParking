const express = require("express");
const router = express.Router();
//Insert Model
 const ServiceProvider = require("../Models/ServiceProviderModel");
 //Insert Controller
 const ServiceProviderControllers = require("../Controllers/ServiceProviderControllers");

router.get("/",ServiceProviderControllers.getAllServiceProviders);
router.post("/",ServiceProviderControllers.addServiceProviders);
router.get("/:id",ServiceProviderControllers.getById);
router.put("/:id",ServiceProviderControllers.updateServiceProvider);
router.delete("/:id",ServiceProviderControllers.deleteServiceProvider);
//export
module.exports = router; 