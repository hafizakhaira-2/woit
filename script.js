const toast = document.getElementById("toast");
const warning = document.getElementById("warning");

function showToast(text){
  toast.textContent=text;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2500);
}

document.getElementById("surpriseBtn").addEventListener("click", ()=>{
  const lines=[
    "🚨 KETAHUAN! Tombol terlarang berhasil ditekan.",
    "📢 Pengumuman: Bang Putra resmi naik level!",
    "🧓 Umur bertambah +1. Skill tetap dipertanyakan.",
    "🎂 Server ulang tahun berhasil diaktifkan."
  ];
  warning.textContent=lines[Math.floor(Math.random()*lines.length)];
  confetti();
});

function confetti(){
  const symbols=["🎉","🎊","⭐","✨","🎂","🪩","💥"];
  for(let i=0;i<70;i++){
    const el=document.createElement("div");
    el.className="confetti";
    el.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    el.style.left=Math.random()*100+"vw";
    el.style.animationDelay=Math.random()*0.8+"s";
    el.style.fontSize=(12+Math.random()*20)+"px";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),3800);
  }
}
document.getElementById("confettiBtn").addEventListener("click", ()=>{
  confetti();
  showToast("🎉 RUSUH BERHASIL. HAPPY BIRTHDAY BANG PUTRA!");
});

// Browser-synthesized Happy Birthday melody.
// No external copyrighted recording is embedded.
let audioCtx=null, playing=false, timers=[];
const notes={
  C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392.00,A4:440.00,
  Bb4:466.16,C5:523.25,D5:587.33
};
// Simplified melody, intentionally repeated to make the page feel like a long birthday greeting.
const melody=[
 ["G4",.25],["G4",.25],["A4",.5],["G4",.5],["C5",.5],["B4",.9],
 ["G4",.25],["G4",.25],["A4",.5],["G4",.5],["D5",.5],["C5",.9],
 ["G4",.25],["G4",.25],["G5",.5],["E5",.5],["C5",.5],["B4",.5],["A4",.9],
 ["F5",.25],["F5",.25],["E5",.5],["C5",.5],["D5",.5],["C5",1.0]
].map(([n,d])=>[n.replace("G5","G4").replace("E5","E4").replace("F5","F4"),d]);

function playNote(freq,start,duration){
  const osc=audioCtx.createOscillator();
  const gain=audioCtx.createGain();
  osc.type="triangle"; osc.frequency.value=freq;
  gain.gain.setValueAtTime(0.0001,start);
  gain.gain.exponentialRampToValueAtTime(0.18,start+0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001,start+duration);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(start); osc.stop(start+duration+0.04);
}
function playBirthday(){
  audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
  const start=audioCtx.currentTime+0.05;
  let t=start;
  // Repeat 4 times for the intentionally long, silly version.
  for(let r=0;r<4;r++){
    for(const [n,d] of melody){
      playNote(notes[n]||261.63,t,d*0.75);
      t+=d*0.38;
    }
    t+=0.18;
  }
  playing=true;
  document.getElementById("musicBtn").textContent="⏸ LAGU SEDANG MAIN...";
  document.getElementById("eq").classList.add("playing");
  setTimeout(()=>{
    playing=false;
    document.getElementById("musicBtn").textContent="▶ PUTAR LAGU LAGI";
    document.getElementById("eq").classList.remove("playing");
  },(t-start)*1000+300);
}
document.getElementById("musicBtn").addEventListener("click",()=>{
  if(!playing) playBirthday();
  else showToast("🎵 Sabar, lagunya belum selesai 😭");
});
