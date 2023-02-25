let buttonColours = {
    1 : "green",
    2 : "red",
    3 : "yellow",
    4 : "blue"
};

var flag = true;
var level = 0;
var gamePattern=[];
var ind = 0;

document.addEventListener("keydown", function(){
    if(flag===true){
        flag = false;
        level = 0;
        gamePattern=[];
        levelUp();
    }
});   

var size = document.querySelectorAll(".btn").length;
for(let i=0; i<size; i++)
{
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
        if(flag===false)
        {
            if(gamePattern[ind]!=i)
            {
                let audio = new Audio("sounds/wrong.mp3");
                audio.play();
                document.querySelector("#level-title").innerHTML = "Wrong Answer";
                wrongAnsAnimation();
                level = 0;
                gamePattern = [];
                ind = 0;
                flag = true;        
                document.querySelector("#level-title").innerHTML = "Press any key to restart"; 
            }
            else
            {
                playSound(i+1);
                selectAnimation(i+1);
                ind++;
                if(ind==gamePattern.length)
                {
                    setTimeout(() => {
                        levelUp();
                    }, 1000);
                }
            }
        }
    });
    
}

function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    return randomNumber;
}

function selectAnimation(num){
    document.querySelector("."+ buttonColours[num]).classList.add('pressed');
    setTimeout(function () {
        document.querySelector("."+ buttonColours[num]).classList.remove('pressed');
    }, 200);
}

function wrongAnsAnimation(){
    document.querySelector("body").classList.add('red');
    setTimeout(function () {
        document.querySelector("body").classList.remove('red');
    }, 500);
}

function levelUp(){
    level++;
    document.querySelector("#level-title").innerHTML = `Level ${level}`;
    let rand = nextSequence();
    playSound(rand);
    gamePattern.push(rand-1);
    ind = 0;
    console.log(gamePattern);
}

function playSound(rand){
    let str = "sounds/" + buttonColours[rand] + ".mp3";
    let audio = new Audio(str);
    audio.play();
    selectAnimation(rand);
}