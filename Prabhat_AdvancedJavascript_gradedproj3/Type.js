window.addEventListener('load',start);

let time=60;
let accuracy=80;
let KeepTyping;

//DOM

const TypedWords=document.querySelector('.typeWords');
const presentsentence=document.querySelector('.typeContent');
const score=document.querySelector('.accuracy');
const timeleft=document.querySelector('.sec');
const WPMDisplay=document.querySelector('.WM');
const CPMDisplay=document.querySelector('.CM');
const errordisplay=document.querySelector('.errors');
const messagedisplay=document.querySelector('#message');
const reload=document.querySelector('button');
const speedW=document.querySelector('#WPM');
const speedC=document.querySelector('#CPM');


const content=
[
    "India's defence exports at record Rs 13,000 crore, 70% from private sector1 sec ago.",
    "Live: Death toll mounts to 16 in Amarnath cloudburst",
    "How Hindu numbers became Arabic numerals.",
    "Live: 90-member task force to probe Shinzo Abe murder case.",
    "Chinese fighter flew 'very close' to Indian post along LAC.",
    "5G technology will soon"
];

function start()
{
console.log('start');

TypedWords.addEventListener('input',updateWPM);
TypedWords.addEventListener('input',updateCPM);

TypedWords.addEventListener('click',()=>{
    setInterval(Timer,1000);   
    });

    reload.addEventListener("click",function(){
        location.reload();
    });

    displayWPMCPM();
 } 
//display contents
displayContent(content);

//checktypingstatus 
setInterval(checkstatus,50);




TypedWords.addEventListener('input',()=>{
    const arrayContent=presentsentence.querySelectorAll('span');
    const arrayInput=TypedWords.value.split('');
    const next=true;
    
    arrayContent.forEach((characterSpan,index)=>{
        const character=arrayInput[index]
       
        if(character==null)
        {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
          

        } 
        else if (character===characterSpan.innerText){
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
           
        }
         else
         {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
           
        }
    });
 
});

//count errors

TypedWords.addEventListener('input',()=>{
    const arrayr=presentsentence.querySelectorAll('span');
    const arrayt=TypedWords.value.split('');
    var count=0;
    arrayr.forEach((characterSpan,index)=>{

        const character=arrayt[index]

        if (character===characterSpan.innerText){
            count++;
            
        console.log(TypedWords.value.length-count);
           
        errordisplay.innerHTML=TypedWords.value.length-count;
        const c=(count/TypedWords.value.length)*100;
         score.innerHTML=c.toFixed(2);
        }

    });

});



function displayContent(content)
 {
    const Index= Math.floor(Math.random()*content.length);
    //output random sentence
   
    presentsentence.innerHTML='';
  Quote= content[Index];
  Quote.split('').forEach(character=>{
    const characterSpan=document.createElement('span')
    characterSpan.innerText=character;
    presentsentence.appendChild(characterSpan);

  });
  TypedWords.value=null;
}


function updateCPM()
{
    const Wordscount = (text)=>{
        const words=text.split('')
       
        return words.length;
    }
  CPMDisplay.innerHTML=Wordscount(TypedWords.value);
 }

 function updateWPM()
{
    const Wordscount = (text)=>{
        const words=text.split(' ')
       
        return words.length;
    }
  WPMDisplay.innerHTML=Wordscount(TypedWords.value);
}


function Timer()
{
    if(time>0)
    {
        time--;
    }
    else if(time===0)
    {
        KeepTyping=false;
    }
     //update time
     timeleft.innerHTML=time;
}

    


function checkstatus(){
    if(!KeepTyping&& time===0)
    {
        messagedisplay.innerHTML='Times Up';
        speedC.style.backgroundColor="pink";
        speedW.style.backgroundColor="pink";
    }
}



function matchWords(){
    if(TypedWords.value===presentsentence.innerHTML)
    {
        messagedisplay.innerHTML='Correct!!!';
        return true;
    }
     
}


