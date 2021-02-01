const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const db = require('../models/workoutModel');

const PORT = process.env.PORT;

const dbUrl = process.env.DATABASE;
const host = process.env.HOST;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://${host}/${dbUrl}`,
  options
)
.then(() => {
	app.listen(PORT, function () {
		console.log('Node server is running...');
		console.log('Listening on port:', PORT);
	});
})
.catch((err) => {
	console.log(err);
});

let workoutSeed = [
  {
    date: new Date().setDate(new Date().getDate()-10),
    exercises: [
      {
        type: "resistance",
        name: "Bicep Curl",
        duration: 20,
        weights: 100,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    date: new Date().setDate(new Date().getDate()-9),
    exercises: [
      {
        type: "resistance",
        name: "Lateral Pull",
        duration: 20,
        weights: 300,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    date: new Date().setDate(new Date().getDate()-8),
    exercises: [
      {
        type: "resistance",
        name: "Push Press",
        duration: 25,
        weights: 185,
        reps: 8,
        sets: 4
      }
    ]
  },
  {
    date: new Date().setDate(new Date().getDate()-7),
    exercises: [
      {
        type: "cardio",
        name: "Running",
        duration: 25,
        distance: 4
      }
    ]
  },
  {
    date: new Date().setDate(new Date().getDate()-6),
    exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weights: 285,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    date: new Date().setDate(new Date().getDate()-5),
    exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weights: 300,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 4)),
    exercises: [
      {
        type: "resistance",
        name: "Quad Press",
        duration: 30,
        weights: 300,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weights: 300,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    exercises: [
      {
        type: "resistance",
        name: "Military Press",
        duration: 20,
        weights: 300,
        reps: 10,
        sets: 4
      }
    ]
  }
];

db.deleteMany({})
  .then(() => db.insertMany(workoutSeed))
  .then(data => {
    // console.log(data + " records inserted!");
    // console.log(data.result + " records inserted!");
    // console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
