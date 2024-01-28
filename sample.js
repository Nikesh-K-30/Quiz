const progress_bar=document.querySelector(".progressbar"),
progress_text=document.querySelector(".progresstext");
const progress=(value) => {
   const percentage=(value/time)*100;
   progress_bar.style.width= `${percentage}%`;
   progress_text.innerHTML=`${value}`;
 };
let questions=[],
time=30,
score=0,
currentQuestion,
timer;
const startBtn=document.querySelector(".start"),
numQues=document.querySelector("#numquestions"),
category=document.querySelector("#category"),
difficulty=document.querySelector("#difficulty"),
timeperques=document.querySelector("#time"),
quiz=document.querySelector(".quiz"),
startscreen=document.querySelector(".startscreen");
const startquiz=() =>{
   const num= numQues.value;
   cat=category.value;
   diff=difficulty.value;
   console.log(0)
   const url=`https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
   fetch(url)
      .then((res)=>res.json())
      .then((data)=>{
         questions=data.results;
      console.log(questions);
   });
   console.log(9)
};
startBtn.addEventListener("click",startquiz);