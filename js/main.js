//Get nodes
const colorBox = document.querySelector("#color-box");
const colorBtn = document.querySelector("#color-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
const darkenBtn = document.querySelector("#darken-btn");
const lightenBtn = document.querySelector("#lighten-btn");
const ereaseBtn = document.querySelector("#erease-btn");
const clearBtn = document.querySelector("#clear-btn");
const grid16Btn = document.querySelector("#grid16px");
const grid32Btn = document.querySelector("#grid32px");
const grid64Btn = document.querySelector("#grid64px");

const gameCanvas = document.querySelector("#game");

//Game settings
let gridSize = 16;
let selectedColor = "#ff5154";
let selectedMode = 0;

init(); // initalize game

//Initaliaze game
function init(){
    gridSize = 16;
    grid16Btn.classList.toggle("btn-selected");
    colorBox.value = selectedColor;
    createGrid();
}

//Grid
function createGrid(){
    const totalBlocks = gridSize**2;
    const blocks = [];
    for(let i=0; i<totalBlocks; i++){
        const element = document.createElement('div');
        element.classList.add("block");
        blocks.push(element);
    }
    for(const element of blocks){
        gameCanvas.appendChild(element);
    }

    gameCanvas.style = `
    display: grid;
    grid-template-columns: repeat(${gridSize}, 1fr);
    grid-template-rows: repeat(${gridSize}, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px; `;

}

function deleteGrid(){
    gameCanvas.replaceChildren();
}

function changeGridSize(e){
    switch(e.target.id){
        case "grid16px":
            gridSize = 16;
            grid16Btn.classList.add("btn-selected");
            grid32Btn.classList.remove("btn-selected");
            grid64Btn.classList.remove("btn-selected");
            break;
        case "grid32px":
            gridSize = 32;
            grid16Btn.classList.remove("btn-selected");
            grid32Btn.classList.add("btn-selected");
            grid64Btn.classList.remove("btn-selected");
            break;
        case "grid64px":
            gridSize = 64;
            grid16Btn.classList.remove("btn-selected");
            grid32Btn.classList.remove("btn-selected");
            grid64Btn.classList.add("btn-selected");
            break;
    }
    deleteGrid();
    createGrid();
}

// Drawing

function draw(e){
    let color = selectedColor;
    if(e.target === gameCanvas) { return; }
    if(e.buttons === 1 || e.type == "mousedown"){
        switch(selectedMode){
            case 0:
                color = selectedColor;
                break;
            case 1:
                color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
                break;
            case 2:
                color = pSBC(-0.2, e.target.style.backgroundColor);
                break;
            case 3:
                color = pSBC(0.2, e.target.style.backgroundColor);
                break;
            case 4:
                color = "#fdf7fa";
                break;
            default:
                color = selectedColor;
                break;
        }
        e.target.style = `background-color: ${color};`;
        console.log(e.target.style.backgroundColor);
    }
}

//Settings and modes
function colorChange(e){
    console.log(e.target.value);
    selectedColor = `${e.target.value}`;
}

function modeSelecet(e){
    switch(e.target.id){
        case "color-btn":
            selectedMode = 0;
            selectModeButton(colorBtn);
            break;
        case "rainbow-btn":
            selectedMode = 1;
            selectModeButton(rainbowBtn);
            break;
        case "darken-btn":
            selectedMode = 2;
            selectModeButton(darkenBtn);
            break;
        case "lighten-btn":
            selectedMode = 3;
            selectModeButton(lightenBtn);
            break;
        case "erease-btn":
            selectedMode = 4;
            selectModeButton(ereaseBtn);
            break;
        default:
            selectedMode = 0;
            break;
    }
    console.log(selectedMode)
}

function selectModeButton(btnRef){
    colorBtn.classList.remove("btn-selected");
    rainbowBtn.classList.remove("btn-selected");
    darkenBtn.classList.remove("btn-selected");
    lightenBtn.classList.remove("btn-selected");
    ereaseBtn.classList.remove("btn-selected");
    btnRef.classList.add("btn-selected");
}

function clearCanvas(){
    deleteGrid();
    createGrid();
}

//Event listeners
gameCanvas.addEventListener('mouseover', draw);
gameCanvas.addEventListener('mousedown', draw);

colorBox.addEventListener('change', colorChange);

colorBtn.addEventListener('click', modeSelecet);
rainbowBtn.addEventListener('click', modeSelecet);
darkenBtn.addEventListener('click', modeSelecet);
lightenBtn.addEventListener('click', modeSelecet);
ereaseBtn.addEventListener('click', modeSelecet);
clearBtn.addEventListener('click', clearCanvas);

grid16Btn.addEventListener('click', changeGridSize);
grid32Btn.addEventListener('click', changeGridSize);
grid64Btn.addEventListener('click', changeGridSize);


// FROM STACK OVERFLOW
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}
