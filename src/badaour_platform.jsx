import { useState, useEffect } from "react";

const A = {
  bg:"#0C0C10", surface:"#16161E", surface2:"#1E1E2A", surface3:"#262636",
  border:"#2A2A3C", borderLight:"#363650",
  accent:"#D4AF37", accentDim:"#A08628", accentGlow:"rgba(212,175,55,.15)",
  text:"#E8E6E3", textDim:"#A0A0B4", textMuted:"#6A6A82",
  success:"#34D399", successBg:"rgba(52,211,153,.12)",
  warning:"#FBBF24", warningBg:"rgba(251,191,36,.12)",
  danger:"#EF4444", dangerBg:"rgba(239,68,68,.12)",
  info:"#60A5FA", infoBg:"rgba(96,165,250,.12)",
};
const G="#D4AF37";const DARK="#1A0A00";
const ADMIN_EMAIL="admin@badaour.com";const ADMIN_PASSWORD="badaour2025";

function useScreen(){const[w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);return{w,mobile:w<640,tablet:w>=640&&w<1024,desktop:w>=1024};}

const INIT_PRODUCTS = [
  {id:1,name:"Grand Boubou Brodé",category:"homme",sub:"Boubou",artisan:"Moussa Diallo",city:"Dakar",country:"Sénégal",price:189,cost:65,stock:12,tag:"Bestseller",desc:"Broderie bazin riche",sales:47,rating:4.8},
  {id:2,name:"Dashiki Festif",category:"homme",sub:"Chemise",artisan:"Koffi Asante",city:"Accra",country:"Ghana",price:78,cost:28,stock:25,tag:"Nouveau",desc:"Coton brodé",sales:32,rating:4.6},
  {id:3,name:"Agbada Cérémonie",category:"homme",sub:"Tenue complète",artisan:"Adebayo Okafor",city:"Lagos",country:"Nigeria",price:245,cost:90,stock:5,tag:"Premium",desc:"3 pièces broderie dorée",sales:18,rating:4.9},
  {id:4,name:"Robe Wax Élégance",category:"femme",sub:"Robe",artisan:"Fatoumata Koné",city:"Bamako",country:"Mali",price:134,cost:48,stock:18,tag:"Bestseller",desc:"Wax hollandais",sales:63,rating:4.7},
  {id:5,name:"Ensemble Bogolan Chic",category:"femme",sub:"Ensemble",artisan:"Awa Traoré",city:"Bamako",country:"Mali",price:168,cost:55,stock:8,tag:"Artisanal",desc:"Bogolan peint",sales:29,rating:4.8},
  {id:6,name:"Kaftan Soirée Brodé",category:"femme",sub:"Kaftan",artisan:"Aïcha Diop",city:"Dakar",country:"Sénégal",price:212,cost:75,stock:6,tag:"Premium",desc:"Voile coton, fil d'or",sales:21,rating:4.9},
  {id:7,name:"Mini Boubou Enfant",category:"enfant",sub:"Boubou",artisan:"Moussa Diallo",city:"Dakar",country:"Sénégal",price:64,cost:22,stock:30,tag:"Populaire",desc:"Coton doux",sales:55,rating:4.5},
  {id:8,name:"Robe Wax Princesse",category:"enfant",sub:"Robe",artisan:"Koffi Mensah",city:"Lomé",country:"Togo",price:52,cost:18,stock:22,tag:"Nouveau",desc:"Wax coloré",sales:41,rating:4.6},
  {id:9,name:"Ensemble Kente Junior",category:"enfant",sub:"Ensemble",artisan:"Kweku Mensah",city:"Kumasi",country:"Ghana",price:89,cost:32,stock:14,tag:"Premium",desc:"Kente tissé",sales:26,rating:4.7},
  {id:10,name:"Masque Baoulé Ancien",category:"art",sub:"Masque",artisan:"Cheikh Ndiaye",city:"Thiès",country:"Sénégal",price:320,cost:110,stock:3,tag:"Unique",desc:"Goli bois venn",sales:8,rating:5.0},
  {id:11,name:"Sculpture Baobab",category:"art",sub:"Sculpture",artisan:"Cheikh Ndiaye",city:"Thiès",country:"Sénégal",price:275,cost:95,stock:4,tag:"Artisanal",desc:"Ébène laiton",sales:12,rating:4.9},
  {id:12,name:"Tableau Toile d'Afrique",category:"art",sub:"Tableau",artisan:"Ibrahima Sow",city:"Dakar",country:"Sénégal",price:195,cost:68,stock:7,tag:"Nouveau",desc:"Acrylique toile",sales:15,rating:4.7},
  {id:13,name:"Collier Krobo Perles",category:"divers",sub:"Bijou",artisan:"Abena Asante",city:"Accra",country:"Ghana",price:86,cost:30,stock:20,tag:"Populaire",desc:"Perles Krobo",sales:38,rating:4.6},
  {id:14,name:"Sac Bogolan Cuir",category:"divers",sub:"Sac",artisan:"Fatoumata Koné",city:"Bamako",country:"Mali",price:112,cost:40,stock:11,tag:"Artisanal",desc:"Cuir végétal",sales:24,rating:4.8},
  {id:15,name:"Huile de Karité Pure",category:"divers",sub:"Beauté",artisan:"Mariam Ouédraogo",city:"Ouaga",country:"Burkina Faso",price:34,cost:10,stock:45,tag:"Bio",desc:"200ml bio",sales:89,rating:4.4},
  {id:16,name:"Tissu Wax 6 yards",category:"divers",sub:"Tissu",artisan:"Koffi Mensah",city:"Lomé",country:"Togo",price:58,cost:20,stock:35,tag:"Populaire",desc:"Double face",sales:72,rating:4.5},
];

const INIT_ORDERS = [
  {id:"BDR-2025-0042",date:"2025-01-10",status:"transit",customer:"Mamadou Diallo",email:"mamadou@mail.com",phone:"438-555-0101",address:"4500 Rue Sherbrooke, Mtl",items:[{pid:1,qty:1},{pid:4,qty:1}],total:355.25,shipping:18,payMethod:"Interac",events:[{step:"confirmed",date:"10 jan"},{step:"preparation",date:"11 jan"},{step:"shipped",date:"15 jan"},{step:"transit",date:"16 jan",note:"Vol AF722"}]},
  {id:"BDR-2025-0038",date:"2025-01-08",status:"delivered",customer:"Aïssatou Bah",email:"aissatou@mail.com",phone:"514-555-0202",address:"1200 Av. Papineau, Mtl",items:[{pid:7,qty:2},{pid:15,qty:3}],total:252.80,shipping:15,payMethod:"Carte",events:[{step:"confirmed",date:"8 jan"},{step:"delivered",date:"21 jan"}]},
  {id:"BDR-2025-0051",date:"2025-01-15",status:"preparation",customer:"Jean-Pierre Tremblay",email:"jp@mail.com",phone:"438-555-0303",address:"780 Bd René-Lévesque, Mtl",items:[{pid:10,qty:1}],total:362.40,shipping:22,payMethod:"PayPal",events:[{step:"confirmed",date:"15 jan"},{step:"preparation",date:"16 jan"}]},
  {id:"BDR-2025-0055",date:"2025-01-18",status:"confirmed",customer:"Fatou Sow",email:"fatou@mail.com",phone:"514-555-0404",address:"320 Rue Ontario E, Mtl",items:[{pid:6,qty:1},{pid:13,qty:2}],total:425.90,shipping:18,payMethod:"Interac",events:[{step:"confirmed",date:"18 jan"}]},
  {id:"BDR-2025-0060",date:"2025-01-22",status:"shipped",customer:"Omar Sy",email:"omar@mail.com",phone:"438-555-0505",address:"55 Av. du Parc, Mtl",items:[{pid:3,qty:1},{pid:16,qty:2}],total:392.15,shipping:18,payMethod:"Carte",events:[{step:"confirmed",date:"22 jan"},{step:"preparation",date:"23 jan"},{step:"shipped",date:"27 jan"}]},
];

const ARTISANS = [
  {id:1,name:"Moussa Diallo",craft:"Tailleur brodeur",city:"Dakar",country:"Sénégal",exp:23,products:3,sales:102,revenue:15870,rating:4.8},
  {id:2,name:"Fatoumata Koné",craft:"Artisane bogolan",city:"Bamako",country:"Mali",exp:18,products:2,sales:53,revenue:9240,rating:4.8},
  {id:3,name:"Abena Asante",craft:"Perlière Krobo",city:"Accra",country:"Ghana",exp:15,products:1,sales:38,revenue:3268,rating:4.6},
  {id:4,name:"Cheikh Ndiaye",craft:"Sculpteur",city:"Thiès",country:"Sénégal",exp:30,products:2,sales:20,revenue:11900,rating:4.95},
  {id:5,name:"Koffi Mensah",craft:"Tisserand",city:"Lomé",country:"Togo",exp:12,products:2,sales:113,revenue:6410,rating:4.55},
  {id:6,name:"Aïcha Diop",craft:"Couturière HC",city:"Dakar",country:"Sénégal",exp:20,products:1,sales:21,revenue:4452,rating:4.9},
  {id:7,name:"Kweku Mensah",craft:"Tisserand kente",city:"Kumasi",country:"Ghana",exp:25,products:1,sales:26,revenue:2314,rating:4.7},
  {id:8,name:"Mariam Ouédraogo",craft:"Productrice karité",city:"Ouaga",country:"Burkina Faso",exp:10,products:1,sales:89,revenue:3026,rating:4.4},
];

const CATS=[{key:"homme",label:"Homme",emoji:"👘",color:"#1A3A6B"},{key:"femme",label:"Femme",emoji:"👗",color:"#8B1A00"},{key:"enfant",label:"Enfant",emoji:"🧒",color:"#27AE60"},{key:"art",label:"Art",emoji:"🏺",color:"#6A0572"},{key:"divers",label:"Divers",emoji:"✨",color:"#D4AF37"}];
const MONTHLY=[{month:"Août",revenue:2800,orders:12},{month:"Sept",revenue:4200,orders:18},{month:"Oct",revenue:5100,orders:22},{month:"Nov",revenue:7800,orders:34},{month:"Déc",revenue:12400,orders:52},{month:"Jan",revenue:9600,orders:41}];
const STEPS=[{key:"confirmed",label:"Confirmée",icon:"✅"},{key:"preparation",label:"Préparation",icon:"🧵"},{key:"shipped",label:"Expédiée",icon:"📦"},{key:"transit",label:"En transit",icon:"✈️"},{key:"customs",label:"Dédouanement",icon:"🛃"},{key:"delivery",label:"En livraison",icon:"🚚"},{key:"delivered",label:"Livré",icon:"🎉"}];
const sLabel={confirmed:"Confirmée",preparation:"Préparation",shipped:"Expédiée",transit:"En transit",customs:"Dédouanement",delivery:"En livraison",delivered:"Livré"};
const sColor={confirmed:A.success,preparation:"#CD853F",shipped:"#1A5276",transit:"#6A0572",customs:"#B7950B",delivery:"#1A5276",delivered:A.success};
const fmt=v=>Number(v).toFixed(2);

export default function BADAOURAdmin(){
  const scr=useScreen();const{mobile,tablet}=scr;
  const[logged,setLogged]=useState(false);const[loginEmail,setLoginEmail]=useState("");const[loginPass,setLoginPass]=useState("");const[loginErr,setLoginErr]=useState("");const[notif,setNotif]=useState(null);
  const toast=(msg,type="success")=>{setNotif({msg,type});setTimeout(()=>setNotif(null),2800);};
  const handleLogin=()=>{if(loginEmail===ADMIN_EMAIL&&loginPass===ADMIN_PASSWORD){setLogged(true);setLoginErr("");}else{setLoginErr("Identifiants incorrects.");}};

  if(!logged){return(
    <div style={{fontFamily:"'Georgia',serif",background:A.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}input:focus{outline:none;border-color:${A.accent}!important;}@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{width:"100%",maxWidth:400,animation:"fadeUp .5s ease"}}>
        <div style={{textAlign:"center",marginBottom:28}}><div style={{fontSize:mobile?28:36,fontWeight:"bold",color:A.accent,letterSpacing:8}}>BADAOUR</div><div style={{fontSize:10,color:A.textMuted,letterSpacing:4,marginTop:4}}>ADMINISTRATION</div><div style={{width:60,height:2,background:A.accent,margin:"12px auto 0"}} /></div>
        <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"24px 20px":"36px 32px"}}>
          <div style={{textAlign:"center",marginBottom:22}}><div style={{width:56,height:56,borderRadius:"50%",background:A.accentGlow,border:`2px solid ${A.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",fontSize:24}}>🔒</div><div style={{fontSize:16,color:A.text,fontWeight:"bold"}}>Connexion Admin</div><div style={{fontSize:11,color:A.textMuted,marginTop:4}}>Accès réservé au promoteur</div></div>
          {loginErr&&<div style={{background:A.dangerBg,border:`1px solid ${A.danger}44`,borderRadius:6,padding:"10px 14px",color:A.danger,fontSize:12,marginBottom:14,textAlign:"center"}}>⚠️ {loginErr}</div>}
          <div style={{marginBottom:14}}><label style={{display:"block",fontSize:9,letterSpacing:2,color:A.textMuted,textTransform:"uppercase",marginBottom:5}}>Email</label><input type="email" placeholder="admin@badaour.com" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} style={{width:"100%",padding:"12px 14px",background:A.bg,border:`1px solid ${A.border}`,borderRadius:6,color:A.text,fontSize:14,fontFamily:"Georgia"}} /></div>
          <div style={{marginBottom:20}}><label style={{display:"block",fontSize:9,letterSpacing:2,color:A.textMuted,textTransform:"uppercase",marginBottom:5}}>Mot de passe</label><input type="password" placeholder="••••••••" value={loginPass} onChange={e=>setLoginPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{width:"100%",padding:"12px 14px",background:A.bg,border:`1px solid ${A.border}`,borderRadius:6,color:A.text,fontSize:14,fontFamily:"Georgia"}} /></div>
          <button onClick={handleLogin} style={{width:"100%",background:`linear-gradient(135deg,${A.accent},${A.accentDim})`,color:DARK,border:"none",padding:"14px",borderRadius:6,fontSize:14,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,cursor:"pointer",textTransform:"uppercase"}}>Se connecter</button>
          <div style={{textAlign:"center",marginTop:14,fontSize:10,color:A.textMuted}}>🔐 Connexion sécurisée</div>
        </div>
        <div style={{textAlign:"center",marginTop:16,fontSize:10,color:A.textMuted}}>Test : <span style={{color:A.accent}}>admin@badaour.com</span> / <span style={{color:A.accent}}>badaour2025</span></div>
      </div>
    </div>
  );}
  return <AdminDashboard toast={toast} notif={notif} onLogout={()=>{setLogged(false);setLoginEmail("");setLoginPass("");}} scr={scr} />;
}

function AdminDashboard({toast,notif,onLogout,scr}){
  const{mobile,tablet}=scr;
  const[page,setPage]=useState("dashboard");const[products,setProducts]=useState(INIT_PRODUCTS);const[orders,setOrders]=useState(INIT_ORDERS);const[selectedOrder,setSelectedOrder]=useState(null);const[orderFilter,setOrderFilter]=useState("all");const[showNewProd,setShowNewProd]=useState(false);const[newProd,setNewProd]=useState({name:"",category:"homme",sub:"",artisan:"",city:"",country:"Sénégal",price:0,cost:0,stock:0,tag:"Nouveau",desc:""});const[sideOpen,setSideOpen]=useState(false);

  const totalRev=orders.reduce((s,o)=>s+o.total,0);const totalOrd=orders.length;const avgOrd=totalOrd?totalRev/totalOrd:0;const pendOrd=orders.filter(o=>o.status!=="delivered").length;const lowStock=products.filter(p=>p.stock<5).length;const totalProfit=products.reduce((s,p)=>s+(p.price-p.cost)*p.sales,0);const filtOrd=orderFilter==="all"?orders:orders.filter(o=>o.status===orderFilter);

  const updateStatus=(oid,ns)=>{setOrders(prev=>prev.map(o=>o.id===oid?{...o,status:ns,events:[...(o.events||[]),{step:ns,date:new Date().toLocaleDateString("fr-CA",{day:"numeric",month:"short"}),note:"Mis à jour"}]}:o));toast(`${oid} → ${sLabel[ns]}`);};
  const addProduct=()=>{if(!newProd.name||!newProd.price){toast("Nom et prix requis","error");return;}setProducts(prev=>[...prev,{...newProd,id:Math.max(...prev.map(p=>p.id))+1,price:+newProd.price,cost:+newProd.cost,stock:+newProd.stock,sales:0,rating:0}]);setNewProd({name:"",category:"homme",sub:"",artisan:"",city:"",country:"Sénégal",price:0,cost:0,stock:0,tag:"Nouveau",desc:""});setShowNewProd(false);toast("Produit ajouté ✓");};
  const goPage=p=>{setPage(p);setSelectedOrder(null);setSideOpen(false);};
  const gc=(d,t,m)=>mobile?m:tablet?t:d;

  const sideItems=[{k:"dashboard",l:"Tableau de bord",icon:"📊"},{k:"orders",l:"Commandes",icon:"📦",badge:pendOrd},{k:"products",l:"Produits",icon:"🏷️",badge:lowStock||null},{k:"artisans",l:"Artisans",icon:"✂️"},{k:"customers",l:"Clients",icon:"👥"},{k:"analytics",l:"Analytiques",icon:"📈"},{k:"settings",l:"Paramètres",icon:"⚙️"}];

  return(
    <div style={{fontFamily:"'Georgia',serif",display:"flex",minHeight:"100vh",background:A.bg,color:A.text}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0;}
        input:focus,textarea:focus,select:focus{outline:none;border-color:${A.accent}!important;}
        button{cursor:pointer;transition:opacity .15s,background .2s;}
        button:active:not(:disabled){transform:scale(.97);}
        .arow:hover{background:${A.surface2}!important;}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-thumb{background:#444;border-radius:3px;}
        body{overflow-x:hidden;-webkit-tap-highlight-color:transparent;}
      `}</style>

      {notif&&<div style={{position:"fixed",top:12,left:mobile?12:"auto",right:12,zIndex:99999,background:notif.type==="error"?A.danger:A.success,color:"white",padding:"12px 18px",borderRadius:6,fontSize:12,boxShadow:"0 8px 28px rgba(0,0,0,.4)",animation:"fadeSlide .3s ease"}}>{notif.msg}</div>}

      {/* SIDEBAR OVERLAY (mobile) */}
      {mobile&&sideOpen&&<div onClick={()=>setSideOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:200}} />}

      {/* SIDEBAR */}
      <aside style={{width:mobile?240:220,background:A.surface,borderRight:`1px solid ${A.border}`,flexShrink:0,position:mobile?"fixed":"sticky",top:0,left:mobile?(sideOpen?0:-260):0,height:"100vh",overflowY:"auto",display:"flex",flexDirection:"column",zIndex:mobile?250:10,transition:mobile?"left .3s ease":"none"}}>
        <div style={{padding:"16px 16px 12px",borderBottom:`1px solid ${A.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:18,fontWeight:"bold",color:A.accent,letterSpacing:4}}>BADAOUR</div><div style={{fontSize:8,color:A.textMuted,letterSpacing:2,marginTop:2}}>ADMINISTRATION</div></div>
          {mobile&&<button onClick={()=>setSideOpen(false)} style={{background:"none",border:"none",color:A.textMuted,fontSize:18}}>✕</button>}
        </div>
        <nav style={{padding:"10px 8px",flex:1}}>
          {sideItems.map(item=>(<button key={item.k} onClick={()=>goPage(item.k)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"10px 12px",marginBottom:2,background:page===item.k?A.surface2:"transparent",border:page===item.k?`1px solid ${A.border}`:"1px solid transparent",borderRadius:6,color:page===item.k?A.accent:A.textDim,fontFamily:"Georgia",fontSize:12,textAlign:"left"}}><span style={{fontSize:14}}>{item.icon}</span><span style={{flex:1}}>{item.l}</span>{item.badge&&<span style={{background:A.danger,color:"white",borderRadius:10,padding:"1px 6px",fontSize:9,fontWeight:"bold"}}>{item.badge}</span>}</button>))}
        </nav>
        <div style={{padding:"14px 16px",borderTop:`1px solid ${A.border}`}}><div style={{fontSize:10,color:A.textDim}}>👤 Promoteur</div><div style={{fontSize:9,color:A.accent,marginTop:2}}>{ADMIN_EMAIL}</div><button onClick={onLogout} style={{marginTop:10,width:"100%",background:A.dangerBg,border:`1px solid ${A.danger}33`,borderRadius:4,padding:"7px",color:A.danger,fontFamily:"Georgia",fontSize:10}}>🚪 Déconnexion</button></div>
      </aside>

      {/* MAIN */}
      <main style={{flex:1,padding:mobile?"14px":tablet?"18px":"22px 26px",overflowY:"auto",maxHeight:"100vh",minWidth:0}}>
        {/* Mobile top bar */}
        {mobile&&<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,padding:"6px 0"}}><button onClick={()=>setSideOpen(true)} style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:6,padding:"8px 12px",color:A.accent,fontSize:16}}>☰</button><div style={{fontSize:14,fontWeight:"bold",color:A.accent,letterSpacing:3}}>BADAOUR</div><div style={{width:40}} /></div>}

        {/* DASHBOARD */}
        {page==="dashboard"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?20:24,color:A.text,marginBottom:4}}>Tableau de bord</h1><p style={{fontSize:11,color:A.textMuted,marginBottom:16}}>Vue d'ensemble</p>
          <div style={{display:"grid",gridTemplateColumns:gc("repeat(4,1fr)","repeat(2,1fr)","repeat(2,1fr)"),gap:10,marginBottom:16}}>
            {[{l:"Chiffre d'affaires",v:`${fmt(totalRev)} $`,icon:"💰",c:A.accent,sub:`+${fmt(totalProfit)}$ profit`},{l:"Commandes",v:totalOrd,icon:"📦",c:A.info,sub:`${pendOrd} en cours`},{l:"Panier moyen",v:`${fmt(avgOrd)} $`,icon:"🛒",c:A.success,sub:`${products.reduce((s,p)=>s+p.sales,0)} articles`},{l:"Produits",v:products.length,icon:"🏷️",c:A.warning,sub:`${lowStock} stock faible`}].map(k=>(<div key={k.l} style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"12px":"16px 18px",position:"relative",overflow:"hidden"}}><div style={{fontSize:9,color:A.textMuted,letterSpacing:1,marginBottom:4,textTransform:"uppercase"}}>{mobile?k.l.split(" ")[0]:k.l}</div><div style={{fontSize:mobile?18:24,fontWeight:"bold",color:k.c,marginBottom:2}}>{k.v}</div><div style={{fontSize:9,color:A.textMuted}}>{k.sub}</div></div>))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:gc("2fr 1fr","1fr","1fr"),gap:12,marginBottom:16}}>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"18px"}}><h3 style={{fontSize:13,color:A.text,marginBottom:12}}>📈 Revenus mensuels</h3><div style={{display:"flex",alignItems:"flex-end",gap:mobile?6:10,height:mobile?100:150}}>{MONTHLY.map(m=>{const max=Math.max(...MONTHLY.map(d=>d.revenue));return(<div key={m.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{fontSize:8,color:A.accent,fontWeight:"bold"}}>{(m.revenue/1000).toFixed(1)}k</div><div style={{width:"100%",height:(m.revenue/max)*(mobile?80:130),background:`linear-gradient(180deg,${A.accent},${A.accentDim})`,borderRadius:"4px 4px 0 0"}} /><div style={{fontSize:8,color:A.textMuted}}>{m.month.slice(0,3)}</div></div>);})}</div></div>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"18px"}}><h3 style={{fontSize:13,color:A.text,marginBottom:10}}>🕐 Dernières commandes</h3>{orders.slice(0,4).map(o=>(<div key={o.id} onClick={()=>{goPage("orders");setSelectedOrder(o);}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:`1px solid ${A.border}`,cursor:"pointer"}}><div><div style={{fontSize:11,fontWeight:"bold",color:A.text}}>{o.id}</div><div style={{fontSize:9,color:A.textMuted}}>{o.customer}</div></div><div style={{textAlign:"right"}}><span style={{background:sColor[o.status]+"33",color:sColor[o.status],padding:"2px 6px",fontSize:8,borderRadius:10,fontWeight:"bold"}}>{sLabel[o.status]}</span><div style={{fontSize:10,fontWeight:"bold",color:A.accent,marginTop:2}}>{fmt(o.total)}$</div></div></div>))}</div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:gc("1fr 1fr","1fr","1fr"),gap:12}}>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"18px"}}><h3 style={{fontSize:13,color:A.text,marginBottom:10}}>🏆 Top produits</h3>{[...products].sort((a,b)=>b.sales-a.sales).slice(0,5).map((p,i)=>(<div key={p.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${A.border}`}}><div style={{width:22,height:22,borderRadius:4,background:A.surface2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:"bold",color:A.accent}}>{i+1}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:11,color:A.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div><div style={{fontSize:9,color:A.textMuted}}>{p.sales} ventes</div></div><div style={{fontSize:11,fontWeight:"bold",color:A.accent,flexShrink:0}}>{fmt((p.price-p.cost)*p.sales)}$</div></div>))}</div>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"18px"}}><h3 style={{fontSize:13,color:A.text,marginBottom:10}}>⚠️ Stock faible</h3>{products.filter(p=>p.stock<10).sort((a,b)=>a.stock-b.stock).map(p=>(<div key={p.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${A.border}`}}><span style={{fontSize:12}}>{p.stock<5?"🔴":"🟡"}</span><div style={{flex:1,minWidth:0}}><div style={{fontSize:11,color:A.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div></div><div style={{fontSize:13,fontWeight:"bold",color:p.stock<5?A.danger:A.warning}}>{p.stock}</div></div>))}</div>
          </div>
        </div>)}

        {/* ORDERS */}
        {page==="orders"&&!selectedOrder&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?20:24,color:A.text,marginBottom:4}}>Commandes</h1><p style={{fontSize:11,color:A.textMuted,marginBottom:12}}>{orders.length} commandes</p>
          <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>{[["all","Toutes"],...Object.entries(sLabel)].map(([k,l])=>(<button key={k} onClick={()=>setOrderFilter(k)} style={{padding:"4px 10px",borderRadius:14,border:`1px solid ${orderFilter===k?A.accent:A.border}`,background:orderFilter===k?A.accentGlow:"transparent",color:orderFilter===k?A.accent:A.textMuted,fontFamily:"Georgia",fontSize:mobile?9:10}}>{mobile?l.slice(0,4):l}</button>))}</div>
          <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,overflow:"hidden"}}>
            {filtOrd.map(o=>(<div key={o.id} className="arow" onClick={()=>setSelectedOrder(o)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:mobile?"10px 12px":"10px 14px",borderBottom:`1px solid ${A.border}`,cursor:"pointer",flexWrap:"wrap",gap:6}}>
              <div style={{minWidth:mobile?120:140}}><div style={{fontSize:11,fontWeight:"bold",color:A.accent,letterSpacing:1}}>{o.id}</div><div style={{fontSize:9,color:A.textMuted}}>{o.customer}</div></div>
              {!mobile&&<div style={{fontSize:10,color:A.textDim}}>{o.items.reduce((s,i)=>s+i.qty,0)} art.</div>}
              <div style={{textAlign:"right",display:"flex",alignItems:"center",gap:8}}>
                <span style={{background:sColor[o.status]+"28",color:sColor[o.status],padding:"3px 8px",fontSize:9,borderRadius:10,fontWeight:"bold"}}>{mobile?sLabel[o.status].slice(0,5):sLabel[o.status]}</span>
                <div style={{fontSize:12,fontWeight:"bold",color:A.text,minWidth:60,textAlign:"right"}}>{fmt(o.total)}$</div>
              </div>
            </div>))}
          </div>
        </div>)}

        {page==="orders"&&selectedOrder&&(<div style={{animation:"fadeUp .3s ease"}}>
          <button onClick={()=>setSelectedOrder(null)} style={{background:"none",border:`1px solid ${A.border}`,color:A.textMuted,padding:"5px 12px",borderRadius:4,fontFamily:"Georgia",fontSize:10,marginBottom:12}}>← Retour</button>
          <div style={{display:"grid",gridTemplateColumns:gc("2fr 1fr","1fr","1fr"),gap:12}}>
            <div>
              <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"20px",marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}><div><div style={{fontSize:mobile?16:20,fontWeight:"bold",color:A.accent,letterSpacing:2}}>{selectedOrder.id}</div><div style={{fontSize:10,color:A.textMuted}}>{selectedOrder.date}</div></div><span style={{background:sColor[selectedOrder.status]+"33",color:sColor[selectedOrder.status],padding:"4px 12px",fontSize:10,borderRadius:10,fontWeight:"bold"}}>{sLabel[selectedOrder.status]}</span></div>
                <div style={{fontSize:11,fontWeight:"bold",color:A.text,marginBottom:8}}>📋 Articles</div>
                {selectedOrder.items.map((item,i)=>{const p=products.find(pr=>pr.id===item.pid);return p?(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`1px solid ${A.border}`}}><div><div style={{fontSize:11,color:A.text}}>{p.name}</div><div style={{fontSize:9,color:A.textMuted}}>Qté: {item.qty}</div></div><div style={{fontSize:11,fontWeight:"bold",color:A.accent}}>{fmt(p.price*item.qty)}$</div></div>):null;})}
                <div style={{display:"flex",justifyContent:"space-between",paddingTop:10,marginTop:8,borderTop:`2px solid ${A.border}`}}><span style={{fontSize:13,fontWeight:"bold"}}>Total</span><span style={{fontSize:16,fontWeight:"bold",color:A.accent}}>{fmt(selectedOrder.total)}$</span></div>
              </div>
              <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"20px"}}><div style={{fontSize:11,fontWeight:"bold",color:A.text,marginBottom:10}}>🔄 Statut</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{STEPS.map(step=>(<button key={step.key} onClick={()=>{updateStatus(selectedOrder.id,step.key);setSelectedOrder({...selectedOrder,status:step.key});}} style={{padding:"6px 10px",borderRadius:4,border:`1px solid ${selectedOrder.status===step.key?A.accent:A.border}`,background:selectedOrder.status===step.key?A.accentGlow:"transparent",color:selectedOrder.status===step.key?A.accent:A.textMuted,fontFamily:"Georgia",fontSize:mobile?9:10}}>{step.icon} {mobile?step.label.slice(0,5):step.label}</button>))}</div></div>
            </div>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"20px",alignSelf:"start"}}><div style={{fontSize:11,fontWeight:"bold",color:A.text,marginBottom:10}}>👤 Client</div>{[["Nom",selectedOrder.customer],["Email",selectedOrder.email],["Tél",selectedOrder.phone],["Adresse",selectedOrder.address],["Paiement",selectedOrder.payMethod]].map(([l,v])=>(<div key={l} style={{marginBottom:8}}><div style={{fontSize:8,color:A.textMuted,letterSpacing:1,textTransform:"uppercase",marginBottom:1}}>{l}</div><div style={{fontSize:11,color:A.text,wordBreak:"break-word"}}>{v}</div></div>))}<div style={{fontSize:11,fontWeight:"bold",color:A.text,marginTop:14,marginBottom:6}}>📜 Historique</div>{(selectedOrder.events||[]).map((ev,i)=>(<div key={i} style={{display:"flex",gap:6,marginBottom:4}}><div style={{width:5,height:5,borderRadius:"50%",background:A.accent,marginTop:4,flexShrink:0}} /><div><div style={{fontSize:10,color:A.text}}>{sLabel[ev.step]}</div><div style={{fontSize:8,color:A.textMuted}}>{ev.date}{ev.note?` — ${ev.note}`:""}</div></div></div>))}</div>
          </div>
        </div>)}

        {/* PRODUCTS */}
        {page==="products"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}><div><h1 style={{fontSize:mobile?20:24,color:A.text,marginBottom:2}}>Produits</h1><p style={{fontSize:11,color:A.textMuted}}>{products.length} produits · {products.reduce((s,p)=>s+p.stock,0)} en stock</p></div><button onClick={()=>setShowNewProd(!showNewProd)} style={{background:A.accent,color:DARK,border:"none",padding:"8px 16px",borderRadius:6,fontFamily:"Georgia",fontWeight:"bold",fontSize:11}}>{showNewProd?"✕ Fermer":"+ Nouveau"}</button></div>
          {showNewProd&&(<div style={{background:A.surface,border:`1px solid ${A.accent}44`,borderRadius:8,padding:mobile?"14px":"20px",marginBottom:14,animation:"slideIn .3s ease"}}><h3 style={{fontSize:13,color:A.accent,marginBottom:10}}>Ajouter un produit</h3><div style={{display:"grid",gridTemplateColumns:gc("1fr 1fr 1fr","1fr 1fr","1fr"),gap:8}}>{[["Nom *","name","text"],["Sous-cat.","sub","text"],["Artisan","artisan","text"],["Ville","city","text"],["Prix *","price","number"],["Coût","cost","number"],["Stock","stock","number"]].map(([l,k,t])=>(<div key={k}><label style={{display:"block",fontSize:8,color:A.textMuted,letterSpacing:1,marginBottom:2,textTransform:"uppercase"}}>{l}</label><input type={t} value={newProd[k]} onChange={e=>setNewProd({...newProd,[k]:e.target.value})} style={{width:"100%",padding:"7px 9px",background:A.bg,border:`1px solid ${A.border}`,borderRadius:4,color:A.text,fontSize:11,fontFamily:"Georgia"}} /></div>))}<div><label style={{display:"block",fontSize:8,color:A.textMuted,letterSpacing:1,marginBottom:2,textTransform:"uppercase"}}>Catégorie</label><select value={newProd.category} onChange={e=>setNewProd({...newProd,category:e.target.value})} style={{width:"100%",padding:"7px 9px",background:A.bg,border:`1px solid ${A.border}`,borderRadius:4,color:A.text,fontSize:11,fontFamily:"Georgia"}}>{CATS.map(c=><option key={c.key} value={c.key}>{c.label}</option>)}</select></div></div><button onClick={addProduct} style={{marginTop:10,background:A.accent,color:DARK,border:"none",padding:"8px 18px",borderRadius:4,fontFamily:"Georgia",fontWeight:"bold",fontSize:11}}>✓ Ajouter</button></div>)}
          <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,overflow:mobile?"auto":"hidden"}}>
            <div style={{minWidth:mobile?600:"auto"}}>
              <div style={{display:"grid",gridTemplateColumns:"40px 1fr 70px 60px 50px 50px 50px 60px 40px",padding:"8px 12px",borderBottom:`1px solid ${A.border}`,fontSize:8,letterSpacing:1,color:A.textMuted,textTransform:"uppercase"}}><span>#</span><span>Produit</span><span>Cat.</span><span>Prix</span><span>Coût</span><span>Stock</span><span>Ventes</span><span>Marge</span><span></span></div>
              {products.map(p=>(<div key={p.id} className="arow" style={{display:"grid",gridTemplateColumns:"40px 1fr 70px 60px 50px 50px 50px 60px 40px",padding:"8px 12px",borderBottom:`1px solid ${A.border}`,alignItems:"center",fontSize:11}}>
                <span style={{color:A.textMuted,fontSize:10}}>{p.id}</span>
                <div style={{overflow:"hidden"}}><div style={{color:A.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div><div style={{fontSize:8,color:A.textMuted}}>{p.artisan}</div></div>
                <span style={{fontSize:9,color:A.textDim}}>{CATS.find(c=>c.key===p.category)?.emoji}</span>
                <span style={{fontWeight:"bold",color:A.text}}>{p.price}$</span>
                <span style={{color:A.textMuted}}>{p.cost}$</span>
                <span style={{fontWeight:"bold",color:p.stock<5?A.danger:p.stock<10?A.warning:A.success}}>{p.stock}</span>
                <span style={{color:A.text}}>{p.sales}</span>
                <span style={{color:A.success,fontSize:10}}>{((p.price-p.cost)/p.price*100).toFixed(0)}%</span>
                <button onClick={()=>{setProducts(prev=>prev.filter(pr=>pr.id!==p.id));toast("Supprimé","info");}} style={{background:A.dangerBg,border:"none",color:A.danger,padding:"3px 6px",borderRadius:4,fontSize:9}}>✕</button>
              </div>))}
            </div>
          </div>
        </div>)}

        {/* ARTISANS */}
        {page==="artisans"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?20:24,color:A.text,marginBottom:4}}>Artisans</h1><p style={{fontSize:11,color:A.textMuted,marginBottom:14}}>{ARTISANS.length} artisans</p>
          <div style={{display:"grid",gridTemplateColumns:gc("repeat(2,1fr)","repeat(2,1fr)","1fr"),gap:12}}>
            {ARTISANS.map(a=>(<div key={a.id} style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"18px",display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:A.accentGlow,border:`1px solid ${A.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>✂️</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:"bold",color:A.text}}>{a.name}</div>
                <div style={{fontSize:10,color:A.accent,marginBottom:3}}>{a.craft}</div>
                <div style={{fontSize:9,color:A.textMuted,marginBottom:8}}>📍 {a.city}, {a.country} · {a.exp} ans</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4}}>
                  {[["Prod.",a.products],["Ventes",a.sales],["Rev.",`${(a.revenue/1000).toFixed(1)}k`],["Note",`${a.rating}⭐`]].map(([l,v])=>(<div key={l} style={{background:A.bg,borderRadius:4,padding:"4px",textAlign:"center"}}><div style={{fontSize:11,fontWeight:"bold",color:A.accent}}>{v}</div><div style={{fontSize:7,color:A.textMuted}}>{l}</div></div>))}
                </div>
              </div>
            </div>))}
          </div>
        </div>)}

        {/* CUSTOMERS */}
        {page==="customers"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?20:24,color:A.text,marginBottom:4}}>Clients</h1><p style={{fontSize:11,color:A.textMuted,marginBottom:14}}>{[...new Set(orders.map(o=>o.email))].length} clients</p>
          <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,overflow:"hidden"}}>
            {[...new Map(orders.map(o=>[o.email,o])).values()].map(o=>{const co=orders.filter(ord=>ord.email===o.email);return(
              <div key={o.email} className="arow" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:mobile?"10px 12px":"10px 14px",borderBottom:`1px solid ${A.border}`,flexWrap:"wrap",gap:6}}>
                <div style={{flex:1,minWidth:120}}><div style={{fontSize:12,fontWeight:"bold",color:A.text}}>{o.customer}</div><div style={{fontSize:9,color:A.textMuted}}>{o.email}</div></div>
                <div style={{display:"flex",gap:12,alignItems:"center"}}><div style={{fontSize:12,fontWeight:"bold",color:A.text}}>{co.length} cmd</div><div style={{fontSize:12,fontWeight:"bold",color:A.accent}}>{fmt(co.reduce((s,c)=>s+c.total,0))}$</div></div>
              </div>
            );})}
          </div>
        </div>)}

        {/* ANALYTICS */}
        {page==="analytics"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?20:24,color:A.text,marginBottom:4}}>Analytiques</h1><p style={{fontSize:11,color:A.textMuted,marginBottom:14}}>Performance</p>
          <div style={{display:"grid",gridTemplateColumns:gc("repeat(3,1fr)","repeat(3,1fr)","1fr"),gap:10,marginBottom:16}}>
            {[{l:"CA Total",v:`${fmt(totalRev)} $`,c:A.accent},{l:"Profit",v:`${fmt(totalProfit)} $`,c:A.success},{l:"Marge",v:`${totalRev>0?(totalProfit/totalRev*100).toFixed(1):0}%`,c:A.info}].map(k=>(<div key={k.l} style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"18px"}}><div style={{fontSize:9,color:A.textMuted,letterSpacing:1,marginBottom:4}}>{k.l}</div><div style={{fontSize:mobile?20:26,fontWeight:"bold",color:k.c}}>{k.v}</div></div>))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:gc("1fr 1fr","1fr","1fr"),gap:12}}>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"18px"}}><h3 style={{fontSize:13,color:A.text,marginBottom:10}}>Par catégorie</h3>{CATS.map(cat=>{const cp=products.filter(p=>p.category===cat.key);const cs=cp.reduce((s,p)=>s+p.sales,0);const max=Math.max(...CATS.map(c=>products.filter(p=>p.category===c.key).reduce((s,p)=>s+p.sales,0)),1);return(<div key={cat.key} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11,color:A.text}}>{cat.emoji} {cat.label}</span><span style={{fontSize:10,color:A.accent}}>{cs} ventes</span></div><div style={{height:7,background:A.bg,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${(cs/max)*100}%`,background:cat.color,borderRadius:4}} /></div></div>);})}</div>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"18px"}}><h3 style={{fontSize:13,color:A.text,marginBottom:10}}>Par pays</h3>{[...new Set(products.map(p=>p.country))].map(country=>{const cp=products.filter(p=>p.country===country);return(<div key={country} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`1px solid ${A.border}`}}><div><div style={{fontSize:11,color:A.text}}>🌍 {country}</div><div style={{fontSize:9,color:A.textMuted}}>{cp.length} prod.</div></div><div style={{fontSize:12,fontWeight:"bold",color:A.accent}}>{fmt(cp.reduce((s,p)=>s+p.price*p.sales,0))}$</div></div>);})}</div>
          </div>
        </div>)}

        {/* SETTINGS */}
        {page==="settings"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?20:24,color:A.text,marginBottom:4}}>Paramètres</h1><p style={{fontSize:11,color:A.textMuted,marginBottom:14}}>Configuration</p>
          <div style={{display:"grid",gridTemplateColumns:gc("1fr 1fr","1fr 1fr","1fr"),gap:12}}>
            {[["🏪 Boutique",[["Nom","BADAOUR"],["Email","service@badaour.com"],["Tél","438-988-6682"],["Devise","$CA"]]],["🚚 Livraison",[["Frais","18 $CA"],["Gratuit dès","200 $CA"],["Délai","14-21 jours"]]],["💳 Paiement",[["Carte","Activé"],["PayPal","Activé"],["Interac","Activé"]]],["🔔 Notifications",[["Commande","Activé"],["Stock faible","Activé"],["Livré","Activé"]]]].map(([title,fields])=>(<div key={title} style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:mobile?"14px":"20px"}}><h3 style={{fontSize:13,color:A.accent,marginBottom:10}}>{title}</h3>{fields.map(([l,v])=>(<div key={l} style={{marginBottom:8}}><label style={{display:"block",fontSize:8,color:A.textMuted,letterSpacing:1,marginBottom:2,textTransform:"uppercase"}}>{l}</label><input defaultValue={v} style={{width:"100%",padding:"7px 9px",background:A.bg,border:`1px solid ${A.border}`,borderRadius:4,color:A.text,fontSize:11,fontFamily:"Georgia"}} /></div>))}</div>))}
          </div>
          <button onClick={()=>toast("Sauvegardé ✓")} style={{marginTop:14,background:A.accent,color:DARK,border:"none",padding:"10px 22px",borderRadius:6,fontFamily:"Georgia",fontWeight:"bold",fontSize:12}}>💾 Sauvegarder</button>
        </div>)}
      </main>
    </div>
  );
}
