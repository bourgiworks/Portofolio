const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const multer = require('multer');
const path =require('path');
const check_auth =require('../middleware/check_auth');

// Submit an article
const storage = multer.diskStorage({
    destination:'./uploads/image/',
    finename:(req, file, cb)=>{
        return cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const upload = multer({
    storage:storage
})
router.post('/PostArticle', check_auth, upload.single('image'), (req, res) => {
        
    var createPost = new Article ({
    topic: req.body.topic,
    content: req.body.content,
    image:req.file.path.replace(/\\/g, "/") 
    });
    createPost.save().then((post)=>{
       res.send(post) 
       console.log(post)
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
 *     Article:
 *       type: object
 *       required:
 *         - topic
 *         - content
 *         - image
 *         
 *       properties:
 *         
 *         topic:
 *           type: string
 *         
 *         content:
 *           type: string
 *           
 *         image:
 *           type: string
 *           format: binary
 *           
 *         
 *       
 */
/**
  * @swagger
  * tags:
  *   name:  Article
  *   description: adding article on blog
  */
 /**
 * @swagger
 * /api/PostArticle:
 *   post:
 *     summary: Create a article
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [ Article]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article posted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       500:
 *         description: Some server error
 */

//Get all articles
router.get('/getAllArticles', async (req,res) => {
    const post = await Article.find()
    res.json(post)

});
/**
 * @swagger
 * /api/getAllArticles:
 *   get:
 *     summary: return list of all Article
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: The list of Article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */

//get specific post
router.get('/GetOneArticle/:postId',async(req, res) => {
    try {
   const oneArt= await Article.findById(req.params.postId)
   res.json(oneArt)
    }
    catch (err) {
        res.json(err);
    }
})

   /**
 * @swagger
 * /api/GetOneArticle/{id}:
 *   get:
 *     summary: Article blog by id
 *     tags: [Article]
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
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: The book was not found
 */

   // delete specific post

router.delete ('/DeleteArticle/:postId',check_auth, async (req,res) =>{
    const post = await Article.deleteOne({_id: req.params.postId});
    res.json({message : " Post Deleted"});

});
/**
 * @swagger
 * /api/DeleteArticle/{id}:
 *   delete:
 *     summary: remove article
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 * 
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
 //Update Post
router.put('/UpdateArticle/:postId',check_auth, async(req,res) =>{
    const post = await Article.updateOne({_id:req.params.postId}, {$set: {topic: req.body.topic , content: req.body.content}});
    res.json({message : "Article Updated"});
    
});
/**
 * @swagger
 * /api/UpdateArticle/{id}:
 *  put:
 *    summary: Update article
 *    security:
 *      - ApiKeyAuth: []
 *    tags: [Article]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Article'
 *    responses:
 *      200:
 *        description: The blog was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Article'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened
 */


  
  


module.exports = router