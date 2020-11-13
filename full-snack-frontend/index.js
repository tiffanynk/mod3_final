const baseURL = 'http://localhost:3000'
const usersURL = `${baseURL}/users`;
const loginURL = `${baseURL}/login`;

const signUpLink = document.querySelector('.sign-up-link')
const toggleLogin = document.querySelector('.toggle-login');
const board = document.querySelector('.board');
const highScoreboard = document.querySelector('#high-score');
const scoreboard = document.getElementById('score');
const turnCounter = document.getElementById('moves-counter');
const newGameButton = document.querySelector('.new-game-button')
const width = 8;
let cells = [];
let score = 0;
let turnCount = 10;

localStorage.setItem('highScore', 0)
let highScore = localStorage.getItem('highScore')
let token = localStorage.getItem('token')

const spookyIcons = [
    'url(images/candy-corn.png)',
    'url(images/eyeball.png)',
    'url(images/ghost.png)',
    'url(images/mummy.png)',
    'url(images/skeleton.png)',
    'url(images/spider.png)'
]

//creates gameboard
function createBoard() {
    for (let i=0; i < width*width; i++) {
        const cell = document.createElement('div')
        cell.className = 'cell' 
        cell.setAttribute('draggable', true)
        cell.setAttribute('id', i)
        scoreboard.textContent = 0
        turnCounter.textContent = 10
        let randomSpook = Math.floor(Math.random() * spookyIcons.length)
        cell.style.backgroundImage = spookyIcons[randomSpook]
        board.appendChild(cell)
        cells.push(cell)
    }
}

createBoard()
setLogin()

// Dragging the Spooks
let spookBeingDragged
let spookBeingReplaced
let cellIdBeingDragged
let cellIdBeingReplaced

newGameButton.addEventListener('click', newGame)
cells.forEach(cell => cell.addEventListener('dragstart', dragStart))
cells.forEach(cell => cell.addEventListener('dragend', dragEnd))
cells.forEach(cell => cell.addEventListener('dragover', dragOver))
cells.forEach(cell => cell.addEventListener('dragenter', dragEnter))
cells.forEach(cell => cell.addEventListener('drop', dragDrop))

function newGame() {
    board.innerHTML = ''
    createBoard()
}

function dragStart(){
    spookBeingDragged = this.style.backgroundImage
    cellIdBeingDragged = parseInt(this.id)
}

function dragOver(event) {
    event.preventDefault()
}

function dragEnter(event) {
    event.preventDefault()
}

function dragDrop() {
    spookBeingReplaced = this.style.backgroundImage
    cellIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = spookBeingDragged
    cells[cellIdBeingDragged].style.backgroundImage = spookBeingReplaced
}

function dropSpooks() {
    for (i = 0; i < 56; i++) {
        if (cells[i + width].style.backgroundImage === '') {
            
            cells[i + width].style.backgroundImage = cells[i].style.backgroundImage
            cells[i].style.backgroundImage = ''
            
        }
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)

        if (isFirstRow && cells[i].style.backgroundImage === '') {

            let randomSpook = Math.floor(Math.random() * spookyIcons.length)
            cells[i].style.backgroundImage = spookyIcons[randomSpook]
        }
    }
}

function checksRowFor4() {
    for (i = 0; i < 60; i++) {
        let rowOfFour = [i, i + 1, i + 2, i + 3]
        let decidedSpook = cells[i].style.backgroundImage
        const isEmpty = cells[i].style.backgroundImage === ''

        //array of all indexes that are not valid, i don't want my row of 3 to start on any of these indicies
        //fixes matches when a row starts at left or side or if half of its body is at halfway point
        const invalidIndex = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
        if (invalidIndex.includes(i)) continue

        if (rowOfFour.every(i => cells[i].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 4
            scoreboard.innerHTML = score
            rowOfFour.forEach(i => {
                cells[i].style.backgroundImage = ''
            })
        }
    }
}

function checksColumnFor4() {
    for (i = 0; i < 39; i++) {
        let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        let decidedSpook = cells[i].style.backgroundImage
        const isEmpty = cells[i].style.backgroundImage === ''
        if (columnOfFour.every(i => cells[i].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 4
            scoreboard.innerHTML = score
            columnOfFour.forEach(i => {
                cells[i].style.backgroundImage = ''
            })
        }
    }
}

function checksRowFor3() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2]
        let decidedSpook = cells[i].style.backgroundImage
        const isEmpty = cells[i].style.backgroundImage === ''

        const invalidIndex = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if (invalidIndex.includes(i)) continue
        if(rowOfThree.every(i => cells[i].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 3
            scoreboard.innerHTML = score
            rowOfThree.forEach(i => {
                cells[i].style.backgroundImage = ''
            })
        }
    }
}

function checksColumnFor3() {
    for (i = 0; i < 47; i++) {
        let columnOfThree = [i, i + width, i + width * 2]
        let decidedSpook = cells[i].style.backgroundImage
        const isEmpty = cells[i].style.backgroundImage === ''

        if (columnOfThree.every(i => cells[i].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 3
            scoreboard.innerHTML = score
            columnOfThree.forEach(i => {
                cells[i].style.backgroundImage = ''
            })
        }
    }
}

// let garbage = 0;
function dragEnd() {
    //defining moves so that icons can only move one space from its current position
    let validMoves = [
        cellIdBeingDragged - 1 , 
        cellIdBeingDragged - width, 
        cellIdBeingDragged + 1, 
        cellIdBeingDragged + width
    ]

    let validMove = validMoves.includes(cellIdBeingReplaced)

    if (cellIdBeingReplaced && validMove) {
        cellIdBeingReplaced = null
    } else if (cellIdBeingReplaced && !validMove) {
        cells[cellIdBeingReplaced].style.backgroundImage = spookBeingReplaced
        cells[cellIdBeingDragged].style.backgroundImage = spookBeingDragged
    } else {
        cells[cellIdBeingDragged].style.backgroundImage = spookBeingDragged
    }

    checksRowFor4()
    checksColumnFor4()
    checksRowFor3()
    checksColumnFor3()
    decrementTurnCount()
}

function decrementTurnCount() {
    turnCount -= 1
    turnCounter.innerHTML =`${turnCount}`
    gameOver(turnCount)
}

function gameOver(turnCount) {
    if (turnCount === 0) {
        board.innerHTML = `
        <img src="images/game-over.png" alt="Game Over">
        `
        if (score > highScore) {
            highScoreboard.innerHTML = `${score}`
            localStorage.setItem('highScore', score)
        }
    }
}

window.setInterval(function() {
    dropSpooks()
  }, 50);


function setLogin(){
        if (token === null) {
            toggleLogin.innerHTML = `
                <a id='sign-up-button' href='./signup.html'></a>
                <a id='login-button' href='./login.html'></a>
            `
        } else setLogout()
}

function setLogout(){
    toggleLogin.innerHTML = `
        <a id='logout-button' href='/index.html'></a>
    `
    let logoutButton = document.querySelector('#logout-button')
    logoutButton.addEventListener('click', logout)
}

function logout() {
    localStorage.removeItem('token')
    setLogin()
}