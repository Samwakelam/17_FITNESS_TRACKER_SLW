const API = {
  // async inline function getLastWorkout
  // called from workout.js init workout
  async getLastWorkout() {
    
    let result;
    try {
      // GET request 
      result = await fetch('/api/workouts');
      // console.log('api.js, getLastWorkout, result =', result); 
    } catch (err) {
      // console.log('api.js getLastWorkout error =', err);
    }
    const json = await result.json();
    // console.log('api.js, getlastWorkout GET json =', json);
    // console.log('api.js, getlastWorkout GET json[json.length - 1] =', json[json.length - 1]);
    // returns json variable array index one less than the length
    return json[json.length - 1];
  },

  // async inline function addExersise
  // add a new exersize to an existing work out session.
  // called from 'add exercise page' > 'add exercise button'. 
  async addExercise(data) {
    // console.log('api.js addExercise function called =', data);

    const id = location.search.split('=')[1];

    // PUT request - data passed in from ...
    const res = await fetch('/api/workouts/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    // console.log('json PUT api.js =', json);

    return json;
  },

  // async inline function createWorkout
  // this is not data = empty object, but default
  async createWorkout(data = {}) {
    // console.log('api.js createWorkout function called', data);
    // POST request - data passed in from ...
    const res = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    // console.log('json POST api.js =', json);
    return json;
  },

  // async inline function getWorkoutsInRange
  // called from stats.js 
  // get all workout data from back-end
  async getWorkoutsInRange() {
    // console.log('api.js getWorkoutsInRange function called');
    // GET request
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();
    // console.log('json GET range api.js =', json);
    return json;
  },
};
