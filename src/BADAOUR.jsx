import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// BADAOUR — ADMINISTRATION (données persistantes partagées)
// ═══════════════════════════════════════════════════════════════

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
const G="#D4AF37", DARK="#1A0A00";
const ADMIN_EMAIL="admin@badaour.com", ADMIN_PASSWORD="badaour2025";

const DEFAULT_PRODUCTS = [
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

const DEFAULT_ORDERS = [
  {id:"BDR-2025-0042",date:"2025-01-10",status:"transit",customer:"Mamadou Diallo",email:"mamadou@mail.com",phone:"438-555-0101",address:"4500 Rue Sherbrooke, Mtl",items:[{pid:1,qty:1,name:"Grand Boubou Brodé",price:189},{pid:4,qty:1,name:"Robe Wax Élégance",price:134}],total:355.25,shipping:18,payMethod:"Interac",events:[{step:"confirmed",date:"10 jan"},{step:"preparation",date:"11 jan"},{step:"shipped",date:"15 jan"},{step:"transit",date:"16 jan",note:"Vol AF722"}]},
  {id:"BDR-2025-0038",date:"2025-01-08",status:"delivered",customer:"Aïssatou Bah",email:"aissatou@mail.com",phone:"514-555-0202",address:"1200 Av. Papineau, Mtl",items:[{pid:7,qty:2,name:"Mini Boubou Enfant",price:64},{pid:15,qty:3,name:"Huile de Karité Pure",price:34}],total:252.80,shipping:15,payMethod:"Carte",events:[{step:"confirmed",date:"8 jan"},{step:"delivered",date:"21 jan"}]},
  {id:"BDR-2025-0051",date:"2025-01-15",status:"preparation",customer:"Jean-Pierre Tremblay",email:"jp@mail.com",phone:"438-555-0303",address:"780 Bd René-Lévesque, Mtl",items:[{pid:10,qty:1,name:"Masque Baoulé Ancien",price:320}],total:362.40,shipping:22,payMethod:"PayPal",events:[{step:"confirmed",date:"15 jan"},{step:"preparation",date:"16 jan"}]},
  {id:"BDR-2025-0055",date:"2025-01-18",status:"confirmed",customer:"Fatou Sow",email:"fatou@mail.com",phone:"514-555-0404",address:"320 Rue Ontario E, Mtl",items:[{pid:6,qty:1,name:"Kaftan Soirée Brodé",price:212},{pid:13,qty:2,name:"Collier Krobo Perles",price:86}],total:425.90,shipping:18,payMethod:"Interac",events:[{step:"confirmed",date:"18 jan"}]},
  {id:"BDR-2025-0060",date:"2025-01-22",status:"shipped",customer:"Omar Sy",email:"omar@mail.com",phone:"438-555-0505",address:"55 Av. du Parc, Mtl",items:[{pid:3,qty:1,name:"Agbada Cérémonie",price:245},{pid:16,qty:2,name:"Tissu Wax 6 yards",price:58}],total:392.15,shipping:18,payMethod:"Carte",events:[{step:"confirmed",date:"22 jan"},{step:"preparation",date:"23 jan"},{step:"shipped",date:"27 jan"}]},
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

function useScreen(){const[w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);return{w,mobile:w<768,tablet:w>=768&&w<1024,desktop:w>=1024};}

// ─── STORAGE HELPERS (shared=true to sync with public store) ───
async function loadData(key, fallback) {
  try {
    const r = await window.storage.get("badaour:" + key, true);
    return r ? JSON.parse(r.value) : fallback;
  } catch { return fallback; }
}
async function saveData(key, value) {
  try { await window.storage.set("badaour:" + key, JSON.stringify(value), true); } catch(e) { console.warn("Storage:", e); }
}

export default function BADAOURAdmin(){
  const scr=useScreen();const{mobile,tablet}=scr;
  const[logged,setLogged]=useState(false);
  const[loginEmail,setLoginEmail]=useState("");
  const[loginPass,setLoginPass]=useState("");
  const[loginErr,setLoginErr]=useState("");
  const[notif,setNotif]=useState(null);

  const toast=(msg,type="success")=>{setNotif({msg,type});setTimeout(()=>setNotif(null),3000);};
  const handleLogin=()=>{if(loginEmail===ADMIN_EMAIL&&loginPass===ADMIN_PASSWORD){setLogged(true);setLoginErr("");}else{setLoginErr("Identifiants incorrects.");}};

  if(!logged){return(
    <div style={{fontFamily:"'Georgia',serif",background:A.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}input:focus{outline:none;border-color:${A.accent}!important;}@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}`}</style>
      <div style={{width:"100%",maxWidth:420,animation:"fadeUp .5s ease"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:mobile?30:40,fontWeight:"bold",color:A.accent,letterSpacing:8}}>BADAOUR</div>
          <div style={{fontSize:11,color:A.textMuted,letterSpacing:4,marginTop:4}}>ESPACE ADMINISTRATION</div>
          <div style={{width:60,height:2,background:A.accent,margin:"14px auto 0"}} />
        </div>
        <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:12,padding:mobile?"28px 22px":"40px 36px"}}>
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:A.accentGlow,border:`2px solid ${A.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:28}}>🔒</div>
            <div style={{fontSize:18,color:A.text,fontWeight:"bold"}}>Connexion Admin</div>
            <div style={{fontSize:12,color:A.textMuted,marginTop:4}}>Accès réservé au promoteur</div>
          </div>
          {loginErr&&<div style={{background:A.dangerBg,border:`1px solid ${A.danger}44`,borderRadius:8,padding:"12px 16px",color:A.danger,fontSize:13,marginBottom:16,textAlign:"center"}}>⚠️ {loginErr}</div>}
          <div style={{marginBottom:16}}><label style={{display:"block",fontSize:10,letterSpacing:2,color:A.textMuted,textTransform:"uppercase",marginBottom:6}}>Email</label><input type="email" placeholder="admin@badaour.com" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} style={{width:"100%",padding:"14px 16px",background:A.bg,border:`1px solid ${A.border}`,borderRadius:8,color:A.text,fontSize:14,fontFamily:"Georgia"}} /></div>
          <div style={{marginBottom:24}}><label style={{display:"block",fontSize:10,letterSpacing:2,color:A.textMuted,textTransform:"uppercase",marginBottom:6}}>Mot de passe</label><input type="password" placeholder="••••••••" value={loginPass} onChange={e=>setLoginPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{width:"100%",padding:"14px 16px",background:A.bg,border:`1px solid ${A.border}`,borderRadius:8,color:A.text,fontSize:14,fontFamily:"Georgia"}} /></div>
          <button onClick={handleLogin} style={{width:"100%",background:`linear-gradient(135deg,${A.accent},${A.accentDim})`,color:DARK,border:"none",padding:"16px",borderRadius:8,fontSize:15,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,cursor:"pointer",textTransform:"uppercase"}}>Se connecter</button>
          <div style={{textAlign:"center",marginTop:16,fontSize:11,color:A.textMuted}}>🔐 Connexion sécurisée · Données persistantes</div>
        </div>
        <div style={{textAlign:"center",marginTop:18,fontSize:11,color:A.textMuted}}>Identifiants : <span style={{color:A.accent}}>admin@badaour.com</span> / <span style={{color:A.accent}}>badaour2025</span></div>
      </div>
    </div>
  );}
  return <AdminDashboard toast={toast} notif={notif} onLogout={()=>{setLogged(false);setLoginEmail("");setLoginPass("");}} scr={scr} />;
}

function AdminDashboard({toast,notif,onLogout,scr}){
  const{mobile,tablet}=scr;
  const[loading,setLoading]=useState(true);
  const[page,setPage]=useState("dashboard");
  const[products,setProducts]=useState(DEFAULT_PRODUCTS);
  const[orders,setOrders]=useState(DEFAULT_ORDERS);
  const[selectedOrder,setSelectedOrder]=useState(null);
  const[orderFilter,setOrderFilter]=useState("all");
  const[showNewProd,setShowNewProd]=useState(false);
  const[newProd,setNewProd]=useState({name:"",category:"homme",sub:"",artisan:"",city:"",country:"Sénégal",price:0,cost:0,stock:0,tag:"Nouveau",desc:""});
  const[sideOpen,setSideOpen]=useState(false);
  const[editingProduct,setEditingProduct]=useState(null);

  // ─── LOAD FROM PERSISTENT STORAGE ───
  useEffect(()=>{
    (async()=>{
      const p = await loadData("products", null);
      const o = await loadData("orders", null);
      if(p && p.length > 0) setProducts(p);
      else { await saveData("products", DEFAULT_PRODUCTS); }
      if(o && o.length > 0) setOrders(o);
      else { await saveData("orders", DEFAULT_ORDERS); }
      setLoading(false);
    })();
  },[]);

  // ─── SAVE ON CHANGE ───
  const updateProducts = async (newProducts) => { setProducts(newProducts); await saveData("products", newProducts); };
  const updateOrders = async (newOrders) => { setOrders(newOrders); await saveData("orders", newOrders); };

  const totalRev=orders.reduce((s,o)=>s+o.total,0);
  const totalOrd=orders.length;
  const avgOrd=totalOrd?totalRev/totalOrd:0;
  const pendOrd=orders.filter(o=>o.status!=="delivered").length;
  const lowStock=products.filter(p=>p.stock<5).length;
  const totalProfit=products.reduce((s,p)=>s+(p.price-(p.cost||0))*(p.sales||0),0);
  const filtOrd=orderFilter==="all"?orders:orders.filter(o=>o.status===orderFilter);

  const updateStatus=async(oid,ns)=>{
    const updated=orders.map(o=>o.id===oid?{...o,status:ns,events:[...(o.events||[]),{step:ns,date:new Date().toLocaleDateString("fr-CA",{day:"numeric",month:"short"}),note:"Mis à jour"}]}:o);
    await updateOrders(updated);
    toast(`${oid} → ${sLabel[ns]}`);
  };

  const addProduct=async()=>{
    if(!newProd.name||!newProd.price){toast("Nom et prix requis","error");return;}
    const updated=[...products,{...newProd,id:Math.max(...products.map(p=>p.id))+1,price:+newProd.price,cost:+newProd.cost,stock:+newProd.stock,sales:0,rating:0,color:"#8B5E3C"}];
    await updateProducts(updated);
    setNewProd({name:"",category:"homme",sub:"",artisan:"",city:"",country:"Sénégal",price:0,cost:0,stock:0,tag:"Nouveau",desc:""});
    setShowNewProd(false);
    toast("Produit ajouté et sauvegardé ✓");
  };

  const deleteProduct=async(id)=>{
    const updated=products.filter(p=>p.id!==id);
    await updateProducts(updated);
    toast("Produit supprimé ✓");
  };

  const deleteOrder=async(id)=>{
    const updated=orders.filter(o=>o.id!==id);
    await updateOrders(updated);
    setSelectedOrder(null);
    toast("Commande supprimée ✓");
  };

  const resetData=async()=>{
    await saveData("products", DEFAULT_PRODUCTS);
    await saveData("orders", DEFAULT_ORDERS);
    setProducts(DEFAULT_PRODUCTS);
    setOrders(DEFAULT_ORDERS);
    toast("Données réinitialisées ✓");
  };

  const goPage=p=>{setPage(p);setSelectedOrder(null);setSideOpen(false);};
  const gc=(d,t,m)=>mobile?m:tablet?t:d;

  const sideItems=[{k:"dashboard",l:"Tableau de bord",icon:"📊"},{k:"orders",l:"Commandes",icon:"📦",badge:pendOrd},{k:"products",l:"Produits",icon:"🏷️",badge:lowStock||null},{k:"artisans",l:"Artisans",icon:"✂️"},{k:"customers",l:"Clients",icon:"👥"},{k:"analytics",l:"Analytiques",icon:"📈"},{k:"settings",l:"Paramètres",icon:"⚙️"}];

  const Inp=({label,value,onChange,type="text",placeholder="",...rest})=>(<div style={{marginBottom:12}}><label style={{display:"block",fontSize:9,letterSpacing:2,color:A.textMuted,textTransform:"uppercase",marginBottom:4}}>{label}</label><input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{width:"100%",padding:"10px 12px",background:A.bg,border:`1px solid ${A.border}`,borderRadius:6,color:A.text,fontSize:12,fontFamily:"Georgia"}} {...rest} /></div>);

  if(loading) return (
    <div style={{fontFamily:"Georgia",background:A.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:14}}>
      <div style={{fontSize:28,fontWeight:"bold",color:A.accent,letterSpacing:6}}>BADAOUR ADMIN</div>
      <div style={{fontSize:12,color:A.textMuted}}>Chargement des données...</div>
      <div style={{width:36,height:36,border:`3px solid ${A.border}`,borderTopColor:A.accent,borderRadius:"50%",animation:"spin 1s linear infinite"}} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return(
    <div style={{fontFamily:"'Georgia',serif",display:"flex",minHeight:"100vh",background:A.bg,color:A.text}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}
        *{box-sizing:border-box;margin:0;padding:0;}
        input:focus,textarea:focus,select:focus{outline:none;border-color:${A.accent}!important;}
        button{cursor:pointer;transition:opacity .15s,background .2s,transform .1s;} button:active:not(:disabled){transform:scale(.97);}
        .arow{transition:background .15s;} .arow:hover{background:${A.surface2}!important;}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-thumb{background:#444;border-radius:3px;}
        body{overflow-x:hidden;}
      `}</style>

      {notif&&<div style={{position:"fixed",top:14,left:mobile?14:"auto",right:14,zIndex:99999,background:notif.type==="error"?A.danger:A.success,color:"white",padding:"14px 20px",borderRadius:8,fontSize:13,fontFamily:"Georgia",boxShadow:"0 8px 32px rgba(0,0,0,.4)",animation:"fadeSlide .3s ease",maxWidth:400}}>{notif.msg}</div>}

      {mobile&&sideOpen&&<div onClick={()=>setSideOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:200}} />}

      {/* ═══ SIDEBAR ═══ */}
      <aside style={{width:mobile?260:230,background:A.surface,borderRight:`1px solid ${A.border}`,flexShrink:0,position:mobile?"fixed":"sticky",top:0,left:mobile?(sideOpen?0:-280):0,height:"100vh",overflowY:"auto",display:"flex",flexDirection:"column",zIndex:mobile?250:10,transition:mobile?"left .3s ease":"none"}}>
        <div style={{padding:"18px 18px 14px",borderBottom:`1px solid ${A.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:20,fontWeight:"bold",color:A.accent,letterSpacing:5}}>BADAOUR</div><div style={{fontSize:9,color:A.textMuted,letterSpacing:2,marginTop:3}}>ADMINISTRATION</div></div>
          {mobile&&<button onClick={()=>setSideOpen(false)} style={{background:"none",border:"none",color:A.textMuted,fontSize:20}}>✕</button>}
        </div>

        {/* Sync status */}
        <div style={{padding:"10px 18px",borderBottom:`1px solid ${A.border}`,background:A.successBg}}>
          <div style={{fontSize:10,color:A.success,fontWeight:"bold",display:"flex",alignItems:"center",gap:6}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:A.success,display:"inline-block"}} />
            Données synchronisées
          </div>
          <div style={{fontSize:9,color:A.textMuted,marginTop:2}}>Partagées avec la boutique publique</div>
        </div>

        <nav style={{padding:"12px 10px",flex:1}}>
          {sideItems.map(item=>(<button key={item.k} onClick={()=>goPage(item.k)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"11px 14px",marginBottom:3,background:page===item.k?A.surface2:"transparent",border:page===item.k?`1px solid ${A.border}`:"1px solid transparent",borderRadius:8,color:page===item.k?A.accent:A.textDim,fontFamily:"Georgia",fontSize:13,textAlign:"left"}}><span style={{fontSize:15}}>{item.icon}</span><span style={{flex:1}}>{item.l}</span>{item.badge>0&&<span style={{background:A.danger,color:"white",borderRadius:10,padding:"2px 7px",fontSize:9,fontWeight:"bold"}}>{item.badge}</span>}</button>))}
        </nav>
        <div style={{padding:"16px 18px",borderTop:`1px solid ${A.border}`}}>
          <div style={{fontSize:11,color:A.textDim}}>👤 Promoteur</div>
          <div style={{fontSize:10,color:A.accent,marginTop:3}}>{ADMIN_EMAIL}</div>
          <button onClick={onLogout} style={{marginTop:12,width:"100%",background:A.dangerBg,border:`1px solid ${A.danger}33`,borderRadius:6,padding:"8px",color:A.danger,fontFamily:"Georgia",fontSize:11}}>🚪 Déconnexion</button>
        </div>
      </aside>

      {/* ═══ MAIN ═══ */}
      <main style={{flex:1,padding:mobile?"16px":tablet?"20px":"24px 28px",overflowY:"auto",maxHeight:"100vh",minWidth:0}}>
        {mobile&&<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,padding:"6px 0"}}><button onClick={()=>setSideOpen(true)} style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:8,padding:"10px 14px",color:A.accent,fontSize:18}}>☰</button><div style={{fontSize:16,fontWeight:"bold",color:A.accent,letterSpacing:4}}>BADAOUR</div><div style={{width:40}} /></div>}

        {/* ═══ DASHBOARD ═══ */}
        {page==="dashboard"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?22:26,color:A.text,marginBottom:5}}>Tableau de bord</h1>
          <p style={{fontSize:12,color:A.textMuted,marginBottom:18}}>Vue d'ensemble · Données en temps réel</p>

          <div style={{display:"grid",gridTemplateColumns:gc("repeat(4,1fr)","repeat(2,1fr)","repeat(2,1fr)"),gap:12,marginBottom:18}}>
            {[{l:"Chiffre d'affaires",v:`${fmt(totalRev)} $`,icon:"💰",c:A.accent,sub:`+${fmt(totalProfit)}$ profit`},{l:"Commandes",v:totalOrd,icon:"📦",c:A.info,sub:`${pendOrd} en cours`},{l:"Panier moyen",v:`${fmt(avgOrd)} $`,icon:"🛒",c:A.success,sub:`${products.reduce((s,p)=>s+(p.sales||0),0)} articles vendus`},{l:"Produits",v:products.length,icon:"🏷️",c:A.warning,sub:`${lowStock} stock faible`}].map(k=>(<div key={k.l} style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"14px":"18px 20px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:12,right:14,fontSize:22,opacity:.3}}>{k.icon}</div>
              <div style={{fontSize:10,color:A.textMuted,letterSpacing:1,marginBottom:5,textTransform:"uppercase"}}>{k.l}</div>
              <div style={{fontSize:mobile?20:26,fontWeight:"bold",color:k.c,marginBottom:3}}>{k.v}</div>
              <div style={{fontSize:10,color:A.textMuted}}>{k.sub}</div>
            </div>))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:gc("2fr 1fr","1fr","1fr"),gap:14,marginBottom:18}}>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"16px":"20px"}}>
              <h3 style={{fontSize:14,color:A.text,marginBottom:14}}>📈 Revenus mensuels</h3>
              <div style={{display:"flex",alignItems:"flex-end",gap:mobile?8:12,height:mobile?110:160}}>
                {MONTHLY.map(m=>{const max=Math.max(...MONTHLY.map(d=>d.revenue));return(<div key={m.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{fontSize:9,color:A.accent,fontWeight:"bold"}}>{(m.revenue/1000).toFixed(1)}k</div><div style={{width:"100%",height:(m.revenue/max)*(mobile?90:140),background:`linear-gradient(180deg,${A.accent},${A.accentDim})`,borderRadius:"5px 5px 0 0",transition:"height .5s ease"}} /><div style={{fontSize:9,color:A.textMuted}}>{m.month.slice(0,3)}</div></div>);})}
              </div>
            </div>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"16px":"20px"}}>
              <h3 style={{fontSize:14,color:A.text,marginBottom:12}}>🕐 Dernières commandes</h3>
              {orders.slice(0,4).map(o=>(<div key={o.id} className="arow" onClick={()=>{goPage("orders");setSelectedOrder(o);}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 6px",borderBottom:`1px solid ${A.border}`,cursor:"pointer",borderRadius:4}}>
                <div><div style={{fontSize:12,fontWeight:"bold",color:A.text}}>{o.id}</div><div style={{fontSize:10,color:A.textMuted}}>{o.customer}</div></div>
                <div style={{textAlign:"right"}}><span style={{background:(sColor[o.status]||A.accent)+"33",color:sColor[o.status]||A.accent,padding:"3px 8px",fontSize:9,borderRadius:10,fontWeight:"bold"}}>{sLabel[o.status]||o.status}</span><div style={{fontSize:11,fontWeight:"bold",color:A.accent,marginTop:3}}>{fmt(o.total)}$</div></div>
              </div>))}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:gc("1fr 1fr","1fr","1fr"),gap:14}}>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"16px":"20px"}}><h3 style={{fontSize:14,color:A.text,marginBottom:12}}>🏆 Top produits</h3>{[...products].sort((a,b)=>(b.sales||0)-(a.sales||0)).slice(0,5).map((p,i)=>(<div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:`1px solid ${A.border}`}}><div style={{width:24,height:24,borderRadius:6,background:A.surface2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:"bold",color:A.accent}}>{i+1}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,color:A.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div><div style={{fontSize:10,color:A.textMuted}}>{p.sales||0} ventes</div></div><div style={{fontSize:12,fontWeight:"bold",color:A.accent,flexShrink:0}}>{fmt((p.price-(p.cost||0))*(p.sales||0))}$</div></div>))}</div>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"16px":"20px"}}><h3 style={{fontSize:14,color:A.text,marginBottom:12}}>📦 Stock faible</h3>{products.filter(p=>p.stock<10).sort((a,b)=>a.stock-b.stock).slice(0,6).map(p=>(<div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${A.border}`}}><div style={{fontSize:12,color:A.text}}>{p.name}</div><div style={{fontSize:12,fontWeight:"bold",color:p.stock<3?A.danger:p.stock<6?A.warning:A.text}}>{p.stock} en stock</div></div>))}</div>
          </div>
        </div>)}

        {/* ═══ ORDERS ═══ */}
        {page==="orders"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
            <div><h1 style={{fontSize:mobile?22:26,color:A.text,marginBottom:3}}>Commandes</h1><p style={{fontSize:12,color:A.textMuted}}>{orders.length} commandes · {pendOrd} en cours</p></div>
          </div>
          <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
            {[{k:"all",l:`Toutes (${orders.length})`},...STEPS.map(s=>({k:s.key,l:`${s.icon} ${s.label} (${orders.filter(o=>o.status===s.key).length})`}))].map(f=>(<button key={f.k} onClick={()=>setOrderFilter(f.k)} style={{background:orderFilter===f.k?A.accent+"22":"transparent",color:orderFilter===f.k?A.accent:A.textMuted,border:`1px solid ${orderFilter===f.k?A.accent+"44":A.border}`,padding:"6px 12px",fontSize:10,fontFamily:"Georgia",borderRadius:6}}>{f.l}</button>))}
          </div>

          {selectedOrder?(<div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"18px":"24px",animation:"fadeUp .3s ease"}}>
            <button onClick={()=>setSelectedOrder(null)} style={{background:A.surface2,border:`1px solid ${A.border}`,borderRadius:6,padding:"6px 14px",color:A.textDim,fontFamily:"Georgia",fontSize:11,marginBottom:14}}>← Retour</button>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:18}}>
              <div><div style={{fontSize:20,fontWeight:"bold",color:A.accent}}>{selectedOrder.id}</div><div style={{fontSize:12,color:A.textMuted}}>{selectedOrder.date}</div></div>
              <span style={{background:(sColor[selectedOrder.status]||A.accent)+"33",color:sColor[selectedOrder.status]||A.accent,padding:"6px 14px",borderRadius:8,fontWeight:"bold",fontSize:13}}>{sLabel[selectedOrder.status]||selectedOrder.status}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:16,marginBottom:18}}>
              <div style={{background:A.bg,borderRadius:8,padding:16}}>
                <div style={{fontSize:11,color:A.textMuted,marginBottom:8,fontWeight:"bold"}}>👤 CLIENT</div>
                <div style={{fontSize:14,color:A.text,fontWeight:"bold"}}>{selectedOrder.customer}</div>
                <div style={{fontSize:12,color:A.textDim,marginTop:3}}>{selectedOrder.email}</div>
                <div style={{fontSize:12,color:A.textDim}}>{selectedOrder.phone}</div>
                <div style={{fontSize:11,color:A.textMuted,marginTop:3}}>📍 {selectedOrder.address}</div>
              </div>
              <div style={{background:A.bg,borderRadius:8,padding:16}}>
                <div style={{fontSize:11,color:A.textMuted,marginBottom:8,fontWeight:"bold"}}>📋 ARTICLES</div>
                {(selectedOrder.items||[]).map((it,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:12,color:A.text}}><span>{it.name||`Produit #${it.pid}`} × {it.qty}</span><span style={{color:A.accent}}>{fmt((it.price||0)*it.qty)}$</span></div>))}
                <div style={{borderTop:`1px solid ${A.border}`,marginTop:8,paddingTop:8,display:"flex",justifyContent:"space-between",fontWeight:"bold"}}><span>Total</span><span style={{color:A.accent,fontSize:16}}>{fmt(selectedOrder.total)}$</span></div>
              </div>
            </div>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:11,color:A.textMuted,marginBottom:10,fontWeight:"bold"}}>📍 PROGRESSION</div>
              {STEPS.map((step,i)=>{const done=(selectedOrder.events||[]).some(e=>e.step===step.key);return(<div key={step.key} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div style={{width:28,height:28,borderRadius:"50%",background:done?A.accent+"22":A.surface2,border:`2px solid ${done?A.accent:A.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{done?step.icon:"○"}</div><span style={{fontSize:12,color:done?A.text:A.textMuted,fontWeight:done?"bold":"normal"}}>{step.label}</span></div>);})}
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <span style={{fontSize:11,color:A.textMuted,alignSelf:"center",marginRight:6}}>Changer le statut :</span>
              {STEPS.filter(s=>s.key!==selectedOrder.status).map(s=>(<button key={s.key} onClick={()=>{updateStatus(selectedOrder.id,s.key);setSelectedOrder({...selectedOrder,status:s.key});}} style={{background:A.surface2,border:`1px solid ${A.border}`,borderRadius:6,padding:"6px 12px",color:A.text,fontFamily:"Georgia",fontSize:10}}>{s.icon} {s.label}</button>))}
            </div>
            <div style={{marginTop:16,borderTop:`1px solid ${A.border}`,paddingTop:12}}><button onClick={()=>deleteOrder(selectedOrder.id)} style={{background:A.dangerBg,border:`1px solid ${A.danger}44`,borderRadius:6,padding:"8px 16px",color:A.danger,fontFamily:"Georgia",fontSize:11}}>🗑️ Supprimer cette commande</button></div>
          </div>)
          :(<div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,overflow:"hidden"}}>
            {filtOrd.length===0?<div style={{padding:40,textAlign:"center",color:A.textMuted}}>Aucune commande avec ce filtre</div>
            :filtOrd.map(o=>(<div key={o.id} className="arow" onClick={()=>setSelectedOrder(o)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:mobile?"12px 14px":"14px 18px",borderBottom:`1px solid ${A.border}`,cursor:"pointer",flexWrap:"wrap",gap:8}}>
              <div style={{flex:1,minWidth:140}}>
                <div style={{fontSize:13,fontWeight:"bold",color:A.text}}>{o.id}</div>
                <div style={{fontSize:11,color:A.textMuted}}>{o.customer} · {o.date}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{background:(sColor[o.status]||A.accent)+"33",color:sColor[o.status]||A.accent,padding:"4px 10px",fontSize:10,borderRadius:10,fontWeight:"bold"}}>{sLabel[o.status]||o.status}</span>
                <div style={{fontSize:14,fontWeight:"bold",color:A.accent}}>{fmt(o.total)}$</div>
              </div>
            </div>))}
          </div>)}
        </div>)}

        {/* ═══ PRODUCTS ═══ */}
        {page==="products"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
            <div><h1 style={{fontSize:mobile?22:26,color:A.text,marginBottom:3}}>Produits</h1><p style={{fontSize:12,color:A.textMuted}}>{products.length} produits · {lowStock} stock faible</p></div>
            <button onClick={()=>setShowNewProd(!showNewProd)} style={{background:A.accent,color:DARK,border:"none",padding:"10px 18px",borderRadius:8,fontFamily:"Georgia",fontSize:12,fontWeight:"bold"}}>+ Nouveau produit</button>
          </div>

          {showNewProd&&(<div style={{background:A.surface,border:`1px solid ${A.accent}44`,borderRadius:10,padding:mobile?"18px":"24px",marginBottom:16,animation:"fadeUp .3s ease"}}>
            <h3 style={{fontSize:15,color:A.accent,marginBottom:14}}>✨ Nouveau produit</h3>
            <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:"0 16px"}}>
              <Inp label="Nom du produit *" value={newProd.name} onChange={e=>setNewProd({...newProd,name:e.target.value})} placeholder="Grand Boubou Brodé" />
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:9,letterSpacing:2,color:A.textMuted,textTransform:"uppercase",marginBottom:4}}>Catégorie</label><select value={newProd.category} onChange={e=>setNewProd({...newProd,category:e.target.value})} style={{width:"100%",padding:"10px 12px",background:A.bg,border:`1px solid ${A.border}`,borderRadius:6,color:A.text,fontSize:12,fontFamily:"Georgia"}}>{CATS.map(c=><option key={c.key} value={c.key}>{c.emoji} {c.label}</option>)}</select></div>
              <Inp label="Sous-catégorie" value={newProd.sub} onChange={e=>setNewProd({...newProd,sub:e.target.value})} placeholder="Boubou, Robe, Masque..." />
              <Inp label="Artisan" value={newProd.artisan} onChange={e=>setNewProd({...newProd,artisan:e.target.value})} placeholder="Moussa Diallo" />
              <Inp label="Ville" value={newProd.city} onChange={e=>setNewProd({...newProd,city:e.target.value})} placeholder="Dakar" />
              <Inp label="Pays" value={newProd.country} onChange={e=>setNewProd({...newProd,country:e.target.value})} placeholder="Sénégal" />
              <Inp label="Prix de vente ($CA) *" type="number" value={newProd.price} onChange={e=>setNewProd({...newProd,price:e.target.value})} />
              <Inp label="Coût ($CA)" type="number" value={newProd.cost} onChange={e=>setNewProd({...newProd,cost:e.target.value})} />
              <Inp label="Stock" type="number" value={newProd.stock} onChange={e=>setNewProd({...newProd,stock:e.target.value})} />
              <Inp label="Description" value={newProd.desc} onChange={e=>setNewProd({...newProd,desc:e.target.value})} placeholder="Broderie main..." />
            </div>
            <div style={{display:"flex",gap:10,marginTop:6}}>
              <button onClick={addProduct} style={{background:A.accent,color:DARK,border:"none",padding:"10px 20px",borderRadius:6,fontFamily:"Georgia",fontWeight:"bold",fontSize:12}}>✓ Ajouter et sauvegarder</button>
              <button onClick={()=>setShowNewProd(false)} style={{background:A.surface2,color:A.textDim,border:`1px solid ${A.border}`,padding:"10px 20px",borderRadius:6,fontFamily:"Georgia",fontSize:12}}>Annuler</button>
            </div>
          </div>)}

          <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,overflow:"hidden"}}>
            {products.map(p=>(<div key={p.id} className="arow" style={{display:"flex",alignItems:"center",padding:mobile?"10px 12px":"12px 16px",borderBottom:`1px solid ${A.border}`,gap:12}}>
              <div style={{width:40,height:40,borderRadius:8,background:`linear-gradient(135deg,${p.color||"#8B5E3C"},${DARK})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{CATS.find(c=>c.key===p.category)?.emoji||"✨"}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:"bold",color:A.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                <div style={{fontSize:10,color:A.textMuted}}>✂️ {p.artisan} · {p.city}, {p.country}</div>
              </div>
              {!mobile&&<div style={{textAlign:"center",minWidth:60}}><div style={{fontSize:13,fontWeight:"bold",color:A.accent}}>{p.price}$</div><div style={{fontSize:9,color:A.textMuted}}>coût: {p.cost||0}$</div></div>}
              <div style={{textAlign:"center",minWidth:50}}><div style={{fontSize:13,fontWeight:"bold",color:p.stock<3?A.danger:p.stock<6?A.warning:A.text}}>{p.stock}</div><div style={{fontSize:9,color:A.textMuted}}>stock</div></div>
              {!mobile&&<div style={{textAlign:"center",minWidth:50}}><div style={{fontSize:13,fontWeight:"bold",color:A.text}}>{p.sales||0}</div><div style={{fontSize:9,color:A.textMuted}}>ventes</div></div>}
              <button onClick={()=>deleteProduct(p.id)} style={{background:A.dangerBg,border:"none",borderRadius:6,padding:"6px 10px",color:A.danger,fontSize:11,flexShrink:0}}>🗑️</button>
            </div>))}
          </div>
        </div>)}

        {/* ═══ ARTISANS ═══ */}
        {page==="artisans"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?22:26,color:A.text,marginBottom:5}}>Artisans partenaires</h1>
          <p style={{fontSize:12,color:A.textMuted,marginBottom:16}}>{ARTISANS.length} artisans actifs</p>
          <div style={{display:"grid",gridTemplateColumns:gc("repeat(2,1fr)","repeat(2,1fr)","1fr"),gap:14}}>
            {ARTISANS.map(a=>(<div key={a.id} style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"16px":"20px",display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:A.accentGlow,border:`1px solid ${A.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>✂️</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:15,fontWeight:"bold",color:A.text}}>{a.name}</div>
                <div style={{fontSize:11,color:A.accent,marginBottom:4}}>{a.craft}</div>
                <div style={{fontSize:10,color:A.textMuted,marginBottom:10}}>📍 {a.city}, {a.country} · {a.exp} ans d'expérience</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
                  {[["Prod.",a.products],["Ventes",a.sales],["Rev.",`${(a.revenue/1000).toFixed(1)}k$`],["Note",`${a.rating}⭐`]].map(([l,v])=>(<div key={l} style={{background:A.bg,borderRadius:6,padding:"6px 4px",textAlign:"center"}}><div style={{fontSize:12,fontWeight:"bold",color:A.accent}}>{v}</div><div style={{fontSize:8,color:A.textMuted}}>{l}</div></div>))}
                </div>
              </div>
            </div>))}
          </div>
        </div>)}

        {/* ═══ CUSTOMERS ═══ */}
        {page==="customers"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?22:26,color:A.text,marginBottom:5}}>Clients</h1>
          <p style={{fontSize:12,color:A.textMuted,marginBottom:16}}>{[...new Set(orders.map(o=>o.email))].length} clients uniques</p>
          <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,overflow:"hidden"}}>
            {orders.length===0?<div style={{padding:40,textAlign:"center",color:A.textMuted}}>Aucun client pour le moment</div>
            :[...new Map(orders.map(o=>[o.email,o])).values()].map(o=>{const co=orders.filter(ord=>ord.email===o.email);return(
              <div key={o.email} className="arow" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:mobile?"12px 14px":"14px 18px",borderBottom:`1px solid ${A.border}`,flexWrap:"wrap",gap:8}}>
                <div style={{flex:1,minWidth:140}}><div style={{fontSize:13,fontWeight:"bold",color:A.text}}>{o.customer}</div><div style={{fontSize:11,color:A.textMuted}}>{o.email}</div>{o.phone&&<div style={{fontSize:10,color:A.textMuted}}>{o.phone}</div>}</div>
                <div style={{display:"flex",gap:14,alignItems:"center"}}><div style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:"bold",color:A.text}}>{co.length}</div><div style={{fontSize:9,color:A.textMuted}}>commandes</div></div><div style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:"bold",color:A.accent}}>{fmt(co.reduce((s,c)=>s+c.total,0))}$</div><div style={{fontSize:9,color:A.textMuted}}>total</div></div></div>
              </div>
            );})}
          </div>
        </div>)}

        {/* ═══ ANALYTICS ═══ */}
        {page==="analytics"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?22:26,color:A.text,marginBottom:5}}>Analytiques</h1>
          <p style={{fontSize:12,color:A.textMuted,marginBottom:16}}>Performance détaillée</p>
          <div style={{display:"grid",gridTemplateColumns:gc("repeat(3,1fr)","repeat(3,1fr)","1fr"),gap:12,marginBottom:18}}>
            {[{l:"CA Total",v:`${fmt(totalRev)} $`,c:A.accent},{l:"Profit estimé",v:`${fmt(totalProfit)} $`,c:A.success},{l:"Marge",v:`${totalRev>0?(totalProfit/totalRev*100).toFixed(1):0}%`,c:A.info}].map(k=>(<div key={k.l} style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"16px":"20px"}}><div style={{fontSize:10,color:A.textMuted,letterSpacing:1,marginBottom:6}}>{k.l}</div><div style={{fontSize:mobile?22:28,fontWeight:"bold",color:k.c}}>{k.v}</div></div>))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:gc("1fr 1fr","1fr","1fr"),gap:14}}>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"16px":"20px"}}><h3 style={{fontSize:14,color:A.text,marginBottom:12}}>Ventes par catégorie</h3>{CATS.map(cat=>{const cp=products.filter(p=>p.category===cat.key);const cs=cp.reduce((s,p)=>s+(p.sales||0),0);const max=Math.max(...CATS.map(c=>products.filter(p=>p.category===c.key).reduce((s,p)=>s+(p.sales||0),0)),1);return(<div key={cat.key} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:A.text}}>{cat.emoji} {cat.label}</span><span style={{fontSize:11,color:A.accent,fontWeight:"bold"}}>{cs} ventes</span></div><div style={{height:8,background:A.bg,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${(cs/max)*100}%`,background:cat.color,borderRadius:4,transition:"width .5s ease"}} /></div></div>);})}</div>
            <div style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"16px":"20px"}}><h3 style={{fontSize:14,color:A.text,marginBottom:12}}>Revenus par pays</h3>{[...new Set(products.map(p=>p.country))].map(country=>{const cp=products.filter(p=>p.country===country);const rev=cp.reduce((s,p)=>s+p.price*(p.sales||0),0);return(<div key={country} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${A.border}`}}><div><div style={{fontSize:12,color:A.text}}>🌍 {country}</div><div style={{fontSize:10,color:A.textMuted}}>{cp.length} produits</div></div><div style={{fontSize:13,fontWeight:"bold",color:A.accent}}>{fmt(rev)}$</div></div>);})}</div>
          </div>
        </div>)}

        {/* ═══ SETTINGS ═══ */}
        {page==="settings"&&(<div style={{animation:"fadeUp .4s ease"}}>
          <h1 style={{fontSize:mobile?22:26,color:A.text,marginBottom:5}}>Paramètres</h1>
          <p style={{fontSize:12,color:A.textMuted,marginBottom:16}}>Configuration de la boutique</p>
          <div style={{display:"grid",gridTemplateColumns:gc("1fr 1fr","1fr 1fr","1fr"),gap:14}}>
            {[["🏪 Boutique",[["Nom","BADAOUR"],["Email","service@badaour.com"],["Tél","438-988-6682"],["Devise","$CA"]]],["🚚 Livraison",[["Frais standard","18 $CA"],["Gratuit dès","200 $CA"],["Délai moyen","14-21 jours"]]],["💳 Paiement",[["Carte","Activé"],["PayPal","Activé"],["Interac","Activé"]]],["🔔 Notifications",[["Nouvelle commande","Activé"],["Stock faible","Activé"],["Commande livrée","Activé"]]]].map(([title,fields])=>(<div key={title} style={{background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"16px":"22px"}}><h3 style={{fontSize:14,color:A.accent,marginBottom:12}}>{title}</h3>{fields.map(([l,v])=>(<div key={l} style={{marginBottom:10}}><label style={{display:"block",fontSize:9,color:A.textMuted,letterSpacing:1,marginBottom:3,textTransform:"uppercase"}}>{l}</label><input defaultValue={v} style={{width:"100%",padding:"8px 10px",background:A.bg,border:`1px solid ${A.border}`,borderRadius:6,color:A.text,fontSize:12,fontFamily:"Georgia"}} /></div>))}</div>))}
          </div>
          <div style={{display:"flex",gap:12,marginTop:18,flexWrap:"wrap"}}>
            <button onClick={()=>toast("Paramètres sauvegardés ✓")} style={{background:A.accent,color:DARK,border:"none",padding:"12px 24px",borderRadius:8,fontFamily:"Georgia",fontWeight:"bold",fontSize:13}}>💾 Sauvegarder</button>
            <button onClick={resetData} style={{background:A.warningBg,border:`1px solid ${A.warning}44`,padding:"12px 24px",borderRadius:8,fontFamily:"Georgia",fontSize:12,color:A.warning}}>🔄 Réinitialiser les données</button>
          </div>
          <div style={{marginTop:24,background:A.surface,border:`1px solid ${A.border}`,borderRadius:10,padding:mobile?"16px":"22px"}}>
            <h3 style={{fontSize:14,color:A.accent,marginBottom:10}}>💾 Stockage persistant</h3>
            <p style={{fontSize:12,color:A.textDim,lineHeight:1.7}}>Les données (produits, commandes, clients) sont sauvegardées automatiquement. Elles persistent entre les sessions et sont partagées avec la boutique publique. Les modifications faites ici (ajout/suppression de produits, mise à jour de statut) sont immédiatement visibles côté client.</p>
            <div style={{marginTop:12,display:"flex",gap:10,flexWrap:"wrap"}}>
              <div style={{background:A.bg,borderRadius:6,padding:"8px 14px",fontSize:11}}><span style={{color:A.accent,fontWeight:"bold"}}>{products.length}</span> <span style={{color:A.textMuted}}>produits</span></div>
              <div style={{background:A.bg,borderRadius:6,padding:"8px 14px",fontSize:11}}><span style={{color:A.accent,fontWeight:"bold"}}>{orders.length}</span> <span style={{color:A.textMuted}}>commandes</span></div>
              <div style={{background:A.bg,borderRadius:6,padding:"8px 14px",fontSize:11}}><span style={{color:A.accent,fontWeight:"bold"}}>{[...new Set(orders.map(o=>o.email))].length}</span> <span style={{color:A.textMuted}}>clients</span></div>
            </div>
          </div>
        </div>)}
      </main>
    </div>
  );
}
