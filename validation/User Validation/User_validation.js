const joi= require('@hapi/joi');
const schema={
    user: joi.object({
        userName: joi.string().trim().uppercase().lowercase().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).pattern(new RegExp("^[0-9a-zA-Z]")).required(),
        role: joi.number().required()
    })
}
module.exports = schema;