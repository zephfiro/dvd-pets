var gt=Object.defineProperty;var vt=(c,e,t)=>e in c?gt(c,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[e]=t;var a=(c,e,t)=>(vt(c,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const d of n)if(d.type==="childList")for(const h of d.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function t(n){const d={};return n.integrity&&(d.integrity=n.integrity),n.referrerPolicy&&(d.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?d.credentials="include":n.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(n){if(n.ep)return;n.ep=!0;const d=t(n);fetch(n.href,d)}})();const It={default:"/src/sprites/catricio/catricio-1.png",grab:"/src/sprites/catricio/catricio-2.png"},F="/src/sprites/upgrades",G=[{type:"tomato_ball",target:"catomato",name:"Bola de tomate",description:"Uma bola identica a um tomate, os gatos adoram brincar com ela, ele corre bastante pra pega-la aumentando sua velocidade em 20%",price:250,spritPath:`${F}/tomato_ball.png`,increment:1.2},{type:"tomato_rice",target:"catomato",name:"Comida de gato",description:"Um tipo de comida especial para gatos tomates, eles ficam satisfeitos por mais tempo aumentando a geração de love em 10%",price:2500,spritPath:`${F}/tomato_rice.png`,increment:1.1},{type:"tomato_toy",target:"catomato",name:"Brinquedo de tomate",description:"Todos os seus gatos tomates adoram esse brinquedo, para cada gato tomate que você tem, você ganha 1% de geração de love a mais",price:25e3,spritPath:`${F}/tomato_toy.png`,increment:1.01},{type:"butter",target:"breadoggo",name:"Manteiga",description:"Uma manteiga especial para cachorros pães, CHEGA A MANTEIGA DERRETE, aumentando a geração de love em 20%",price:2500,spritPath:`${F}/butter.png`,increment:1.2},{type:"buttery_bone",target:"breadoggo",name:"Osso Amanteigado",description:"Um osso delicinha para os seus cachorros pães, eles são totalmente atraidos por ele, aumentando a sua velocidade em 10%",price:25e3,spritPath:`${F}/buttery_bone.png`,increment:1.1},{type:"catricio_fan",target:"catricio",name:"Fã do Catricio",description:"Você gosta tanto do Catricio que faz o melhor cafuné do mundo dobrando seu love por Carinho",price:100,increment:2},{type:"pet_lover",target:"catricio",name:"Amante de Pets",description:"Você ama tanto seus pets que eles ficam mais felizes com você, aumentando seu love por Carinho para cada pet que você tem em 1",price:1e3,increment:1}],W=()=>{const c=(u,l)=>Math.random()<.5?u:l,e=()=>Math.random().toString(36).substring(2,9),t=(u,l)=>!u||!l?!1:Object.keys(u).every(g=>u[g]===l[g])&&Object.keys(l).every(g=>u[g]===l[g]),o=(u,l)=>({x:Math.random()*u,y:Math.random()*l}),n=async u=>new Promise((l,g)=>{const I=new Image;I.src=u,I.onload=()=>{const P=I.naturalWidth*5,x=I.naturalHeight*5;d(I,P,x).then(r=>{const v=document.createElement("canvas"),T=v.getContext("bitmaprenderer");v.width=r.width,v.height=r.height,T.transferFromImageBitmap(r),v.toBlob(U=>l({blob:U,width:P,height:x,url:URL.createObjectURL(U)}))})},I.onerror=g}),d=async(u,l,g)=>await createImageBitmap(u,{resizeWidth:l,resizeHeight:g,resizeQuality:"pixelated"}),h=(u,l)=>u.filter(g=>g.state.type===l),f=u=>Math.ceil(Math.round(u*100))/100;return{randomFlip:c,uuid:e,isSameObject:t,getRandomPosition:o,createBitmapImage:d,createSprite:n,filterPetsByType:h,roundUp:f,getPetPrice:(u,l)=>{const g=l.INCREMENT_PET_BUY+1,I=h(u,l.TYPE).reduce(P=>g*P,l.PRICE);return Math.floor(f(I))},sortByAsc:(u,l)=>u>l?1:u<l?-1:0}},B=class{constructor(e,t,o=W){a(this,"utils",null);a(this,"ctx",null);a(this,"filterColor",null);a(this,"canvas",null);a(this,"collisionCount",0);a(this,"gameInstance",null);a(this,"gameCanvasInstance",null);a(this,"bitmapImage",null);a(this,"state",{id:null,name:"",type:"",spritePath:"",width:0,height:0,sprite:null,position:{x:0,y:0},speed:{x:0,y:0},score:0,spriteDirection:null,improviments:[]});this.utils=o(),this.gameInstance=e,this.gameCanvasInstance=e.canvasState,this.setInitialState(t),this.createSprite(),this.state.improviments.forEach(n=>this.setBonusTimeout(n))}setInitialState({name:e,type:t,width:o,height:n,position:d,scoreIncrement:h,speed:f,spriteDirection:_,sprite:L,spritePath:u,improviments:l,score:g}){Object.assign(this.state,{name:e,type:t,id:this.createId(),scoreIncrement:h??B.DEFAULT_SCORE_INCREMENT,bonusMultiplier:B.BONUS_MULTIPLIER,speed:this.getSpeed(f),direction:{x:this.utils.randomFlip(1,-1),y:this.utils.randomFlip(1,-1)},width:o??this.gameInstance.sprites.pets[t].width,height:n??this.gameInstance.sprites.pets[t].height,sprite:L??this.gameInstance.sprites.pets[t].blob,position:this.getPosition(d),spriteDirection:_??null,spritePath:u,improviments:l??[],score:g??0})}createSprite(){this.utils.createBitmapImage(this.state.sprite,this.state.width,this.state.height).then(e=>{this.bitmapImage=e,this.createImageCanvas()})}getInfo(){return this.state}getSpeed({x:e=B.DEFAULT_SPEED_X,y:t=B.DEFAULT_SPEED_Y}={}){return{x:e,y:t}}getPosition({x:e=500,y:t=500}={}){return{x:e,y:t}}createId(){const e=this.utils.uuid();return this.gameInstance.pets.some(t=>t.state.id===e)?this.createId():e}move(){this.canvas&&(this.incrementPosition(),this.checkCollision(),this.dispachScore(),this.render(),this.collisionCount=0)}incrementPosition(){const{incrementX:e,incrementY:t}=this.getIncrementSpeed();this.state.position.x+=e,this.state.position.y+=t}getIncrementSpeed(){const e=100/this.gameInstance.fps,t=this.getBonusIncrementSpeed(),o=this.state.speed.x*this.state.direction.x*e*t,n=this.state.speed.y*this.state.direction.y*e*t;return{incrementX:o,incrementY:n}}getBonusIncrementSpeed(){return this.hasBonus()?B.BONUS_MULTIPLIER_SPEED:1}createImageCanvas(){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.ctx.imageSmoothingEnabled=!1,this.canvas.width=this.state.width,this.canvas.height=this.state.height,this.renderImage()}renderImage(){const{spriteDirection:e,direction:t}=this.state;this.clearImage(),e&&t.x!==e?this.invertImageDirection():this.ctx.drawImage(this.bitmapImage,0,0)}clearImage(){this.ctx.clearRect(0,0,this.state.width,this.state.height)}invertImageDirection(){this.ctx.save(),this.ctx.scale(-1,1),this.ctx.drawImage(this.bitmapImage,this.state.width*-1,0),this.ctx.scale(1,1),this.ctx.restore()}render(){(this.collisionCount>0||this.hasBonus())&&(this.renderImage(),this.applyColorFilter(this.getRandomColor())),this.gameCanvasInstance.ctx.drawImage(this.canvas,this.state.position.x,this.state.position.y)}hasBonus(){return this.state.improviments.some(({type:e})=>e==="bonus")}getRandomColor(){const e={r:this.utils.randomFlip(0,1),g:this.utils.randomFlip(0,1),b:this.utils.randomFlip(0,1)};return Object.values(e).every(o=>o===0)||this.utils.isSameObject(e,this.filterColor)?this.getRandomColor():(this.filterColor=e,e)}applyColorFilter({r:e,g:t,b:o}){const n=new Path2D;n.rect(0,0,this.state.width,this.state.height),this.ctx.clip(n);const d=this.ctx.getImageData(0,0,this.state.width,this.state.height);for(let h=0;h<d.data.length;h+=4)d.data[h+3]>0&&(d.data[h]*=e,d.data[h+1]*=t,d.data[h+2]*=o);this.ctx.putImageData(d,0,0)}setScoreIncrement(e){this.state.scoreIncrement=e}setSpeed(e){Object.assign(this.state.speed,e)}setPosition(e){Object.assign(this.state.position,e)}remove(){this.gameInstance.pets=this.gameInstance.pets.filter(e=>e.state.id!==this.state.id)}dispachScore(){if(this.collisionCount===1){const e=this.utils.roundUp(this.state.scoreIncrement*this.getBonusScoreIncrement());this.gameInstance.incrementScore(e,"pet",this.state),this.state.score+=e}if(this.collisionCount===2){const e=this.getBonusScoreIncrement(),t=this.utils.roundUp(this.state.scoreIncrement*this.state.bonusMultiplier*e);this.gameInstance.incrementScore(t,"pet",this.state),this.state.score+=t,this.setSpecialBonus()}}setSpecialBonus(){const e={time:1e4,increment:10,type:"bonus"};this.state.improviments.push(e),this.setBonusTimeout(e)}setBonusTimeout(e){setTimeout(()=>this.state.improviments.shift(),e.time)}getBonusScoreIncrement(){return this.state.improviments.reduce((e,t)=>e*t.increment,1)}checkCollision(){const{x:e,y:t}=this.state.position,{width:o,height:n}=this.state,{width:d,height:h}=this.gameCanvasInstance;e+o>=d&&(this.state.direction.x*=-1,this.state.position.x=d-o,this.collisionCount++),e<=0&&(this.state.direction.x*=-1,this.state.position.x=0,this.collisionCount++),t+n>=h&&(this.state.direction.y*=-1,this.state.position.y=h-n,this.collisionCount++),t<=0&&(this.state.direction.y*=-1,this.state.position.y=0,this.collisionCount++)}};let m=B;a(m,"DEFAULT_WIDTH",150),a(m,"DEFAULT_HEIGHT",150),a(m,"DEFAULT_SPEED_X",4),a(m,"DEFAULT_SPEED_Y",3),a(m,"DEFAULT_SCORE_INCREMENT",1),a(m,"SPRIT_LEFT_DIRECTION",-1),a(m,"SPRIT_RIGHT_DIRECTION",1),a(m,"BONUS_MULTIPLIER",100),a(m,"BONUS_MULTIPLIER_SPEED",1.5),a(m,"BASE_SPRITE_PATH","/src/sprites/pets"),a(m,"INCREMENT_PET_BUY",.2);const j=class extends m{constructor(e,t,o){const n={...t,name:"Catomato",type:j.TYPE,spriteDirection:m.SPRIT_LEFT_DIRECTION,spritePath:j.SPRITE_PATH};super(e,n,o)}getIncrementSpeed(){const e=this.gameInstance.improviments,{incrementX:t,incrementY:o}=super.getIncrementSpeed(),n=e.reduce((d,h)=>this.getBonusIncrement(h)*d,1);return{incrementX:t*n,incrementY:o*n}}getBonusIncrement(e){return e.type==="tomato_ball"?e.increment:1}getBonusScoreIncrement(){return this.gameInstance.improviments.reduce((o,n)=>this.getBonusScore(n)*o,super.getBonusScoreIncrement())}getBonusScore(e){if((e==null?void 0:e.type)==="tomato_rice")return e.increment;if((e==null?void 0:e.type)==="tomato_toy"){const t=this.gameInstance.pets.filter(o=>o.state.type==="catomato");return e.increment*t.length}return 1}};let w=j;a(w,"SPRITE_PATH",`${m.BASE_SPRITE_PATH}/catomato.png`),a(w,"NAME","Catomato"),a(w,"PRICE",25),a(w,"TYPE","catomato");const q=class extends m{constructor(e,t,o){const n={...t,name:"Cachorrinho fia da puta",type:q.TYPE,spritePath:q.SPRITE_PATH,spriteDirection:m.SPRIT_LEFT_DIRECTION};super(e,n,o)}};let A=q;a(A,"SPRITE_PATH",`${m.BASE_SPRITE_PATH}/scarry_dog.webp`),a(A,"NAME","Cachorrinho fia da puta"),a(A,"PRICE",666),a(A,"TYPE","scarry_dog");const N=class extends m{constructor(e,t,o){const n={...t,name:"DogPao",type:N.TYPE,spriteDirection:m.SPRIT_LEFT_DIRECTION,spritePath:N.SPRITE_PATH,scoreIncrement:N.DEFAULT_SCORE_INCREMENT};super(e,n,o)}getIncrementSpeed(){const e=this.gameInstance.improviments,{incrementX:t,incrementY:o}=super.getIncrementSpeed(),n=e.reduce((d,h)=>this.getBonusIncrement(h)*d,1);return{incrementX:t*n,incrementY:o*n}}getBonusIncrement(e){return e.type==="buttery_bone"?e.increment:1}getBonusScoreIncrement(){return this.gameInstance.improviments.reduce((o,n)=>this.getBonusScore(n)*o,super.getBonusScoreIncrement())}getBonusScore(e){return(e==null?void 0:e.type)==="butter"?e.increment:1}};let C=N;a(C,"SPRITE_PATH",`${m.BASE_SPRITE_PATH}/breadoggo.png`),a(C,"NAME","Breadoggo"),a(C,"PRICE",250),a(C,"DEFAULT_SCORE_INCREMENT",5),a(C,"TYPE","breadoggo");const D=class extends m{constructor(e,t,o){const n={...t,name:"Dripturtle",type:D.TYPE,spriteDirection:m.SPRIT_LEFT_DIRECTION,spritePath:D.SPRITE_PATH,scoreIncrement:D.DEFAULT_SCORE_INCREMENT};super(e,n,o)}};let S=D;a(S,"SPRITE_PATH",`${m.BASE_SPRITE_PATH}/dripturtle.png`),a(S,"NAME","Dripturtle"),a(S,"PRICE",500),a(S,"DEFAULT_WIDTH",170),a(S,"DEFAULT_HEIGHT",150),a(S,"DEFAULT_SCORE_INCREMENT",10),a(S,"TYPE","dripturtle");const M=class extends m{constructor(e,t,o){const n={...t,name:"Bananhamster",type:M.TYPE,spriteDirection:m.SPRIT_LEFT_DIRECTION,spritePath:M.SPRITE_PATH,scoreIncrement:M.DEFAULT_SCORE_INCREMENT};super(e,n,o)}};let y=M;a(y,"SPRITE_PATH",`${m.BASE_SPRITE_PATH}/bananamster.png`),a(y,"NAME","Bananhamster"),a(y,"PRICE",1250),a(y,"DEFAULT_WIDTH",130),a(y,"DEFAULT_HEIGHT",150),a(y,"DEFAULT_SCORE_INCREMENT",25),a(y,"TYPE","bananamster");const Y={scarry_dog:A,catomato:w,breadoggo:C,dripturtle:S,bananamster:y},Et=c=>{const e=W(),t=()=>`
            <div id="score">
                <span class="text-danger" id="points">${c.score}</span>
                <h5 class="text-dark font-wight-bold" id="loves">Loves❤️</h5>
            </div>
        `,o=()=>`
            <div id="catricio">
                <img class="grabbable" draggable="false" src="${c.sprites.catricio.default.url}" />
                <div id="name">
                    <span>Catricio</span>
                </div>
            </div>
        `,n=()=>`
            <div id="shop-btn-container">
                <button id="shop-button">Shop</button>
            </div>
        `,d=(r=c.pets[0])=>{var v;return`
            <div id="pet-card">
                <div id="card">
                    <div id="pet-photo">
                        ${r?`<img draggable="false" src="${(v=c.sprites.pets[r.state.type])==null?void 0:v.url}" />`:"???"}
                    </div>
                    <div id="pet-attributes">
                        <p id="pet-name">[seu pet aqui]</p>
                        <p id="pet-personal-stats">as informações do seu pet aparecerá aqui</p>
                    </div>
                </div>
            </div>
        `},h=()=>c.pets.map(r=>`
                    <div id="pet-item">
                        <img draggable="false" src="${c.sprites.pets[r.state.type].url}" />
                    </div>
                `).join(""),f=()=>`
            <div class="d-flex align-itens-center justify-content-center h-100 w-100 postion-relative">
                ${_()}
                <div id="game-score">
                    ${t()}
                    ${o()}
                    ${n()}
                </div>
                <div id="canvas"></div>
                <div id="pet-infos">
                    ${d()}
                    <div id="owned-pets">
                        ${h()}
                    </div>
                </div>
            </div>
        `,_=(r=!0)=>`
            <div id="shop" class="${r?"hidden":""}">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <div class="nav-link active" data-nav="pets">PETS</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" data-nav="improviments">Melhorias</div>
                    </li>
                </ul>

                ${L()}
            </div>
        `,L=()=>`
            <div id="shop-content">
                <div shop-nav-content id="pets" class="d-flex flex-column">
                    ${u()}
                </div>
                <div shop-nav-content id="improviments" class="d-none flex-column">
                    ${P()}
                </div>
            </div>
        `,u=()=>Object.values(Y).filter(r=>r.TYPE!=="scarry_dog").sort((r,v)=>e.sortByAsc(r.PRICE,v.PRICE)).map(r=>I(r)).join(""),l=r=>{$(`[data-pet-type="${r.TYPE}"]`).closest("#shop-item").replaceWith(I(r))},g=r=>{$(`[data-improviment-type="${r.type}"]`).closest("#shop-item").replaceWith(x(r,!0))},I=r=>`
            <div id="shop-item">
                <div class="card" data-pet-type="${r.TYPE}" title="Comprar">
                    <div class="card-body d-flex px-2">
                        <div class="shop-pet-img">
                            <img
                                draggable="false"
                                class="img-fluid"
                                src="${c.sprites.pets[r.TYPE].url}" />
                        </div>
                        <div class="item-info d-flex flex-column w-100">
                            <div class="d-flex justify-content-between w-100 aling-items-center">
                                <div id="shop-item-name">
                                    <h4 class="mb-0">${r.NAME}</h4>
                                </div>
                                <div id="shop-item-price" class="text-danger">
                                    <span>${e.getPetPrice(c.pets,r)}❤️</span>
                                </div>
                            </div>
                            <small class="colision-info font-wight-bold mt-1">
                                Gera
                                <span class="text-danger">${r.DEFAULT_SCORE_INCREMENT}❤️</span>
                                por colisão
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `,P=()=>G.sort((r,v)=>e.sortByAsc(r.price,v.price)).map(r=>{const v=c.improviments.some(({type:T})=>T===r.type);return x(r,v)}).join(""),x=(r,v=!1)=>{const T=r.target==="catricio"?c.sprites.catricio.default:c.sprites.improviments[r.type];return`
            <div id="shop-item" class="${v?"disabled":""}">
                <div class="card" data-improviment-type="${r.type}" title="Comprar">
                    <div class="card-body d-flex px-2">
                        <div class="shop-pet-img">
                            <img draggable="false" class="img-fluid" src="${T.url}" />
                        </div>
                        <div class="item-info d-flex flex-column w-100">
                            <div class="d-flex justify-content-between w-100 aling-items-center">
                                <div id="shop-item-name">
                                    <h4 class="mb-0">${r.name}</h4>
                                </div>
                                <div id="shop-item-price" class="text-danger">
                                    <span>${r.price}❤️</span>
                                </div>
                            </div>
                            <small class="colision-info font-wight-bold mt-1">
                               ${r.description}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `};return{renderLayout:f,renderShop:_,updateShopItem:l,updateImprovementItem:g}},ft=(c,e=W)=>{const t={fps:75,pets:[],score:0,container:null,improviments:[],sprites:{pets:{},catricio:{},improviments:{}},canvasState:{width:0,height:0,ctx:null,canvas:null,container:null,backgroundColor:"#000000"}},o=e(),n=Et(t),d=s=>{Object.assign(t,s)},h=()=>{const s=document.getElementById("canvas");f({container:s,width:s.offsetWidth,height:s.offsetHeight})},f=s=>{Object.assign(t.canvasState,s)},_=()=>{const s=document.createElement("canvas"),i=s.getContext("2d",{willReadFrequently:!0});t.canvasState.container.appendChild(s),f({canvas:s,ctx:i}),l()},L=()=>{let s=0;const i=()=>{const p=Date.now();p-s>1e3/t.fps&&(u(),s=p),requestAnimationFrame(i)};requestAnimationFrame(i)},u=()=>{const{ctx:s,width:i,height:p,backgroundColor:E}=t.canvasState;s.fillStyle=E,s.fillRect(0,0,i,p),t.pets.forEach(b=>b.move())},l=()=>{const{canvas:s,width:i,height:p}=t.canvasState;s.width=i,s.height=p},g=()=>{new ResizeObserver(()=>{h(),l(),P()}).observe(t.canvasState.container)},I=(s,i)=>{const{x:p,y:E}=o.getRandomPosition(s,i);return t.pets.some(({state:O})=>O.position.x===p&&O.position.y===E)?I(s,i):{x:p,y:E}},P=()=>{t.pets.forEach(s=>{const i=t.canvasState.width-t.sprites.pets[s.state.type].width,p=t.canvasState.height-t.sprites.pets[s.state.type].height;s.setPosition(I(i,p))})},x=s=>{const i=Y[s],p=o.getPetPrice(t.pets,i),E=t.canvasState.width-t.sprites.pets[s].width,b=t.canvasState.height-t.sprites.pets[s].height;!i||t.score<p||(H(-p),T(new i(t,{position:I(E,b)})),n.updateShopItem(i),k())},r=s=>{const i=G.find(p=>p.type===s);v(i)||(H(-i.price),t.improviments.push({...i}),n.updateImprovementItem(i),k())},v=s=>!s||t.score<s.price||t.improviments.some(({type:i})=>s.type===i),T=s=>{t.pets.some(p=>p.state.id===s.state.id)||t.pets.push(s)},U=()=>{const i=t.improviments.filter(({target:p})=>p==="catricio").reduce((p,E)=>J(p,E),1);H(i)},V=s=>{const{name:i,type:p,improviments:E,score:b,width:O,height:X}=s,ut=Y[p];T(new ut(t,{name:i,type:p,score:b,improviments:E,position:I(O,X)}))},J=(s,i)=>i.type==="catricio_fan"?s*i.increment:i.type==="pet_lover"?s+t.pets.length*i.increment:s,H=(s,i,p)=>{t.score+=s,K(),k()},K=()=>{const s=document.getElementById("points");s.innerHTML=Math.floor(t.score)},k=()=>{const s={improviments:t.improviments,pets:t.pets.map(i=>Z(i)),score:t.score};localStorage.setItem("game-state",JSON.stringify(s))},Q=()=>{const s=JSON.parse(localStorage.getItem("game-state"));s&&(t.score=s.score,t.improviments=s.improviments,s.pets.forEach(i=>V(i)))},Z=s=>{const{name:i,type:p,improviments:E,score:b,width:O,height:X}=s.getInfo();return{name:i,type:p,improviments:E,score:b,width:O,height:X}},tt=()=>t.pets,et=s=>t.pets.find(i=>i.state.id===s),st=()=>{t.incrementScore=H,t.buyPet=x,t.getPets=tt,t.findPet=et,t.insertPet=T,t.changeToFullScreen=nt,t.resetFullScreen=at,t.toggleShop=ot,t.shopIsOpen=z,t.buyImproviment=r,t.dispachClick=U},it=()=>{t.container.innerHTML=n.renderLayout()},nt=()=>{if(z())return;const s=document.getElementById("game-score"),i=document.getElementById("pet-infos");s.style.transform=`translateX(${-s.offsetWidth}px)`,i.style.transform=`translateX(${i.offsetWidth}px)`,t.canvasState.container.style.width="100%"},at=()=>{const s=document.getElementById("game-score"),i=document.getElementById("pet-infos");s.style.transform="translateX(0px)",i.style.transform="translateX(0px)",t.canvasState.container.style.width="50%"},z=()=>!document.getElementById("shop").classList.contains("hidden"),ot=()=>{const s=document.getElementById("shop");$("#pet-infos").toggle("hidden"),s.classList.toggle("hidden")},rt=async()=>{await Promise.all(Object.entries(Y).map(([s,i])=>mt(s,i)))},ct=async()=>{await Promise.all(G.filter(s=>s.spritPath).map(s=>dt(s)))},dt=async s=>await o.createSprite(s.spritPath).then(i=>t.sprites.improviments[s.type]=i),pt=async()=>{await Promise.all(Object.entries(It).map(([s,i])=>lt(s,i)))},lt=async(s,i)=>await o.createSprite(i).then(p=>t.sprites.catricio[s]=p),mt=async(s,i)=>await o.createSprite(i.SPRITE_PATH).then(p=>t.sprites.pets[s]=p),ht=async()=>{await Promise.all([rt(),pt(),ct()])};return(()=>{d({container:c}),ht().then(()=>{Q(),it(),h(),_(),st(),g(),L()})})(),t},R=ft(document.getElementById("app"));$("body").on("click","#catricio",()=>R.dispachClick(1,"normal"));$("body").on("click","#shop-button",()=>R.toggleShop());$("body").on("click","[data-pet-type]",({currentTarget:c})=>R.buyPet(c.dataset.petType));$("body").on("mousedown","#catricio",({currentTarget:c})=>{const e=c.querySelector("img");e.src=R.sprites.catricio.grab.url});$("body").on("mouseup",()=>{const c=document.querySelector("#catricio img");c.src=R.sprites.catricio.default.url});$("body").on("click","[data-improviment-type]",({currentTarget:c})=>R.buyImproviment(c.dataset.improvimentType));$("body").on("mouseleave",()=>{let c=setTimeout(()=>R.changeToFullScreen(),1e4);$("body").on("mouseenter",()=>{clearTimeout(c),R.resetFullScreen(),$("body").off("mouseenter")})});$("body").on("click","[data-nav]",({currentTarget:c})=>{const{nav:e}=c.dataset;$("[data-nav]").removeClass("active"),$(`[data-nav=${e}]`).addClass("active"),$("[shop-nav-content]").addClass("d-none").removeClass("d-flex"),$(`#${e}`).removeClass("d-none").removeClass("d-flex")});
