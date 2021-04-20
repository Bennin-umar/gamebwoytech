const Technician = require("../models/technicianSchema");



// ADD A TECHNICIAN
const createTechnician = async (req, res) => {
  const newTechnician = new Technician({
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    dob: req.body.dob,
    city:req.body.city
  });

  await newTechnician.save();
  res.status(202).json(newTechnician);
};

//GET ALL TechnicianS

const getAllTechnicians = async (req, res) => {
  const Technicians = await Technician.find();
  res.json(Technicians);
};

//GET A Technician
const getSingleTechnician = async (req, res) => {
  const Technician = await Technician.findById(req.params._id);
  res.json(Technician);
};

// UPDATE A Technician

const updateTechnician = async (req, res) => {
  const foundTechnician = await Technician.findById(req.params._id);

  //destructuring
  // const {name, position,email,dob}=req.body

  if (foundTechnician) {
    foundTechnician.name = req.name.name;
    foundTechnician.position = req.name.position;
    foundTechnician.email = req.name.email;
    foundTechnician.dob = req.name.dob;
    foundTechnician.req.body.city

    const updatedTechnician = await foundTechnician.save();
    res.json({ updatedTechnician });
  }
};

//DELETE A Technician

const deleteTechnician = async (req, res) => {
  const foundTechnician = await Technician.findById(req.params._id)
  if(foundTechnician){
    foundTechnician.remove()
    res.json({ msg: `${foundTechnician.name} removed` })
  }
  else {
    res.status(404).json({error:"Technician not found"})
  }
  }
  


module.exports = {
  createTechnician,
  getAllTechnicians,
  getSingleTechnician,
  updateTechnician,
  deleteTechnician
};
