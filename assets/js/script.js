const btnLoadImages1 = document.getElementById('loadImages');
const btnLoadImages2 = document.getElementById('loadImages2');
const btnSendReserch = document.getElementById('sendReserch');
const imagesBox = document.getElementById('imagesBox');
const modalBody = document.getElementById('modalBody');
const myForm = document.getElementById('myForm');
const searchTheme = document.getElementById('searchTheme');

const searchUrl = 'https://api.pexels.com/v1/search?query=';
const idUrl = 'https://api.pexels.com/v1/photos/:';
const myKey = 'z0duCBugPsh1dOb8NR23CJbcYQUkyBmmOrmi0tOKzDc0z61aSLHeURAY';
const themes = ['ocean', 'tigers', 'red', 'blue', 'gym'];
let lastTheme = '';
let myList = [];

btnLoadImages1.addEventListener('click', (e) => {
  e.preventDefault();
  getImages(getTheme());
});

btnLoadImages2.addEventListener('click', (e) => {
  e.preventDefault();
  getImages(getTheme());
});

btnSendReserch.addEventListener('click', (e) => {
  e.preventDefault();
  getImages(searchTheme.value);
  myForm.reset();
});

function getTheme() {
  let index = Math.floor(Math.random() * themes.length);
  if (themes[index] == lastTheme) {
    getTheme();
  } else {
    lastTheme = themes[index];
    return themes[index];
  }
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
    myBtnView.setAttribute('data-bs-toggle', 'modal');
    myBtnView.setAttribute('data-bs-target', '#myModal');
    myBtnView.setAttribute('onclick', `showInModal(${element.id})`);

    const myBtnHide = document.createElement('button');
    myBtnHide.setAttribute('type', 'button');
    myBtnHide.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    myBtnHide.innerText = 'Hide';
    myBtnHide.setAttribute('onclick', `hideCard(${element.id})`);

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

function hideCard(id) {
  document.getElementById(id).setAttribute('hidden', 'true');
}

function showInModal(myId) {
  console.log(myList);
  modalBody.innerHTML = '';
  myList.forEach((element) => {
    if (element.id == myId) {
      const myImg = document.createElement('img');
      myImg.src = element.src.medium;
      myImg.alt = element.alt;
      modalBody.appendChild(myImg);
      return;
    }
  });
}
