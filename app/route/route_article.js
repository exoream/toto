const ArticleController = require("../../feature/article/controller/controller");
const ArticleService = require("../../feature/article/service/service");
const ArticleRepository = require("../../feature/article/repository/repository");

const db = require("../database/mysql")
const { jwtMiddleware } = require("../../utils/jwt/jwt");
const upload = require("../../utils/storage/multer");
const express = require('express');

const router = express.Router();

const articleRepository = new ArticleRepository(db);
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

// Admin-specific routes
router.post('/articles', jwtMiddleware, upload.single('image'), articleController.createArticle.bind(articleController));
router.put('/articles/:id', jwtMiddleware, upload.single('image'), articleController.updateArticleById.bind(articleController));
router.delete('/articles/:id', jwtMiddleware, articleController.deleteArticleById.bind(articleController));

// User or Admin
router.get('/articles', jwtMiddleware, articleController.getAllArticle.bind(articleController));
router.get('/articles/:id', jwtMiddleware, articleController.getArticleById.bind(articleController));

module.exports = router;