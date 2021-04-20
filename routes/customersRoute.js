const express = require("express")
const{ createCustomer, getAllCustomers, getSingleCustomer, updateCustomer, deleteCustomer } = require("../controllers/customersController")
//const protect = require("../middlewares/authMiddleware")
const router = express.Router()

router.route("/").post(createCustomer).get(getAllCustomers)
router.route("/:_id").get(getSingleCustomer).put(updateCustomer).delete(deleteCustomer)

module.exports = router;
