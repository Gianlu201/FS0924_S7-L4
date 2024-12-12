const btnLoadImages1 = document.getElementById('loadImages');
const btnLoadImages2 = document.getElementById('loadImages2');

const searchUrl = 'https://api.pexels.com/v1/search?query=';
const idUrl = 'https://api.pexels.com/v1/photos/:';
const myKey = 'z0duCBugPsh1dOb8NR23CJbcYQUkyBmmOrmi0tOKzDc0z61aSLHeURAY';
const themes = ['ocean', 'tigers', 'red', 'blue'];
let myList = [];

btnLoadImages1.addEventListener('click', (e) => {
  e.preventDefault();
  getImages(getTheme());
});

function getTheme() {
  let index = Math.floor(Math.random() * themes.length);
  return themes[index];
}

const getImages = async (theme) => {
  try {
    let response = await fetch(searchUrl + theme, {
      headers: {
        Authorization: myKey,
      },
    });
    let data = await response.json();
    myList = data.photos;
  } catch (error) {
    console.log(error);
  }
  loadList();
};

function loadList() {}
