let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO = true;   //playerX, playerO
let count = 0;     //to track draw

const winPatterns = [[0,1,2],[0,3,6],
[0,4,8],[1,4,7],
[2,5,8],[2,4,6],
[3,4,5],[6,7,8],
];

const resetGame = () => {
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
    
    };


boxes.forEach((box) =>{
    box.addEventListener("click",()=>{

        if(turnO){
            box.innerText ="O";
            turnO=false;                 //set turn to O
        }
        else {
            box.innerText ="X";
            turnO=true;                  //set turn to X
        }
        box.disabled = true;
        count++;
         
        let isWinner=checkWinner();
        if(count ===9 && !isWinner){
            gameDraw();
        }
    });
});
const gameDraw =() =>{
    msg.innerText = "Game was a draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes= ()=>{
    for(let box of boxes){
        box.disabled=true;
    }

};

const enableBoxes =() =>{
    for(let box of boxes){
        box.disabled =false;
        box.innerText= "";
    }
};


const showWinner =(winner)=>{
    msg.innerText=`Congratulation, Winner is ${ winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

  const checkWinner = () => {
            for(let pattern of winPatterns ){
                
                let pos1Val= boxes[pattern[0]].innerText;                     //position1(O/X)
                let pos2Val= boxes[pattern[1]].innerText;                     //position2
                let pos3Val= boxes[pattern[2]].innerText;                     //position3
             
                if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
                    if(pos1Val === pos2Val && pos2Val === pos3Val){
                       
                        showWinner(pos1Val);
                        return true;
                    }
                }
            }
        };                       

        newGameBtn.addEventListener("click", resetGame);
       resetBtn.addEventListener("click", resetGame);
        