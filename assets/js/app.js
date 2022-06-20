const main = document.querySelector("#main");
const sectionPlayerOne = document.querySelector("#player-one");
const spanPointsOne = document.querySelector("#points-one");

const sectionPlayerTwo = document.querySelector("#player-two");
const spanPointsTwo = document.querySelector("#points-two");
let clickCount = 0;
const clickArr = [];
const data = [];

const playerOne = 1;
const playerTwo = 2;

let pointsPlayerOne = 0;
let pointsPlayerTwo = 0;

function start() {
  spanPointsOne.innerText += " " + pointsPlayerOne;
  spanPointsTwo.innerText += " " + pointsPlayerTwo;
}
start();

function pushDataIntoState() {
  let url = "https://source.unsplash.com/random/200×200";
  for (let j = 0; j < 8; j++) {
    url += `&reload=${j}`;
    for (let i = 0; i < 2; i++) {
      const pushData = {
        id: j,
        url: url,
      };
      data.push(pushData);
    }
  }
}
pushDataIntoState();

function fisherYatesShuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
}
fisherYatesShuffle(data);

function renderImg() {
  data.forEach((el) => {
    template = `
                <div class="single-memory">
                    <img src="${el.url}" class="hide-img">
                </div>
            `;
    main.innerHTML += template;
  });
}

renderImg();

console.log(data);

const allDivs = document.querySelectorAll("div");
allDivs.forEach((div, index) => {
  div.addEventListener("click", (e) => rotateImg(e));
});

function rotateImg(event) {
  clickArr.push(event.path[0].lastElementChild);
  clickCount++;
  event.path[0].lastElementChild.classList.add("show-img");
  event.path[0].lastElementChild.classList.remove("hide-img");
  if (clickCount === 2) {
    if (clickArr[0].src === clickArr[1].src) {
      if (sectionPlayerOne.classList.contains("toggle")) {
        pointsPlayerOne++;
        spanPointsOne.innerText = "Points: " + pointsPlayerOne;
      } else {
        pointsPlayerTwo++;
        spanPointsTwo.innerText = "Points: " + pointsPlayerTwo;
      }

      clickArr.forEach((el) => {
        setTimeout(function () {
          el.parentElement.classList.add("hidden");
          clickArr.length = 0;
          clickCount = 0;
        }, 2500);
      });
    } else {
      setTimeout(function () {
        clickArr.forEach((el) => {
          el.classList.remove("show-img");
          el.classList.add("hide-img");
        });
        clickCount = 0;
        clickArr.length = 0;
      }, 2500);
      sectionPlayerOne.classList.toggle("toggle");
      sectionPlayerTwo.classList.toggle("toggle");
    }
  }
  if (pointsPlayerOne + pointsPlayerTwo === 8) {
    if (pointsPlayerOne > pointsPlayerTwo) {
      alert("Player 1 wins!");
    } else if (pointsPlayerOne < pointsPlayerTwo) {
      alert("Player 2 wins!");
    } else {
      alert("It's a draw!");
    }
  }
}
