const hero = document.getElementById('hero');
const myArea = document.getElementById('myArea');
const photographerURL = document.getElementById('photographerURL');

const params = new URLSearchParams(window.location.search);
const idUrl = 'https://api.pexels.com/v1/photos/';
const myKey = 'z0duCBugPsh1dOb8NR23CJbcYQUkyBmmOrmi0tOKzDc0z61aSLHeURAY';

let myPhoto;
// console.log(params.get('photoId'));

window.addEventListener('load', init());

function init() {
  getPhotoItem();
}

async function getPhotoItem() {
  try {
    let response = await fetch(idUrl + params.get('photoId'), {
      headers: {
        Authorization: myKey,
      },
    });
    let data = await response.json();
    myPhoto = data;
    console.log(myPhoto);

    loadPage();
  } catch (error) {
    console.log(error);
  }
}

function loadPage() {
  hero.style.backgroundColor = myPhoto.avg_color;
  myArea.innerHTML = '';
  const myImg = document.createElement('img');
  myImg.src = myPhoto.src.medium;
  myImg.alt = myPhoto.alt;
  myImg.classList.add('w-50');
  myArea.appendChild(myImg);

  photographerURL.href = myPhoto.photographer_url;
}
