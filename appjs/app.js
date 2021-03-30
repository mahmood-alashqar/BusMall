'use strict';
const assets = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
// let tempArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

let totalOfVotes=[];
let totalOfViews=[];
let itemExisit=[];

let rightAssetRandom=0;
let leftAssetRandom=0;
let midAssetRandom=0;

const leftAsset = document.getElementById('left-asset');
const midAsset = document.getElementById('mid-asset');
const rightAsset = document.getElementById('right-asset');
const assetSection = document.getElementById('assets-section');
let numberOfRound = 25;

let counterClick = 1;

function Asset(name) {
  this.name = name;

  this.path = `./assets/${name}`;
  this.votes = 0;
  this.views = 0;

  Asset.all.push(this);



}
Asset.all = [];



for (let i = 0; i < assets.length; i++) {
  new Asset(assets[i]);


}

// table(Asset.all);

// let leftAssett = getRandomNumber(0,Asset.all.length-1);
// let rightAssetImg =getRandomNumber(0,Asset.all.length-1);
// let midAssett =getRandomNumber(0,Asset.all.length-1);

// let nextLeft= getRandomNumber(0,Asset.all.length-1);
// let nextRight= getRandomNumber(0,Asset.all.length-1);
// let nextMid= getRandomNumber(0,Asset.all.length-1);
let leftAssetImg ;
let rightAssetImg ;
let midAssettImg ;
// function grnerateNumber(){
//   const rightAssetRandom = getRandomNumber(0,Asset.all.length-1);
//   const leftAssetRandom = getRandomNumber(0,Asset.all.length-1);
//   const midAssetRandom = getRandomNumber(0,Asset.all.length-1);

//   leftAssetImg = Asset.all[leftAssetRandom];
//   rightAssetImg = Asset.all[rightAssetRandom];
//   midAssettImg = Asset.all[midAssetRandom];

// }
function render() {
  rightAssetRandom = getRandomNumber(0,Asset.all.length-1);
  leftAssetRandom = getRandomNumber(0,Asset.all.length-1);
  midAssetRandom = getRandomNumber(0,Asset.all.length-1);

  leftAssetImg = Asset.all[leftAssetRandom];
  rightAssetImg = Asset.all[rightAssetRandom];
  midAssettImg = Asset.all[midAssetRandom];

  if (leftAssetImg === rightAssetImg || leftAssetImg === midAssettImg || midAssettImg === rightAssetImg)
    render();

  else
  {
    if(itemExisit.includes(leftAssetRandom) || itemExisit.includes(rightAssetRandom) ||itemExisit.includes(midAssetRandom))
    {
      render();
    }
    else
    {
      itemExisit = [];
      itemExisit.push(rightAssetRandom);
      itemExisit.push(leftAssetRandom);
      itemExisit.push(midAssetRandom);

      leftAsset.src = Asset.all[leftAssetRandom].path;
      leftAsset.alt=Asset.all[leftAssetRandom].name;
      leftAsset.title = Asset.all[leftAssetRandom].name;

      rightAsset.src = Asset.all[rightAssetRandom].path;
      rightAsset.alt=Asset.all[rightAssetRandom].name;
      rightAsset.title = Asset.all[rightAssetRandom].name;

      midAsset.src = Asset.all[midAssetRandom].path;
      midAsset.alt=Asset.all[midAssetRandom].name;
      midAsset.title = Asset.all[midAssetRandom].name;
    }



  }
}

render();
assetSection.addEventListener('click', handelClick);

function handelClick(event) {
  event.preventDefault();
  if (event.target.id !== 'assets-section') {
    if (event.target.id === rightAsset.id) {

      Asset.all[rightAssetRandom].votes++;
      Asset.all[rightAssetRandom].views++;
      Asset.all[leftAssetRandom].views++;
      Asset.all[midAssetRandom].views++;
      //   render();

      counterClick++;
      // enableDisable();
    }
    else if (event.target.id === leftAsset.id) {

      Asset.all[leftAssetRandom].votes++;
      Asset.all[rightAssetRandom].views++;
      Asset.all[leftAssetRandom].views++;
      Asset.all[midAssetRandom].views++;
      //   render();

      counterClick++;
      // enableDisable();
    }
    else if (event.target.id === midAsset.id) {
      Asset.all[midAssetRandom].votes++;
      Asset.all[rightAssetRandom].views++;
      Asset.all[leftAssetRandom].views++;
      Asset.all[midAssetRandom].views++;
      //   render();

      counterClick++;

    }
    render();
    enableDisable();
  }





}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}




let listView = document.getElementById('list');
listView.addEventListener('click', listVieww);

function listVieww() {

  const unOrderList = document.createElement('ul');
  listView.appendChild(unOrderList);
  for (let i = 0; i < assets.length; i++) {
    totalOfVotes.push(Asset.all[i].votes);
    totalOfViews.push(Asset.all[i].views);
    let listItem = document.createElement('li');
    unOrderList.appendChild(listItem);
    listItem.textContent = ` ${Asset.all[i].name}  had  ${Asset.all[i].votes}  votes,    and was seen  ${Asset.all[i].views}   times`;


  }
}
let btnSubmit = document.getElementById('btnSubmit');
btnSubmit.addEventListener('click', enableDisable);
function enableDisable() {

  //Reference the Button.


  //Verify the TextBox value.
  if (counterClick === numberOfRound) {


    //Enable the TextBox when TextBox has value.
    btnSubmit.disabled = false;

    listVieww();
    assetSection.removeEventListener('click', handelClick);
    chartRender();
  }

}
// render();
function chartRender(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
  // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: assets,
      datasets: [{
        label: 'BusMall votes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: totalOfVotes

      },
      {
        label: 'BusMall Views',
        backgroundColor: 'blue',
        borderColor:'rgb(255, 99, 132)',
        data: totalOfViews

      }]
    },
    // Configuration options go here
    options: {}
  });
}
function settingItem (){let data = JSON.stringify(Asset.all);
  localStorage.setItem('userItems', data);
}


function gettingItem (){
  let stringObject = localStorage.getItem('userItems');
  let tempObject = JSON.parse(stringObject);
  if (tempObject !== null)
  {
    Asset.all = tempObject;
  }
  render();
}

gettingItem();
settingItem();
