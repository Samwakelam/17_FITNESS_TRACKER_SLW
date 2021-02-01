// initWorkout - initialised at bottom of this page. 
async function initWorkout() {
  // calling api.js const API = {...}
  const lastWorkout = await API.getLastWorkout();
  // console.log("workout.js, Last workout:", lastWorkout);

  if (lastWorkout) {
    // calling htmlRoutes with query - 
    // this is the getElementByID equivelent, getting element from html. 
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    const workoutSummary = {
      date: formatDate(lastWorkout.date),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      // rest or spread? 
      ...tallyExercises(lastWorkout.exercises)
    };
    // console.log('workout.js, init workout function, workoutsummary =',workoutSummary);
    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}

// tallyExercises - called from initWorkout 
// passed in lastWorkout.exercises
function tallyExercises(exercises) {
  // console.log('workout.js, tallyExersizes function, exercises =', exercises);
  const tallied = exercises.reduce((acc, curr) => {
    // console.log('workout.js, tallyExersizes function, acc =', acc);
    // console.log('workout.js, tallyExersizes function, curr =', curr);
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weights;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

//  formatDate - called from 
function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

// renderWorkoutSummary - called from initWorkout
// summary data passed in - work out summary object
function renderWorkoutSummary(summary) {
  // console.log('workout.js, render workout summary, summary =',summary);
  const container = document.querySelector(".workout-stats");

  let workoutKeyMap;
  if(summary.totalWeight === NaN){

    workoutKeyMap = {
      date: "Date",
      totalDuration: "Total Workout Duration",
      numExercises: "Exercises Performed",
      totalSets: "Total Sets Performed",
      totalReps: "Total Reps Performed",
      totalDistance: "Total Distance Covered"
    };

  } else {

     workoutKeyMap = {
      date: "Date",
      totalDuration: "Total Workout Duration",
      numExercises: "Exercises Performed",
      totalWeight: "Total Weight Lifted",
      totalSets: "Total Sets Performed",
      totalReps: "Total Reps Performed",
      totalDistance: "Total Distance Covered"
    };
    
  }


  // get the keys in the summary object
  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

//  renderNoWorkoutText - called from 
function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}


initWorkout();
