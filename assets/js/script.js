const btnLoadImages1 = document.getElementById('loadImages');
const btnLoadImages2 = document.getElementById('loadImages2');
const imagesBox = document.getElementById('imagesBox');

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

function loadList() {
  imagesBox.innerHTML = '';
  myList.forEach((element) => {
    const myCol = document.createElement('div');
    myCol.classList.add('col-md-4');
    myCol.id = element.id;

    const myCard = document.createElement('div');
    myCard.classList.add('card', 'mb-4', 'shadow-sm');

    const myImg = document.createElement('img');
    myImg.classList.add('card-img-top', 'db-placeholder-img');
    myImg.src = element.src.medium;
    myImg.alt = element.alt;

    const myBody = document.createElement('div');
    myBody.classList.add('card-body');

    const myH5 = document.createElement('h5');
    myH5.classList.add('card-title');

    const myTitleLink = document.createElement('a');
    myTitleLink.href = 'javascript:void(0);';
    myTitleLink.innerText = 'Lorem Ipsum';

    const myPText = document.createElement('p');
    myPText.classList.add('card-text');
    myPText.innerText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

    const myDiv = document.createElement('div');
    myDiv.classList.add(
      'd-flex',
      'justify-content-between',
      'align-items-center'
    );

    const myBtnGroup = document.createElement('div');
    myBtnGroup.classList.add('btn-group');

    const myBtnView = document.createElement('button');
    myBtnView.setAttribute('type', 'button');
    myBtnView.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    myBtnView.innerText = 'View';

    const myBtnHide = document.createElement('button');
    myBtnHide.setAttribute('type', 'button');
    myBtnHide.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    myBtnHide.innerText = 'Hide';

    const myIdContainer = document.createElement('small');
    myIdContainer.classList.add('text-muted');
    myIdContainer.innerText = element.id;

    myCard.appendChild(myImg);
    myH5.appendChild(myTitleLink);
    myBody.appendChild(myH5);
    myBody.appendChild(myPText);
    myCard.appendChild(myBody);
    myBtnGroup.appendChild(myBtnView);
    myBtnGroup.appendChild(myBtnHide);
    myDiv.appendChild(myBtnGroup);
    myDiv.appendChild(myIdContainer);
    myBody.appendChild(myDiv);
    myCol.appendChild(myCard);
    imagesBox.appendChild(myCol);
  });
}
