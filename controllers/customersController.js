const Customer = require("../models/customerSchema")

//adding new customer
const createCustomer = async (req,res) => {
    const newCustomer = new Customer({
        name: req.body.name,
        hometown: req.body.hometown,
        email: req.body.email,
        occupation: req.body.occupation
    });

    await newCustomer.save()
    res.status(201).json(newCustomer);
}
//get all customers
const getAllCustomers = async (req,res) => {
    const customers = await Customer.find()
    res.json(customers)
}
//get a trainee
const getSingleCustomer = async (req,res) => {
    const customer = await Customer.findById(req.params._id)
    res.json(customer)
}
//update a customer
const updateCustomer =async (req, res) =>{
    const foundCustomer = await Customer.findById(req.params._id)
    if (foundCustomer) {
        (foundCustomer.name = req.body.name),
        (foundCustomer.hometown = req.body.hometown),
        (foundCustomer.email = req.body.email),
        (foundCustomer.occupation = req.body.occupation)
        
        const updatedCustomer = await foundCustomer.save()
        res.json({updatedCustomer})
    }
}

// delete a customer
const deleteCustomer = async (req,res) => {
    const foundCustomer = await Customer.findById(req.params._id)
    if (foundCustomer) {
        foundCustomer.remove()
        res.json((`msg: ${foundCustomer.name} removed`))
    } else {
        res.status(404).json({error: "Customer not found"})
    }
}

module.exports = {createCustomer, getAllCustomers, getSingleCustomer, updateCustomer, deleteCustomer };