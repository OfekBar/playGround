document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        {name:'as',img:'images/as.jfif'},{name:'as',img:'images/as.jfif'},
        {name:'beagle',img:'images/beagle.jpg'},{name:'beagle',img:'images/beagle.jpg'},
        {name:'basenji',img:'images/basenji.png'},{name:'basenji',img:'images/basenji.png'},
        {name:'borzoi',img:'images/borzoi.jpg'},{name:'borzoi',img:'images/borzoi.jpg'},
        {name:'dane',img:'images/dane.jpg'},{name:'dane',img:'images/dane.jpg'},
        {name:'doodle',img:'images/doodle.png'},{name:'doodle',img:'images/doodle.png'},
        {name:'iwh',img:'images/iwh.jpg'},{name:'iwh',img:'images/iwh.jpg'},
        {name:'doston',img:'images/doston.jfif'},{name:'doston',img:'images/doston.jfif'}
    ]
  
    cardArray.sort(() => 0.5 - Math.random())
  
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
  
    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/back.jpg')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }
  
    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/back.jpg')
        cards[optionTwoId].setAttribute('src', 'images/back.jpg')
        alert('You have clicked the same image!')
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].setAttribute('src', 'images/gone.png')
        cards[optionTwoId].setAttribute('src', 'images/gone.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
        resultDisplay.textContent = parseInt(resultDisplay.textContent)+3
      } else {
        cards[optionOneId].setAttribute('src', 'images/back.jpg')
        cards[optionTwoId].setAttribute('src', 'images/back.jpg')
        resultDisplay.textContent = resultDisplay.textContent-1
      }
      cardsChosen = []
      cardsChosenId = []
      if  (cardsWon.length === cardArray.length/2) {
        alert("You won! With a score of:"+resultDisplay.textContent+"points!")
      }
    }
  
    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500)
      }
    }
  
    createBoard()
    const newgame = document.querySelector('.newGame');
    const refreshPage = () => {location.reload();}
    newgame.addEventListener('click', refreshPage)
  })