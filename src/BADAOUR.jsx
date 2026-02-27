import { useState, useEffect } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const G = "#D4AF37";
const DARK = "#1A0A00";
const RED = "#8B1A00";
const CREAM = "#FFF8EE";
const BG = "#FDF6EC";
const BGALT = "#F5ECD9";
const BORDER = "#E8D5B7";
const MUTED = "#8B6A3E";
const GREEN = "#2E8B57";
const BROWN = "#3D1A00";
const PHONE = "438-988-6682";
const EMAIL = "service@badaour.com";

function useScreen() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return { w, mobile: w < 640, tablet: w >= 640 && w < 1024, desktop: w >= 1024 };
}

const PRODUCTS = [
  { id:1, name:"Grand Boubou Brodé", category:"homme", sub:"Boubou", artisan:"Moussa Diallo", city:"Dakar", country:"Sénégal", price:189, tag:"Bestseller", desc:"Broderie main sur bazin riche, teinture naturelle indigo.", rating:4.8, color:"#1A3A6B" },
  { id:2, name:"Dashiki Festif", category:"homme", sub:"Chemise", artisan:"Koffi Asante", city:"Accra", country:"Ghana", price:78, tag:"Nouveau", desc:"Coton léger brodé, col en V, manches courtes.", rating:4.6, color:"#E74C3C" },
  { id:3, name:"Agbada Cérémonie", category:"homme", sub:"Tenue complète", artisan:"Adebayo Okafor", city:"Lagos", country:"Nigeria", price:245, tag:"Premium", desc:"Ensemble 3 pièces broderie dorée.", rating:4.9, color:"#6B2FA0" },
  { id:4, name:"Robe Wax Élégance", category:"femme", sub:"Robe", artisan:"Fatoumata Koné", city:"Bamako", country:"Mali", price:134, tag:"Bestseller", desc:"Robe droite en wax hollandais, ceinture tissée.", rating:4.7, color:"#E74C3C" },
  { id:5, name:"Ensemble Bogolan Chic", category:"femme", sub:"Ensemble", artisan:"Awa Traoré", city:"Bamako", country:"Mali", price:168, tag:"Artisanal", desc:"Haut et jupe assortis en bogolan peint à la main.", rating:4.8, color:"#8B5E3C" },
  { id:6, name:"Kaftan Soirée Brodé", category:"femme", sub:"Kaftan", artisan:"Aïcha Diop", city:"Dakar", country:"Sénégal", price:212, tag:"Premium", desc:"Kaftan voile de coton, broderie au fil d'or.", rating:4.9, color:"#1A1060" },
  { id:7, name:"Mini Boubou Enfant", category:"enfant", sub:"Boubou", artisan:"Moussa Diallo", city:"Dakar", country:"Sénégal", price:64, tag:"Populaire", desc:"Version enfant. Tissu doux coton. 2 à 12 ans.", rating:4.5, color:"#27AE60" },
  { id:8, name:"Robe Wax Princesse", category:"enfant", sub:"Robe", artisan:"Koffi Mensah", city:"Lomé", country:"Togo", price:52, tag:"Nouveau", desc:"Robe à volants en wax coloré. 3 à 10 ans.", rating:4.6, color:"#E91E8C" },
  { id:9, name:"Ensemble Kente Junior", category:"enfant", sub:"Ensemble", artisan:"Kweku Mensah", city:"Kumasi", country:"Ghana", price:89, tag:"Premium", desc:"Ensemble kente tissé main. 4 à 14 ans.", rating:4.7, color:"#F4A300" },
  { id:10, name:"Masque Baoulé Ancien", category:"art", sub:"Masque", artisan:"Cheikh Ndiaye", city:"Thiès", country:"Sénégal", price:320, tag:"Unique", desc:"Masque Goli sculpté, bois de venn.", rating:5.0, color:"#6B2800" },
  { id:11, name:"Sculpture Baobab", category:"art", sub:"Sculpture", artisan:"Cheikh Ndiaye", city:"Thiès", country:"Sénégal", price:275, tag:"Artisanal", desc:"Baobab sculpté ébène, base laiton.", rating:4.9, color:"#4A2800" },
  { id:12, name:"Tableau Toile d'Afrique", category:"art", sub:"Tableau", artisan:"Ibrahima Sow", city:"Dakar", country:"Sénégal", price:195, tag:"Nouveau", desc:"Peinture acrylique sur toile, thème village.", rating:4.7, color:"#E67E22" },
  { id:13, name:"Collier Krobo Perles", category:"divers", sub:"Bijou", artisan:"Abena Asante", city:"Accra", country:"Ghana", price:86, tag:"Populaire", desc:"Perles Krobo faites à la flamme.", rating:4.6, color:"#D4AF37" },
  { id:14, name:"Sac Bogolan Cuir", category:"divers", sub:"Sac", artisan:"Fatoumata Koné", city:"Bamako", country:"Mali", price:112, tag:"Artisanal", desc:"Sac bogolan, cuir tannage végétal.", rating:4.8, color:"#8B5E3C" },
  { id:15, name:"Huile de Karité Pure", category:"divers", sub:"Beauté", artisan:"Mariam Ouédraogo", city:"Ouaga", country:"Burkina Faso", price:34, tag:"Bio", desc:"Karité brut non raffiné. 200ml.", rating:4.4, color:"#E8D5A0" },
  { id:16, name:"Tissu Wax 6 yards", category:"divers", sub:"Tissu", artisan:"Koffi Mensah", city:"Lomé", country:"Togo", price:58, tag:"Populaire", desc:"Wax hollandais double face. 6 yards.", rating:4.5, color:"#E74C3C" },
];

const CATEGORIES = [
  { key:"homme", label:"Homme", full:"Habillement Homme", emoji:"👘", color:"#1A3A6B", desc:"Boubous, dashikis, agbadas" },
  { key:"femme", label:"Femme", full:"Habillement Femme", emoji:"👗", color:"#8B1A00", desc:"Robes wax, kaftans, bogolan" },
  { key:"enfant", label:"Enfant", full:"Habillement Enfant", emoji:"🧒", color:"#27AE60", desc:"Boubous, robes, ensembles" },
  { key:"art", label:"Art", full:"Oeuvres d'Art", emoji:"🏺", color:"#6A0572", desc:"Sculptures, masques, tableaux" },
  { key:"divers", label:"Divers", full:"Divers & Accessoires", emoji:"✨", color:"#D4AF37", desc:"Bijoux, sacs, tissus, beauté" },
];

const ARTISANS = [
  { name:"Moussa Diallo", craft:"Tailleur brodeur", city:"Dakar", country:"Sénégal", exp:23, bio:"Formé par son père, Moussa perpétue l'art du grand boubou." },
  { name:"Fatoumata Koné", craft:"Artisane bogolan", city:"Bamako", country:"Mali", exp:18, bio:"Ressuscite les motifs anciens du bogolan peint à la boue." },
  { name:"Abena Asante", craft:"Perlière Krobo", city:"Accra", country:"Ghana", exp:15, bio:"Dirige une coopérative de 12 femmes artisanes." },
  { name:"Cheikh Ndiaye", craft:"Sculpteur sur bois", city:"Thiès", country:"Sénégal", exp:30, bio:"Maître sculpteur, pièces uniques en bois de venn." },
  { name:"Kweku Mensah", craft:"Tisserand kente", city:"Kumasi", country:"Ghana", exp:25, bio:"Gardien de la tradition kente du peuple Ashanti." },
  { name:"Aïcha Diop", craft:"Couturière haute couture", city:"Dakar", country:"Sénégal", exp:20, bio:"Allie couture traditionnelle et tendances contemporaines." },
  { name:"Koffi Mensah", craft:"Tisserand / Tailleur", city:"Lomé", country:"Togo", exp:12, bio:"Spécialiste wax et couture enfant." },
  { name:"Mariam Ouédraogo", craft:"Productrice karité", city:"Ouaga", country:"Burkina Faso", exp:10, bio:"Coopérative de femmes, karité 100% bio." },
];

const TRACKING_STEPS = [
  { key:"confirmed", label:"Commande confirmée", icon:"✅", desc:"Reçue et validée" },
  { key:"preparation", label:"En préparation", icon:"🧵", desc:"L'artisan prépare" },
  { key:"shipped", label:"Expédiée", icon:"📦", desc:"Colis parti" },
  { key:"transit", label:"En transit", icon:"✈️", desc:"Vol Afrique → Canada" },
  { key:"customs", label:"Dédouanement", icon:"🛃", desc:"Douanes canadiennes" },
  { key:"delivery", label:"En livraison", icon:"🚚", desc:"En route chez vous" },
  { key:"delivered", label:"Livré !", icon:"🎉", desc:"Colis livré" },
];

const tagColors = { Bestseller:G, Nouveau:GREEN, Artisanal:"#8B4513", Populaire:"#C0392B", Unique:"#6A0572", Bio:"#228B22", Premium:"#1A3A6B" };
const statusColors = { confirmed:GREEN, preparation:"#8B4513", shipped:"#1A5276", transit:"#6A0572", customs:"#B7950B", delivery:"#1A5276", delivered:GREEN };
const statusLabels = { confirmed:"Confirmée", preparation:"Préparation", shipped:"Expédiée", transit:"En transit ✈️", customs:"Dédouanement", delivery:"En livraison", delivered:"Livré ✓" };

const DEMO_ORDERS = [
  { id:"BDR-2025-0042", date:"10 jan 2025", status:"transit", client:"Mamadou Diallo", total:355.25, events:[{step:"confirmed",date:"10 jan"},{step:"preparation",date:"11 jan"},{step:"shipped",date:"15 jan"},{step:"transit",date:"16 jan",note:"Vol AF722"}] },
  { id:"BDR-2025-0038", date:"8 jan 2025", status:"delivered", client:"Aïssatou Bah", total:252.80, events:[{step:"confirmed",date:"8 jan"},{step:"delivered",date:"21 jan"}] },
];

const fmt = v => Number(v).toFixed(2);

function CatIcon({ category, size=50 }) {
  const s = size;
  const icons = {
    homme:<svg width={s} height={s} viewBox="0 0 50 50"><rect x="10" y="7" width="30" height="38" rx="4" fill="#1A3A6B"/><ellipse cx="25" cy="10" rx="10" ry="5" fill="#0D2550"/><ellipse cx="25" cy="10" rx="8" ry="4" fill="none" stroke={G} strokeWidth="1.5"/><line x1="25" y1="15" x2="25" y2="38" stroke={G} strokeWidth="1.2" strokeDasharray="4,3"/><rect x="10" y="42" width="30" height="3" rx="1" fill={G} opacity=".7"/></svg>,
    femme:<svg width={s} height={s} viewBox="0 0 50 50"><path d="M14,10 Q12,14 9,24 L7,42 Q7,46 14,46 L36,46 Q43,46 43,42 L41,24 Q38,14 36,10 Z" fill="#E74C3C"/><rect x="8" y="22" width="34" height="4" fill="#F1C40F" opacity=".7"/><rect x="7" y="32" width="36" height="4" fill="#27AE60" opacity=".7"/></svg>,
    enfant:<svg width={s} height={s} viewBox="0 0 50 50"><rect x="12" y="10" width="26" height="32" rx="4" fill="#27AE60"/><ellipse cx="25" cy="12" rx="8" ry="4" fill="#1E8449"/><line x1="25" y1="16" x2="25" y2="34" stroke={G} strokeWidth="1.2" strokeDasharray="3,2"/><circle cx="25" cy="35" r="4" fill="#F1C40F" opacity=".7"/></svg>,
    art:<svg width={s} height={s} viewBox="0 0 50 50"><ellipse cx="25" cy="15" rx="12" ry="14" fill="#6B2800"/><rect x="21" y="29" width="8" height="16" rx="2" fill="#8B4513"/><circle cx="21" cy="11" r="3" fill={DARK}/><circle cx="29" cy="11" r="3" fill={DARK}/><path d="M19,19 Q25,24 31,19" fill="none" stroke={DARK} strokeWidth="2"/></svg>,
    divers:<svg width={s} height={s} viewBox="0 0 50 50"><circle cx="25" cy="16" r="12" fill={G}/><circle cx="25" cy="16" r="7" fill="#FFE878"/><path d="M14,30 Q14,26 25,24 Q36,26 36,30 L38,44 Q38,47 35,47 L15,47 Q12,47 12,44 Z" fill="#8B5E3C"/></svg>,
  };
  return icons[category]||icons.divers;
}

export default function BADAOURPublic() {
  const scr = useScreen();
  const { mobile, tablet } = scr;
  const [page, setPage] = useState("home");
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notif, setNotif] = useState(null);
  const [payStep, setPayStep] = useState("cart");
  const [payMethod, setPayMethod] = useState("card");
  const [form, setForm] = useState({name:"",email:"",phone:"",address:"",city:"Montréal",province:"QC",postal:""});
  const [cardD, setCardD] = useState({number:"",name:"",expiry:"",cvv:""});
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackErr, setTrackErr] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({firstName:"",lastName:"",email:"",password:"",confirm:""});
  const [accounts, setAccounts] = useState([{firstName:"Client",lastName:"Demo",email:"demo@badaour.com",password:"demo123",orders:[]}]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mSearch, setMSearch] = useState(false);

  const toast = (msg,type="success") => { setNotif({msg,type}); setTimeout(()=>setNotif(null),2800); };
  const addToCart = p => { setCart(c=>{const ex=c.find(i=>i.id===p.id);return ex?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}];}); toast(`${p.name} ajouté`); };
  const updateQty = (id,d) => setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeItem = id => setCart(c=>c.filter(i=>i.id!==id));
  const toggleWish = id => setWishlist(w=>w.includes(id)?w.filter(i=>i!==id):[...w,id]);
  const goPage = p => { setPage(p); setMenuOpen(false); setMSearch(false); window.scrollTo(0,0); };

  const cartQty = cart.reduce((s,i)=>s+i.qty,0);
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const shipping = cart.length?(subtotal>200?0:18):0;
  const taxes = +((subtotal+shipping)*0.14975).toFixed(2);
  const total = +(subtotal+shipping+taxes).toFixed(2);

  const filtered = PRODUCTS.filter(p=>{
    const mc = activeCat?p.category===activeCat:true;
    const q = search.toLowerCase();
    const mq = !q||p.name.toLowerCase().includes(q)||p.artisan.toLowerCase().includes(q)||p.country.toLowerCase().includes(q);
    return mc&&mq;
  });

  const doTrack = () => {
    if(!trackId.trim()){setTrackErr("Entrez un numéro");return;}
    const o = DEMO_ORDERS.find(o=>o.id===trackId.trim());
    if(o){setTrackResult(o);setTrackErr("");}else{setTrackResult(null);setTrackErr("Introuvable (ex: BDR-2025-0042)");}
  };

  const handleLogin = () => {
    const u=accounts.find(a=>a.email===authForm.email&&a.password===authForm.password);
    if(u){setCurrentUser(u);goPage("compte");toast(`Bienvenue ${u.firstName} !`);}else toast("Identifiants incorrects","info");
  };
  const handleRegister = () => {
    if(!authForm.firstName||!authForm.email||!authForm.password){toast("Champs requis","info");return;}
    if(authForm.password!==authForm.confirm){toast("Mots de passe différents","info");return;}
    if(accounts.find(a=>a.email===authForm.email)){toast("Email existant","info");return;}
    const u={...authForm,orders:[]};setAccounts(a=>[...a,u]);setCurrentUser(u);goPage("compte");toast(`Bienvenue ${u.firstName} !`);
  };
  const confirmOrder = () => {
    if(!form.name||!form.email||!form.address){toast("Champs * requis","info");return;}
    const oid="BDR-"+new Date().getFullYear()+"-"+String(Math.floor(Math.random()*9000)+1000);
    toast(`Commande ${oid} confirmée ! 🎉`);
    if(currentUser){const no={id:oid,date:new Date().toLocaleDateString("fr-CA"),status:"confirmed",items:cart.map(i=>({pid:i.id,qty:i.qty})),total};setAccounts(a=>a.map(u=>u.email===currentUser.email?{...u,orders:[...u.orders,no]}:u));setCurrentUser(prev=>({...prev,orders:[...(prev.orders||[]),no]}));}
    setCart([]);setPayStep("cart");goPage("home");
  };

  const navItems = [{k:"home",l:"Accueil"},{k:"boutique",l:"Boutique"},{k:"artisans",l:"Artisans"},{k:"suivi",l:"Suivi"},{k:"commande",l:"Sur mesure"}];
  const px = mobile?"14px":tablet?"20px":"24px";
  const gc = (d,t,m) => mobile?m:tablet?t:d;

  const FInp = ({label,...props}) => (<div style={{marginBottom:14}}>{label&&<label style={{display:"block",fontSize:9,letterSpacing:2,color:RED,textTransform:"uppercase",marginBottom:4,fontFamily:"Georgia"}}>{label}</label>}<input {...props} style={{width:"100%",padding:"10px 12px",background:BG,border:`2px solid ${BORDER}`,color:DARK,fontSize:14,fontFamily:"Georgia",borderRadius:4,...(props.style||{})}} /></div>);

  return (
    <div style={{fontFamily:"'Georgia','Times New Roman',serif",background:BG,minHeight:"100vh",color:DARK,overflowX:"hidden"}}>
      <style>{`
        @keyframes fadeSlide{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideDown{from{opacity:0;max-height:0}to{opacity:1;max-height:400px}}
        *{box-sizing:border-box;margin:0;padding:0;}
        input:focus,textarea:focus,select:focus{border-color:${G}!important;outline:none;}
        .hcard{transition:transform .2s,box-shadow .2s;} .hcard:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(26,10,0,.12);}
        button{transition:opacity .15s,background .2s;cursor:pointer;}
        button:active:not(:disabled){transform:scale(.97);}
        .cpill:hover{background:${DARK}!important;color:${G}!important;}
        body{overflow-x:hidden;-webkit-tap-highlight-color:transparent;}
      `}</style>

      {notif&&<div style={{position:"fixed",top:12,left:mobile?12:"auto",right:12,zIndex:99999,background:notif.type==="info"?"#1A5276":GREEN,color:CREAM,padding:"12px 18px",borderRadius:6,fontSize:13,boxShadow:"0 6px 28px rgba(0,0,0,.3)",animation:"fadeSlide .3s ease"}}>{notif.msg}</div>}

      {/* HEADER */}
      <header style={{background:DARK,borderBottom:`3px solid ${G}`,position:"sticky",top:0,zIndex:100}}>
        {!mobile&&<div style={{maxWidth:1200,margin:"0 auto",padding:"0 "+px}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #3A1F00",padding:"4px 0",fontSize:9,color:G,letterSpacing:1,flexWrap:"wrap",gap:4}}><span>🌍 Livraison Afrique → Canada · 14–21 jours</span>{!tablet&&<span>Commerce éthique · Artisanat authentique</span>}<span>📞 {PHONE}</span></div></div>}
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 "+px}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:mobile?"10px 0":"12px 0",gap:8}}>
            <div onClick={()=>goPage("home")} style={{cursor:"pointer",flexShrink:0}}>
              <div style={{fontSize:mobile?20:26,fontWeight:"bold",color:G,letterSpacing:mobile?3:6}}>BADAOUR</div>
              {!mobile&&<div style={{fontSize:8,color:"#A0845C",letterSpacing:3,marginTop:-2}}>L'AFRIQUE À VOTRE PORTE</div>}
            </div>
            {!mobile&&<div style={{flex:1,maxWidth:tablet?200:300,margin:"0 12px",position:"relative"}}><input value={search} onChange={e=>{setSearch(e.target.value);if(e.target.value){goPage("boutique");setActiveCat(null);}}} placeholder="Rechercher..." style={{width:"100%",padding:"8px 12px 8px 30px",background:"#2A1000",border:`1px solid ${G}33`,borderRadius:4,color:CREAM,fontSize:12,fontFamily:"Georgia"}} /><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:12,opacity:.6}}>🔍</span></div>}
            {!mobile&&!tablet&&<nav style={{display:"flex",gap:4,alignItems:"center"}}>{navItems.map(({k,l})=>(<button key={k} onClick={()=>goPage(k)} style={{background:"none",border:"none",color:page===k?G:"#A0845C",fontSize:11,letterSpacing:1,fontFamily:"Georgia",borderBottom:page===k?`2px solid ${G}`:"2px solid transparent",padding:"4px 6px"}}>{l}</button>))}</nav>}
            <div style={{display:"flex",alignItems:"center",gap:mobile?6:8,flexShrink:0}}>
              {mobile&&<button onClick={()=>setMSearch(!mSearch)} style={{background:"none",border:"none",color:G,fontSize:18,padding:4}}>🔍</button>}
              <button onClick={()=>goPage(currentUser?"compte":"auth")} style={{background:"none",border:"1px solid #3A1F00",borderRadius:4,padding:mobile?"5px 8px":"5px 12px",color:currentUser?G:"#A0845C",fontFamily:"Georgia",fontSize:11}}>{currentUser?(mobile?"👤":`👤 ${currentUser.firstName}`):(mobile?"👤":"👤 Connexion")}</button>
              <button onClick={()=>{setPayStep("cart");goPage("panier");}} style={{background:G,border:"none",borderRadius:4,padding:mobile?"6px 10px":"6px 14px",color:DARK,fontFamily:"Georgia",fontSize:12,fontWeight:"bold",position:"relative"}}>🛒{!mobile&&" Panier"}{cartQty>0&&<span style={{position:"absolute",top:-6,right:-6,background:"#C0392B",color:"white",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:"bold"}}>{cartQty}</span>}</button>
              {(mobile||tablet)&&<button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"1px solid #3A1F00",borderRadius:4,padding:"5px 8px",color:G,fontSize:18}}>{menuOpen?"✕":"☰"}</button>}
            </div>
          </div>
          {mobile&&mSearch&&<div style={{padding:"0 0 10px"}}><input value={search} onChange={e=>{setSearch(e.target.value);if(e.target.value){goPage("boutique");setActiveCat(null);}}} placeholder="Rechercher..." autoFocus style={{width:"100%",padding:"10px 12px",background:"#2A1000",border:`1px solid ${G}33`,borderRadius:4,color:CREAM,fontSize:14,fontFamily:"Georgia"}} /></div>}
        </div>
        {(mobile||tablet)&&menuOpen&&<div style={{background:"#1A0800",borderTop:`1px solid ${G}33`,padding:"8px "+px,overflow:"hidden"}}>{navItems.map(({k,l})=>(<button key={k} onClick={()=>goPage(k)} style={{display:"block",width:"100%",textAlign:"left",background:page===k?"#2A1000":"transparent",border:"none",color:page===k?G:"#A0845C",fontSize:14,fontFamily:"Georgia",padding:"11px 14px",borderLeft:page===k?`3px solid ${G}`:"3px solid transparent",marginBottom:2,borderRadius:2}}>{l}</button>))}{mobile&&<div style={{padding:"10px 14px 4px",fontSize:10,color:"#A0845C",borderTop:"1px solid #3A1F00",marginTop:6}}>📞 {PHONE} · ✉️ {EMAIL}</div>}</div>}
      </header>

      <div style={{maxWidth:1200,margin:"0 auto"}}>

        {/* HOME */}
        {page==="home"&&(<>
          <div style={{background:`linear-gradient(135deg,${DARK},${BROWN},${DARK})`,padding:mobile?"40px 16px":tablet?"52px 20px":"72px 24px",borderBottom:`4px solid ${G}`,position:"relative",overflow:"hidden"}}>
            <div style={{maxWidth:560,position:"relative",animation:"fadeUp .6s ease"}}>
              <div style={{fontSize:9,letterSpacing:mobile?3:5,color:G,marginBottom:14,borderLeft:`3px solid ${G}`,paddingLeft:12}}>ARTISANAT AFRICAIN · MONTRÉAL</div>
              <h1 style={{fontSize:mobile?28:tablet?40:50,fontWeight:"bold",color:CREAM,lineHeight:1.1,marginBottom:16}}>L'âme de l'Afrique,<br/><span style={{color:G}}>livrée chez vous.</span></h1>
              <p style={{fontSize:mobile?13:15,color:"#C4945C",lineHeight:1.8,maxWidth:440,marginBottom:24}}>Habillement traditionnel, oeuvres d'art et produits africains authentiques.</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <button onClick={()=>goPage("boutique")} style={{background:G,color:DARK,border:"none",padding:mobile?"12px 20px":"14px 28px",fontSize:mobile?12:13,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,textTransform:"uppercase",borderRadius:4}}>Découvrir</button>
                <button onClick={()=>goPage("suivi")} style={{background:"transparent",color:G,border:`2px solid ${G}`,padding:mobile?"12px 16px":"14px 26px",fontSize:mobile?12:13,fontFamily:"Georgia",letterSpacing:2,textTransform:"uppercase",borderRadius:4}}>Suivi commande</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:mobile?"repeat(2,1fr)":"repeat(4,1fr)",gap:mobile?16:44,marginTop:mobile?28:46,borderTop:"1px solid #3A1F00",paddingTop:22}}>
                {[["50+","Artisans"],["10+","Pays"],["100%","Éthique"],["4.9★","Clients"]].map(([v,l])=>(<div key={l}><div style={{fontSize:mobile?20:24,color:G,fontWeight:"bold"}}>{v}</div><div style={{fontSize:9,color:"#A0845C",letterSpacing:1}}>{l}</div></div>))}
              </div>
            </div>
          </div>

          <div style={{padding:mobile?"28px 14px":"50px 24px"}}>
            <div style={{textAlign:"center",marginBottom:mobile?16:34}}><div style={{fontSize:9,letterSpacing:5,color:RED,marginBottom:6}}>EXPLORER PAR UNIVERS</div><h2 style={{fontSize:mobile?22:32,color:DARK}}>Nos 5 univers</h2></div>
            <div style={{display:"grid",gridTemplateColumns:gc("repeat(5,1fr)","repeat(3,1fr)","repeat(2,1fr)"),gap:mobile?10:16}}>
              {CATEGORIES.map(cat=>(<div key={cat.key} className="hcard" onClick={()=>{setActiveCat(cat.key);goPage("boutique");setSearch("");}} style={{background:CREAM,border:"1px solid "+BORDER,borderTop:`5px solid ${cat.color}`,padding:mobile?"14px 10px":"22px 18px",cursor:"pointer",textAlign:"center",borderRadius:4}}><div style={{fontSize:mobile?24:30,marginBottom:6}}>{cat.emoji}</div><div style={{fontSize:mobile?12:14,fontWeight:"bold",color:DARK,marginBottom:3}}>{mobile?cat.label:cat.full}</div>{!mobile&&<div style={{fontSize:10,color:MUTED,lineHeight:1.5}}>{cat.desc}</div>}</div>))}
            </div>
          </div>

          <div style={{padding:mobile?"20px 14px 36px":"32px 24px 56px",background:BGALT}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:mobile?14:26,flexWrap:"wrap",gap:10}}><div><div style={{fontSize:9,letterSpacing:5,color:RED,marginBottom:5}}>COUP DE CŒUR</div><h2 style={{fontSize:mobile?22:30,color:DARK}}>Sélection</h2></div><button onClick={()=>{goPage("boutique");setActiveCat(null);setSearch("");}} style={{background:"none",border:`2px solid ${RED}`,color:RED,padding:"7px 14px",fontFamily:"Georgia",fontSize:11,borderRadius:4}}>Voir tout →</button></div>
            <div style={{display:"grid",gridTemplateColumns:gc("repeat(4,1fr)","repeat(2,1fr)","repeat(2,1fr)"),gap:mobile?10:18}}>
              {[PRODUCTS[0],PRODUCTS[3],PRODUCTS[9],PRODUCTS[12]].map(p=>(<ProductCard key={p.id} p={p} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} mobile={mobile} />))}
            </div>
          </div>

          <div style={{background:DARK,padding:mobile?"36px 16px":"64px 24px",borderTop:`3px solid ${G}`}}>
            <div style={{maxWidth:620,margin:"0 auto",textAlign:"center"}}>
              <div style={{fontSize:9,letterSpacing:5,color:G,marginBottom:12}}>NOTRE HISTOIRE</div>
              <h2 style={{fontSize:mobile?22:34,color:CREAM,lineHeight:1.3,marginBottom:18}}>Né en Afrique, construit à <span style={{color:G}}>Montréal.</span></h2>
              <p style={{fontSize:mobile?12:14,color:"#C4945C",lineHeight:1.9,marginBottom:24}}>BADAOUR relie la diaspora africaine à ses racines. Chaque achat soutient un artisan.</p>
              <div style={{display:"flex",gap:mobile?14:34,justifyContent:"center",flexWrap:"wrap"}}>{[["Commerce éthique","Juste"],["Impact direct","Familles"],["Authenticité","Zéro intermédiaire"]].map(([t,s])=>(<div key={t} style={{minWidth:90}}><div style={{width:34,height:2,background:G,margin:"0 auto 8px"}} /><div style={{color:CREAM,fontWeight:"bold",fontSize:12}}>{t}</div><div style={{color:"#A0845C",fontSize:10}}>{s}</div></div>))}</div>
            </div>
          </div>
        </>)}

        {/* BOUTIQUE */}
        {page==="boutique"&&(<div style={{padding:mobile?"24px 14px":"40px 24px"}}>
          <div style={{marginBottom:18}}><div style={{fontSize:9,letterSpacing:5,color:RED,marginBottom:4}}>BADAOUR</div><h1 style={{fontSize:mobile?24:34,color:DARK,marginBottom:12}}>Boutique</h1>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><button className="cpill" onClick={()=>setActiveCat(null)} style={{background:!activeCat?DARK:"transparent",color:!activeCat?G:DARK,border:`2px solid ${DARK}`,padding:"5px 12px",fontFamily:"Georgia",fontSize:11,borderRadius:4}}>Tout</button>{CATEGORIES.map(cat=>(<button key={cat.key} className="cpill" onClick={()=>setActiveCat(activeCat===cat.key?null:cat.key)} style={{background:activeCat===cat.key?DARK:"transparent",color:activeCat===cat.key?G:DARK,border:`2px solid ${DARK}`,padding:"5px 12px",fontFamily:"Georgia",fontSize:11,borderRadius:4}}>{cat.emoji} {mobile?cat.label:cat.full}</button>))}</div>
          </div>
          {filtered.length===0?<div style={{textAlign:"center",padding:60,color:MUTED}}><div style={{fontSize:40}}>🔍</div><div style={{marginTop:10}}>Aucun produit trouvé</div></div>
          :<div style={{display:"grid",gridTemplateColumns:gc("repeat(4,1fr)","repeat(3,1fr)","repeat(2,1fr)"),gap:mobile?10:18}}>{filtered.map(p=><ProductCard key={p.id} p={p} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} mobile={mobile} />)}</div>}
        </div>)}

        {/* ARTISANS */}
        {page==="artisans"&&(<div style={{padding:mobile?"24px 14px":"48px 24px"}}><div style={{marginBottom:mobile?16:32}}><div style={{fontSize:9,letterSpacing:5,color:RED,marginBottom:4}}>CEUX QUI CRÉENT</div><h1 style={{fontSize:mobile?24:34,color:DARK}}>Nos Artisans</h1></div>
          <div style={{display:"grid",gridTemplateColumns:gc("repeat(3,1fr)","repeat(2,1fr)","1fr"),gap:mobile?12:20}}>
            {ARTISANS.map(a=>(<div key={a.name} className="hcard" style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"16px 14px":"26px 22px",borderRadius:6}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${DARK},${BROWN})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:10}}>✂️</div>
              <div style={{fontSize:mobile?15:17,fontWeight:"bold",color:DARK}}>{a.name}</div>
              <div style={{fontSize:11,color:RED,letterSpacing:1,marginBottom:4}}>{a.craft}</div>
              <div style={{fontSize:11,color:MUTED,marginBottom:8}}>📍 {a.city}, {a.country} · {a.exp} ans</div>
              <p style={{fontSize:12,color:"#666",lineHeight:1.7}}>{a.bio}</p>
            </div>))}
          </div>
        </div>)}

        {/* SUIVI */}
        {page==="suivi"&&(<div style={{padding:mobile?"24px 14px":"48px 24px",maxWidth:800,margin:"0 auto"}}>
          <div style={{marginBottom:20}}><div style={{fontSize:9,letterSpacing:5,color:RED,marginBottom:4}}>EN TEMPS RÉEL</div><h1 style={{fontSize:mobile?24:34,color:DARK,marginBottom:6}}>Suivi commande</h1><p style={{color:MUTED,fontSize:13}}>Format : <strong>BDR-YYYY-XXXX</strong></p></div>
          <div style={{display:"flex",gap:0,marginBottom:18,flexDirection:mobile?"column":"row"}}>
            <input value={trackId} onChange={e=>setTrackId(e.target.value.toUpperCase())} onKeyDown={e=>e.key==="Enter"&&doTrack()} placeholder="Ex: BDR-2025-0042" style={{flex:1,padding:"12px 16px",background:CREAM,border:`2px solid ${DARK}`,borderRight:mobile?`2px solid ${DARK}`:"none",fontFamily:"Georgia",fontSize:14,letterSpacing:2,borderRadius:mobile?"4px 4px 0 0":"4px 0 0 4px"}} />
            <button onClick={doTrack} style={{background:DARK,color:G,border:"none",padding:"12px 24px",fontFamily:"Georgia",fontWeight:"bold",fontSize:12,letterSpacing:2,textTransform:"uppercase",borderRadius:mobile?"0 0 4px 4px":"0 4px 4px 0"}}>SUIVRE →</button>
          </div>
          {trackErr&&<div style={{background:"#FFF0F0",border:`2px solid ${RED}`,padding:"10px 14px",color:RED,marginBottom:16,fontSize:12,borderRadius:4}}>❌ {trackErr}</div>}
          {trackResult&&(<div style={{animation:"fadeUp .4s ease"}}>
            <div style={{background:DARK,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,borderRadius:"6px 6px 0 0",borderBottom:`3px solid ${G}`}}>
              <div><div style={{fontSize:8,color:"#A0845C",letterSpacing:3}}>COMMANDE</div><div style={{fontSize:mobile?14:17,color:G,fontWeight:"bold",letterSpacing:2}}>{trackResult.id}</div></div>
              <span style={{background:statusColors[trackResult.status],color:"white",padding:"4px 10px",fontSize:10,fontWeight:"bold",borderRadius:4}}>{statusLabels[trackResult.status]}</span>
            </div>
            <div style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"16px 12px":"24px 28px",borderRadius:"0 0 6px 6px"}}>
              {TRACKING_STEPS.map((step,i)=>{const ci=TRACKING_STEPS.findIndex(s=>s.key===trackResult.status);const done=i<ci,active=i===ci;const ev=trackResult.events?.find(e=>e.step===step.key);
                return (<div key={step.key} style={{display:"flex",gap:12,position:"relative"}}>{i<TRACKING_STEPS.length-1&&<div style={{position:"absolute",left:16,top:34,width:2,height:24,background:done?GREEN:BORDER,zIndex:0}} />}<div style={{width:32,height:32,borderRadius:"50%",flexShrink:0,zIndex:1,background:done?GREEN:active?G:BORDER,color:done||active?DARK:"#aaa",display:"flex",alignItems:"center",justifyContent:"center",fontSize:done?14:12,fontWeight:"bold",border:active?`3px solid ${DARK}`:"none",marginBottom:22}}>{done?"✓":step.icon}</div><div style={{paddingTop:3,paddingBottom:12}}><div style={{fontSize:12,fontWeight:active?"bold":"normal",color:done||active?DARK:"#aaa"}}>{step.label}</div>{ev&&<div style={{fontSize:10,color:"#666",marginTop:1}}>📅 {ev.date}{ev.note&&!mobile?` — ${ev.note}`:""}</div>}</div></div>);
              })}
            </div>
          </div>)}
        </div>)}

        {/* AUTH */}
        {page==="auth"&&(<div style={{padding:mobile?"24px 14px":"48px 24px",maxWidth:440,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:22}}><div style={{fontSize:22,color:G,letterSpacing:4,fontWeight:"bold"}}>BADAOUR</div><div style={{fontSize:10,color:MUTED,letterSpacing:2,marginTop:4}}>{authMode==="login"?"CONNEXION":"CRÉER UN COMPTE"}</div></div>
          <div style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"20px 16px":"30px 32px",borderRadius:6}}>
            <div style={{display:"flex",gap:0,marginBottom:18}}>{[["login","Se connecter"],["register","S'inscrire"]].map(([m,l])=>(<button key={m} onClick={()=>setAuthMode(m)} style={{flex:1,padding:"9px",fontFamily:"Georgia",fontSize:12,border:`2px solid ${DARK}`,background:authMode===m?DARK:"transparent",color:authMode===m?G:DARK,fontWeight:authMode===m?"bold":"normal",borderRadius:m==="login"?"4px 0 0 4px":"0 4px 4px 0"}}>{l}</button>))}</div>
            {authMode==="login"?(<><FInp label="Email" type="email" placeholder="votre@email.com" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})} /><FInp label="Mot de passe" type="password" placeholder="••••••" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})} /><button onClick={handleLogin} style={{width:"100%",background:DARK,color:G,border:"none",padding:"13px",fontSize:13,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,textTransform:"uppercase",borderRadius:4}}>SE CONNECTER</button><div style={{textAlign:"center",marginTop:12,fontSize:11,color:MUTED}}>Demo: demo@badaour.com / demo123</div></>)
            :(<><div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:10}}><FInp label="Prénom *" value={authForm.firstName} onChange={e=>setAuthForm({...authForm,firstName:e.target.value})} /><FInp label="Nom" value={authForm.lastName} onChange={e=>setAuthForm({...authForm,lastName:e.target.value})} /></div><FInp label="Email *" type="email" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})} /><FInp label="Mot de passe *" type="password" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})} /><FInp label="Confirmer" type="password" value={authForm.confirm} onChange={e=>setAuthForm({...authForm,confirm:e.target.value})} /><button onClick={handleRegister} style={{width:"100%",background:RED,color:G,border:"none",padding:"13px",fontSize:13,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,textTransform:"uppercase",borderRadius:4}}>CRÉER MON COMPTE</button></>)}
          </div>
        </div>)}

        {/* COMPTE */}
        {page==="compte"&&currentUser&&(<div style={{padding:mobile?"24px 14px":"44px 24px",maxWidth:880,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:22,flexDirection:mobile?"column":"row",gap:12}}>
            <div><div style={{fontSize:9,letterSpacing:5,color:RED,marginBottom:4}}>MON ESPACE</div><h1 style={{fontSize:mobile?24:32,color:DARK}}>Bonjour, {currentUser.firstName} 👋</h1></div>
            <button onClick={()=>{setCurrentUser(null);goPage("home");toast("Déconnecté","info");}} style={{background:"transparent",border:"2px solid "+BORDER,color:MUTED,padding:"8px 16px",fontFamily:"Georgia",fontSize:11,borderRadius:4,alignSelf:"flex-start"}}>Déconnexion</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:gc("repeat(3,1fr)","repeat(3,1fr)","1fr"),gap:12,marginBottom:20}}>{[["📦","Commandes",(currentUser.orders||[]).length],["❤️","Souhaits",wishlist.length],["🌍","Livraison","Afrique→CA"]].map(([e,l,v])=>(<div key={l} style={{background:CREAM,border:"1px solid "+BORDER,padding:"14px 16px",borderRadius:6}}><div style={{fontSize:20,marginBottom:4}}>{e}</div><div style={{fontSize:9,letterSpacing:2,color:MUTED,textTransform:"uppercase"}}>{l}</div><div style={{fontSize:16,fontWeight:"bold",color:DARK}}>{v}</div></div>))}</div>
          <div style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"14px":"24px 26px",borderRadius:6}}>
            <h3 style={{fontSize:15,color:DARK,marginBottom:12}}>📋 Mes commandes</h3>
            {(currentUser.orders||[]).length===0?<div style={{textAlign:"center",padding:"24px 0",color:MUTED}}>📦 Aucune commande<br/><button onClick={()=>goPage("boutique")} style={{marginTop:10,background:DARK,color:G,border:"none",padding:"8px 16px",fontFamily:"Georgia",fontSize:11,borderRadius:4}}>DÉCOUVRIR</button></div>
            :(currentUser.orders||[]).map(o=>(<div key={o.id} style={{border:"1px solid "+BORDER,padding:"10px 14px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:4,flexWrap:"wrap",gap:4}}><div><div style={{fontWeight:"bold",fontSize:13}}>{o.id}</div><div style={{fontSize:10,color:MUTED}}>{o.date}</div></div><div style={{textAlign:"right"}}><span style={{background:statusColors[o.status]||GREEN,color:"white",padding:"2px 8px",fontSize:9,fontWeight:"bold",borderRadius:10}}>{statusLabels[o.status]||o.status}</span><div style={{fontWeight:"bold",color:RED,marginTop:3,fontSize:13}}>{fmt(o.total)} $</div></div></div>))}
          </div>
        </div>)}

        {/* PANIER */}
        {page==="panier"&&(<div style={{padding:mobile?"20px 14px":"40px 24px",maxWidth:980,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:mobile?16:30,gap:0}}>
            {["cart","info","payment"].map((k,i)=>{const labels=mobile?["🛒","📍","💳"]:["Panier","Livraison","Paiement"];const cur=["cart","info","payment"].indexOf(payStep),done=i<cur,active=i===cur;return(<div key={k} style={{display:"flex",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:mobile?3:7}}><div style={{width:mobile?26:30,height:mobile?26:30,borderRadius:"50%",background:done?GREEN:active?G:BORDER,color:done||active?DARK:"#aaa",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:mobile?11:12}}>{done?"✓":labels[i]}</div>{!mobile&&<span style={{fontSize:11,color:active?DARK:"#aaa",fontWeight:active?"bold":"normal"}}>{labels[i]}</span>}</div>{i<2&&<div style={{width:mobile?20:44,height:2,background:done?GREEN:BORDER,margin:"0 6px"}} />}</div>);})}
          </div>

          {payStep==="cart"&&(<div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 260px",gap:16}}>
            <div><h2 style={{fontSize:mobile?20:24,color:DARK,marginBottom:12}}>Mon Panier</h2>
              {cart.length===0?<div style={{textAlign:"center",padding:36,background:CREAM,border:"1px solid "+BORDER,borderRadius:6}}>🛒<div style={{color:MUTED,margin:"8px 0 14px"}}>Panier vide</div><button onClick={()=>goPage("boutique")} style={{background:DARK,color:G,border:"none",padding:"10px 20px",fontFamily:"Georgia",letterSpacing:2,fontSize:11,borderRadius:4}}>DÉCOUVRIR</button></div>
              :cart.map(item=>(<div key={item.id} style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"10px":"14px 18px",marginBottom:8,display:"flex",alignItems:"center",gap:mobile?8:14,borderRadius:6,flexWrap:"wrap"}}>
                <div style={{width:40,height:40,background:`linear-gradient(135deg,${item.color||BROWN},${DARK})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,borderRadius:6}}><CatIcon category={item.category} size={24}/></div>
                <div style={{flex:1,minWidth:80}}><div style={{fontSize:13,fontWeight:"bold",color:DARK}}>{item.name}</div>{!mobile&&<div style={{fontSize:10,color:MUTED}}>✂️ {item.artisan}</div>}</div>
                <div style={{display:"flex",alignItems:"center",gap:6}}><button onClick={()=>updateQty(item.id,-1)} style={{width:28,height:28,border:"1px solid "+BORDER,background:"white",fontSize:15,borderRadius:4}}>−</button><span style={{fontSize:13,fontWeight:"bold",minWidth:18,textAlign:"center"}}>{item.qty}</span><button onClick={()=>updateQty(item.id,1)} style={{width:28,height:28,border:"1px solid "+BORDER,background:"white",fontSize:15,borderRadius:4}}>+</button></div>
                <div style={{minWidth:60,textAlign:"right"}}><div style={{fontSize:14,fontWeight:"bold",color:RED}}>{fmt(item.price*item.qty)} $</div><button onClick={()=>removeItem(item.id)} style={{background:"none",border:"none",color:MUTED,fontSize:10}}>✕</button></div>
              </div>))}
            </div>
            <CartSummary {...{subtotal,shipping,taxes,total,mobile}} onContinue={()=>{if(!cart.length){toast("Ajoutez des articles","info");return;}setPayStep("info");}} />
          </div>)}

          {payStep==="info"&&(<div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 240px",gap:16}}>
            <div><h2 style={{fontSize:mobile?20:24,color:DARK,marginBottom:12}}>Livraison</h2>
              <div style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"16px 14px":"26px 30px",borderRadius:6}}>
                <FInp label="Nom *" placeholder="Mamadou Diallo" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                <FInp label="Email *" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                <FInp label="Téléphone" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                <FInp label="Adresse *" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
                <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"2fr 1fr 1fr",gap:10}}><FInp label="Ville" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /><FInp label="Province" value={form.province} onChange={e=>setForm({...form,province:e.target.value})} /><FInp label="Code postal" value={form.postal} onChange={e=>setForm({...form,postal:e.target.value})} /></div>
                <div style={{display:"flex",gap:10,marginTop:8,flexDirection:mobile?"column-reverse":"row"}}><button onClick={()=>setPayStep("cart")} style={{flex:1,background:"transparent",color:DARK,border:"2px solid "+BORDER,padding:"11px",fontFamily:"Georgia",fontSize:12,borderRadius:4}}>← Retour</button><button onClick={()=>{if(!form.name||!form.email||!form.address){toast("Champs * requis","info");return;}setPayStep("payment");}} style={{flex:2,background:DARK,color:G,border:"none",padding:"11px",fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,fontSize:12,textTransform:"uppercase",borderRadius:4}}>Paiement →</button></div>
              </div>
            </div>
            <CartSummary {...{subtotal,shipping,taxes,total,mobile}} />
          </div>)}

          {payStep==="payment"&&(<div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 240px",gap:16}}>
            <div><h2 style={{fontSize:mobile?20:24,color:DARK,marginBottom:12}}>Paiement</h2>
              <div style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"16px 14px":"26px 30px",borderRadius:6}}>
                <div style={{display:"flex",gap:6,marginBottom:16}}>{[["card","💳 Carte"],["paypal","🅿️ PayPal"],["interac","🏦 Interac"]].map(([m,l])=>(<button key={m} onClick={()=>setPayMethod(m)} style={{flex:1,padding:"9px 4px",fontFamily:"Georgia",fontSize:mobile?10:11,background:payMethod===m?DARK:"white",color:payMethod===m?G:DARK,border:payMethod===m?`2px solid ${DARK}`:"2px solid "+BORDER,fontWeight:payMethod===m?"bold":"normal",borderRadius:4}}>{l}</button>))}</div>
                {payMethod==="card"&&(<><FInp label="Numéro" placeholder="1234 5678 9012 3456" value={cardD.number} onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();setCardD({...cardD,number:v});}} /><FInp label="Nom" placeholder="NOM COMPLET" value={cardD.name} onChange={e=>setCardD({...cardD,name:e.target.value.toUpperCase()})} /><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><FInp label="Exp." placeholder="12/27" value={cardD.expiry} onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,4);if(v.length>2)v=v.slice(0,2)+"/"+v.slice(2);setCardD({...cardD,expiry:v});}} /><FInp label="CVV" placeholder="•••" type="password" value={cardD.cvv} onChange={e=>setCardD({...cardD,cvv:e.target.value.replace(/\D/g,"").slice(0,4)})} /></div><div style={{background:"#F0FFF4",border:"1px solid "+GREEN,padding:"8px 12px",fontSize:10,color:GREEN,borderRadius:4}}>🔒 SSL 256-bit</div></>)}
                {payMethod==="paypal"&&<div style={{textAlign:"center",padding:"24px",background:"#F7F9FC",border:"1px dashed "+BORDER,borderRadius:6}}>🅿️<div style={{fontWeight:"bold",marginTop:6}}>PayPal</div><div style={{fontSize:11,color:MUTED,marginTop:4}}>Redirection PayPal</div></div>}
                {payMethod==="interac"&&<div style={{textAlign:"center",padding:"24px",background:"#FFF9F0",border:"1px dashed "+BORDER,borderRadius:6}}>🏦<div style={{fontWeight:"bold",marginTop:6}}>Interac</div><div style={{fontSize:11,color:MUTED,marginTop:4}}>{EMAIL}</div></div>}
                <div style={{display:"flex",gap:10,marginTop:16,flexDirection:mobile?"column-reverse":"row"}}><button onClick={()=>setPayStep("info")} style={{flex:1,background:"transparent",color:DARK,border:"2px solid "+BORDER,padding:"11px",fontFamily:"Georgia",fontSize:12,borderRadius:4}}>← Retour</button><button onClick={confirmOrder} style={{flex:2,background:RED,color:G,border:"none",padding:"13px",fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,fontSize:13,textTransform:"uppercase",borderRadius:4}}>🔒 {fmt(total)} $</button></div>
              </div>
            </div>
            <CartSummary {...{subtotal,shipping,taxes,total,mobile}} address={form} />
          </div>)}
        </div>)}

        {/* SUR MESURE */}
        {page==="commande"&&(<div style={{padding:mobile?"24px 14px":"48px 24px",maxWidth:700,margin:"0 auto"}}>
          <div style={{marginBottom:18}}><div style={{fontSize:9,letterSpacing:5,color:RED,marginBottom:4}}>PERSONNALISÉ</div><h1 style={{fontSize:mobile?24:34,color:DARK,marginBottom:6}}>Sur mesure</h1><p style={{color:MUTED,fontSize:13}}>Remplissez ce formulaire pour une commande personnalisée.</p></div>
          <div style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"18px 14px":"30px 34px",borderRadius:6}}>
            <FInp label="Nom complet" placeholder="Mamadou Diallo" /><FInp label="Email" type="email" placeholder={EMAIL} /><FInp label="Téléphone" type="tel" placeholder={PHONE} /><FInp label="Ville" placeholder="Montréal, QC" />
            <div style={{marginBottom:14}}><label style={{fontSize:9,letterSpacing:2,color:RED,textTransform:"uppercase",display:"block",marginBottom:4}}>Catégorie</label><select style={{width:"100%",padding:"10px 12px",background:BG,border:`2px solid ${BORDER}`,color:DARK,fontSize:14,fontFamily:"Georgia",borderRadius:4}}>{["Homme","Femme","Enfant","Art","Divers"].map(o=><option key={o}>{o}</option>)}</select></div>
            <div style={{marginBottom:14}}><label style={{fontSize:9,letterSpacing:2,color:RED,textTransform:"uppercase",display:"block",marginBottom:4}}>Détails</label><textarea placeholder="Couleurs, taille, matières..." rows={4} style={{width:"100%",padding:"10px 12px",background:BG,border:`2px solid ${BORDER}`,color:DARK,fontSize:14,fontFamily:"Georgia",resize:"vertical",borderRadius:4}} /></div>
            <div style={{marginBottom:18}}><label style={{fontSize:9,letterSpacing:2,color:RED,textTransform:"uppercase",display:"block",marginBottom:4}}>Budget</label><select style={{width:"100%",padding:"10px 12px",background:BG,border:`2px solid ${BORDER}`,color:DARK,fontSize:14,fontFamily:"Georgia",borderRadius:4}}>{["< 50 $","50–150 $","150–300 $","300–500 $","> 500 $"].map(o=><option key={o}>{o}</option>)}</select></div>
            <button onClick={()=>toast("Demande reçue ! Réponse sous 48h ✓")} style={{width:"100%",background:DARK,color:G,border:"none",padding:"14px",fontSize:12,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:3,textTransform:"uppercase",borderRadius:4}}>ENVOYER</button>
          </div>
        </div>)}
      </div>

      {/* FOOTER */}
      <footer style={{background:"#0D0500",color:"#A0845C",padding:mobile?"24px 0 12px":"40px 0 18px",borderTop:"3px solid #3A1F00",marginTop:36}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 "+px,display:"grid",gridTemplateColumns:mobile?"1fr":tablet?"1fr 1fr":"2fr 1fr 1fr 1fr",gap:mobile?18:28,marginBottom:18}}>
          <div><div style={{fontSize:18,color:G,letterSpacing:4,fontWeight:"bold",marginBottom:8}}>BADAOUR</div><p style={{fontSize:11,lineHeight:1.8,color:MUTED}}>L'Afrique à votre porte.</p><div style={{marginTop:8,fontSize:11,color:MUTED}}>📞 {PHONE}<br/>✉️ {EMAIL}</div></div>
          {!mobile&&[["Boutique",["Homme","Femme","Enfant","Art","Divers"]],["Aide",["Livraison","Retours","FAQ","Contact"]]].map(([t,links])=>(<div key={t}><div style={{color:G,fontWeight:"bold",letterSpacing:2,fontSize:9,textTransform:"uppercase",marginBottom:8}}>{t}</div>{links.map(l=><div key={l} style={{color:MUTED,fontSize:11,marginBottom:5,cursor:"pointer"}}>{l}</div>)}</div>))}
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 "+px,borderTop:"1px solid #3A1F00",paddingTop:10,display:"flex",justifyContent:"space-between",fontSize:9,flexWrap:"wrap",gap:4}}><span>© 2025 BADAOUR · Montréal</span><span style={{color:G}}>❤️ Diaspora africaine</span></div>
      </footer>
    </div>
  );
}

function ProductCard({p,addToCart,wishlist,toggleWish,mobile}) {
  const [added,setAdded] = useState(false);
  const handle = () => { addToCart(p); setAdded(true); setTimeout(()=>setAdded(false),1500); };
  return (
    <div className="hcard" style={{background:CREAM,border:"1px solid "+BORDER,overflow:"hidden",borderRadius:6}}>
      <div style={{height:mobile?120:175,background:`linear-gradient(145deg,${p.color||BROWN},${DARK})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <CatIcon category={p.category} size={mobile?40:65} />
        <div style={{position:"absolute",top:8,left:8,background:tagColors[p.tag]||"#666",color:"white",padding:"2px 7px",fontSize:8,fontWeight:"bold",borderRadius:4}}>{p.tag}</div>
        {!mobile&&<div style={{position:"absolute",top:8,right:8,background:"rgba(26,10,0,.6)",color:G,padding:"2px 7px",fontSize:8,borderRadius:4}}>🌍 {p.country}</div>}
        <button onClick={()=>toggleWish(p.id)} style={{position:"absolute",bottom:6,right:6,background:"rgba(0,0,0,.4)",border:"none",borderRadius:"50%",width:28,height:28,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{wishlist.includes(p.id)?"❤️":"🤍"}</button>
      </div>
      <div style={{padding:mobile?"8px 10px":"12px 16px"}}>
        <div style={{fontSize:8,letterSpacing:2,color:RED,textTransform:"uppercase",marginBottom:2}}>{p.sub}</div>
        <div style={{fontSize:mobile?12:14,fontWeight:"bold",color:DARK,marginBottom:2}}>{p.name}</div>
        {!mobile&&<div style={{fontSize:10,color:MUTED,fontStyle:"italic",marginBottom:2}}>✂️ {p.artisan}, {p.city}</div>}
        {!mobile&&<div style={{fontSize:10,color:"#666",marginBottom:8,lineHeight:1.5}}>{p.desc}</div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:mobile?4:0}}>
          <span style={{fontSize:mobile?14:17,fontWeight:"bold",color:RED}}>{p.price} $</span>
          <button onClick={handle} style={{background:added?GREEN:DARK,color:G,border:"none",padding:mobile?"5px 10px":"6px 14px",fontFamily:"Georgia",fontSize:mobile?9:10,letterSpacing:1,borderRadius:4}}>{added?"✓":mobile?"+":"Ajouter"}</button>
        </div>
      </div>
    </div>
  );
}

function CartSummary({subtotal,shipping,taxes,total,onContinue,address,mobile}) {
  return (
    <div style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"14px":"20px",alignSelf:"start",borderRadius:6}}>
      <h3 style={{fontSize:13,color:DARK,marginBottom:10,borderBottom:"1px solid "+BORDER,paddingBottom:8}}>Récapitulatif</h3>
      {[["Sous-total",`${fmt(subtotal)} $`],["Livraison",shipping===0?"GRATUIT ✨":`${shipping} $`],["Taxes",`${fmt(taxes)} $`]].map(([l,v])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}><span style={{color:MUTED}}>{l}</span><span>{v}</span></div>))}
      <div style={{borderTop:`2px solid ${DARK}`,paddingTop:10,marginTop:6,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:14,fontWeight:"bold"}}>Total</span><span style={{fontSize:17,fontWeight:"bold",color:RED}}>{fmt(total)} $</span></div>
      {onContinue&&<button onClick={onContinue} style={{width:"100%",background:DARK,color:G,border:"none",padding:"12px",marginTop:12,fontSize:12,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,textTransform:"uppercase",borderRadius:4}}>Continuer →</button>}
      {address?.name&&<div style={{marginTop:10,fontSize:10,color:MUTED,borderTop:"1px solid "+BORDER,paddingTop:8}}>📍 {address.name}, {address.address}</div>}
      <div style={{textAlign:"center",marginTop:6,fontSize:9,color:MUTED}}>🔒 Paiement sécurisé</div>
    </div>
  );
}
