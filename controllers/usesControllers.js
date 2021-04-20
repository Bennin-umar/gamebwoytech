const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const joi = require("joi");
const { validateAddUser} = require("../validations/userValidations")

const addUser = async(req, res) => {
    //validate a user
    const { error } = validateAddUser.validate(req.body);
    if (error) return res.status(402).send(error.details[0].message);

    //compexity level and hashing using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //find user from DB
    const userEmai = await User.findOne({ email: req.body.email });
    if (userEmail) return res.status(403).send("email already exist");

    const newUSer = new User({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword
    });
    await newUSer.save(),
    res.status(201).json(newUSer)
}
const userLogin = async (req,res) => {

    // user verification
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(404)("account does not exist");

    //pasword verification
    const varifiedPassword = await bcrypt.compare(req.body.password,user.password)
    if(!varifiedPassword) return res.status(404).send("invaliid email or password")

    //assign a token
    const token_id = jwt.sign({_id:user._id}, process.env.SECRET_CODE, {expiresIn: "30"})

    res.headers("authorization", token_id).send(token_id)

}
module.exports = { addUser, userLogin }