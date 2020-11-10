const baseURL = 'http://localhost:3000'
const usersURL = `${baseURL}/users`;
const loginURL = `${baseURL}/login`;

const loginLink = document.querySelector('.login-link');
const grid = document.querySelector('.grid');
const scoreBox = document.getElementById('score');
const width = 8;
let squares = [];
let score = 0;

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
        const square = document.createElement('div')
        square.className = 'square' 
        square.setAttribute('draggable', true)
        square.setAttribute('id', i)
        scoreBox.textContent = 0
        let randomSpook = Math.floor(Math.random() * spookyIcons.length)
        square.style.backgroundImage = spookyIcons[randomSpook]
        grid.appendChild(square)
        squares.push(square)
    }
}

createBoard()

// Dragging the Spooks
let spookBeingDragged
let spookBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart(){
    spookBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
}

function dragOver(event) {
    event.preventDefault()
}

function dragEnter(event) {
    event.preventDefault()
}

function dragLeave() {
    // this.style.backgroundImage = ''
}

function dragDrop() {
    spookBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = spookBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = spookBeingReplaced
}

function dragEnd() {
    //defining moves so that icons can only move one space from its current position
    let validMoves = [
        squareIdBeingDragged - 1 , 
        squareIdBeingDragged - width, 
        squareIdBeingDragged + 1, 
        squareIdBeingDragged + width
    ]

    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
        console.log('squareIdBeingReplaced && is validMove')
    } else if (squareIdBeingReplaced && !validMove) {
        console.log('squareIdBeingReplaced && !validMove')
        squares[squareIdBeingReplaced].style.backgroundImage = spookBeingReplaced
        squares[squareIdBeingDragged].style.backgroundImage = spookBeingDragged
    } else {
        console.log('else')
        squares[squareIdBeingDragged].style.backgroundImage = spookBeingDragged
    }
}

function dropDownIntoSquare() {
    for (i = 0; i < 56; i++) {
        if (squares[i + width].style.backgroundImage === '') {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            
            if (isFirstRow && (squares[i].style.backgroundImage === '')) {
                let randomSpook = Math.floor(Math.random() * spookyIcons.length)
                console.log('randomSpook', randomSpook)
                squares[i].style.backgroundImage = spookyIcons[randomSpook]
                console.log(`new icon url for  div ${squares[i]}`, squares[i].style.backgroundImage)
            }
        }
    }
}

dropDownIntoSquare()

function checksRowFor4() {
    for (i = 0; i < 60; i++) {
        let rowOfFour = [i, i + 1, i + 2, i + 3]
        let decidedSpook = squares[i].style.backgroundImage
        const isEmpty = squares[i].style.backgroundImage === ''

        //array of all indexes that are not valid, i don't want my row of 3 to start on any of these indicies
        //fixes matches when a row starts at left or side or if half of its body is at halfway point
        const invalidIndex = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
        if (invalidIndex.includes(i)) continue

        if (rowOfFour.every(i => squares[i].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 4
            scoreBox.innerHTML = score
            rowOfFour.forEach(i => {
                squares[i].style.backgroundImage = ''
            })
        }
    }
}
checksRowFor4()

function checksColumnFor4() {
    for (i = 0; i < 39; i++) {
        let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        let decidedSpook = squares[i].style.backgroundImage
        const isEmpty = squares[i].style.backgroundImage === ''

        if (columnOfFour.every(i => squares[i].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 4
            console.log('column of 4', score)
            scoreBox.innerHTML = score
            columnOfFour.forEach(i => {
                squares[i].style.backgroundImage = ''
            })
        }
    }
}
checksColumnFor4()

function checksRowFor3() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2]
        let decidedSpook = squares[i].style.backgroundImage
        const isEmpty = squares[i].style.backgroundImage === ''

        const invalidIndex = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if (invalidIndex.includes(i)) continue

        if(rowOfThree.every(i => squares[i].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 3
            scoreBox.innerHTML = score
            rowOfThree.forEach(i => {
                squares[i].style.backgroundImage = ''
            })
        }
    }
}

checksRowFor3()

function checksColumnFor3() {
    for (i = 0; i < 47; i++) {
        let columnOfThree = [i, i + width, i + width * 2]
        let decidedSpook = squares[i].style.backgroundImage
        const isEmpty = squares[i].style.backgroundImage === ''

        if (columnOfThree.every(i => squares[i].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 3
            scoreBox.innerHTML = score
            columnOfThree.forEach(i => {
                squares[i].style.backgroundImage = ''
            })
        }
    }
}

checksColumnFor3()

window.setInterval(function() {
    checksRowFor4()
    checksColumnFor4()
    checksRowFor3()
    checksColumnFor3()
    dropDownIntoSquare()
  }, 100);