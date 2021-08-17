let listItems = [{
    id: 0,
    image: 'images/cheeseburger.png'
}, {
    id: 1,
    image: 'images/fries.png'
}, {
    id: 2,
    image: 'images/hotdog.png'
}, {
    id: 3,
    image: 'images/ice-cream.png'
}, {
    id: 4,
    image: 'images/milkshake.png'
}, {
    id: 5,
    image: 'images/pizza.png'
}]

let listLength = listItems.length;
let grid = document.querySelector('#grid');
let board = document.getElementsByClassName('board');
let flipped = 'flipped';
let done = 'done';
let listItemsId = [];
let score = 0;
let winningText = document.querySelector('#winningText');

createGameBoard();

game();

function createGameBoard() {
    for (let i = 0; i < listLength; i++) {
        listItemsId.push(i);
    }
    listItemsId = listItemsId.concat(listItemsId);
    shuffleArray(listItemsId);
    for (let i = 0; i < listLength * 2; i++) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        div.appendChild(img);
        let id = listItemsId[i];
        div.className = id;
        div.classList.add('board');
        img.setAttribute('src', 'images/blank.png');
        grid.appendChild(div);
    }

}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function game() {
    [...board].forEach(cell => {
        cell.addEventListener('click', e => {
            let id = cell.classList[0];
            let totalFlipped = document.querySelectorAll('.flipped').length;
            if (!cell.classList.contains(done) && !cell.classList.contains(flipped) && totalFlipped <= 1) {
                cell.classList.add(flipped);
                cell.children[0].setAttribute('src', listItems[id].image);
                if (totalFlipped >= 1) {
                    let x = -1, y = -1;
                    let idx1 = -1, idx2 = -1;
                    for (let i = 0; i < listLength * 2; i++) {
                        if (grid.children[i].classList.contains(flipped)) {
                            if (x === -1) {
                                x = grid.children[i].classList[0];
                                idx1 = i;
                            }
                            else if (x != -1 && y === -1) {
                                y = grid.children[i].classList[0];
                                idx2 = i;
                            }
                        }
                    }
                    if (x === y) {
                        // console.log('You found a Match');
                        winningText.innerHTML = 'You found a match!';
                        score += 2;
                        setTimeout(() => {
                            matchFound(idx1);
                            matchFound(idx2);
                            winningText.innerHTML = (score === listLength * 2) ? 'Yay! You Won' : '';
                        }, 1000);
                    }
                    else {
                        setTimeout(() => {
                            matchNotFound(idx1);
                            matchNotFound(idx2);
                        }, 1000);
                    }
                }
            }
        });
    });
}

function matchFound(index) {
    let gridEle = grid.children[index];
    gridEle.classList.remove(flipped);
    gridEle.classList.add(done);
    gridEle.children[0].setAttribute('src', 'images/white.png');
}

function matchNotFound(index) {
    let gridEle = grid.children[index];
    gridEle.classList.remove(flipped);
    gridEle.children[0].setAttribute('src', 'images/blank.png');
}