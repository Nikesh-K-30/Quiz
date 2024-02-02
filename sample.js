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
   const url=`https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
   fetch(url)
      .then((res)=>res.json())
      .then((data)=>{
      questions=data.results;
      startscreen.classList.add("hide");
      quiz.classList.remove("hide");
      currentQuestion=1;
      showQuestion(questions[0]);
   });
};
startBtn.addEventListener("click",startquiz);
const submitBtn=document.querySelector(".submit"),
nextBtn=document.querySelector(".next");


const showQuestion=(question)=>{
   const questionText=document.querySelector(".question"),
   answerWrapper = document.querySelector(".answerwrapper"),
   questionNumber=document.querySelector(".number");
   questionText.innerHTML=question.question;
   const answers=[
      ...question.incorrect_answers,
      question.correct_answer.toString()
   ];
   answers.sort(()=>Math.random()-0.5);
   answerWrapper.innerHTML="";
   answers.forEach((answer)=>{
      answerWrapper.innerHTML +=`
      <div class="answer">
      <span class="text">${answer}</span>
      <span class="checkbox">
          <span class="icon">!</span>
      </span>
  </div>
      `;
   });
   questionNumber.innerHTML=`
   Question <span class="current">${questions.indexOf(question)+1}
   </span>
   <span class="total">   
   /${questions.length}</span>   
   `;
   const answerDiv=document.querySelectorAll(".answer");
   answerDiv.forEach((answer)=>{
      answer.addEventListener("click",()=>{
         if (!answer.classList.contains("checked")){
            answerDiv.forEach((answer)=>{
               answer.classList.remove("selected");
            });
            answer.classList.add("selected");
            submitBtn.disabled=false;
         }
      });
   });
   time=timeperques.value;
   startTimer(time);
}



const startTimer=(time)=>{
   timer=setInterval(()=>{
      if (time>=0){
         progress(time);
         time--;
      }
      else{
         checkAnswer();
      }
   },1000);
};
submitBtn.addEventListener("click",()=>{
   checkAnswer()
});
const checkAnswer=()=>{
   clearInterval(timer);

   const selectedAnswer=document.querySelector(".answer.selected");
   if (selectedAnswer){
      const answerText=selectedAnswer.querySelector(".text").innerHTML;
      if (answerText === questions[currentQuestion-1].correct_answer){
         score++;
         selectedAnswer.classList.add("correct");
      }
      else{
         selectedAnswer.classList.add("wrong");
         const correctAnswer=document.querySelectorAll(".answer").forEach((answer)=>{
            if(answer.querySelector(".text").innerHTML===questions[currentQuestion-1].correct_answer)
               {
                  answer.classList.add("correct");
               }
         });
      }
   }
};