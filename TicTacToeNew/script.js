var h1=document.getElementsByTagName('h1')[0];
var sec=0;
var min=0;
var t;
var windowel=document.querySelector('.window');
windowel.style.cssText=`
display:flex;
visibility:hidden;
opacity:0;
transition:opacity 300ms ease-in-out;
`;


var openwindow=()=>{
    windowel.style.visibility='visible';
    windowel.style.opacity='1';
    checkwinner();
    clearInterval(r)
}


var newgame = event=>{
    var target=event.target;
    if (target==target.closest('.new_game')){
        windowel.style.opacity=0;
        windowel.style.visibility='hidden';
        newg();
    }
}



windowel.addEventListener('click',newgame)




var game=document.querySelector('.game'); 
var pole=document.querySelectorAll('.pole');
var CPlayer=document.getElementById('CPlayer');
var winer='K';
var step=false;
var count=0;
   var circle=`<svg class="null">
    <circle r="40" cx="48" cy="50" stroke="red" stroke-width="8" fill="none" stroke-linecap="round"/>
</svg>`;

var cross=`<svg class="cross">
<line class="one" x1="15" y1="15" x2="85" y2="85" stroke="#012b01" stroke-width="8" stroke-linecap="round" />
<line class="two" x1="85" y1="15" x2="15" y2="85" stroke="#012b01" stroke-width="8" stroke-linecap="round" />
</svg>`;
var statx=0;
var stato=0;

function stepNull(target){
    if(target.tagName == 'svg' || target.tagName == 'line' || target.tagName == 'circle') {
        return;
    }
    
target.innerHTML=circle;
target.classList.add('O');
count++;
step=false;
}
function stepCross(target){
if(target.tagName == 'svg' || target.tagName == 'line' || target.tagName == 'circle') {
    return;
}
target.innerHTML=cross;
target.classList.add('X');
count++
step=true;
}


function init(e){
    if (!step) { CPlayer.innerHTML='O';stepCross(e.target)}
    else { CPlayer.innerHTML='X';stepNull(e.target)};
    win();

    
}
function time(){
    r=setInterval(add,1000);
}
function tick(){
    sec++;
    if (sec>=60){
        sec=0;
        min++;
    }

}
function add(){
    tick();
    h1.textContent=(min>9?min:"0"+min)
    +":"+(sec>9?sec:"0"+sec);
}

function checkwinner(){

    if (winer=='X'){
        document.getElementById('winers').innerHTML='Победил<br>X'
    }
    else if (winer=='O'){
        document.getElementById('winers').innerHTML='Победил<br>O'
    }
    else if (winer=='R'){
        document.getElementById('winers').innerHTML='Ничья'
    }

}
time();
openwindow();


game.addEventListener('mouseup',init,false);
function win(){
    var winnum=[
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
    ];
for (var i=0;i<winnum.length;i++){
   if (pole[winnum[i][0]].classList.contains('X') &&
    pole[winnum[i][1]].classList.contains('X') &&
    pole[winnum[i][2]].classList.contains('X')) {
            pole[winnum[i][0]].classList.add('winx');
            pole[winnum[i][1]].classList.add('winx');
            pole[winnum[i][2]].classList.add('winx');
            statx++;
            game.removeEventListener('mouseup',init,false);
            setTimeout(()=>{
                winer='X';
                openwindow();
                },1500);
                return;
            }
else if (pole[winnum[i][0]].classList.contains('O') &&
pole[winnum[i][1]].classList.contains('O') &&
pole[winnum[i][2]].classList.contains('O')) {
        pole[winnum[i][0]].classList.add('wino');
        pole[winnum[i][1]].classList.add('wino');
        pole[winnum[i][2]].classList.add('wino');
        stato++;
        game.removeEventListener('mouseup',init,false);

        setTimeout(()=>{

            winer='O';
        openwindow();
        },1500);
        return;
}
}

for (var i=0;i<winnum.length;i++){
if(count==9) {
    pole[winnum[i][0]].classList.add('winr');
    pole[winnum[i][1]].classList.add('winr');
    pole[winnum[i][2]].classList.add('winr');
    game.removeEventListener('mouseup',init,false);

    setTimeout(()=>{
        winer='R';
        openwindow();
        },1500)}
    }
    return;
}


function newg(){
    step=false;
    count=0;
    sec=0;
    min=0
    time();
    CPlayer.innerHTML='X';
    pole.forEach(item=>{
        item.innerHTML='';
        item.classList.remove('X','O','wino','winx','winr');
        game.addEventListener('mouseup',init);
    }
    )
    updateStat();
}



function updateStat(){
    document.getElementById('sX').innerHTML=statx;
    document.getElementById('sO').innerHTML=stato;
}
