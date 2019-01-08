myCity();

function myCity()
{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getRandomFood);
  }else{
    console.log("Geolocation is not supported by this browser");
  }
}

function getRandomFood(position)
{
  let submit = document.getElementById("submit");

  submit.addEventListener("click", () => {
    let food = document.getElementById("food").value;
    let distance = document.getElementById('distance').value;
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    axios.get("https://api.yelp.com/v3/businesses/search", {
      headers: {
        "Authorization": 'Bearer ' + config.FOOD,
      },
      params: {
        latitude: lat,
        longitude: lng,
        categories: food,
        radius: getDistance(distance),
        term: "restaurants",
        limit: 50
      }
    })
    .then((response) => {
      let name = document.getElementById("name");
      let picture = document.getElementById("pic");
      let link = document.getElementById("yelp");
      let length = response.data.businesses.length;
      let randomNum = Math.floor(Math.random() * length);
      let randomFood = response.data.businesses[randomNum];

      picture.src = randomFood.image_url;
      name.textContent = randomFood.name;
      yelp.style.display = "block";
      yelp.href = randomFood.url;
    })
    .catch((error) => {console.log(error);});
  });
}

function getDistance(num){
  if(num < 1){
    num = 1;
  }else if(num > 25){
    num = 25;
  }

  return Math.floor(num * 1609.34);
}
