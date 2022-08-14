const resultDisplay=document.querySelector('#result')
const choicesDisplay=document.querySelector('#choices')
const userSide=document.querySelector('#user')
const computerSide=document.querySelector('#computer')
const inTotalDisplay=document.querySelector('#total')
const choices=['rock','paper','scissors','lizard','spock']
let userWins=0
let computerWins=0
inTotalDisplay.textContent=userWins+":"+computerWins
choices.forEach(choice=>{
    const button=document.createElement('button')
    button.innerHTML=choice
    button.classList.add(choice)
    button.classList.add("plain")
    button.addEventListener('click', handleClick)
    choicesDisplay.appendChild(button)
})

function handleClick(e){
    const userChoice=e.target.innerHTML
    const computerChoice=choices[Math.floor(Math.random()*choices.length)]
    const outcome=gerResults(userChoice,computerChoice)
    resultDisplay.innerHTML=outcome
    userSide.textContent=" "+userChoice
    computerSide.textContent=" "+computerChoice
    if(outcome=="You lost!"){computerWins+=1}
    else if(outcome=="You won!"){userWins+=1}
    inTotalDisplay.textContent=userWins+":"+computerWins
}

function gerResults(userChoice,computerChoice){
    let win
    switch(userChoice){
        case 'rock':
            win=['paper','spock']
            if(win.includes(computerChoice)){
                return "You lost!"  
            } else if(computerChoice==userChoice){
                return "It's a tie!"
            }
            else{ 
                return "You won!"
            }
            break
        case 'paper':
            win=['scissors','lizard']
            if(win.includes(computerChoice)){
                return "You lost!"  
            } else if(computerChoice==userChoice){
                return "It's a tie!"
            }
            else{ 
                return "You won!"
            }
            break
        case 'scissors':
            win=['rock','spock']
            if(win.includes(computerChoice)){
                return "You lost!"  
            } else if(computerChoice==userChoice){
                return "It's a tie!"
            }
            else{ 
                return "You won!"
            }
            break
        case 'lizard':
            win=['scissors','rock']
            if(win.includes(computerChoice)){
                return "You lost!"  
            } else if(computerChoice==userChoice){
                return "It's a tie!"
            }
            else{ 
                return "You won!"
            }
            break
        case 'spock':
            win=['paper','lizard']
            if(win.includes(computerChoice)){
                return "You lost!"  
            } else if(computerChoice==userChoice){
                return "It's a tie!"
            }
            else{ 
                return "You won!"
            }
            break

    }

}
const newgame = document.querySelector('.newGame');
const refreshPage = () => {location.reload();}
newgame.addEventListener('click', refreshPage)