// Get HTML elements by their IDs or classes
let search = document.getElementById("search");
const ico = document.querySelector(".fa-solid");
let temp = document.querySelector(".temp-c");
let loc = document.querySelector(".loc");
let country = document.querySelector(".country");
let time = document.querySelector(".time");
let condition = document.querySelector(".condition");
let bg = document.querySelector(".bg");
let wind_speed = document.querySelector(".wind-speed");
let wind_dir = document.querySelector(".wind-direction");
let humidity = document.querySelector(".humidity");
let ico_img = document.querySelector(".ico-img");
let gust = document.querySelector(".gust");

// Function to fetch weather data
const fetchdata = () => {
  // WeatherAPI key and default location (New Delhi if no user input)
  const apiKey = "bc6cdf98ec47468598142603231609";
  const location = search.value || "New Delhi"; // Default to New Delhi if no user input
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {

      // GPT KA CODE
      // Variables Declaration
     
      const botn = document.querySelector(".bot-submit");
      let botrespo = document.querySelector(".bot-respo");
      
      let botfetch = () => {
        const userPrompt = document.querySelector(".chatbot-input").value
        console.log("User Prompt: ", userPrompt)
          const fetchurl = "/bot";
  
          // Example data to be sent in the POST request
          const postData = {
              prompt: userPrompt,
          };
  
          fetch(fetchurl, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json", // Set the content type to JSON
              },
              body: JSON.stringify(postData), // Convert the data to JSON format
          })
          .then(respo => respo.json())
          .then((data2) => {
              console.log(userPrompt);
              console.log("API Response: ", data2);
              botrespo.textContent = "Bot: " + data2.response;
          })
          .catch((error) => {
              console.error("Error:", error);
          });
      }

    
  
      botn.addEventListener("click", botfetch);





      // Update HTML elements with weather data
      temp.innerHTML = data.current.temp_c + "&#176;C";
      loc.textContent = data.location.name;
      time.textContent = data.location.localtime;
      country.textContent = data.location.country;
   
      ico_img.src = data.current.condition.icon;
  

      // Get the weather condition text
      let climate = data.current.condition.text;
      condition.textContent = climate;

      // Change background image based on weather condition
      let is_day = data.current.is_day;

      if (climate.toLowerCase().includes("clear")) {
        bg.style.background = 'url("/static/images/clear.jpg")';
      } else if (climate.toLowerCase().includes("sunny")) {
        bg.style.background = 'url("/static/images/sunny.avif")';
      } else if (
        climate.toLowerCase().includes("partly cloudy") ||
        (climate.toLowerCase().includes("overcast") && is_day == 1)
      ) {
        bg.style.background = 'url("/static/images/cloudy.jpg")';
      } else if (
        climate.toLowerCase().includes("partly cloudy") ||
        (climate.toLowerCase().includes("overcast") && is_day == 0)
      ) {
        bg.style.background = 'url("/static/images/night/cloudy.avif")';
      } else if (climate.toLowerCase().includes("snow") && is_day == 1) {
        bg.style.background = 'url("/static/images/snow.avif")';
      } else if (climate.toLowerCase().includes("snow") && is_day == 0) {
        bg.style.background = 'url("/static/images/night/snow.webp")';
      } else if (climate.toLowerCase().includes("cloud") && is_day == 1) {
        bg.style.background = 'url("/static/images/cloudy.jpg")';
      } else if (climate.toLowerCase().includes("cloud") && is_day == 0) {
        bg.style.background = 'url("/static/images/night/cloudy.avif")';
      } else if (climate.toLowerCase().includes("mist") && is_day == 1) {
        bg.style.background = 'url("/static/images/mist.jpg")';
      } else if (climate.toLowerCase().includes("mist") && is_day == 0) {
        bg.style.background = 'url("/static/images/night/mist.jpg")';
      } else if (climate.toLowerCase().includes("thunder")) {
        bg.style.background = 'url("/static/images/thor.jpg")';
      } else if (climate.toLowerCase().includes("freez") && is_day == 1) {
        bg.style.background = 'url("/static/images/freezing-fog.jpg")';
      } else if (climate.toLowerCase().includes("freez") && is_day == 0) {
        bg.style.background = 'url("/static/images/night/snow.webp")';
      } else if (climate.toLowerCase().includes("rain")) {
        bg.style.background = 'url("/static/images/rain.avif")';
      }
      // Set background image properties
      bg.style.backgroundRepeat = "no-repeat";
      bg.style.backgroundSize = "100% 100%";
    });
};

// Add click event listener to the icon for fetching data
ico.addEventListener("click", fetchdata);

// Call fetchdata function with default location (New Delhi) on page load
window.addEventListener("load", fetchdata);
