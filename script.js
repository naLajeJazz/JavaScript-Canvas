let info= document.querySelector("#info"),
info2= document.querySelector("#info2"),	
canvas = document.querySelector('canvas'),
canvas2= document.querySelector('#cv'),
padraoPx=16,
startGame=false,
ctx = canvas.getContext('2d'),
ctx2 = canvas2.getContext('2d');

canvas.width=600;
canvas.height=600;
canvas.style.background="";
canvas2.width=340;
canvas2.height=600;
canvas.style.background="";
canvas2.style.background="black";
info.style.color='blue';

let telaIntro=new Obj(0,0,canvas.width,canvas.height,'','','black'),
start=new Obj(165,canvas.height/2,150,100,'press enter to start','','white'),
titulo=new Obj(165,200,250,100,'☻RCLAND','','#A66F2D'),
hudInfo=new Obj(50,20,32,32,'','','yellow'),
hudInfo2=new Obj(50,550,32,32,'','','blue'),
fonte= new Obj(Math.floor(Math.random()*20)*20+20,Math.floor(Math.random()*20)*20+20,padraoPx,padraoPx,'▒','','#0476D9'),
bau=new Obj(Math.floor(Math.random()*20)*20+20,Math.floor(Math.random()*20)*20+20,padraoPx,padraoPx,'■','','brown'),
toca=new Obj(Math.floor(Math.random()*20)*20+20,Math.floor(Math.random()*20)*20+20,padraoPx,padraoPx,'▄■▀▀■▄','','#BFBBB8'),
mouse= new Obj(0,0,padraoPx,padraoPx,'×','','yellow'),
grade=new Obj(0,0,600,600,"","","red"),
cursor=new Obj(300,300,padraoPx,padraoPx,"×","","red"),
relogio=0,
code=undefined,
pinheiros=[],
cedro=[],
loteArvores=60,
orcs=[],
loteOrcs=60,
nomes=['Rud','Nish','Belish','Wofort','Dunk','Rickt','Vold','lup'],
clr=['#D9BB29','#8CDB50'],
clr2=['white','blue','orange','green','brown','yellow'];

for(let i=0;i<loteArvores;i++){
    pinheiros[i]=new Obj(Math.floor(Math.random()*30)*20+20,Math.floor(Math.random()*30)*20+20,padraoPx,padraoPx,'♣','',clr[Math.floor(Math.random()*2)]);
    cedro[i]=new Obj(Math.floor(Math.random()*30)*20+20,Math.floor(Math.random()*30)*20+20,padraoPx,padraoPx,'♠','',clr[Math.floor(Math.random()*2)]);

};
for(let i=0;i<loteOrcs;i++){
    orcs[i]=new Obj(Math.floor(Math.random()*30)*20+20,Math.floor(Math.random()*30)*20+20,padraoPx,padraoPx,'☺',nomes[Math.floor(Math.random()*8)],clr2[Math.floor(Math.random()*6)]);
    
};

canvas.addEventListener('mousemove',function(e){
    mouse.x=e.offsetX;
    mouse.y=e.offsetY;
},false);

window.addEventListener('keydown',function(event){
code=event.keyCode;
if (code===13){startGame=true};
if (code===27){startGame=false};
},false);


setInterval(function(){

for(let i=0 ;i<loteOrcs;i++){
orcs[i].patrolState();
}
},3000);
setInterval(function(){

},4000);
setInterval(function(){
    if (startGame==true){
    relogio+=1;}
},10000);

function Obj(x,y,width,height,simbol,name,color){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.rangeX=function(){return this.x+this.width};
    this.rangeY=function(){return this.y+this.height};
    this.name=name;
    this.color=color;
    this.simbol=simbol;
    this.collideBolean=false;

    this.centerX= function(){
        return this.x + this.width/2;
        },
    this.centerY= function(){
        return this.y + this.height/2;
        }
    
    this.drawObj=function(){
        
        ctx.save();
        ctx.fillStyle=this.color;
        ctx.font = "22px Lucida Console ";
        ctx.fillText(this.name,this.x,this.y-32);
        ctx.restore(); 
        ctx.save();
        ctx.fillStyle=this.color;
        ctx.font ="32px Lucida Console";
        ctx.fillText(this.simbol,this.x,this.y,this.width);
        ctx.restore();

        this.retangulo=function(){
            ctx.save();
            ctx.fillStyle=this.color;
            ctx.fillRect(this.x+5,this.y,this.width-10,this.height-4);
            ctx.restore();
        };  
    };

    this.drawGrid=function(){
        
        ctx.save();
        ctx.globalAlpha = 0.6;
    for (var i = 0; i < 40; i ++) {
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x,600);
        ctx.stroke();
        ctx.translate(20,0);
        
        }
        ctx.restore()
    ctx.save();
    ctx.globalAlpha = 0.6;
        for (var j = 0; j < 90; j = j + 1) {
            
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(600,this.y);
            ctx.stroke();
            ctx.translate(0,20);
          }

          
          ctx.closePath()
    ctx.restore();
    };
    this.drawTextHud=function(){
        
        ctx2.save();
        ctx2.fillStyle=this.color;
        ctx2.font = "22px Lucida Console ";
        ctx2.fillText(this.simbol,this.x-38,this.y);
        ctx2.restore();
        ctx2.save();
        ctx2.fillStyle=this.color;
        ctx2.font = "20px Lucida Console ";
        ctx2.fillText(this.name,this.x,this.y+32);
        ctx2.restore(); 
    }
    
    this.patrolState=function(){
    this.dir=Math.floor(Math.random()*10);
    };

    this.patrolMove=function(spd){
    this.spd=spd;
    if(this.dir==0){this.x+=this.spd};
    if(this.dir==1){this.x-=this.spd};
    if(this.dir==2){this.y+=this.spd};
    if(this.dir==3){this.y-=this.spd};
    };
    this.beiraTela=function(){
    if (this.x+this.width>=canvas.width){this.x-=1};
    if (this.x<=0){this.x+=1};
    if (this.y>=canvas.height){this.y-=1};
    if (this.y-this.height<=0){this.y+=1};
    };
    this.collide=function(hitX,hitY,hitW,hitH){
        this.hitX=hitX;
        this.hitY=hitY;
        this.hitW=hitW;
        this.hitH=hitH;
        if(this.x<=this.hitX+this.hitW&&this.x+this.width>=this.hitX&&this.y+this.height>=this.hitY&&this.y<=this.hitY+this.hitH)
        {this.collideBolean=true}else{this.collideBolean=false};
        
    };
    this.cursorMove=function(){
        if (code===39){this.x+=20};
        if (code===38){this.y-=20};
        if (code===40){this.y+=20};
        if (code===37){this.x-=20};
code=undefined;
    };
    this.dis=function(x,y){
       this.dx= x-this.x;
       this.dy= y-this.y;
       ctx.beginPath();
ctx.moveTo(this.x,this.y);
ctx.lineTo(x, y);
ctx.stroke();
       return Math.sqrt(this.dx*this.dx+this.y*this.y);
    }
    
};

loop();		
function loop(){
requestAnimationFrame(loop,canvas);
update();
draw();
};

function update(){

if (startGame===true){
    
    cursor.cursorMove();
   cursor.dis(toca.x);

      
    for(let i=0 ;i<loteOrcs;i++){
        orcs[i].patrolMove(1);
        orcs[i].beiraTela();
       // cursor.collide(orcs[i].x,orcs[i].y,orcs[i].width,orcs[i].height);
       
     
    };

    if (relogio>23){relogio=0};
    if(relogio>=18&&relogio<=23){canvas.style.background='#395a09';hudInfo2.simbol='crepusculo/tempo limpo';};
    if(relogio>=0&&relogio<=6){canvas.style.background='#253a07';hudInfo2.simbol='madrugada/tempo limpo';};
    if(relogio>=7&&relogio<=11){canvas.style.background='#395a09';hudInfo2.simbol='nasce o dia/tempo limpo';};
    if(relogio>=12&&relogio<=17){canvas.style.background='meio dia/#49730A'};

    if( cursor.x==bau.x&&cursor.y==bau.y){
        bau.name='bau';
        hudInfo.simbol='bau';
        hudInfo.name='[vazio]';
    }else{
        bau.name='';
        hudInfo.simbol='';
        hudInfo.name='';
        };
    if( cursor.x==toca.x&&cursor.y==toca.y){
        toca.name='Toca Orc';
        hudInfo.simbol='Toca Orc';
    }else{toca.name='';};

    if( cursor.x===fonte.x&&cursor.y===fonte.y){
        fonte.name='fonte';
        hudInfo.simbol='fonte agua potavel';
        hudInfo.name='colher agua : a';
    }else{fonte.name=''};

    for (let i=0;i<loteArvores;i++){
        
        if(cursor.x==pinheiros[i].x&&cursor.y==pinheiros[i].y){
        hudInfo.simbol='pinheiro';
    };
        if(cursor.x==cedro[i].x&&cursor.y==cedro[i].y){
        hudInfo.simbol='cedro'
    };
    
    
    };

    for(i=0;i<loteOrcs;i++){
         orcs[i].collide(cursor.x,cursor.y,cursor.width,cursor.height);

        if (orcs[i].collideBolean==true){
            hudInfo.simbol=orcs[i].name;
        };
    }
    

};
};

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx2.clearRect(0,0,canvas.width,canvas.height);

if(startGame===true){
    grade.drawGrid();
    fonte.drawObj();
    bau.drawObj();
    toca.drawObj();
    cursor.drawObj();
    //cursor.dis(toca.x,toca.y);


    for(let i=0 ;i<loteArvores;i++){
        pinheiros[i].drawObj();
        cedro[i].drawObj();
    };

    for(let i=0 ;i<loteOrcs;i++){
        orcs[i].drawObj();
        orcs[i].drawObj();
        for(j=0;j<loteOrcs;j++){
        orcs[i].dis(orcs[j].x,orcs[j].y)
        };
    };
       
    hudInfo.drawTextHud();
    hudInfo2.name=`${relogio}Hrs`
    hudInfo2.drawTextHud();

};

if(startGame==false){
    telaIntro.drawObj();
    telaIntro.retangulo();
    start.drawObj();
    titulo.drawObj();
};

//info.innerHTML= `relogio = ${collideBolean}`
info2.innerHTML=`cursor.x= ${cursor.x} cursor.y = ${cursor.y}  x= ${bau.x} y= ${bau.y} `
};