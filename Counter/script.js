const decreaseBtn =document.getElementById("DecrementBtn");
const increaseBtn =document.getElementById("IncreamentBtn");
const resetBtn =document.getElementById("ResetBtn");
const counter =document.getElementById("counter");


let count =0;

increaseBtn.onclick =function () {
    count++;
    counter.textContent=count;   
}

decreaseBtn.onclick=function(){
    count--;
    counter.textContent=count;
}

resetBtn.onclick=function(){
    count=0;
    counter.textContent=count;
}