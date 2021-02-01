const express = require('express');
const router = express.Router(); 
const Workout = require('../models/workoutModel');

// called from - getWorkoutsInRange api.js
// get all workout data from back-end
router.get('/workouts/range', async function(req , res){
  // console.log('apiRoutes GET /workouts/range req.body =', req.body);

  await Workout.aggregate([{
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      }
  }])
  .then((data) => {
    // console.log('apiRoutes.js, /workouts/range, GET data = ', data); 
    res.send(data); 
  })
  .catch((err) => {
    console.log({err});
  });
});

// called from - getLastWorkout api.js
router.get('/workouts', async function(req , res){
  // console.log('apiRoutes GET /workouts req.body =', req.body);

  await Workout.aggregate([{
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      }
    },
  ]).then((result) => {
    // console.log('apiRoutes.js, /workouts, GET result = ', result); 
    res.json(result);

  }).catch((err) => {
    console.log({err});
  });

});

// called from - createWorkout api.js
router.post('/workouts', async function(req , res){
  // console.log('apiRoutes POST /workouts req.body =', req.body);
  
  Workout.create(req.body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });

});

// called from - addExercise api.js
router.put('/workouts/:id', async function(req , res){
  // console.log('apiRoutes PUT /workouts/:id req.body =', req.body);
  // console.log('apiRoutes PUT /workouts/:id req.params =', req.params);
  
  Workout.findByIdAndUpdate(req.params.id, {
    $push : {
      exercises : req.body, 
    },
  }, { new : true }).then((workout) => {
    // console.log('apiRoutes.js, put /workouts/:id ', workout ); 
    res.json(workout);
  })
  .catch((err) => {
    console.log('apiRoutes.js, put /workouts/:id err =', err);
  });

});

module.exports = router; 