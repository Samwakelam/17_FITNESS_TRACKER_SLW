
async function init() {
  // console.log('index.js, location.search =', location.search.split("=")[1])
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    // console.log('index.js function init workout variable =', workout);
    if (workout) {
      // location.search = queryString;
      // queryString == Specifies the search part of the URL
      location.search = "?id=" + workout._id;
    } else {
      // gets the continue work out button from index.html 
      // and adds style class d-none (display none)
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

init();
