
const mongoose = require('mongoose'); 
const {Schema} = mongoose;

const WorkoutSchema = new Schema({
  date : {
    type : Date,
    default : Date.now
  },
  exercises: [{
    type: { type : String},
    name: {type : String},
    weights: {
      type : Number,
      min : 0, 
    }, 
    sets: {
      type : Number,
      min : 0, 
    }, 
    reps: {
      type : Number,
      min : 0, 
    },
    distance: {
      type : Number,
      min : 0, 
    },  
    duration: {
      type : Number,
      min : 0, 
    }, 
  },]
   
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout ;

// I want to be able to log multiple exercises in a workout on a given day. 
// I should also be able to track:
// name, type, weight, sets, reps, and duration of exercise. 
// If the exercise is a cardio exercise, 
// I should be able to track my distance traveled.