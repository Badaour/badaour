import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  gold: "#C9A84C", goldLight: "#E8D5A0", goldDark: "#8B7430",
  black: "#0C0A08", dark: "#1A1714", charcoal: "#2A2520",
  cream: "#FAF7F2", ivory: "#F5F0E8", sand: "#E8DFD0",
  terra: "#A0522D", terracotta: "#C4704A", rust: "#8B4513",
  wine: "#6B1D2A", green: "#2D6A4F", emerald: "#40916C",
  muted: "#8A7E6E", border: "#DDD4C4", bg: "#FDFCF9",
  white: "#FFFFFF",
};

const PHONE = "438-988-6682";
const EMAIL = "service@badaour.com";

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id:1, name:"Grand Boubou Brodé", category:"homme", sub:"Boubou", artisan:"Moussa Diallo", city:"Dakar", country:"Sénégal", price:189, tag:"Best", desc:"Broderie main sur bazin riche, teinture naturelle indigo. Tailles S à XXL.", gradient:"linear-gradient(135deg,#1A3A6B,#0D2550,#1A3A6B)", emoji:"👘" },
  { id:2, name:"Dashiki Festif", category:"homme", sub:"Chemise", artisan:"Koffi Asante", city:"Accra", country:"Ghana", price:78, tag:"Nouveau", desc:"Coton léger brodé, col en V, manches courtes. Couleurs vives traditionnelles.", gradient:"linear-gradient(135deg,#E74C3C,#C0392B,#A93226)", emoji:"👔" },
  { id:3, name:"Agbada Cérémonie", category:"homme", sub:"Tenue complète", artisan:"Adebayo Okafor", city:"Lagos", country:"Nigeria", price:245, tag:"Premium", desc:"Ensemble 3 pièces : robe, tunique et pantalon. Broderie dorée exclusive.", gradient:"linear-gradient(135deg,#6B2FA0,#5A1F8A,#4A0F7A)", emoji:"🎩" },
  { id:4, name:"Robe Wax Élégance", category:"femme", sub:"Robe", artisan:"Fatoumata Koné", city:"Bamako", country:"Mali", price:134, tag:"Best", desc:"Robe droite en wax hollandais, ceinture tissée, col carré. XS à XL.", gradient:"linear-gradient(135deg,#C0392B,#E74C3C,#F39C12)", emoji:"👗" },
  { id:5, name:"Ensemble Bogolan Chic", category:"femme", sub:"Ensemble", artisan:"Awa Traoré", city:"Bamako", country:"Mali", price:168, tag:"Artisanal", desc:"Haut et jupe assortis en bogolan peint à la main. Motifs uniques.", gradient:"linear-gradient(135deg,#8B5E3C,#6B3D1A,#4A2000)", emoji:"✨" },
  { id:6, name:"Kaftan Soirée Brodé", category:"femme", sub:"Kaftan", artisan:"Aïcha Diop", city:"Dakar", country:"Sénégal", price:212, tag:"Premium", desc:"Kaftan en voile de coton, broderies florales au fil d'or, ceinture dorée.", gradient:"linear-gradient(135deg,#1A1060,#130C48,#2A1B7A)", emoji:"🌸" },
  { id:7, name:"Mini Boubou Enfant", category:"enfant", sub:"Boubou", artisan:"Moussa Diallo", city:"Dakar", country:"Sénégal", price:64, tag:"Populaire", desc:"Version enfant du grand boubou. Tissu doux coton lavable. 2-12 ans.", gradient:"linear-gradient(135deg,#27AE60,#1E8449,#196F3D)", emoji:"👶" },
  { id:8, name:"Robe Wax Princesse", category:"enfant", sub:"Robe", artisan:"Koffi Mensah", city:"Lomé", country:"Togo", price:52, tag:"Nouveau", desc:"Robe à volants en wax coloré. Bretelles réglables. 3 à 10 ans.", gradient:"linear-gradient(135deg,#E91E8C,#C2185B,#AD1457)", emoji:"🎀" },
  { id:9, name:"Ensemble Kente Junior", category:"enfant", sub:"Ensemble", artisan:"Kweku Mensah", city:"Kumasi", country:"Ghana", price:88, tag:"Artisanal", desc:"Ensemble kente authentique pour enfant. Tissé à la main.", gradient:"linear-gradient(135deg,#F1C40F,#D4AC0D,#B7950B)", emoji:"🧒" },
  { id:10, name:"Masque Ancestral Sénoufo", category:"art", sub:"Masque", artisan:"Cheikh Ndiaye", city:"Thiès", country:"Sénégal", price:320, tag:"Unique", desc:"Masque cérémoniel sculpté à la main. Bois de venn ancien.", gradient:"linear-gradient(135deg,#2C1810,#1A0F0A,#3D2B1F)", emoji:"🎭" },
  { id:11, name:"Sculpture Baobab Bronze", category:"art", sub:"Sculpture", artisan:"Cheikh Ndiaye", city:"Thiès", country:"Sénégal", price:445, tag:"Premium", desc:"Baobab en bronze coulé. Socle en ébène. Pièce unique numérotée.", gradient:"linear-gradient(135deg,#5D4E37,#3D2B1F,#2C1810)", emoji:"🌳" },
  { id:12, name:"Tableau Sahel Acrylique", category:"art", sub:"Tableau", artisan:"Amadou Sow", city:"Nouakchott", country:"Mauritanie", price:278, tag:"Artisanal", desc:"Peinture acrylique sur toile 80×60cm. Paysage sahélien au coucher.", gradient:"linear-gradient(135deg,#E67E22,#D35400,#A04000)", emoji:"🖼️" },
  { id:13, name:"Collier Perles Krobo", category:"divers", sub:"Bijoux", artisan:"Abena Asante", city:"Accra", country:"Ghana", price:86, tag:"Artisanal", desc:"Perles de verre recyclé, techniques ancestrales Krobo. Pièce unique.", gradient:"linear-gradient(135deg,#D4AF37,#B8860B,#996515)", emoji:"📿" },
  { id:14, name:"Sac Bogolan Cuir", category:"divers", sub:"Sac", artisan:"Fatoumata Koné", city:"Bamako", country:"Mali", price:112, tag:"Artisanal", desc:"Sac bogolan traditionnel, cuir tannage végétal. Motifs peints à la boue.", gradient:"linear-gradient(135deg,#8B5E3C,#A0522D,#6B3D1A)", emoji:"👜" },
  { id:15, name:"Huile de Karité Pure", category:"divers", sub:"Beauté", artisan:"Mariam Ouédraogo", city:"Ouagadougou", country:"Burkina Faso", price:34, tag:"Bio", desc:"Karité brut non raffiné, coopérative de femmes. 100% naturel. 200ml.", gradient:"linear-gradient(135deg,#C8956C,#A07820,#8B6A3E)", emoji:"🧴" },
  { id:16, name:"Tissu Wax 6 yards", category:"divers", sub:"Tissu", artisan:"Koffi Mensah", city:"Lomé", country:"Togo", price:58, tag:"Populaire", desc:"Wax hollandais authentique double face. Motifs exclusifs. 6 yards.", gradient:"linear-gradient(135deg,#E74C3C,#F1C40F,#27AE60)", emoji:"🧵" },
];

const CATEGORIES = [
  { key:"homme", label:"Homme", emoji:"👘", color:"#1A3A6B", full:"Habillement Homme", desc:"Boubous, dashikis, agbadas, tenues de cérémonie" },
  { key:"femme", label:"Femme", emoji:"👗", color:T.wine, full:"Habillement Femme", desc:"Robes wax, kaftans, ensembles bogolan, tenues festives" },
  { key:"enfant", label:"Enfant", emoji:"🧒", color:T.green, full:"Habillement Enfant", desc:"Boubous, robes, ensembles kente pour 2 à 14 ans" },
  { key:"art", label:"Art", emoji:"🏺", color:"#6A0572", full:"Oeuvres d'Art", desc:"Sculptures, masques, tableaux, pièces uniques" },
  { key:"divers", label:"Divers", emoji:"✨", color:T.gold, full:"Divers & Accessoires", desc:"Bijoux, sacs, tissus, beauté, produits africains" },
];

const STEPS = [
  { key:"confirmed", label:"Confirmée", icon:"✅" },
  { key:"preparation", label:"Préparation", icon:"🧵" },
  { key:"shipped", label:"Expédiée", icon:"📦" },
  { key:"transit", label:"En transit", icon:"✈️" },
  { key:"customs", label:"Dédouanement", icon:"🛃" },
  { key:"delivery", label:"En livraison", icon:"🚚" },
  { key:"delivered", label:"Livré !", icon:"🎉" },
];

const tagMap = { Best:"#C9A84C", Nouveau:"#2D6A4F", Artisanal:"#8B4513", Populaire:"#C0392B", Unique:"#6A0572", Bio:"#228B22", Premium:"#1A3A6B" };

// ─── HERO ANIMATION DATA ─────────────────────────────────────────────────────
const HERO_SYMBOLS=[
  {char:"👘",size:44,x:72,y:14,dur:18,delay:0,blur:0,op:.28},
  {char:"👗",size:38,x:86,y:38,dur:22,delay:2,blur:0,op:.25},
  {char:"🎭",size:50,x:76,y:62,dur:20,delay:4,blur:1,op:.18},
  {char:"🌳",size:42,x:91,y:80,dur:24,delay:1,blur:0,op:.22},
  {char:"📿",size:32,x:67,y:48,dur:19,delay:3,blur:1,op:.15},
  {char:"🧵",size:36,x:83,y:90,dur:21,delay:5,blur:2,op:.10},
  {char:"🏺",size:46,x:60,y:74,dur:17,delay:2,blur:1,op:.14},
  {char:"✨",size:28,x:94,y:22,dur:15,delay:0,blur:0,op:.30},
  {char:"🌍",size:54,x:74,y:52,dur:26,delay:3,blur:2,op:.10},
  {char:"👜",size:34,x:89,y:18,dur:16,delay:4,blur:1,op:.16},
];
const HERO_PARTICLES=Array.from({length:40},(_,i)=>({id:i,x:Math.random()*100,size:Math.random()*3+1,op:Math.random()*.4+.1,dur:Math.random()*12+8,delay:Math.random()*8}));
const HERO_ADINKRA=[
  {d:"M0,20 L20,0 L40,20 L20,40 Z",x:12,y:22,size:40,delay:1},
  {d:"M20,0 A20,20 0 1,1 20,40 A20,20 0 1,1 20,0 M20,8 A12,12 0 1,0 20,32 A12,12 0 1,0 20,8",x:52,y:78,size:36,delay:3},
  {d:"M0,0 L40,0 L40,40 L0,40 Z M8,8 L32,8 L32,32 L8,32 Z",x:6,y:68,size:30,delay:2},
  {d:"M20,0 L25,15 L40,15 L28,24 L33,40 L20,30 L7,40 L12,24 L0,15 L15,15 Z",x:45,y:16,size:32,delay:4},
  {d:"M0,20 Q20,0 40,20 Q20,40 0,20",x:32,y:88,size:28,delay:0},
];

const DEMO_ORDERS = [{ id:"BDR-2026-0042", date:"2026-01-10", status:"transit", items:[{...PRODUCTS[0],qty:1},{...PRODUCTS[3],qty:1}], total:355.25, shipping:18, client:"Mamadou Diallo", address:"4500 Rue Sherbrooke, Montréal, QC H3Z 1E3", payMethod:"Interac", events:[{step:"confirmed",date:"10 jan, 09:14",note:"Paiement reçu"},{step:"preparation",date:"11 jan, 14:30",note:"Artisan a commencé"},{step:"shipped",date:"15 jan, 11:00",note:"DHL Express Dakar"},{step:"transit",date:"16 jan, 03:22",note:"Vol Dakar → Montréal"}] }];

function genId(){ return "BDR-2026-"+String(Math.floor(Math.random()*9000)+1000); }

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function Badge({status}){
  const m={confirmed:{l:"Confirmée",c:T.green},preparation:{l:"Préparation",c:T.terra},shipped:{l:"Expédiée",c:"#1A5276"},transit:{l:"En transit ✈️",c:"#6A0572"},customs:{l:"Dédouanement",c:"#B7950B"},delivery:{l:"En livraison",c:"#1A5276"},delivered:{l:"Livré ✓",c:T.green}};
  const s=m[status]||{l:status,c:"#666"};
  return <span style={{background:s.c,color:"#fff",padding:"4px 14px",fontSize:11,fontWeight:600,letterSpacing:".5px",borderRadius:100}}>{s.l}</span>;
}

function Timeline({order,verbose}){
  const ci=STEPS.findIndex(s=>s.key===order.status);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:0}}>
      {STEPS.map((step,i)=>{
        const done=i<ci,active=i===ci;
        const ev=order.events?.find(e=>e.step===step.key);
        return(
          <div key={step.key} style={{display:"flex",gap:16,position:"relative"}}>
            {i<STEPS.length-1&&<div style={{position:"absolute",left:17,top:38,width:2,height:32,background:done?T.green:T.border}}/>}
            <div style={{width:36,height:36,borderRadius:"50%",flexShrink:0,zIndex:1,background:done?T.green:active?T.gold:T.sand,color:done||active?T.white:T.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:done?15:14,fontWeight:700,border:active?`3px solid ${T.dark}`:"3px solid transparent",marginBottom:32,transition:"all .3s"}}>{done?"✓":step.icon}</div>
            <div style={{paddingTop:6}}>
              <div style={{fontSize:13,fontWeight:active?700:400,color:done||active?T.dark:T.muted,fontFamily:"'Playfair Display',Georgia,serif"}}>{step.label}</div>
              {ev&&<div style={{fontSize:11,color:T.muted,marginTop:2}}>{ev.date}{verbose&&ev.note&&` — ${ev.note}`}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Inp({label,...props}){
  return(
    <div style={{marginBottom:18}}>
      {label&&<label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:"1.5px",color:T.terra,textTransform:"uppercase",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>{label}</label>}
      <input {...props} style={{width:"100%",padding:"12px 16px",background:T.cream,border:`1.5px solid ${T.border}`,color:T.dark,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",borderRadius:8,transition:"border-color .2s,box-shadow .2s",boxSizing:"border-box",...(props.style||{})}}/>
    </div>
  );
}

function ProductCard({p,addToCart,wishlist,toggleWish,style:extraStyle}){
  const [hover,setHover]=useState(false);
  const [added,setAdded]=useState(false);
  const inWish=wishlist.includes(p.id);
  const handleAdd=()=>{addToCart(p);setAdded(true);setTimeout(()=>setAdded(false),1400);};
  return(
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{background:T.white,borderRadius:16,overflow:"hidden",transition:"transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s",transform:hover?"translateY(-8px) scale(1.01)":"none",boxShadow:hover?"0 24px 48px rgba(12,10,8,.12)":"0 2px 8px rgba(12,10,8,.04)",cursor:"pointer",position:"relative",...extraStyle}}>
      <div style={{height:220,background:p.gradient,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 30% 70%,rgba(255,255,255,.08) 0%,transparent 50%)"}}/>
        <span style={{fontSize:80,filter:"drop-shadow(0 8px 24px rgba(0,0,0,.3))",transition:"transform .4s cubic-bezier(.2,.8,.2,1)",transform:hover?"scale(1.15) rotate(-5deg)":"scale(1)"}}>{p.emoji}</span>
        <div style={{position:"absolute",top:14,left:14,background:tagMap[p.tag]||"#666",color:"#fff",padding:"4px 12px",fontSize:10,fontWeight:700,letterSpacing:"1px",borderRadius:100,textTransform:"uppercase"}}>{p.tag}</div>
        <div style={{position:"absolute",top:14,right:14,background:"rgba(0,0,0,.35)",backdropFilter:"blur(8px)",color:"#fff",padding:"4px 10px",fontSize:10,borderRadius:100,letterSpacing:".5px"}}>🌍 {p.country}</div>
        <button onClick={(e)=>{e.stopPropagation();toggleWish(p.id);}} style={{position:"absolute",bottom:14,right:14,background:"rgba(255,255,255,.9)",backdropFilter:"blur(8px)",border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"transform .2s",transform:hover?"scale(1.1)":"scale(1)"}}>{inWish?"❤️":"🤍"}</button>
      </div>
      <div style={{padding:"18px 20px 20px"}}>
        <div style={{fontSize:10,fontWeight:600,letterSpacing:"2px",color:CATEGORIES.find(c=>c.key===p.category)?.color||T.terra,textTransform:"uppercase",marginBottom:4,fontFamily:"'DM Sans',sans-serif"}}>{p.sub}</div>
        <div style={{fontSize:17,fontWeight:700,color:T.dark,marginBottom:4,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.3}}>{p.name}</div>
        <div style={{fontSize:12,color:T.muted,marginBottom:4,fontStyle:"italic"}}>✂️ {p.artisan}, {p.city}</div>
        <div style={{fontSize:12,color:"#888",marginBottom:14,lineHeight:1.6,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.desc}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:22,fontWeight:800,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif"}}>{p.price}<span style={{fontSize:13,fontWeight:400,color:T.muted}}> $CA</span></span>
          <button onClick={(e)=>{e.stopPropagation();handleAdd();}} style={{background:added?T.green:T.dark,color:T.white,border:"none",padding:"10px 20px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,letterSpacing:".5px",borderRadius:100,transition:"all .3s"}}>
            {added?"✓ Ajouté":"+ Panier"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Summary({cart,subtotal,shipping,taxes,total,onContinue,address}){
  return(
    <div style={{background:T.white,borderRadius:16,padding:24,border:`1px solid ${T.border}`,position:"sticky",top:100}}>
      <h3 style={{fontSize:16,color:T.dark,margin:"0 0 18px",fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700}}>Récapitulatif</h3>
      {cart.map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:12,color:T.muted}}><span>{i.name} ×{i.qty}</span><span style={{fontWeight:700,color:T.dark}}>{(i.price*i.qty).toFixed(2)} $</span></div>)}
      <div style={{borderTop:`1px solid ${T.border}`,paddingTop:12,marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
        {[["Sous-total",subtotal.toFixed(2)],["Livraison",shipping],["Taxes (14.975%)",taxes]].map(([l,v])=><div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{color:T.muted}}>{l}</span><span>{v} $CA</span></div>)}
      </div>
      <div style={{borderTop:`2px solid ${T.dark}`,paddingTop:14,marginTop:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:16,fontWeight:700,fontFamily:"'Playfair Display',Georgia,serif"}}>Total</span>
        <span style={{fontSize:22,fontWeight:800,color:T.terra,fontFamily:"'Playfair Display',Georgia,serif"}}>{total} $CA</span>
      </div>
      {onContinue&&<button onClick={onContinue} style={{width:"100%",background:cart.length?T.dark:T.border,color:T.white,border:"none",padding:"14px",marginTop:18,fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:"1px",cursor:cart.length?"pointer":"not-allowed",borderRadius:10,textTransform:"uppercase",transition:"opacity .2s"}}>Continuer →</button>}
      {address?.name&&<div style={{marginTop:16,fontSize:12,color:T.muted,borderTop:`1px solid ${T.border}`,paddingTop:12}}><strong style={{color:T.dark}}>📍 Livraison :</strong><br/>{address.name}, {address.address}, {address.city} {address.province}</div>}
      <div style={{textAlign:"center",marginTop:14,fontSize:11,color:T.muted}}>🔒 Paiement sécurisé SSL 256-bit</div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function BADAOUR(){
  const [page,setPage]=useState("home");
  const [cat,setCat]=useState(null);
  const [search,setSearch]=useState("");
  const [cart,setCart]=useState([]);
  const [wishlist,setWish]=useState([]);
  const [notif,setNotif]=useState(null);
  const [orders,setOrders]=useState(DEMO_ORDERS);
  const [payStep,setPay]=useState("cart");
  const [payMethod,setPayM]=useState("card");
  const [processing,setProc]=useState(false);
  const [lastOrder,setLast]=useState(null);
  const [trackId,setTid]=useState("");
  const [trackRes,setTres]=useState(null);
  const [trackErr,setTerr]=useState("");
  const [form,setForm]=useState({name:"",email:"",phone:"",address:"",city:"Montréal",province:"QC",postal:""});
  const [card,setCard]=useState({number:"",name:"",expiry:"",cvv:""});
  const [authMode,setAuthM]=useState("login");
  const [authForm,setAF]=useState({firstName:"",lastName:"",email:"",password:"",confirm:""});
  const [user,setUser]=useState(null);
  const [accounts,setAcc]=useState([{firstName:"Mamadou",lastName:"Diallo",email:"mamadou@test.com",password:"test123",orders:DEMO_ORDERS}]);
  const [mobileMenu,setMM]=useState(false);

  // Hero animation states
  const [heroPh,setHeroPh]=useState(0);
  const [heroMx,setHeroMx]=useState(50);
  const [heroMy,setHeroMy]=useState(50);
  const heroRef=useRef(null);
  const canvasRef=useRef(null);
  const rafRef=useRef(null);

  useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'});},[page]);

  // Hero phase sequencing
  useEffect(()=>{
    if(page!=="home")return;
    setHeroPh(0);
    const t=[setTimeout(()=>setHeroPh(1),200),setTimeout(()=>setHeroPh(2),900),setTimeout(()=>setHeroPh(3),1800),setTimeout(()=>setHeroPh(4),2800),setTimeout(()=>setHeroPh(5),3600),setTimeout(()=>setHeroPh(6),4400)];
    return()=>t.forEach(clearTimeout);
  },[page]);

  // Hero canvas particles
  useEffect(()=>{
    if(page!=="home")return;
    const c=canvasRef.current;if(!c)return;
    const ctx=c.getContext("2d");let w,h;
    const resize=()=>{w=c.width=c.offsetWidth*2;h=c.height=c.offsetHeight*2;};
    resize();window.addEventListener("resize",resize);
    const dots=Array.from({length:70},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.3,vy:-Math.random()*.5-.15,r:Math.random()*2.5+.5,o:Math.random()*.35+.05,life:Math.random()*500+200,age:0}));
    const draw=()=>{
      ctx.clearRect(0,0,w,h);
      dots.forEach(d=>{d.x+=d.vx;d.y+=d.vy;d.age++;if(d.age>d.life||d.y<-10||d.x<-10||d.x>w+10){d.x=Math.random()*w;d.y=h+10;d.age=0;d.life=Math.random()*500+200;d.o=Math.random()*.35+.05;}const fade=d.age<60?d.age/60:d.age>d.life-60?(d.life-d.age)/60:1;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fillStyle=`rgba(201,168,76,${d.o*fade})`;ctx.fill();});
      rafRef.current=requestAnimationFrame(draw);
    };draw();
    return()=>{cancelAnimationFrame(rafRef.current);window.removeEventListener("resize",resize);};
  },[page]);

  const heroPx=(heroMx-50)/50,heroPy=(heroMy-50)/50;
  const heroHandleMouse=(e)=>{if(!heroRef.current)return;const r=heroRef.current.getBoundingClientRect();setHeroMx(((e.clientX-r.left)/r.width)*100);setHeroMy(((e.clientY-r.top)/r.height)*100);};

  const cartQty=cart.reduce((s,i)=>s+i.qty,0);
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const shipping=cart.length>0?18:0;
  const taxes=+(subtotal*.14975).toFixed(2);
  const total=+(subtotal+shipping+taxes).toFixed(2);

  const toast=(msg,type="ok")=>{setNotif({msg,type});setTimeout(()=>setNotif(null),3200);};
  const addToCart=(p)=>{setCart(prev=>{const ex=prev.find(i=>i.id===p.id);return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1}];});toast(`"${p.name}" ajouté au panier ✓`);};
  const updateQty=(id,d)=>setCart(p=>p.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeItem=(id)=>{setCart(p=>p.filter(i=>i.id!==id));toast("Article retiré","info");};
  const toggleWish=(id)=>setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);

  const handlePay=async()=>{
    setProc(true);
    try {
      const res=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:cart,customerInfo:{name:form.name,email:form.email,address:form.address,city:form.city,province:form.province,postal:form.postal,phone:form.phone}})});
      const data=await res.json();
      if(data.url){window.location.href=data.url;}
      else{toast("Erreur paiement — réessayez","err");setProc(false);}
    } catch(e){toast("Erreur connexion — réessayez","err");setProc(false);}
  };

  const doTrack=()=>{setTerr("");setTres(null);const all=user?(accounts.find(u=>u.email===user.email)?.orders||[]).concat(orders):orders;const f=all.find(o=>o.id.toLowerCase()===trackId.toLowerCase().trim());f?setTres(f):setTerr("Aucune commande trouvée.");};

  const handleLogin=()=>{const u=accounts.find(u=>u.email===authForm.email&&u.password===authForm.password);u?(setUser(u),setPage("compte"),toast(`Bienvenue, ${u.firstName} !`)):toast("Identifiants incorrects","info");};
  const handleRegister=()=>{if(!authForm.firstName||!authForm.email||!authForm.password){toast("Remplissez tous les champs","info");return;}if(authForm.password!==authForm.confirm){toast("Mots de passe différents","info");return;}if(accounts.find(u=>u.email===authForm.email)){toast("Email déjà utilisé","info");return;}const n={firstName:authForm.firstName,lastName:authForm.lastName,email:authForm.email,password:authForm.password,orders:[]};setAcc(a=>[...a,n]);setUser(n);setPage("compte");toast(`Bienvenue, ${n.firstName} !`);};

  const filtered=PRODUCTS.filter(p=>{const mc=cat?p.category===cat:true;const q=search.toLowerCase();const mq=!q||p.name.toLowerCase().includes(q)||p.artisan.toLowerCase().includes(q)||p.country.toLowerCase().includes(q);return mc&&mq;});

  const nav=[{k:"home",l:"Accueil"},{k:"boutique",l:"Boutique"},{k:"artisans",l:"Artisans"},{k:"suivi",l:"Suivi"},{k:"commande",l:"Sur mesure"}];

  return(
    <div style={{fontFamily:"'DM Sans',sans-serif",background:T.bg,minHeight:"100vh",color:T.dark}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:${T.gold};color:${T.dark}}
        input:focus,textarea:focus,select:focus{border-color:${T.gold}!important;box-shadow:0 0 0 3px rgba(201,168,76,.15)!important;}
        button{transition:all .25s cubic-bezier(.2,.8,.2,1);}
        button:hover:not(:disabled){opacity:.9;transform:translateY(-1px);}
        button:active:not(:disabled){transform:translateY(0) scale(.98);}
        @media(max-width:900px){.desk-only{display:none!important;}}
        @media(max-width:768px){
          .grid-5{grid-template-columns:repeat(2,1fr)!important;}
          .grid-4{grid-template-columns:repeat(2,1fr)!important;}
          .grid-3{grid-template-columns:1fr!important;}
          .grid-side{grid-template-columns:1fr!important;}
          .hero-pad{padding:40px 24px!important;}
          .section-pad{padding:32px 20px!important;}
          .hero-title{font-size:32px!important;}
          .stat-row{flex-wrap:wrap!important;}
        }
        @media(max-width:480px){.grid-5,.grid-4,.grid-3{grid-template-columns:1fr!important;}}
      `}</style>

      {/* TOAST */}
      {notif&&<div style={{position:"fixed",top:20,right:20,zIndex:9999,background:notif.type==="info"?"#1A5276":T.green,color:"#fff",padding:"14px 24px",borderRadius:12,fontSize:13,fontWeight:600,boxShadow:"0 8px 32px rgba(0,0,0,.2)",animation:"slideIn .3s ease",maxWidth:340,backdropFilter:"blur(8px)"}}>{notif.msg}</div>}

      {/* ── HEADER ── */}
      <header style={{background:T.dark,position:"sticky",top:0,zIndex:100,borderBottom:`1px solid rgba(201,168,76,.2)`}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px"}}>
          <div className="desk-only" style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255,255,255,.06)",padding:"8px 0",fontSize:11,color:T.gold,letterSpacing:".5px",fontWeight:500}}>
            <span>🌍 Livraison Afrique → Canada · 14–21 jours</span>
            <span>Commerce éthique · Artisanat 100% authentique</span>
            <span>📞 {PHONE}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",gap:20}}>
            <div onClick={()=>setPage("home")} style={{cursor:"pointer",flexShrink:0}}>
              <div style={{fontSize:26,fontWeight:800,color:T.gold,letterSpacing:"6px",fontFamily:"'Playfair Display',Georgia,serif"}}>BADAOUR</div>
              <div style={{fontSize:8,color:"rgba(201,168,76,.6)",letterSpacing:"4px",marginTop:-2,fontWeight:600}}>L'AFRIQUE À VOTRE PORTE</div>
            </div>
            <div className="desk-only" style={{flex:1,maxWidth:360,position:"relative"}}>
              <input value={search} onChange={e=>{setSearch(e.target.value);setPage("boutique");setCat(null);}} placeholder="Rechercher..."
                style={{width:"100%",padding:"10px 16px 10px 40px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(201,168,76,.2)",borderRadius:100,color:T.cream,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box"}}/>
              <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:14,opacity:.5}}>🔍</span>
            </div>
            <nav className="desk-only" style={{display:"flex",gap:6,alignItems:"center"}}>
              {nav.map(({k,l})=><button key={k} onClick={()=>setPage(k)} style={{background:page===k?"rgba(201,168,76,.15)":"transparent",border:"none",color:page===k?T.gold:"rgba(255,255,255,.6)",fontSize:12,letterSpacing:".5px",padding:"8px 14px",fontFamily:"'DM Sans',sans-serif",fontWeight:page===k?700:500,borderRadius:100,cursor:"pointer"}}>{l}</button>)}
            </nav>
            <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
              <button onClick={()=>setPage(user?"compte":"auth")} style={{background:"transparent",border:`1px solid rgba(201,168,76,.3)`,borderRadius:100,padding:"8px 16px",color:user?T.gold:"rgba(255,255,255,.6)",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>{user?`👤 ${user.firstName}`:"👤 Connexion"}</button>
              <button onClick={()=>{setPay("cart");setPage("panier");}} style={{background:T.gold,border:"none",borderRadius:100,padding:"8px 18px",cursor:"pointer",color:T.dark,fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,position:"relative"}}>
                🛒 {cartQty>0&&<span style={{background:T.wine,color:"#fff",borderRadius:"50%",width:18,height:18,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,marginLeft:4,position:"relative",top:-1}}>{cartQty}</span>}
              </button>
              {/* Mobile menu */}
              <button onClick={()=>setMM(!mobileMenu)} className="desk-only" style={{display:"none",background:"transparent",border:"none",color:T.gold,fontSize:20,cursor:"pointer",padding:4}}>☰</button>
            </div>
          </div>
        </div>
      </header>

      <div style={{maxWidth:1280,margin:"0 auto"}}>
      {/* ════════ HOME ════════ */}
      {page==="home"&&(
        <div style={{animation:"fadeIn .5s ease"}}>
          {/* ═══ HERO ANIMÉ ═══ */}
          <div ref={heroRef} onMouseMove={heroHandleMouse} style={{position:"relative",overflow:"hidden",minHeight:"85vh",background:T.black||"#0C0A08"}}>
            <style>{`
              @keyframes heroShimmer{0%{background-position:-200% center}100%{background-position:200% center}}
              @keyframes heroFloat{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-18px) rotate(5deg)}50%{transform:translateY(-8px) rotate(-3deg)}75%{transform:translateY(-22px) rotate(4deg)}}
              @keyframes heroDrift{0%{transform:translateY(0) translateX(0)}33%{transform:translateY(-30vh) translateX(12px)}66%{transform:translateY(-60vh) translateX(-8px)}100%{transform:translateY(-100vh) translateX(4px)}}
              @keyframes heroSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
              @keyframes heroOrb{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(30px,-20px) scale(1.1)}50%{transform:translate(-10px,-35px) scale(.95)}75%{transform:translate(-25px,-10px) scale(1.05)}}
              @keyframes heroRing{0%{transform:scale(.8);opacity:0}50%{opacity:.12}100%{transform:scale(2.5);opacity:0}}
              @keyframes heroExpand{from{transform:scaleX(0)}to{transform:scaleX(1)}}
              @keyframes heroStatPop{from{opacity:0;transform:translateY(20px) scale(.8)}to{opacity:1;transform:translateY(0) scale(1)}}
              @keyframes heroGlow{0%,100%{box-shadow:0 8px 32px rgba(201,168,76,.25)}50%{box-shadow:0 12px 48px rgba(201,168,76,.4)}}
              @media(max-width:768px){.hero-inner{padding:80px 24px 50px!important;}.hero-t1{font-size:32px!important;}.hero-t2{font-size:34px!important;}.hero-sym{display:none!important;}.hero-stats{flex-wrap:wrap!important;gap:24px!important;}.hero-cta{flex-direction:column!important;}.hero-cta button{width:100%!important;}}
            `}</style>

            {/* BG gradient réactif souris */}
            <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at ${30+heroPx*8}% ${40+heroPy*8}%, #1E1A12 0%, #0C0A08 50%, #0A0806 100%)`,transition:"background .6s ease"}}/>

            {/* Canvas particules dorées */}
            <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:heroPh>=1?1:0,transition:"opacity 2s",pointerEvents:"none"}}/>

            {/* Motifs Adinkra */}
            <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:heroPh>=2?1:0,transition:"opacity 2s .5s"}}>
              {HERO_ADINKRA.map((a,i)=>(
                <svg key={i} viewBox="0 0 40 40" style={{position:"absolute",left:`${a.x+heroPx*2}%`,top:`${a.y+heroPy*2}%`,width:a.size,height:a.size,opacity:.04,animation:`heroSpin ${20+i*4}s linear infinite`,animationDelay:`${a.delay}s`}}>
                  <path d={a.d} fill="none" stroke="#C9A84C" strokeWidth="1"/>
                </svg>
              ))}
            </div>

            {/* Orbes lumineux */}
            <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
              <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 70%)",left:`${60+heroPx*15}%`,top:`${30+heroPy*15}%`,transform:"translate(-50%,-50%)",animation:"heroOrb 20s ease-in-out infinite",opacity:heroPh>=1?1:0,transition:"opacity 3s"}}/>
              <div style={{position:"absolute",width:350,height:350,borderRadius:"50%",background:"radial-gradient(circle,rgba(160,82,45,.05) 0%,transparent 70%)",left:`${25+heroPx*-10}%`,top:`${65+heroPy*-10}%`,transform:"translate(-50%,-50%)",animation:"heroOrb 16s ease-in-out infinite reverse",opacity:heroPh>=1?1:0,transition:"opacity 3s .5s"}}/>
              <div style={{position:"absolute",left:"72%",top:"45%",opacity:heroPh>=3?1:0,transition:"opacity 2s"}}>
                {[0,1,2].map(i=><div key={i} style={{position:"absolute",width:60,height:60,borderRadius:"50%",border:"1px solid rgba(201,168,76,.08)",transform:"translate(-50%,-50%)",animation:`heroRing 4s ease-out infinite`,animationDelay:`${i*1.3}s`}}/>)}
              </div>
            </div>

            {/* Symboles africains flottants */}
            <div className="hero-sym" style={{position:"absolute",inset:0,pointerEvents:"none",opacity:heroPh>=3?1:0,transition:"opacity 2s"}}>
              {HERO_SYMBOLS.map((s,i)=>(
                <div key={i} style={{position:"absolute",left:`${s.x+heroPx*(i%2===0?3:-3)}%`,top:`${s.y+heroPy*(i%2===0?-2:2)}%`,fontSize:s.size,animation:`heroFloat ${s.dur}s ease-in-out infinite`,animationDelay:`${s.delay}s`,filter:`blur(${s.blur}px)`,opacity:s.op,transition:"left .8s ease, top .8s ease"}}>{s.char}</div>
              ))}
            </div>

            {/* Particules CSS */}
            <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:heroPh>=2?1:0,transition:"opacity 3s"}}>
              {HERO_PARTICLES.map(p=>(
                <div key={p.id} style={{position:"absolute",left:`${p.x}%`,bottom:"-5%",width:p.size,height:p.size,borderRadius:"50%",background:`rgba(201,168,76,${p.op})`,animation:`heroDrift ${p.dur}s linear infinite`,animationDelay:`${p.delay}s`}}/>
              ))}
            </div>

            {/* ── CONTENU HERO ── */}
            <div className="hero-inner" style={{position:"relative",zIndex:10,display:"flex",flexDirection:"column",justifyContent:"center",minHeight:"85vh",padding:"100px 60px 70px",maxWidth:1400,margin:"0 auto"}}>

              {/* Tagline */}
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:32,opacity:heroPh>=1?1:0,transform:heroPh>=1?"translateY(0)":"translateY(20px)",transition:"all 1s cubic-bezier(.2,.8,.2,1) .3s"}}>
                <div style={{height:1.5,background:"#C9A84C",transformOrigin:"left",width:48,animation:heroPh>=1?"heroExpand .8s ease .5s both":"none"}}/>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:"5px",color:"#C9A84C",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>ARTISANAT AFRICAIN · MONTRÉAL</span>
              </div>

              {/* Titre ligne 1 : lettre par lettre */}
              <h1 className="hero-t1" style={{fontSize:62,fontWeight:800,lineHeight:1.08,margin:"0 0 6px",fontFamily:"'Playfair Display',Georgia,serif",color:"#FAF7F2"}}>
                {"L'âme de l'Afrique,".split("").map((ch,i)=>(
                  <span key={i} style={{display:"inline-block",opacity:heroPh>=2?1:0,transform:heroPh>=2?"translateY(0)":"translateY(-24px)",transition:`opacity .5s ease ${.6+i*.035}s, transform .5s cubic-bezier(.2,.8,.2,1) ${.6+i*.035}s`,color:(ch==="'"||ch===",")?"#D4AF37":"#FAF7F2",textShadow:heroPh>=4?"0 0 30px rgba(201,168,76,.12)":"none"}}>{ch===" "?"\u00A0":ch}</span>
                ))}
              </h1>

              {/* Titre ligne 2 : doré + shimmer */}
              <div className="hero-t2" style={{fontSize:66,fontWeight:900,lineHeight:1.1,margin:"0 0 36px",fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",position:"relative"}}>
                <span style={{color:"#C9A84C",display:"block",textShadow:heroPh>=4?"0 0 40px rgba(201,168,76,.25), 0 0 80px rgba(201,168,76,.08)":"none"}}>
                  {"livrée chez vous.".split("").map((ch,i)=>(
                    <span key={i} style={{display:"inline-block",opacity:heroPh>=3?1:0,transform:heroPh>=3?"translateY(0) scale(1)":"translateY(20px) scale(.9)",transition:`opacity .4s ease ${i*.04}s, transform .5s cubic-bezier(.2,.8,.2,1) ${i*.04}s`}}>{ch===" "?"\u00A0":ch}</span>
                  ))}
                </span>
                {heroPh>=4&&<div aria-hidden="true" style={{position:"absolute",top:0,left:0,right:0,bottom:0,fontSize:"inherit",fontWeight:"inherit",fontStyle:"inherit",fontFamily:"inherit",lineHeight:"inherit",background:"linear-gradient(90deg, transparent 0%, rgba(232,213,160,.12) 25%, rgba(255,255,255,.18) 50%, rgba(232,213,160,.12) 75%, transparent 100%)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"heroShimmer 3s linear infinite",pointerEvents:"none"}}>livrée chez vous.</div>}
              </div>

              {/* Barre dorée */}
              <div style={{width:80,height:3,borderRadius:2,marginBottom:28,background:"linear-gradient(90deg,#C9A84C,#E8D5A0,#C9A84C)",backgroundSize:"200% auto",animation:heroPh>=4?"heroShimmer 3s linear infinite":"none",opacity:heroPh>=4?1:0,transform:heroPh>=4?"scaleX(1)":"scaleX(0)",transformOrigin:"left",transition:"all .6s cubic-bezier(.2,.8,.2,1) .2s"}}/>

              {/* Sous-titre */}
              <p style={{fontSize:18,color:"rgba(255,255,255,.45)",lineHeight:2,maxWidth:520,marginBottom:44,fontWeight:400,fontFamily:"'DM Sans',sans-serif",opacity:heroPh>=4?1:0,transform:heroPh>=4?"translateY(0)":"translateY(20px)",transition:"all 1s cubic-bezier(.2,.8,.2,1) .4s"}}>
                Habillement traditionnel, œuvres d'art et produits authentiques.<br/>De l'Afrique au Canada, créés par des artisans passionnés.
              </p>

              {/* CTA */}
              <div className="hero-cta" style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:64,opacity:heroPh>=5?1:0,transform:heroPh>=5?"translateY(0)":"translateY(20px)",transition:"all .8s cubic-bezier(.2,.8,.2,1) .2s"}}>
                <button onClick={()=>setPage("boutique")} style={{background:"linear-gradient(135deg,#C9A84C,#E8D5A0,#C9A84C)",backgroundSize:"200% auto",animation:"heroShimmer 3s linear infinite, heroGlow 3s ease-in-out infinite",color:"#1A1714",border:"none",padding:"18px 42px",fontSize:13,fontWeight:700,letterSpacing:"2px",cursor:"pointer",textTransform:"uppercase",borderRadius:100,fontFamily:"'DM Sans',sans-serif",transition:"transform .3s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px) scale(1.02)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                  Explorer la boutique
                </button>
                <button onClick={()=>setPage("suivi")} style={{background:"transparent",color:"#C9A84C",border:"2px solid rgba(201,168,76,.4)",padding:"18px 36px",fontSize:13,fontWeight:600,letterSpacing:"2px",cursor:"pointer",textTransform:"uppercase",borderRadius:100,fontFamily:"'DM Sans',sans-serif",backdropFilter:"blur(8px)",transition:"all .3s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#C9A84C";e.currentTarget.style.background="rgba(201,168,76,.08)";e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,168,76,.4)";e.currentTarget.style.background="transparent";e.currentTarget.style.transform="none";}}>
                  Suivre une commande
                </button>
              </div>

              {/* Stats */}
              <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:36,opacity:heroPh>=6?1:0,transition:"opacity 1s ease .3s"}}>
                <div className="hero-stats" style={{display:"flex",gap:64}}>
                  {[["50+","Artisans","✂️"],["10+","Pays d'Afrique","🌍"],["100%","Éthique","🤝"],["4.9★","Note clients","⭐"]].map(([val,label,icon],i)=>(
                    <div key={label} style={{animation:heroPh>=6?`heroStatPop .6s cubic-bezier(.2,.8,.2,1) ${i*.15}s both`:"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                        <span style={{fontSize:16,opacity:.6}}>{icon}</span>
                        <span style={{fontSize:30,fontWeight:800,fontFamily:"'Playfair Display',Georgia,serif",color:"#C9A84C",textShadow:"0 0 20px rgba(201,168,76,.15)"}}>{val}</span>
                      </div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.3)",letterSpacing:"2px",textTransform:"uppercase",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dégradé bas */}
            <div style={{position:"absolute",bottom:0,left:0,right:0,height:100,background:"linear-gradient(transparent,rgba(12,10,8,.6))",pointerEvents:"none"}}/>
          </div>

          {/* Categories */}
          <div className="section-pad" style={{padding:"64px 48px"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"5px",color:T.terra,textTransform:"uppercase",marginBottom:10}}>EXPLORER PAR UNIVERS</div>
              <h2 style={{fontSize:38,color:T.dark,fontWeight:800,fontFamily:"'Playfair Display',Georgia,serif"}}>Nos 5 univers</h2>
            </div>
            <div className="grid-5" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16}}>
              {CATEGORIES.map((c,i)=>(
                <div key={c.key} onClick={()=>{setCat(c.key);setPage("boutique");setSearch("");}}
                  style={{background:T.white,borderRadius:16,padding:"28px 20px",cursor:"pointer",textAlign:"center",transition:"all .3s cubic-bezier(.2,.8,.2,1)",border:`1px solid ${T.border}`,borderTop:`4px solid ${c.color}`,animation:`fadeIn .4s ease ${i*.08}s both`}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,.08)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  <div style={{fontSize:36,marginBottom:12}}>{c.emoji}</div>
                  <div style={{fontSize:15,fontWeight:700,color:T.dark,marginBottom:6,fontFamily:"'Playfair Display',Georgia,serif"}}>{c.label}</div>
                  <div style={{fontSize:12,color:T.muted,lineHeight:1.6}}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div className="section-pad" style={{padding:"48px",background:T.ivory,borderRadius:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36}}>
              <div>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:"5px",color:T.terra,textTransform:"uppercase",marginBottom:8}}>COUP DE CŒUR</div>
                <h2 style={{fontSize:34,color:T.dark,fontWeight:800,fontFamily:"'Playfair Display',Georgia,serif"}}>Sélection de la semaine</h2>
              </div>
              <button onClick={()=>{setPage("boutique");setCat(null);setSearch("");}} style={{background:"transparent",border:`2px solid ${T.dark}`,color:T.dark,padding:"10px 24px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,borderRadius:100,letterSpacing:".5px"}}>Voir tout →</button>
            </div>
            <div className="grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
              {[PRODUCTS[0],PRODUCTS[3],PRODUCTS[9],PRODUCTS[13]].map((p,i)=><ProductCard key={p.id} p={p} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} style={{animation:`fadeIn .4s ease ${i*.1}s both`}}/>)}
            </div>
          </div>

          {/* Story */}
          <div style={{background:T.dark,padding:"80px 48px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 80% 50%,rgba(201,168,76,.06) 0%,transparent 60%)"}}/>
            <div style={{maxWidth:640,margin:"0 auto",textAlign:"center",position:"relative"}}>
              <div style={{width:48,height:2,background:T.gold,margin:"0 auto 20px"}}/>
              <h2 style={{fontSize:38,color:T.cream,lineHeight:1.3,marginBottom:24,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700}}>Né en Afrique, construit à <span style={{color:T.gold,fontStyle:"italic"}}>Montréal.</span></h2>
              <p style={{fontSize:16,color:"rgba(255,255,255,.45)",lineHeight:2,marginBottom:40}}>BADAOUR est né d'un désir profond : relier la diaspora africaine à ses racines. Chaque achat soutient directement un artisan, une famille, une communauté.</p>
              <div style={{display:"flex",gap:40,justifyContent:"center",flexWrap:"wrap"}}>
                {[["Commerce éthique","Rémunération juste"],["Impact direct","Soutien aux familles"],["Authenticité","Zéro intermédiaire"]].map(([t,s])=>(
                  <div key={t} style={{textAlign:"center"}}><div style={{width:32,height:1.5,background:T.gold,margin:"0 auto 12px"}}/><div style={{color:T.cream,fontWeight:700,marginBottom:4,fontSize:14,fontFamily:"'Playfair Display',Georgia,serif"}}>{t}</div><div style={{color:"rgba(255,255,255,.35)",fontSize:12}}>{s}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════ BOUTIQUE ════════ */}
      {page==="boutique"&&(
        <div className="section-pad" style={{padding:"48px",animation:"fadeIn .4s ease"}}>
          <div style={{marginBottom:32}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>BADAOUR</div>
            <h1 style={{fontSize:38,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:800,marginBottom:24}}>Notre Boutique</h1>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button onClick={()=>setCat(null)} style={{background:!cat?T.dark:"transparent",color:!cat?"#fff":T.dark,border:`1.5px solid ${T.dark}`,padding:"8px 20px",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,borderRadius:100,cursor:"pointer"}}>Tout</button>
              {CATEGORIES.map(c=><button key={c.key} onClick={()=>setCat(cat===c.key?null:c.key)} style={{background:cat===c.key?T.dark:"transparent",color:cat===c.key?"#fff":T.dark,border:`1.5px solid ${T.dark}`,padding:"8px 20px",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,borderRadius:100,cursor:"pointer"}}>{c.emoji} {c.label}</button>)}
            </div>
          </div>
          {filtered.length===0?<div style={{textAlign:"center",padding:80,color:T.muted}}><div style={{fontSize:48}}>🔍</div><div style={{fontSize:17,marginTop:14,fontFamily:"'Playfair Display',Georgia,serif"}}>Aucun produit trouvé</div></div>
          :<div className="grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
            {filtered.map((p,i)=><ProductCard key={p.id} p={p} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} style={{animation:`fadeIn .3s ease ${i*.04}s both`}}/>)}
          </div>}
        </div>
      )}

      {/* ════════ ARTISANS ════════ */}
      {page==="artisans"&&(
        <div className="section-pad" style={{padding:"56px 48px",animation:"fadeIn .4s ease"}}>
          <div style={{marginBottom:44}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>CEUX QUI CRÉENT</div>
            <h1 style={{fontSize:38,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:800}}>Nos Artisans</h1>
          </div>
          <div className="grid-3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginBottom:48}}>
            {[{n:"Moussa Diallo",m:"Tailleur brodeur",v:"Dakar, Sénégal",e:"✂️",a:"23 ans",h:"Moussa perpétue l'art du grand boubou. Chaque broderie prend 4 jours."},{n:"Fatoumata Koné",m:"Artisane bogolan",v:"Bamako, Mali",e:"🎨",a:"18 ans",h:"Fatoumata ressuscite les motifs anciens du bogolan peint à la boue."},{n:"Abena Asante",m:"Perlière Krobo",v:"Accra, Ghana",e:"🔮",a:"15 ans",h:"Abena dirige une coopérative de 12 femmes artisanes."},{n:"Cheikh Ndiaye",m:"Sculpteur sur bois",v:"Thiès, Sénégal",e:"🌳",a:"30 ans",h:"Maître sculpteur, Cheikh crée des pièces uniques en bois de venn."},{n:"Kweku Mensah",m:"Tisserand kente",v:"Kumasi, Ghana",e:"🧵",a:"25 ans",h:"Tisserand royal, gardien de la tradition kente Ashanti."},{n:"Aïcha Diop",m:"Couturière haute couture",v:"Dakar, Sénégal",e:"👗",a:"20 ans",h:"Aïcha allie couture traditionnelle africaine et tendances contemporaines."}].map((a,i)=>(
              <div key={a.n} style={{background:T.white,borderRadius:16,padding:"32px 28px",border:`1px solid ${T.border}`,transition:"all .3s",animation:`fadeIn .4s ease ${i*.08}s both`}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,.08)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <div style={{width:64,height:64,background:T.dark,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,marginBottom:16,border:`3px solid ${T.gold}`}}>{a.e}</div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:"2px",color:T.terra,textTransform:"uppercase",marginBottom:4}}>{a.m}</div>
                <h3 style={{fontSize:20,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,marginBottom:6}}>{a.n}</h3>
                <div style={{fontSize:12,color:T.muted,marginBottom:4}}>📍 {a.v}</div>
                <div style={{fontSize:12,color:T.gold,fontWeight:700,marginBottom:12}}>⭐ {a.a} d'expérience</div>
                <div style={{height:1,background:T.border,margin:"12px 0"}}/>
                <p style={{fontSize:13,color:"#888",lineHeight:1.7}}>{a.h}</p>
              </div>
            ))}
          </div>
          <div style={{background:T.dark,padding:48,textAlign:"center",borderRadius:20,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 0%,rgba(201,168,76,.1),transparent 60%)"}}/>
            <div style={{position:"relative"}}>
              <h2 style={{color:T.gold,fontSize:28,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,marginBottom:12}}>Vous êtes artisan en Afrique ?</h2>
              <p style={{color:"rgba(255,255,255,.45)",fontSize:15,maxWidth:440,margin:"0 auto 24px",lineHeight:1.8}}>BADAOUR cherche des partenaires sérieux. Rejoignez notre réseau.</p>
              <button onClick={()=>toast("Envoyez votre dossier à "+EMAIL)} style={{background:T.gold,color:T.dark,border:"none",padding:"14px 36px",fontSize:13,fontWeight:700,letterSpacing:"1.5px",cursor:"pointer",borderRadius:100,fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase"}}>DEVENIR PARTENAIRE</button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ AUTH ════════ */}
      {page==="auth"&&(
        <div style={{padding:"64px 24px",maxWidth:460,margin:"0 auto",animation:"fadeIn .4s ease"}}>
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"5px",color:T.terra,textTransform:"uppercase",marginBottom:8}}>ESPACE CLIENT</div>
            <h1 style={{fontSize:34,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:800}}>{authMode==="login"?"Connexion":"Créer un compte"}</h1>
          </div>
          <div style={{display:"flex",marginBottom:28,borderRadius:100,overflow:"hidden",border:`1.5px solid ${T.dark}`}}>
            {[["login","Se connecter"],["register","Créer un compte"]].map(([m,l])=><button key={m} onClick={()=>setAuthM(m)} style={{flex:1,padding:"12px",fontFamily:"'DM Sans',sans-serif",fontSize:13,cursor:"pointer",background:authMode===m?T.dark:"transparent",color:authMode===m?"#fff":T.dark,border:"none",fontWeight:authMode===m?700:500}}>{l}</button>)}
          </div>
          <div style={{background:T.white,border:`1px solid ${T.border}`,padding:"32px 28px",borderRadius:16}}>
            {authMode==="login"?(<>
              <Inp label="Email" type="email" placeholder="votre@email.com" value={authForm.email} onChange={e=>setAF({...authForm,email:e.target.value})}/>
              <Inp label="Mot de passe" type="password" placeholder="••••••••" value={authForm.password} onChange={e=>setAF({...authForm,password:e.target.value})}/>
              <button onClick={handleLogin} style={{width:"100%",background:T.dark,color:"#fff",border:"none",padding:"14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:"1px",cursor:"pointer",borderRadius:10,textTransform:"uppercase"}}>SE CONNECTER</button>
              <div style={{textAlign:"center",marginTop:14,fontSize:12,color:T.muted}}>Démo : mamadou@test.com / test123</div>
            </>):(<>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Inp label="Prénom *" placeholder="Mamadou" value={authForm.firstName} onChange={e=>setAF({...authForm,firstName:e.target.value})}/>
                <Inp label="Nom" placeholder="Diallo" value={authForm.lastName} onChange={e=>setAF({...authForm,lastName:e.target.value})}/>
              </div>
              <Inp label="Email *" type="email" placeholder="votre@email.com" value={authForm.email} onChange={e=>setAF({...authForm,email:e.target.value})}/>
              <Inp label="Mot de passe *" type="password" placeholder="Min. 6 caractères" value={authForm.password} onChange={e=>setAF({...authForm,password:e.target.value})}/>
              <Inp label="Confirmer" type="password" placeholder="Répétez" value={authForm.confirm} onChange={e=>setAF({...authForm,confirm:e.target.value})}/>
              <button onClick={handleRegister} style={{width:"100%",background:T.terra,color:"#fff",border:"none",padding:"14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:"1px",cursor:"pointer",borderRadius:10,textTransform:"uppercase"}}>CRÉER MON COMPTE</button>
            </>)}
          </div>
        </div>
      )}

      {/* ════════ COMPTE ════════ */}
      {page==="compte"&&user&&(
        <div className="section-pad" style={{padding:"56px 48px",maxWidth:960,margin:"0 auto",animation:"fadeIn .4s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:40,flexWrap:"wrap",gap:16}}>
            <div><div style={{fontSize:11,fontWeight:700,letterSpacing:"5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>MON ESPACE</div><h1 style={{fontSize:36,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:800}}>Bonjour, {user.firstName} 👋</h1><div style={{fontSize:13,color:T.muted,marginTop:6}}>📧 {user.email}</div></div>
            <button onClick={()=>{setUser(null);setPage("home");toast("Déconnexion","info");}} style={{background:"transparent",border:`1.5px solid ${T.border}`,color:T.muted,padding:"10px 20px",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",borderRadius:100}}>Se déconnecter</button>
          </div>
          <div className="grid-3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:36}}>
            {[["📦","Commandes",(accounts.find(u=>u.email===user.email)?.orders||[]).length],["❤️","Souhaits",wishlist.length],["🌍","Livraison","Afrique → Canada"]].map(([e,l,v])=><div key={l} style={{background:T.white,border:`1px solid ${T.border}`,padding:"24px",borderRadius:16}}><div style={{fontSize:28,marginBottom:10}}>{e}</div><div style={{fontSize:10,fontWeight:700,letterSpacing:"2px",color:T.muted,textTransform:"uppercase",marginBottom:6}}>{l}</div><div style={{fontSize:22,fontWeight:800,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif"}}>{v}</div></div>)}
          </div>
          <div style={{background:T.white,border:`1px solid ${T.border}`,padding:"28px",borderRadius:16}}>
            <h3 style={{fontSize:17,color:T.dark,margin:"0 0 20px",fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700}}>📋 Mes commandes</h3>
            {(accounts.find(u=>u.email===user.email)?.orders||[]).length===0
              ?<div style={{textAlign:"center",padding:40,color:T.muted}}><div style={{fontSize:36}}>📦</div><div style={{marginTop:12}}>Aucune commande</div><button onClick={()=>setPage("boutique")} style={{marginTop:16,background:T.dark,color:"#fff",border:"none",padding:"10px 24px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,borderRadius:100}}>DÉCOUVRIR →</button></div>
              :(accounts.find(u=>u.email===user.email)?.orders||[]).map(o=>(
                <div key={o.id} onClick={()=>{setTid(o.id);setTres(o);setTerr("");setPage("suivi");}} style={{border:`1px solid ${T.border}`,padding:"16px 20px",marginBottom:10,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:12,transition:"all .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=T.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                  <div><div style={{fontWeight:700,fontSize:15,letterSpacing:"1px",color:T.dark}}>{o.id}</div><div style={{fontSize:12,color:T.muted,marginTop:3}}>{o.date} · {o.items.length} article(s)</div></div>
                  <div style={{textAlign:"right"}}><Badge status={o.status}/><div style={{fontWeight:700,color:T.terra,marginTop:6,fontSize:15}}>{o.total.toFixed(2)} $CA</div></div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* ════════ PANIER / CHECKOUT ════════ */}
      {page==="panier"&&(
        <div className="section-pad" style={{padding:"48px",maxWidth:1020,margin:"0 auto",animation:"fadeIn .4s ease"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:44,gap:0}}>
            {["cart","info","payment"].map((k,i)=>{
              const labels=["Panier","Livraison","Paiement"],cur=["cart","info","payment"].indexOf(payStep),done=i<cur,active=i===cur;
              return(<div key={k} style={{display:"flex",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:done?T.green:active?T.gold:T.sand,color:done||active?"#fff":T.muted,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,transition:"all .3s"}}>{done?"✓":i+1}</div>
                  <span style={{fontSize:13,color:active?T.dark:T.muted,fontWeight:active?700:500}}>{labels[i]}</span>
                </div>
                {i<2&&<div style={{width:52,height:2,background:done?T.green:T.border,margin:"0 12px",borderRadius:2}}/>}
              </div>);
            })}
          </div>

          {payStep==="cart"&&(
            <div className="grid-side" style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:28}}>
              <div>
                <h2 style={{fontSize:28,color:T.dark,marginBottom:20,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700}}>Mon Panier</h2>
                {cart.length===0?<div style={{textAlign:"center",padding:60,color:T.muted,background:T.white,borderRadius:16}}><div style={{fontSize:44}}>🛒</div><div style={{fontSize:16,marginTop:14,fontFamily:"'Playfair Display',Georgia,serif"}}>Votre panier est vide</div><button onClick={()=>setPage("boutique")} style={{marginTop:20,background:T.dark,color:"#fff",border:"none",padding:"12px 28px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,borderRadius:100}}>EXPLORER →</button></div>
                :cart.map(item=>(
                  <div key={item.id} style={{background:T.white,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12,display:"flex",alignItems:"center",gap:16,transition:"all .2s"}}>
                    <div style={{width:56,height:56,borderRadius:12,background:item.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{item.emoji}</div>
                    <div style={{flex:1,minWidth:0}}><div style={{fontSize:15,fontWeight:700,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif"}}>{item.name}</div><div style={{fontSize:12,color:T.muted}}>✂️ {item.artisan}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <button onClick={()=>updateQty(item.id,-1)} style={{width:30,height:30,border:`1px solid ${T.border}`,background:T.white,cursor:"pointer",fontSize:15,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontSize:15,fontWeight:700,minWidth:24,textAlign:"center"}}>{item.qty}</span>
                      <button onClick={()=>updateQty(item.id,1)} style={{width:30,height:30,border:`1px solid ${T.border}`,background:T.white,cursor:"pointer",fontSize:15,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                    <div style={{minWidth:80,textAlign:"right"}}><div style={{fontSize:17,fontWeight:700,color:T.dark}}>{(item.price*item.qty).toFixed(2)} $</div><button onClick={()=>removeItem(item.id)} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:11,marginTop:3}}>Retirer ✕</button></div>
                  </div>
                ))}
              </div>
              <Summary cart={cart} subtotal={subtotal} shipping={shipping} taxes={taxes} total={total} onContinue={()=>{if(!cart.length){toast("Ajoutez des articles","info");return;}setPay("info");}}/>
            </div>
          )}

          {payStep==="info"&&(
            <div className="grid-side" style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:28}}>
              <div>
                <h2 style={{fontSize:28,color:T.dark,marginBottom:20,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700}}>Livraison</h2>
                <div style={{background:T.white,border:`1px solid ${T.border}`,padding:"28px",borderRadius:16}}>
                  <Inp label="Nom complet *" placeholder="Mamadou Diallo" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                  <Inp label="Email *" type="email" placeholder={EMAIL} value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                  <Inp label="Téléphone" type="tel" placeholder={PHONE} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
                  <Inp label="Adresse *" placeholder="Numéro et rue" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
                  <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:10}}>
                    <Inp label="Ville" value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
                    <Inp label="Province" value={form.province} onChange={e=>setForm({...form,province:e.target.value})}/>
                    <Inp label="Code postal" placeholder="H3Z 1E3" value={form.postal} onChange={e=>setForm({...form,postal:e.target.value})}/>
                  </div>
                  <div style={{display:"flex",gap:10,marginTop:8}}>
                    <button onClick={()=>setPay("cart")} style={{flex:1,background:"transparent",color:T.dark,border:`1.5px solid ${T.border}`,padding:"13px",fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontSize:13,borderRadius:10}}>← Retour</button>
                    <button onClick={()=>{if(!form.name||!form.email||!form.address){toast("Remplissez les champs *","info");return;}setPay("payment");}} style={{flex:2,background:T.dark,color:"#fff",border:"none",padding:"13px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:"1px",cursor:"pointer",fontSize:13,borderRadius:10,textTransform:"uppercase"}}>Paiement →</button>
                  </div>
                </div>
              </div>
              <Summary cart={cart} subtotal={subtotal} shipping={shipping} taxes={taxes} total={total}/>
            </div>
          )}

          {payStep==="payment"&&(
            <div className="grid-side" style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:28}}>
              <div>
                <h2 style={{fontSize:28,color:T.dark,marginBottom:20,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700}}>Paiement</h2>
                <div style={{background:T.white,border:`1px solid ${T.border}`,padding:"28px",borderRadius:16}}>
                  <div style={{display:"flex",gap:10,marginBottom:24}}>
                    {[["card","💳 Carte"],["paypal","🅿️ PayPal"],["interac","🏦 Interac"]].map(([m,l])=><button key={m} onClick={()=>setPayM(m)} style={{flex:1,padding:"12px 8px",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",background:payMethod===m?T.dark:T.white,color:payMethod===m?"#fff":T.dark,border:payMethod===m?`1.5px solid ${T.dark}`:`1.5px solid ${T.border}`,borderRadius:10}}>{l}</button>)}
                  </div>
                  {payMethod==="card"&&(<>
                    <div style={{marginBottom:18}}><label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:"1.5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>Numéro de carte</label><input placeholder="1234  5678  9012  3456" maxLength={19} value={card.number} onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();setCard({...card,number:v});}} style={{width:"100%",padding:"12px 16px",background:T.cream,border:`1.5px solid ${T.border}`,fontSize:16,letterSpacing:"2px",borderRadius:8,outline:"none",boxSizing:"border-box",fontFamily:"'DM Sans',sans-serif"}}/></div>
                    <Inp label="Nom sur la carte" placeholder="MAMADOU DIALLO" value={card.name} onChange={e=>setCard({...card,name:e.target.value.toUpperCase()})}/>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      <Inp label="Expiration" placeholder="12/27" value={card.expiry} onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,4);if(v.length>2)v=v.slice(0,2)+"/"+v.slice(2);setCard({...card,expiry:v});}}/>
                      <Inp label="CVV" placeholder="•••" type="password" maxLength={4} value={card.cvv} onChange={e=>setCard({...card,cvv:e.target.value.replace(/\D/g,"").slice(0,4)})}/>
                    </div>
                    <div style={{background:"#F0FFF4",border:`1px solid ${T.green}`,padding:"10px 14px",fontSize:12,color:T.green,borderRadius:8,fontWeight:600}}>🔒 Chiffrement SSL 256-bit</div>
                  </>)}
                  {payMethod==="paypal"&&<div style={{textAlign:"center",padding:32,background:T.cream,borderRadius:12}}><div style={{fontSize:44}}>🅿️</div><div style={{fontSize:15,fontWeight:700,marginTop:10,color:T.dark}}>PayPal</div><div style={{fontSize:12,color:T.muted,marginTop:4}}>Redirection vers PayPal</div></div>}
                  {payMethod==="interac"&&<div><Inp label="Email Interac" type="email" placeholder="votre@email.com"/><div style={{background:T.ivory,border:`1px solid ${T.gold}`,padding:"12px 14px",fontSize:12,color:T.muted,borderRadius:8}}>💡 Envoyez à : <strong>{EMAIL}</strong></div></div>}
                  <div style={{display:"flex",gap:10,marginTop:20}}>
                    <button onClick={()=>setPay("info")} style={{flex:1,background:"transparent",color:T.dark,border:`1.5px solid ${T.border}`,padding:"13px",fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontSize:12,borderRadius:10}}>← Retour</button>
                    <button onClick={handlePay} disabled={processing} style={{flex:2,background:processing?T.charcoal:T.terra,color:"#fff",border:"none",padding:"13px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:"1px",cursor:processing?"wait":"pointer",fontSize:13,borderRadius:10,textTransform:"uppercase"}}>{processing?"⏳ Traitement...":`PAYER ${total} $CA`}</button>
                  </div>
                </div>
              </div>
              <Summary cart={cart} subtotal={subtotal} shipping={shipping} taxes={taxes} total={total} address={form}/>
            </div>
          )}
        </div>
      )}

      {/* ════════ CONFIRMATION ════════ */}
      {page==="confirmation"&&lastOrder&&(
        <div style={{padding:"72px 24px",maxWidth:640,margin:"0 auto",textAlign:"center",animation:"fadeIn .5s ease"}}>
          <div style={{width:80,height:80,background:T.green,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,margin:"0 auto 24px",animation:"float 2s ease infinite"}}>✓</div>
          <h1 style={{fontSize:36,color:T.dark,marginBottom:10,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:800}}>Commande confirmée !</h1>
          <p style={{fontSize:15,color:T.muted,lineHeight:1.8,marginBottom:10}}>Merci <strong>{lastOrder.client}</strong> ! Confirmation par email.</p>
          <div style={{background:T.dark,color:T.gold,display:"inline-block",padding:"10px 28px",fontSize:22,fontWeight:700,letterSpacing:"3px",borderRadius:10,marginBottom:32,fontFamily:"'Playfair Display',Georgia,serif"}}>{lastOrder.id}</div>
          <div style={{background:T.white,border:`1px solid ${T.border}`,padding:"28px",borderRadius:16,textAlign:"left",marginBottom:24}}>
            <div style={{fontSize:14,fontWeight:700,color:T.dark,marginBottom:18,fontFamily:"'Playfair Display',Georgia,serif"}}>📦 Suivi de votre commande</div>
            <Timeline order={lastOrder}/>
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>{setTid(lastOrder.id);setTres(lastOrder);setTerr("");setPage("suivi");}} style={{background:T.dark,color:"#fff",border:"none",padding:"13px 28px",fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",fontSize:13,borderRadius:100}}>Suivre →</button>
            <button onClick={()=>setPage("boutique")} style={{background:"transparent",color:T.dark,border:`1.5px solid ${T.dark}`,padding:"13px 28px",fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",fontSize:13,borderRadius:100}}>Continuer les achats</button>
          </div>
        </div>
      )}

      {/* ════════ SUIVI ════════ */}
      {page==="suivi"&&(
        <div className="section-pad" style={{padding:"56px 48px",maxWidth:820,margin:"0 auto",animation:"fadeIn .4s ease"}}>
          <div style={{marginBottom:32}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>EN TEMPS RÉEL</div>
            <h1 style={{fontSize:38,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:800,marginBottom:10}}>Suivi de commande</h1>
            <p style={{color:T.muted,fontSize:14}}>Format : <strong>BDR-2026-XXXX</strong></p>
          </div>
          <div style={{display:"flex",gap:0,marginBottom:32}}>
            <input value={trackId} onChange={e=>setTid(e.target.value.toUpperCase())} onKeyDown={e=>e.key==="Enter"&&doTrack()} placeholder="Ex: BDR-2026-0042"
              style={{flex:1,padding:"14px 18px",background:T.white,border:`1.5px solid ${T.dark}`,borderRight:"none",fontFamily:"'DM Sans',sans-serif",fontSize:15,letterSpacing:"2px",outline:"none",borderRadius:"10px 0 0 10px"}}/>
            <button onClick={doTrack} style={{background:T.dark,color:"#fff",border:"none",padding:"14px 28px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,letterSpacing:"1px",cursor:"pointer",textTransform:"uppercase",borderRadius:"0 10px 10px 0"}}>SUIVRE →</button>
          </div>
          {trackErr&&<div style={{background:"#FFF0F0",border:`1.5px solid ${T.wine}`,padding:"14px 18px",color:T.wine,marginBottom:22,fontSize:13,borderRadius:10,fontWeight:600}}>❌ {trackErr}</div>}
          {trackRes&&(<>
            <div style={{background:T.dark,padding:"20px 26px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"16px 16px 0 0"}}>
              <div><div style={{fontSize:9,color:"rgba(255,255,255,.4)",letterSpacing:"3px",marginBottom:3}}>COMMANDE</div><div style={{fontSize:20,color:T.gold,fontWeight:700,letterSpacing:"2px",fontFamily:"'Playfair Display',Georgia,serif"}}>{trackRes.id}</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:9,color:"rgba(255,255,255,.4)",letterSpacing:"2px",marginBottom:3}}>DATE</div><div style={{color:T.cream,fontSize:13}}>{trackRes.date}</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:9,color:"rgba(255,255,255,.4)",letterSpacing:"2px",marginBottom:3}}>TOTAL</div><div style={{color:T.gold,fontSize:18,fontWeight:700}}>{trackRes.total.toFixed(2)} $CA</div></div>
              <Badge status={trackRes.status}/>
            </div>
            <div style={{background:T.white,border:`1px solid ${T.border}`,borderTop:"none",padding:"28px",borderRadius:"0 0 16px 16px",marginBottom:20}}>
              <div style={{fontSize:14,fontWeight:700,color:T.dark,marginBottom:20,fontFamily:"'Playfair Display',Georgia,serif"}}>🗺️ Progression</div>
              <Timeline order={trackRes} verbose/>
            </div>
          </>)}
          {!trackRes&&orders.length>0&&(
            <div style={{marginTop:44}}>
              <div style={{fontSize:12,fontWeight:700,color:T.dark,marginBottom:14,letterSpacing:"1.5px",textTransform:"uppercase"}}>📜 Commandes récentes</div>
              {orders.map(o=>(
                <div key={o.id} onClick={()=>{setTid(o.id);setTres(o);setTerr("");}} style={{background:T.white,border:`1px solid ${T.border}`,padding:"16px 22px",marginBottom:10,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:12,transition:"all .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=T.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                  <div><div style={{fontWeight:700,color:T.dark,fontSize:14,letterSpacing:"1px"}}>{o.id}</div><div style={{fontSize:12,color:T.muted,marginTop:3}}>{o.date} · {o.items.length} article(s)</div></div>
                  <div style={{textAlign:"right"}}><Badge status={o.status}/><div style={{fontWeight:700,color:T.terra,marginTop:6,fontSize:14}}>{o.total.toFixed(2)} $CA</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════ COMMANDE SUR MESURE ════════ */}
      {page==="commande"&&(
        <div className="section-pad" style={{padding:"56px 48px",maxWidth:700,margin:"0 auto",animation:"fadeIn .4s ease"}}>
          <div style={{marginBottom:28}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>PERSONNALISÉ</div>
            <h1 style={{fontSize:38,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:800,marginBottom:10}}>Commande sur mesure</h1>
            <p style={{color:T.muted,fontSize:14,lineHeight:1.8}}>Remplissez ce formulaire et nous vous répondrons sous 48h.</p>
          </div>
          <div style={{background:T.white,border:`1px solid ${T.border}`,padding:"32px",borderRadius:16}}>
            <Inp label="Nom complet" placeholder="Mamadou Diallo"/><Inp label="Email" type="email" placeholder={EMAIL}/><Inp label="Téléphone / WhatsApp" type="tel" placeholder={PHONE}/><Inp label="Ville" placeholder="Montréal, QC"/>
            <div style={{marginBottom:18}}>
              <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:"1.5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>Catégorie</label>
              <select style={{width:"100%",padding:"12px 16px",background:T.cream,border:`1.5px solid ${T.border}`,color:T.dark,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",borderRadius:8}}>
                {["Habillement Homme","Habillement Femme","Habillement Enfant","Oeuvre d'art","Divers / Accessoires"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{marginBottom:18}}>
              <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:"1.5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>Détails</label>
              <textarea placeholder="Couleurs, taille, matières, quantité, occasion..." rows={5} style={{width:"100%",padding:"12px 16px",background:T.cream,border:`1.5px solid ${T.border}`,color:T.dark,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",borderRadius:8,resize:"vertical",boxSizing:"border-box"}}/>
            </div>
            <div style={{marginBottom:24}}>
              <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:"1.5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>Budget</label>
              <select style={{width:"100%",padding:"12px 16px",background:T.cream,border:`1.5px solid ${T.border}`,color:T.dark,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",borderRadius:8}}>
                {["Moins de 50 $CA","50 – 150 $CA","150 – 300 $CA","300 – 500 $CA","Plus de 500 $CA"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <button onClick={()=>toast("Demande envoyée ! Réponse sous 48h ✓")} style={{width:"100%",background:T.dark,color:"#fff",border:"none",padding:"16px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:"1.5px",cursor:"pointer",textTransform:"uppercase",borderRadius:10}}>ENVOYER MA DEMANDE</button>
          </div>
        </div>
      )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{background:T.dark,color:T.muted,padding:"56px 48px 28px",marginTop:64,borderTop:`1px solid rgba(201,168,76,.2)`}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div className="grid-4" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:36,marginBottom:40}}>
            <div>
              <div style={{fontSize:22,color:T.gold,letterSpacing:"5px",fontWeight:800,marginBottom:14,fontFamily:"'Playfair Display',Georgia,serif"}}>BADAOUR</div>
              <p style={{fontSize:13,lineHeight:1.9,color:"rgba(255,255,255,.35)",maxWidth:280}}>L'Afrique à votre porte. Commerce éthique, artisanat authentique, livraison partout au Canada.</p>
              <div style={{marginTop:14,fontSize:12,color:"rgba(255,255,255,.3)"}}>📞 {PHONE}<br/>✉️ {EMAIL}</div>
            </div>
            {[["Boutique",["Homme","Femme","Enfant","Art","Accessoires"]],["BADAOUR",["Notre histoire","Nos artisans","Blog","Contact","Partenaire"]],["Aide",["Livraison","Retours","FAQ","Sur mesure","Mon compte"]]].map(([title,links])=>(
              <div key={title}>
                <div style={{color:T.gold,fontWeight:700,letterSpacing:"2px",fontSize:11,textTransform:"uppercase",marginBottom:16}}>{title}</div>
                {links.map(l=><div key={l} style={{color:"rgba(255,255,255,.3)",fontSize:13,marginBottom:9,cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color=T.gold} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.3)"}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:20,display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,.25)",flexWrap:"wrap",gap:10}}>
            <span>© 2026 BADAOUR · Montréal, Québec · Canada</span>
            <span style={{color:T.gold}}>Fait avec ❤️ pour la diaspora africaine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
