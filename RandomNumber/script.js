const btn = document.getElementById("btn");
const label = document.getElementById("label");

const max=6; const min=1;
let random;

btn.onclick = function(){
    random=Math.floor(Math.random()*(max-min+1)+min);
    label.textContent=random;
}