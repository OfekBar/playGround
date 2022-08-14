//add speedup button

const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 217
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

function setup(){
  const tribut=document.querySelector('#triLevel')
const defbut=document.querySelector('#defaultLevel')
const forbut=document.querySelector('#forestLevel')
const newgame = document.querySelector('.newGame');
const refreshPage = () => {location.reload();}
  tribut.addEventListener('click',updateTri)
  defbut.addEventListener('click',updateDefult)
  forbut.addEventListener('click',updateForest)
  newgame.addEventListener('click', refreshPage)

}
setup()
for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

var alienInvaders = [0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39]


function updateTri(){
    clearInterval(invadersId)
    squares[currentShooterIndex].classList.remove('shooter')
    remove()
    clearBoard()
    alienInvaders=[2,3,4,5,6,7,8,9,10,11,12,
    19,20,21,22,23,24,25,
    35,36,37,38,
    52
    ]
    draw()
    invadersId=setInterval(moveInvaders, 600)
  }
function updateDefult(){
  clearInterval(invadersId)
    squares[currentShooterIndex].classList.remove('shooter')
    remove()
    clearBoard()
    alienInvaders = [
      0,1,2,3,4,5,6,7,8,9,
      15,16,17,18,19,20,21,22,23,24,
      30,31,32,33,34,35,36,37,38,39
    ]
    draw()
    invadersId=setInterval(moveInvaders, 600)
    
  }
  function updateForest(){
    clearInterval(invadersId)
    squares[currentShooterIndex].classList.remove('shooter')
    remove()
    clearBoard()
    alienInvaders = [
      0,2,4,6,8,10,12,14,
      15,17,19,21,23,25,17,29,
      30,32,34,36,38,40,42,44
    ]
    draw()
    invadersId=setInterval(moveInvaders, 600)
  }
const invImg=['inv1','inv2','inv3','inv4','inv5','inv6','inv7','inv8']
const roleImg=[]
for (let i = 0; i < alienInvaders.length; i++) {
    var img=invImg[Math.floor(Math.random()*invImg.length)]
    roleImg.push(img)
    
    
}
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      var img=invImg[Math.floor(Math.random()*invImg.length)]
      squares[alienInvaders[i]].classList.add('invader',roleImg[i])
      
    }
  }
}

draw()


function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    while(squares[alienInvaders[i]].classList.length>0){
      squares[alienInvaders[i]].classList.remove(squares[alienInvaders[i]].classList.item(0))
    }
  }
}

squares[currentShooterIndex].classList.add('shooter')


function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1
      break
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultsDisplay.innerHTML += ' Game Over'
    squares[currentShooterIndex].classList.remove('invader','shooter')
    squares[currentShooterIndex].classList.add('boom')
    clearInterval(invadersId)
    end_game()
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) {
      resultsDisplay.innerHTML += ' Game Over'
      clearInterval(invadersId)
      end_game()
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML += ' Victory!'
    clearInterval(invadersId)
    end_game()
  }
}
invadersId = setInterval(moveInvaders, 600)

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)
      results++
      resultsDisplay.innerHTML = results
      console.log(aliensRemoved)

    }

  }
  switch(e.code) {
    case 'Space':
      laserId = setInterval(moveLaser, 100)
  }
}
function end_game(){
  for(let i=0; i<squares.length;i++){
    if(!squares[i].classList.contains('shooter') && !squares[i].classList.contains('invader') && !squares[i].classList.contains('boom')){
      squares[i].classList.add('endGame')
    }
  }
  setup()
}
function clearBoard(){
  resultsDisplay.innerHTML=0
  currentShooterIndex=217
  direction = 1
  goingRight = true
  aliensRemoved = []
  results = 0
  }
  
document.addEventListener('keydown', shoot)


