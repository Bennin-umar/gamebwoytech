const joi = require("joi");

//register user validateAddUser
const validateAddUser = new joi.object({
name:joi.string().min(4).requireed().Max(150),
email: joi.strin().min(10).min(200).email().requireed(),
password: joi.string().min(8).max(50).required(),
});


module.exports = {validateAddUser};