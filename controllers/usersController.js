const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const { validateAddUser } = require("../validations/userValidations")
const jwt = require("jsonwebtoken")

const addUser = async (req,res) =>{
    //validate a user
    const { error } = validateAddUser.validate(req.body)
    if(error) return res.status(402).send(error.details[0].message);

    //complexity level & hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //find user from db
    const userEmail = await User.findOne({ email: req.body.email })
    if(userEmail) return res.status(403).send("email already exist")

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    await newUser.save(),
    res.status(201).json(newUser)
}

const userLogin = async (req,res) => {

    // user verification
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(404).send("account is not there");

    //password verification
    const verifiedPassword = await bcrypt.compare(req.body.password,user.password)
    if(!verifiedPassword) return res.status(404).send("invalid email or password")

    //assign a token
    const token_id = jwt.sign({_id:user._id}, process.env.SECRET_CODE, {expiresIn: "30d"})

    res.headers("authorization", token_id).send(token_id)
};

module.exports = { addUser, userLogin}