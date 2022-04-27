const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

const check_auth =require('../middleware/check_auth');

// Submit a Comment

router.post('/PostComment',check_auth,  (req, res) => {
        
    var createComment = new Comment ({
    name: req.body.name,
    comment: req.body.comment,
    like: req.body.like
    });
    createComment.save().then((post)=>{
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
 *     Comment:
 *       type: object
 *       required:
 *         - name
 *         - comment
 *         - like
 *         
 *       properties:
 *         
 *         name:
 *           type: string
 *         
 *         comment:
 *           type: string
 *           
 *         like:
 *           type: number
 *           
 *           
 *         
 *       
 */
/**
  * @swagger
  * tags:
  *   name:  Comment
  *   description: adding comment on article
  */
 /**
 * @swagger
 * /api/PostComment:
 *   post:
 *     summary: Add a comment
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [ Article]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: comment posted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 */

//Get all comment
router.get('/getAllComment', async (req,res) => {
    const post = await Comment.find()
    res.json(post)

});
/**
 * @swagger
 * /api/getAllComment:
 *   get:
 *     summary: return list of all Article
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: The list of Article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */

//get specific comment
router.get('/GetOneComment/:postId', async (req,res)=>{
    const post = await Comment.findById(req.params.postId);
    res.json(post)
       
   });
    /**
 * @swagger
 * /api/GetOneComment/{id}:
 *   get:
 *     summary: Article blog by id
 *     tags: [Comment]
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
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The book was not found
 */

   // delete specific commemt

router.delete ('/DeleteComment/:postId',check_auth, async (req,res) =>{
    const post = await Comment.deleteOne({_id: req.params.postId});
    res.json({message : " Comment Deleted"});

});
/**
 * @swagger
 * /api/DeleteComment/{id}:
 *   delete:
 *     summary: remove Comment
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 * 
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */

module.exports = router