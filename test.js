
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const divNumber = document.getElementById("number");
const listItem = document.getElementById("gameList");
const rollButton = document.getElementById("rollDice");
const list = document.createElement("div");
const addGameButton = document.getElementById("addGame");
const removeGameButton = document.getElementById("removeGame");
const gameNameInput = document.getElementById("gameInput");

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let games = [
    {   
        name: "CS 1.6",
        img: "https://download-cs.net/images/slider/1.webp"
    },
    {   
        name: "World of Tanks",
        img: "https://worldoftanks.eu/static/6.2.2_9cd574/common/img/wot_artboard.png"
    },
    {   
        name: "World of Warcraft",
        img: "https://static.wikia.nocookie.net/wowpedia/images/a/aa/WoW_2.0_logo_old.png/revision/latest/scale-to-width-down/1731?cb=20180705205814"
    },
    {   
        name: "Valorant",
        img: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg"
    },
    {   
        name: "CS 2",
        img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/capsule_616x353.jpg?t=1719426374"
    },
    {   
        name: "Arena",
        img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2073620/capsule_616x353.jpg?t=1724820322"
    },
    {   
        name: "Dota2",
        img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/header.jpg?t=1724428927"
    },
    {   
        name: "League Of Legends",
        img: "https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2021/09/league-of-legends.jpeg?fit=1607%2C895&ssl=1"
    },
    {   
        name: "Among Us",
        img: "https://static.wikia.nocookie.net/among-us/images/f/fe/Among-us.jpg/revision/latest?cb=20210618140112&path-prefix=ru"
    },
    {   
        name: "StarCraft2",
        img: "https://bnetcmsus-a.akamaihd.net/cms/blog_header/2g/2G4VZH5TIWJF1602720144046.jpg"
    },
    {   
        name: "Warcraft3",
        img: "https://www.thumbculture.co.uk/wp-content/uploads/2020/02/Warcraft-III-Reforged-Review-01-Header-1024x576.jpg"
    }
]

games.map(item => {
    const list = document.createElement("div");
    list.setAttribute("id", `${item.name}`);
    list.classList.add("list");
    list.innerText = item.name;
    listItem.appendChild(list);
})

async function getTheGame() {
    let index = 0;
    for (let j=0;j<getRandom(200);j++){
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
    for (element of listOfGames){
        element.classList.add("inactive");
    }
    let randomValue = getRandom(10, 40);
    rollButton.disabled = true;
    for (let j=0;j<=randomValue;j++){
        selectedGame.classList.add("inactive");
        if (index == games.length) index = 0;
        nameIdForSearch = games[index].name;
        console.log(`id for search ${nameIdForSearch}`)
        selectedGame = document.getElementById(nameIdForSearch);
        console.log(selectedGame);
        selectedGame.classList.remove("inactive");
        index++;
        await delay(150);
        if(j == randomValue) rollButton.disabled = false;
    }
}

async function getTheGameWithoutPicturesRandomSwitch() {
    let index = 0;
    let listOfGames = document.getElementsByClassName("list");
    let nameIdForSearch = games[0].name;
    let selectedGame = document.getElementById(nameIdForSearch);
    for (element of listOfGames){
        element.classList.add("inactive");
    }
    rollButton.disabled = true;
    for (let j=0;j<getRandom(100, 200);j++){
        selectedGame.classList.add("inactive");
        index = getRandom(0, games.length-1);
        nameIdForSearch = games[index].name;
        console.log(`id for search ${nameIdForSearch}`)
        selectedGame = document.getElementById(nameIdForSearch);
        console.log(selectedGame);
        selectedGame.classList.remove("inactive");
        await delay(100);
    }
}

function addGameToList(){
   games.push({name : gameNameInput.value});
   refreshListOfGames();
}

rollButton.addEventListener("click", () => {
    getTheGameWithoutPictures();
} )

addGameButton.addEventListener("click", () => {
    addGameToList();
})

removeGameButton.addEventListener("click", () => {
    for(let value of games){
        if(value.name === gameNameInput.value) {
        let index = games.indexOf(value);
            games.splice(index, 1);
        }
    };
    refreshListOfGames();
});

function refreshListOfGames(){
    listItem.innerHTML = '';
    games.map(item => {
     const list = document.createElement("div");
     list.setAttribute("id", `${item.name}`);
     list.classList.add("list");
     list.innerText = item.name;
     listItem.appendChild(list);
 })
}



