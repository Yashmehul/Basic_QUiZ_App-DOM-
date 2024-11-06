const quizData=[
{
    question:"Which language runs in a web browser?",
    options:["Java","C","Python","JavaScript"],
    answer:"JavaScript"
},
{
    question:"What does CSS stands for?",
    options:["Central style Sheets","Cascading Style Sheet","Cascading Simple Sheet","Cars SUVs Sailboats"],
    answer:"Cascading Style Sheet"
},
{
    question:"What does HTML stands for?",
    options:["Hypertext Markup Language","Hyperloop Machine Language","Hypertext Markdown Language","Helicopters Terminals Motorboats Lamorghinis"],
    answer:"Hypertext Markup Language"
},
{
    question:"Which year JavaScript was launched?",
    options:["1996",'1995',"1994","none of the above"],
    answer:"1995"
}

]
let current_questionIndex=0;
let score=0;

const question_div=document.getElementById("question_div");
const score_div=document.getElementById("score_div");
function loadquestion(){
    question_div.innerHTML='';//here we are clearning out the div in case of loading a new question
    //just in case of next question we will again call the same fucntion in such case ...
    //genearally what we learned previously in dom that how we were clearnig the dom 
    //making whole innerHTML =""...
    const currentQuestion=quizData[current_questionIndex];
    const question_main_div=document.createElement("div");
    //ye question kaa main div hai jidhrr hm change laaenge ... isme hei apna h2 jisme 
    //question hoga wo contain krega..
    question_main_div.setAttribute('id',"ques");
    const questionELement=document.createElement("h2");
    questionELement.innerHTML=(current_questionIndex+1)+"." +" "+currentQuestion.question;
    question_main_div.appendChild(questionELement);
    question_div.appendChild(question_main_div);
    //the whole above process is to append or render the question on the screen ......
    const options_div=document.createElement("div");
    options_div.setAttribute("id","options-id");
    currentQuestion.options.forEach(option=>{
        const button=document.createElement("button");
        button.innerHTML=option;
        button.classList.add("answer-btn");
        button.dataset.answer=option;
        options_div.appendChild(button);
        question_div.appendChild(options_div);

    })


}

function checkAnswer(selected_ans){
const correct_ans=quizData[current_questionIndex].answer;
if(correct_ans===selected_ans){
    score++;
}

if(current_questionIndex===quizData.length-1){
    const final_div=document.createElement("div");
    final_div.setAttribute("id","final_Score_div");
    const final_Score=document.createElement("h2");
    final_Score.innerHTML="Quiz finished";
    const para=document.createElement("p");
    para.innerHTML=`Your final score is:${score}`+"/"+quizData.length;
    final_div.appendChild(final_Score);
    final_div.appendChild(para);
    score_div.appendChild(final_div);
}
load_next_question();
}

function load_next_question(){
    current_questionIndex++;
    loadquestion();
    next_btn.style.display="none";
}

question_div.addEventListener("click",(e)=>{
    if(e.target.classList.contains('answer-btn')){
        checkAnswer(e.target.dataset.answer);
    }
})

loadquestion();