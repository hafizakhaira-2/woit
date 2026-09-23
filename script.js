const gate=document.getElementById('gate');
const site=document.getElementById('site');
const enter=document.getElementById('enter');
const replay=document.getElementById('replay');
const song=document.getElementById('birthdaySong');
const confetti=document.getElementById('confetti');

function party(){
  confetti.innerHTML='';
  for(let i=0;i<110;i++){
    const e=document.createElement('i');
    e.className='conf';
    e.style.left=Math.random()*100+'%';
    e.style.background=['#ffd84d','#f0524d','#fff','#111'][Math.floor(Math.random()*4)];
    e.style.animationDelay=Math.random()*1.2+'s';
    e.style.animationDuration=(2.4+Math.random()*2.4)+'s';
    confetti.appendChild(e);
  }
  setTimeout(()=>confetti.innerHTML='',6000);
}
enter.addEventListener('click',async()=>{
  gate.classList.add('hidden');
  site.classList.remove('hidden');
  song.currentTime=0;
  try{await song.play();}catch(e){}
  party();
  window.scrollTo(0,0);
});
replay.addEventListener('click',()=>{
  site.classList.add('hidden');
  gate.classList.remove('hidden');
  song.pause(); song.currentTime=0;
  window.scrollTo(0,0);
});
