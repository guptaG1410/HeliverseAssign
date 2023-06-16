# Quiz Application

This is a quiz application that allows users to create and participate in timed quizzes. It provides a RESTful API for creating and retrieving quizzes.

## Features

- Create a quiz by sending a POST request to the API with question, options, rightAnswer, startDate, and endDate fields.
- Retrieve the active quiz (the quiz that is currently within its start and end time) with a GET request to `/quizzes/active`.
- Retrieve the result of a quiz by its ID, 5 minutes after the end time, using a GET request to `/quizzes/:id/result`.
- Retrieve all quizzes with a GET request to `/quizzes/all`.

## Requirements

- Node.js and npm installed.
- MongoDB or any other database of your choice.

## Installation

1. Clone the repository: `git clone <repository_url>`
2. Install the dependencies: `npm install`
3. Set up your database and update the connection details.
4. Start the application: `npm start`

## API Endpoints

- `POST /quizzes`: Create a new quiz.
- `GET /quizzes/active`: Retrieve the active quiz.
- `GET /quizzes/:id/result`: Retrieve the result of a quiz by its ID.
- `GET /quizzes/all`: Retrieve all quizzes.

## Error Handling

The API implements error handling for all endpoints and returns appropriate error responses with relevant status codes and error messages.

## Status Field

Each quiz has a status field that indicates its state. The status can be one of the following values:
- `inactive`: before the start time of the quiz
- `active`: during the time when the quiz is available
- `finished`: after the end time of the quiz

The status field is automatically updated by the application based on the start and end time of each quiz.


