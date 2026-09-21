const garden=document.getElementById('garden');
const growBtn=document.getElementById('growBtn');
const musicBtn=document.getElementById('musicBtn');
const audio=document.getElementById('song');
const starField=document.getElementById('starField');
const particles=document.getElementById('particles');
const hint=document.getElementById('hint');
let bloomed=false,playing=false;

function createStars(){
  for(let i=0;i<95;i++){
    const s=document.createElement('span');
    const special=Math.random()>.86;
    s.className=special?'star cross':(Math.random()>.82?'star big':'star');
    if(special)s.textContent=Math.random()>.5?'✦':'✧';
    s.style.left=`${Math.random()*100}%`;s.style.top=`${Math.random()*100}%`;
    s.style.setProperty('--speed',`${1.5+Math.random()*3.8}s`);
    s.style.setProperty('--opacity',`${.35+Math.random()*.65}`);
    s.style.setProperty('--size',`${8+Math.random()*10}px`);
    starField.appendChild(s);
  }
}
createStars();

function burst(){
  const symbols=['✨','💛','✦','🌼'];
  for(let i=0;i<32;i++){
    const p=document.createElement('span');p.className='particle';
    p.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    p.style.left=`${35+Math.random()*30}%`;p.style.top=`${58+Math.random()*16}%`;
    p.style.setProperty('--x',`${(Math.random()-.5)*310}px`);
    p.style.setProperty('--y',`${-100-Math.random()*330}px`);
    p.style.setProperty('--r',`${(Math.random()-.5)*160}deg`);
    p.style.setProperty('--duration',`${1.7+Math.random()*1.7}s`);
    p.style.setProperty('--particle-size',`${12+Math.random()*13}px`);
    particles.appendChild(p);setTimeout(()=>p.remove(),3500);
  }
}

function bloomFlowers(){
  if(bloomed){
    garden.classList.remove('bloom');bloomed=false;
    growBtn.textContent='🌱 Haz crecer los girasoles';hint.textContent='Toca el botón y mira cómo florecen 🌻';
    setTimeout(()=>{garden.classList.add('bloom');bloomed=true;growBtn.textContent='✨ Volver a florecer';hint.textContent='Para ti, Emi 💛';setTimeout(burst,1000)},450);
    return;
  }
  garden.classList.add('bloom');bloomed=true;growBtn.textContent='✨ Volver a florecer';hint.textContent='Para ti, Emi 💛';setTimeout(burst,1000);
}

growBtn.addEventListener('click',bloomFlowers);
garden.addEventListener('click',()=>!bloomed?bloomFlowers():burst());

musicBtn.addEventListener('click',async()=>{
  try{
    if(!playing){await audio.play();playing=true;musicBtn.textContent='❚❚ Pausar música';}
    else{audio.pause();playing=false;musicBtn.textContent='♪ Reproducir música';}
  }catch(e){alert('Coloca tu archivo de audio dentro de la carpeta y renómbralo exactamente como "flores-amarillas.mp3".');}
});
