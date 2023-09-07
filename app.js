const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let currentTime = --time;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`
    }
    timeEl.innerHTML = `00:${currentTime}`;
  }
}

function getRandomNumber (min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor () {
  let red = Math.round(Math.random() * 255);
  let green = Math.round(Math.random() * 255);
  let blue = Math.round(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
}


function createRandomCircle () {
  const circle = document.createElement('div');

  const size = getRandomNumber(10, 60);
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size - 10);
  const y = getRandomNumber(0, height - size - 10);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  console.log(getRandomColor())

  circle.style.background = getRandomColor();

  board.append(circle);
}

function startGame() {
  createRandomCircle();
  setInterval(decreaseTime, 1000);
}

function finishGame () {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

startBtn.addEventListener('click', event => {
  event.preventDefault();
  screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
})