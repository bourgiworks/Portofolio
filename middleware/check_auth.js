
const jwt=require('jsonwebtoken');
const util =require('util');
const { verify } = jwt;

module.exports=async function(req,res,next){
    const token=req.header('auth-token')

    console.log("sdfd",token, process.env.JWT_KEY)
    if(!token) return res.status(400).send('access denied')
    
    try{
    const verified=await util.promisify(verify)(token, process.env.JWT_KEY);

 req.user=verified
 next()
}
catch (err){
    console.log(err)
 res.status(400).send('invalid token')
}
}