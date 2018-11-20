import $ from 'jquery';
import moment from 'moment';

console.log('date', moment().format('MMMM Do YYYY, h:mm:ss a'));

// function for get random color
const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log(color);
  return color;
};

// change color with jquery
$("#get-color").on("click", function () {
  $(".title").css("color", getRandomColor());
});

// try fetch
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json())
  .then(json => console.log("data: ", json));