const Quiz = require('../model/quiz');
const moment = require('moment');

exports.createQuiz = async (req, res) => {
  try {
    const { question, options, rightAnswer, startDate, endDate } = req.body;
    const quiz = new Quiz({
      question,
      options,
      rightAnswer,
      startDate,
      endDate,
      status: 'inactive',
    });

    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully !!!' });
  } catch (err) {
    res.status(500).json({ error: `Failed to create a quiz : ${err}` });
  }
};

exports.activeQuizzes = async (req, res) => {
  try {
    const now = moment();
    const quizzes = await Quiz.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
      status: 'active',
    });
    if (quizzes) res.send(quizzes);
    else res.status(404).json({ message: 'No active quizzes found :(' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve active quizzes' });
  }
};

exports.resultById = async (req, res) => {
  try {
    const id = req.params.id;
    const quiz = await Quiz.findById(id);
    if (quiz && quiz.status === 'finished')
      res.status(200).json({ rightAnswer: quiz.rightAnswer });
    else res.status(404).json({ message: 'Quiz result not found :(' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz result.' });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrives all quizzes' });
  }
};

// Update quiz status automatically
setInterval(async () => {
  const now = moment();
  await Quiz.updateMany(
    {
      startDate: { $lte: now },
      endDate: { $gte: now },
      status: { $ne: 'active' },
    },
    { $set: { status: 'active' } }
  );
}, 3000); // Update every 3 seconds.

setInterval(async () => {
  const now = moment();
  await Quiz.updateMany(
    { endate: { $lt: now }, status: { $ne: 'finished' } },
    { $set: { status: 'finished' } }
  );
}, 300000); //Update the status of quiz after 5 minutes of completion.
