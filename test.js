const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const divNumber = document.getElementById("number");
const listItem = document.getElementById("gameList");
const rollButton = document.getElementById("rollDice");
const list = document.createElement("div");
const addGameButton = document.getElementById("addGame");
const removeGameButton = document.getElementById("removeGame");
const gameNameInput = document.getElementById("gameInput");
const inactiveBackground = document.getElementById("background");
const mainBackgroundLeftActive = document.getElementById("left_background_picture_active");
const mainBackgroundRightActive = document.getElementById("right_background_picture_active");
const mainBackgroundLeftInactive = document.getElementById("left_background_picture_inactive");
const mainBackgroundRightInactive = document.getElementById("right_background_picture_inactive");
const winnerGameDiv = document.getElementById("winnerGame");
const restartButton = document.getElementById("restart");

const footer = document.getElementById("footer");

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let games = [
  {
    name: "CS 1.6",
    img: "https://download-cs.net/images/slider/1.webp",
  },
  {
    name: "World of Tanks",
    img: "https://7themes.su/_ph/28/412543311.jpg",
  },
  {
    name: "World of Warcraft",
    img: "https://wallpapers.com/images/hd/world-of-warcraft-1920x1080-d2oib3m87tnra9oo.jpg",
  },
  {
    name: "Valorant",
    img: "https://preview.redd.it/iyaacpwpwfr41.png?auto=webp&s=c56cfe42a050a5a4ab6942eb5c7f9eef6bba65de",
  },
  {
    name: "CS 2",
    img: "https://cdn5.idcgames.com/storage/image/1493/game_home_bg_section_2/default.jpg",
  },
  {
    name: "Arena",
    img: "https://streamhatchet.com/wp-content/uploads/2024/05/1-22.jpg",
  },
  {
    name: "Dota2",
    img: "https://img.goodfon.com/original/1920x1080/6/bb/dota-dota-2-logotip-simvol.jpg",
  },
  {
    name: "League Of Legends",
    img: "https://wallpapers.com/images/featured/1920x1080-league-of-legends-background-m54i08fbn7lnv13f.jpg",
  },
  {
    name: "Among Us",
    img: "https://wallpapercat.com/w/full/7/e/b/1263-1920x1080-desktop-full-hd-among-us-wallpaper-image.jpg",
  },
  {
    name: "StarCraft2",
    img: "https://i.imgur.com/weAptru.jpg",
  },
  {
    name: "Warcraft3",
    img: "https://wow.zamimg.com/uploads/guide/seo/9363.jpg?1577080221",
  },
];

games.map((item) => {
  const list = document.createElement("div");
  list.setAttribute("id", `${item.name}`);
  list.classList.add("list");
  list.innerText = item.name;
  listItem.appendChild(list);
});

async function getTheGame() {
  let index = 0;
  for (let j = 0; j < getRandom(200); j++) {
    if (index == games.length) index = 0;
    divNumber.innerHTML = `<img style="max-width: 500px;
  height: auto;" src="${games[index].img}">`;
    index++;
    await delay(150);
  }
}

async function getTheGameWithoutPictures() {
  let index = 0;
  let listOfGames = document.getElementsByClassName("list");
  let nameIdForSearch = games[0].name;
  let selectedGame = document.getElementById(nameIdForSearch);
  for (element of listOfGames) {
    element.classList.add("inactive");
  }
  let randomValue = getRandom(10, 40);
  rollButton.disabled = true;
  for (let j = 0; j <= randomValue; j++) {
    selectedGame.classList.add("inactive");
    if (index == games.length) index = 0;
    nameIdForSearch = games[index].name;
    selectedGame = document.getElementById(nameIdForSearch);
    selectedGame.classList.remove("inactive");
    index++;
    await delay(150);
  }
  setWinnerImage(nameIdForSearch);
  await delay(2000);
  listItem.style.zIndex = -1;
  footer.style.zIndex = -1;
  openDoors();
}

async function getTheGameWithoutPicturesRandomSwitch() {
  let index = 0;
  let listOfGames = document.getElementsByClassName("list");
  let nameIdForSearch = games[0].name;
  let selectedGame = document.getElementById(nameIdForSearch);
  for (element of listOfGames) {
    element.classList.add("inactive");
  }
  rollButton.disabled = true;
  for (let j = 0; j < getRandom(100, 200); j++) {
    selectedGame.classList.add("inactive");
    index = getRandom(0, games.length - 1);
    nameIdForSearch = games[index].name;
    selectedGame = document.getElementById(nameIdForSearch);
    selectedGame.classList.remove("inactive");
    await delay(100);
  }
}

function addGameToList() {
  games.push({ name: gameNameInput.value });
  refreshListOfGames();
}

rollButton.addEventListener("click", () => {
  mainBackgroundLeftActive.style.opacity = "100%";
  mainBackgroundRightActive.style.opacity = "100%";
  mainBackgroundLeftInactive.style.opacity = "0%";
  mainBackgroundRightInactive.style.opacity = "0%";
  getTheGameWithoutPictures();
});

addGameButton.addEventListener("click", () => {
  addGameToList();
});

removeGameButton.addEventListener("click", () => {
  for (let value of games) {
    if (value.name === gameNameInput.value) {
      let index = games.indexOf(value);
      games.splice(index, 1);
    }
  }
  refreshListOfGames();
});

function refreshListOfGames() {
  listItem.innerHTML = "";
  games.map((item) => {
    const list = document.createElement("div");
    list.setAttribute("id", `${item.name}`);
    list.classList.add("list");
    list.innerText = item.name;
    listItem.appendChild(list);
  });
}

async function openDoors(){
  for (let i = 0; i <= 80; i++){
    mainBackgroundRightActive.style.transform = `translateX(${i}%)`;
    mainBackgroundLeftActive.style.transform = `translateX(-${i}%)`;
    await delay(20);
    restartButton.style.zIndex = 4;
    restartButton.style.opacity = "100%";
    rollButton.style.zIndex = -1;
}
}

function getImgByGameName(gameName){
  for (let game of games){
    if(game.name === gameName) return game.img;
  }
}

function setWinnerImage(gameName){
  winnerGameDiv.innerHTML = `<img src="${getImgByGameName(gameName)}">`
}

restartButton.addEventListener("click", () => {
  location.reload();
}

)