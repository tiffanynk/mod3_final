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
    console.log('dragStart')

}

function dragOver(e) {
    e.preventDefault()
    console.log('dragOver')
}

function dragEnter(e) {
    e.preventDefault()
    console.log('dragEnter')

}

function dragLeave() {
    // this.style.backgroundImage = ''
    console.log('dragLeave')

}

function dragDrop() {
    spookBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = spookBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = spookBeingReplaced
    console.log('dragDrop')
}

function dragEnd() {
    console.log('dragEnd')

    let validMoves = [squareIdBeingDragged - 1 , squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    }  else if (squareIdBeingReplaced && !validMove) {
       squares[squareIdBeingReplaced].style.backgroundImage = spookBeingReplaced
       squares[squareIdBeingDragged].style.backgroundImage = spookBeingDragged
    } else  squares[squareIdBeingDragged].style.backgroundImage = spookBeingDragged
}

function dropDownIntoSquare() {
    for (i = 0; i < 55; i ++) {
        if(squares[i + width].style.backgroundImage === '') {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && (squares[i].style.backgroundImage === '')) {
              let randomSpook = Math.floor(Math.random() * spookyIcons.length)
              squares[i].style.backgroundImage = spookyIcons[randomSpook]
            }
        }
    }
}

function checksRowFor4() {
    for (i = 0; i < 60; i ++) {
        let rowOfFour = [i, i + 1, i + 2, i + 3]
        let decidedSpook = squares[i].style.backgroundImage
        const isEmpty = squares[i].style.backgroundImage === ''

        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 4
            console.log('row of 4', score)
            scoreBox.innerHTML = score
            rowOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checksRowFor4()

function checksColumnFor4() {
    for (i = 0; i < 39; i ++) {
        let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        let decidedSpook = squares[i].style.backgroundImage
        const isEmpty = squares[i].style.backgroundImage === ''

        if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 4
            console.log('column of 4', score)
            scoreBox.innerHTML = score
            columnOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checksColumnFor4()

function checksRowFor3() {
    for (i = 0; i < 61; i ++) {
        let rowOfThree = [i, i+1, i+2]
        let decidedSpook = squares[i].style.backgroundImage
        const isEmpty = squares[i].style.backgroundImage === ''

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if (notValid.includes(i)) continue

        if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 3
            console.log('row of 3', score)
            scoreBox.innerHTML = score
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checksRowFor3()

function checksColumnFor3() {
    for (i = 0; i < 47; i ++) {
        let columnOfThree = [i, i + width, i + width * 2]
        let decidedSpook = squares[i].style.backgroundImage
        const isEmpty = squares[i].style.backgroundImage === ''

        if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedSpook && !isEmpty)) {
            score += 3
            console.log('column of 3', score)
            scoreBox.innerHTML = score
            columnOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checksColumnFor3()

window.setInterval(function(){
    checksRowFor4()
    checksColumnFor4()
    checksRowFor3()
    checksColumnFor3()
    dropDownIntoSquare()
  }, 100);