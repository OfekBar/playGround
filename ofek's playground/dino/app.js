var character= document.getElementById("dino")
var block=document.getElementById("block")
const resultDisplay=document.querySelector("#result")
const newgame = document.querySelector('.newGame');
const refreshPage = () => {location.reload();}
newgame.addEventListener('click', refreshPage
)

block.classList.add('animationSpeed0')
function jump(){
    if(character.classList != "animate"){
    character.classList.add("animate")
    setTimeout(() => {
        character.classList.remove("animate")
        
    }, 500);
    }
}

var checkDead=setInterval(() => {
    var chtop=parseInt(window.getComputedStyle(character).getPropertyValue("top"))
    var blleft=parseInt(window.getComputedStyle(block).getPropertyValue("left"))

    if(blleft<70 && blleft>20 && chtop>=130){
        block.style.animation="none"
        block.style.display="none"
        alert("You lose!")
        clearInterval(updateScore)
    }

}, 10);

let interCount=0
let neededSpeed=0
function eachAni(){
    var img=obsList[Math.floor(Math.random()*obsList.length)]
    block.style.backgroundImage="url("+img+")"
    resultDisplay.textContent=parseInt(resultDisplay.textContent)+1
    if(!(interCount==3)){
        interCount+=1
    }
    else{
        block.classList.remove("animationSpeed"+String(neededSpeed))
        if(neededSpeed<7){neededSpeed+=1}
        block.classList.add("animationSpeed"+String(neededSpeed))
        interCount=0
    }
    

}
var obsList=["images/inv2.png","images/inv3.png","images/inv6.png","images/inv7.png","images/inv8.png"]
block.addEventListener('animationiteration', eachAni)
document.addEventListener('keydown', jump)