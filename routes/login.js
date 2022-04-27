const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {addUserValidation} = require('../validation/User Validation/userVal')
const check_auth =require('../middleware/check_auth');

const User = require('../models/Login')
//Insert a User
router.post('/signUp',addUserValidation, (req, res, next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(200).json({
                message: "Mail Exist"
            })
        }
        else{
            bcrypt.hash(req.body.password, 10, (err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user = new User ({
        
                        userName: req.body.userName,
                        email: req.body.email,
                        role: req.body.role,
                        password: hash
                });
                user.save()
                .then(result =>{
                    res.status(200).json({
                        result:result,
                        message: "User Created"
                    })
                })
                .catch(err=>{
                    console.log(err);
                    res.status(401).json({
                        error:err
                    });
                })
            }
            
            });
        }
    })
    
   

});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 *   schemas:
 *     SignUp:
 *       type: object
 *       required:
 *         - userName
 *         - email
 *         - password
 *         - role
 *       properties:
 *         
 *         userName:
 *           type: string
 *           description: name must be 6 characters long
 *         email:
 *           type: string
 *           description: valid email 
 *         password:
 *           type: string
 *         role :
 *           type: number
 *       
 */

/**
 * @swagger
 * /api/signUp:
 *   post:
 *     summary: Create a account
 *     tags: [ Signup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       200:
 *         description: acccount created 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUp'
 *       500:
 *         description: Some server error
 */




router.post('/login',(req, res, next)=>{
User.find({email: req.body.email})
.exec()
.then(user =>{
    if(user.length < 1){
        return res.status(401).json({
            message :"User not Registered"
        })
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
    if(err){
        return res.status(401).json({
            message:" Invalid Password"
        })
    }
    if(result){
       const token = jwt.sign({
            userName: user[0].userName,
            email: user[0].email
        },  
        process.env.JWT_KEY,{
            expiresIn:"1h"
        })
        
        
        return res.status(200).json({
            message: "Sucessful logged in",
            token:token
        })
    }  
    res.status(401).json({
        message:" Login fail"
    })  
    })
})
.catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err,
        message: "not found"
    });
});
});
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: valid email 
 *         password:
 *           type: string
 *       example:
 *         email: munyaarmel61@gmail.com
 *         password: Kigali@1
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: login
 *     tags: [User ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login '
 *     responses:
 *       200:
 *         description: go to login page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 */
// delete specific User

router.delete ('/DeleteUser/:postId', async (req,res) =>{
    const user = await User.deleteOne({_id: req.params.postId});

    res.status(200).json({message : " User Deleted"});

});
/**
 * @swagger
 * /api/DeleteUser/{id}:
 *   delete:
 *     summary: remove user
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: user was deleted
 *       404:
 *         description: user not found
 */
//get all Users
router.get('/getAllUsers', async (req,res) => {
    const user = await User.find()
    res.status(200).json(user)

});
/**
 * @swagger
 * /api/getAllUsers:
 *   get:
 *     summary: return list of all user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/signUp'
 */
//get single user
router.get('/getOneUser/:postId', async (req,res)=>{
    const user = await User.findById({_id: req.params.postId});
    res.status(200).json({_id:user.id,userName:user.userName,email:user.email,role:user.role })
       
   });
   /**
 * @swagger
 * /api/getOneUser/{id}:
 *   get:
 *     summary: Article blog by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: Tthi is discription of blog by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/signUp'
 *       404:
 *         description: The book was not found
 */



module.exports = router;