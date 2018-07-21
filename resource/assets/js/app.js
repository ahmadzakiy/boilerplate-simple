window.$ = window.jQuery = require("jquery");

// try fetch
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json())
  .then(json => console.log(json));

// try jQuery function
$("#get-color").on("click", function() {
  $(".title").css("color", getRandomColor());
});

// function for random color
const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log(color);
  return color;
};
