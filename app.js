const exercises=[
 {name:"ضغط الصدر بالبار",cat:"chest",label:"الصدر",desc:"ثبّت القدمين والكتفين، وانزل البار بتحكّم. ابدأ بوزن خفيف.",sets:"3 مجموعات × 8–12 تكرار"},
 {name:"ضغط الصدر بالدمبل",cat:"chest",label:"الصدر",desc:"خلّي الحركة ثابتة وما تقفلش المرفقين بقوة.",sets:"3 مجموعات × 8–12 تكرار"},
 {name:"السحب العلوي",cat:"back",label:"الظهر",desc:"اسحب نحو أعلى الصدر من دون تأرجح الجسم.",sets:"3 مجموعات × 8–12 تكرار"},
 {name:"التجديف بالكابل",cat:"back",label:"الظهر",desc:"حافظ على الظهر محايدًا واسحب بالمرفقين.",sets:"3 مجموعات × 10–12 تكرار"},
 {name:"القرفصاء (Squat)",cat:"legs",label:"الرجلين",desc:"انزل بمدى مريح، والركبتان باتجاه أصابع القدم. تعلّم الحركة قبل زيادة الوزن.",sets:"2–3 مجموعات × 8–12 تكرار"},
 {name:"تمديد الرجلين",cat:"legs",label:"الرجلين",desc:"ارفع الوزن بتحكّم وتجنّب الركل أو الحركة السريعة.",sets:"2–3 مجموعات × 10–15 تكرار"},
 {name:"ضغط الكتف بالدمبل",cat:"shoulders",label:"الكتفين",desc:"شدّ البطن وتجنّب تقويس أسفل الظهر.",sets:"3 مجموعات × 8–12 تكرار"},
 {name:"الرفرفة الجانبية",cat:"shoulders",label:"الكتفين",desc:"استعمل وزنًا خفيفًا وارفع الذراعين بتحكّم.",sets:"3 مجموعات × 12–15 تكرار"}
];
const grid=document.querySelector("#exerciseGrid");
function renderExercises(filter="all"){
 const list=filter==="all"?exercises:exercises.filter(e=>e.cat===filter);
 grid.innerHTML=list.map((e,i)=>`<article class="exercise-card"><span class="num">EX ${(i+1).toString().padStart(2,"0")}</span><h3>${e.name}</h3><p>${e.desc}</p><span class="tag">${e.label} · ${e.sets}</span></article>`).join("");
}
renderExercises();
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderExercises(btn.dataset.filter);
}));
const details={
 muscle:"ابدأ بتمرين كامل للجسم مرتين أو ثلاث مرات في الأسبوع، وتعلّم التقنية الصحيحة. زِد التكرارات أو الوزن تدريجيًا عندما يصبح الأداء سهلًا مع الحفاظ على التقنية.",
 fat:"خسارة الدهون تحتاج عجزًا معتدلًا في السعرات، ونشاطًا منتظمًا ونومًا جيدًا. ما كاش تمرين يذيب دهون منطقة واحدة وحدها؛ الجسم يخسر الدهون بشكل عام.",
 food:"حاول تضمّن مصدر بروتين في وجباتك، مثل البيض أو العدس أو السردين أو الدجاج، مع الخضر ومصدر طاقة مثل الأرز أو البطاطا. النتائج ما تحتاجش مكملات غالية."
};
document.querySelectorAll(".goal-card").forEach(btn=>btn.addEventListener("click",()=>{
 const panel=document.querySelector("#goalDetails");panel.textContent=details[btn.dataset.goal];panel.hidden=false;panel.scrollIntoView({behavior:"smooth",block:"nearest"});
}));
document.querySelector("#calcProtein").addEventListener("click",()=>{
 const w=Number(document.querySelector("#weight").value),factor=Number(document.querySelector("#goalType").value),out=document.querySelector("#proteinResult");
 if(!w||w<25||w>250){out.textContent="أدخل وزنًا صحيحًا بين 25 و250 كغ.";return}
 out.textContent=`تقدير تقريبي: ${Math.round(w*factor)} غ بروتين في اليوم. وزّعه على وجباتك حسب قدرتك.`;
});
const tips=["ركّز على التقنية قبل زيادة الوزن.","النوم الجيد جزء من الاسترجاع العضلي.","سجّل الأوزان والتكرارات باش تلاحظ تقدمك.","سخّن 5–10 دقائق قبل التمرين.","الراحة بين المجموعات تتغيّر حسب التمرين وشدته.","الاستمرارية أهم من تمرين قاسٍ مرة واحدة."];
document.querySelector("#tipBtn").addEventListener("click",()=>{
 const day=Math.floor(Date.now()/86400000)%tips.length;document.querySelector("#dailyTip").textContent=tips[day];
});
document.querySelector("#year").textContent=new Date().getFullYear();
let deferredPrompt;
const installBtn=document.querySelector("#installBtn");
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;installBtn.hidden=false});
installBtn.addEventListener("click",async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.hidden=true});
if("serviceWorker" in navigator && location.protocol.startsWith("http")){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
