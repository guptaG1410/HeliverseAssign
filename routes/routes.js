const express = require('express');
const endPoint = require('../controllers/endpoints');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Implemented rate-limiting to prevent abuse of the API using 'express-rate-limit'.
const limiter = rateLimit({
  windowMs: 5 * 60 * 100, //5 minutes
  max: 10, //limit each IP or user to 10 requests per windowMs
});

// to create a new Quiz
router.post('/quizzes', limiter, endPoint.createQuiz);

// to retrieve the active quizzes
router.get('/quizzes/active', limiter, endPoint.activeQuizzes);

// to retrieve the result of a quiz by its ID.
router.get('/quizzes/:id/result', limiter, endPoint.resultById);

// to retrieve all quizzes
router.get('/quizzes/all', limiter, endPoint.getAllQuizzes);

module.exports = router;
