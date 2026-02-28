import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// BADAOUR — BOUTIQUE PUBLIQUE (données persistantes)
// ═══════════════════════════════════════════════════════════════

const G = "#D4AF37", DARK = "#1A0A00", RED = "#8B1A00", CREAM = "#FFF8EE";
const BG = "#FDF6EC", BGALT = "#F5ECD9", BORDER = "#E8D5B7", MUTED = "#8B6A3E";
const GREEN = "#2E8B57", BROWN = "#3D1A00";
const PHONE = "438-988-6682", EMAIL = "service@badaour.com";

const DEFAULT_PRODUCTS = [
  {id:1,name:"Grand Boubou Brodé",category:"homme",sub:"Boubou",artisan:"Moussa Diallo",city:"Dakar",country:"Sénégal",price:189,stock:12,tag:"Bestseller",desc:"Broderie main sur bazin riche, teinture naturelle indigo.",rating:4.8,color:"#1A3A6B"},
  {id:2,name:"Dashiki Festif",category:"homme",sub:"Chemise",artisan:"Koffi Asante",city:"Accra",country:"Ghana",price:78,stock:25,tag:"Nouveau",desc:"Coton léger brodé, col en V, manches courtes.",rating:4.6,color:"#E74C3C"},
  {id:3,name:"Agbada Cérémonie",category:"homme",sub:"Tenue complète",artisan:"Adebayo Okafor",city:"Lagos",country:"Nigeria",price:245,stock:5,tag:"Premium",desc:"Ensemble 3 pièces broderie dorée.",rating:4.9,color:"#6B2FA0"},
  {id:4,name:"Robe Wax Élégance",category:"femme",sub:"Robe",artisan:"Fatoumata Koné",city:"Bamako",country:"Mali",price:134,stock:18,tag:"Bestseller",desc:"Robe droite en wax hollandais, ceinture tissée.",rating:4.7,color:"#E74C3C"},
  {id:5,name:"Ensemble Bogolan Chic",category:"femme",sub:"Ensemble",artisan:"Awa Traoré",city:"Bamako",country:"Mali",price:168,stock:8,tag:"Artisanal",desc:"Haut et jupe assortis en bogolan peint à la main.",rating:4.8,color:"#8B5E3C"},
  {id:6,name:"Kaftan Soirée Brodé",category:"femme",sub:"Kaftan",artisan:"Aïcha Diop",city:"Dakar",country:"Sénégal",price:212,stock:6,tag:"Premium",desc:"Kaftan voile de coton, broderie au fil d'or.",rating:4.9,color:"#1A1060"},
  {id:7,name:"Mini Boubou Enfant",category:"enfant",sub:"Boubou",artisan:"Moussa Diallo",city:"Dakar",country:"Sénégal",price:64,stock:30,tag:"Populaire",desc:"Version enfant. Tissu doux coton. 2 à 12 ans.",rating:4.5,color:"#27AE60"},
  {id:8,name:"Robe Wax Princesse",category:"enfant",sub:"Robe",artisan:"Koffi Mensah",city:"Lomé",country:"Togo",price:52,stock:22,tag:"Nouveau",desc:"Robe à volants en wax coloré. 3 à 10 ans.",rating:4.6,color:"#E91E8C"},
  {id:9,name:"Ensemble Kente Junior",category:"enfant",sub:"Ensemble",artisan:"Kweku Mensah",city:"Kumasi",country:"Ghana",price:89,stock:14,tag:"Premium",desc:"Ensemble kente tissé main. 4 à 14 ans.",rating:4.7,color:"#F4A300"},
  {id:10,name:"Masque Baoulé Ancien",category:"art",sub:"Masque",artisan:"Cheikh Ndiaye",city:"Thiès",country:"Sénégal",price:320,stock:3,tag:"Unique",desc:"Masque Goli sculpté, bois de venn.",rating:5.0,color:"#6B2800"},
  {id:11,name:"Sculpture Baobab",category:"art",sub:"Sculpture",artisan:"Cheikh Ndiaye",city:"Thiès",country:"Sénégal",price:275,stock:4,tag:"Artisanal",desc:"Baobab sculpté ébène, base laiton.",rating:4.9,color:"#4A2800"},
  {id:12,name:"Tableau Toile d'Afrique",category:"art",sub:"Tableau",artisan:"Ibrahima Sow",city:"Dakar",country:"Sénégal",price:195,stock:7,tag:"Nouveau",desc:"Peinture acrylique sur toile, thème village.",rating:4.7,color:"#E67E22"},
  {id:13,name:"Collier Krobo Perles",category:"divers",sub:"Bijou",artisan:"Abena Asante",city:"Accra",country:"Ghana",price:86,stock:20,tag:"Populaire",desc:"Perles Krobo faites à la flamme.",rating:4.6,color:"#D4AF37"},
  {id:14,name:"Sac Bogolan Cuir",category:"divers",sub:"Sac",artisan:"Fatoumata Koné",city:"Bamako",country:"Mali",price:112,stock:11,tag:"Artisanal",desc:"Sac bogolan, cuir tannage végétal.",rating:4.8,color:"#8B5E3C"},
  {id:15,name:"Huile de Karité Pure",category:"divers",sub:"Beauté",artisan:"Mariam Ouédraogo",city:"Ouaga",country:"Burkina Faso",price:34,stock:45,tag:"Bio",desc:"Karité brut non raffiné. 200ml.",rating:4.4,color:"#E8D5A0"},
  {id:16,name:"Tissu Wax 6 yards",category:"divers",sub:"Tissu",artisan:"Koffi Mensah",city:"Lomé",country:"Togo",price:58,stock:35,tag:"Populaire",desc:"Wax hollandais double face. 6 yards.",rating:4.5,color:"#E74C3C"},
];

const CATEGORIES = [
  {key:"homme",label:"Homme",full:"Habillement Homme",emoji:"👘",color:"#1A3A6B",desc:"Boubous, dashikis, agbadas"},
  {key:"femme",label:"Femme",full:"Habillement Femme",emoji:"👗",color:"#8B1A00",desc:"Robes wax, kaftans, bogolan"},
  {key:"enfant",label:"Enfant",full:"Habillement Enfant",emoji:"🧒",color:"#27AE60",desc:"Boubous, robes, ensembles"},
  {key:"art",label:"Art",full:"Oeuvres d'Art",emoji:"🏺",color:"#6A0572",desc:"Sculptures, masques, tableaux"},
  {key:"divers",label:"Divers",full:"Divers & Accessoires",emoji:"✨",color:"#D4AF37",desc:"Bijoux, sacs, tissus, beauté"},
];

const ARTISANS = [
  {name:"Moussa Diallo",craft:"Tailleur brodeur",city:"Dakar",country:"Sénégal",exp:23,bio:"Formé par son père, Moussa perpétue l'art du grand boubou."},
  {name:"Fatoumata Koné",craft:"Artisane bogolan",city:"Bamako",country:"Mali",exp:18,bio:"Ressuscite les motifs anciens du bogolan peint à la boue."},
  {name:"Abena Asante",craft:"Perlière Krobo",city:"Accra",country:"Ghana",exp:15,bio:"Dirige une coopérative de 12 femmes artisanes."},
  {name:"Cheikh Ndiaye",craft:"Sculpteur sur bois",city:"Thiès",country:"Sénégal",exp:30,bio:"Maître sculpteur, pièces uniques en bois de venn."},
  {name:"Kweku Mensah",craft:"Tisserand kente",city:"Kumasi",country:"Ghana",exp:25,bio:"Gardien de la tradition kente du peuple Ashanti."},
  {name:"Aïcha Diop",craft:"Couturière haute couture",city:"Dakar",country:"Sénégal",exp:20,bio:"Allie couture traditionnelle et tendances contemporaines."},
  {name:"Koffi Mensah",craft:"Tisserand / Tailleur",city:"Lomé",country:"Togo",exp:12,bio:"Spécialiste wax et couture enfant."},
  {name:"Mariam Ouédraogo",craft:"Productrice karité",city:"Ouaga",country:"Burkina Faso",exp:10,bio:"Coopérative de femmes, karité 100% bio."},
];

const TRACKING_STEPS = [
  {key:"confirmed",label:"Commande confirmée",icon:"✅",desc:"Reçue et validée"},
  {key:"preparation",label:"En préparation",icon:"🧵",desc:"L'artisan prépare"},
  {key:"shipped",label:"Expédiée",icon:"📦",desc:"Colis parti"},
  {key:"transit",label:"En transit",icon:"✈️",desc:"Vol Afrique → Canada"},
  {key:"customs",label:"Dédouanement",icon:"🛃",desc:"Douanes canadiennes"},
  {key:"delivery",label:"En livraison",icon:"🚚",desc:"En route chez vous"},
  {key:"delivered",label:"Livré !",icon:"🎉",desc:"Colis livré"},
];

const tagColors = {Bestseller:G,Nouveau:GREEN,Artisanal:"#8B4513",Populaire:"#C0392B",Unique:"#6A0572",Bio:"#228B22",Premium:"#1A3A6B"};
const statusLabels = {confirmed:"Confirmée",preparation:"Préparation",shipped:"Expédiée",transit:"En transit ✈️",customs:"Dédouanement",delivery:"En livraison",delivered:"Livré ✓"};
const fmt = v => Number(v).toFixed(2);

function useScreen(){const[w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);return{w,mobile:w<768,tablet:w>=768&&w<1024,desktop:w>=1024};}

// ─── STORAGE HELPERS ───
async function loadData(key, fallback) {
  try {
    const r = await window.storage.get("badaour:" + key, true);
    return r ? JSON.parse(r.value) : fallback;
  } catch { return fallback; }
}
async function saveData(key, value) {
  try { await window.storage.set("badaour:" + key, JSON.stringify(value), true); } catch(e) { console.warn("Storage save error", e); }
}

// ─── PRODUCT CARD ───
function ProductCard({p, addToCart, wishlist, toggleWish, mobile}) {
  const [added, setAdded] = useState(false);
  const outOfStock = p.stock <= 0;
  const handle = () => { if(outOfStock) return; addToCart(p); setAdded(true); setTimeout(()=>setAdded(false),1500); };
  return (
    <div className="hcard" style={{background:CREAM,border:"1px solid "+BORDER,overflow:"hidden",borderRadius:8,opacity:outOfStock?.6:1}}>
      <div style={{height:mobile?130:175,background:`linear-gradient(145deg,${p.color||BROWN},${DARK})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <div style={{fontSize:mobile?36:52,opacity:.8}}>{CATEGORIES.find(c=>c.key===p.category)?.emoji||"✨"}</div>
        <div style={{position:"absolute",top:8,left:8,background:tagColors[p.tag]||"#666",color:"white",padding:"3px 8px",fontSize:9,fontWeight:"bold",borderRadius:4,letterSpacing:.5}}>{p.tag}</div>
        {!mobile&&<div style={{position:"absolute",top:8,right:8,background:"rgba(26,10,0,.6)",color:G,padding:"3px 8px",fontSize:9,borderRadius:4}}>🌍 {p.country}</div>}
        {outOfStock&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.4)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{background:RED,color:"white",padding:"6px 14px",fontSize:12,fontWeight:"bold",borderRadius:4}}>Épuisé</span></div>}
        <button onClick={()=>toggleWish(p.id)} style={{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,.45)",border:"none",borderRadius:"50%",width:30,height:30,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{wishlist.includes(p.id)?"❤️":"🤍"}</button>
      </div>
      <div style={{padding:mobile?"10px 12px":"14px 16px"}}>
        <div style={{fontSize:9,letterSpacing:2,color:RED,textTransform:"uppercase",marginBottom:3}}>{p.sub}</div>
        <div style={{fontSize:mobile?13:15,fontWeight:"bold",color:DARK,marginBottom:3,lineHeight:1.3}}>{p.name}</div>
        {!mobile&&<div style={{fontSize:11,color:MUTED,fontStyle:"italic",marginBottom:3}}>✂️ {p.artisan}, {p.city}</div>}
        {!mobile&&<div style={{fontSize:11,color:"#666",marginBottom:8,lineHeight:1.5}}>{p.desc}</div>}
        <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:mobile?6:8}}>{"★".repeat(Math.floor(p.rating)).split("").map((_,i)=><span key={i} style={{color:G,fontSize:11}}>★</span>)}<span style={{fontSize:10,color:MUTED}}>{p.rating}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:mobile?16:19,fontWeight:"bold",color:RED}}>{p.price} $</span>
          <button onClick={handle} disabled={outOfStock} style={{background:added?GREEN:outOfStock?"#999":DARK,color:added?"white":G,border:"none",padding:mobile?"7px 12px":"8px 16px",fontFamily:"Georgia",fontSize:mobile?10:11,letterSpacing:1,borderRadius:4,cursor:outOfStock?"not-allowed":"pointer"}}>{added?"✓ Ajouté":outOfStock?"Épuisé":mobile?"+ Panier":"Ajouter au panier"}</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function BADAOURPublic() {
  const scr = useScreen();
  const {mobile, tablet} = scr;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState("home");
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notif, setNotif] = useState(null);
  const [payStep, setPayStep] = useState("cart");
  const [form, setForm] = useState({name:"",email:"",phone:"",address:"",city:"Montréal",province:"QC",postal:""});
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackErr, setTrackErr] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const toast = (msg,type="success") => {setNotif({msg,type});setTimeout(()=>setNotif(null),3000);};
  const goPage = p => {setPage(p);setMenuOpen(false);window.scrollTo(0,0);};

  // ─── LOAD DATA FROM STORAGE ───
  useEffect(()=>{
    (async()=>{
      const p = await loadData("products", DEFAULT_PRODUCTS);
      const o = await loadData("orders", []);
      setProducts(p);
      setOrders(o);
      // Initialize default products if first time
      if(!p || p.length === 0) {
        await saveData("products", DEFAULT_PRODUCTS);
        setProducts(DEFAULT_PRODUCTS);
      }
      setLoading(false);
    })();
  },[]);

  const addToCart = p => {setCart(c=>{const ex=c.find(i=>i.id===p.id);return ex?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}];});toast(`${p.name} ajouté au panier`);};
  const updateQty = (id,d) => setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeItem = id => setCart(c=>c.filter(i=>i.id!==id));
  const toggleWish = id => setWishlist(w=>w.includes(id)?w.filter(i=>i!==id):[...w,id]);

  const cartQty = cart.reduce((s,i)=>s+i.qty,0);
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const shipping = cart.length?(subtotal>200?0:18):0;
  const taxes = +((subtotal+shipping)*0.14975).toFixed(2);
  const total = +(subtotal+shipping+taxes).toFixed(2);

  const filtered = products.filter(p=>{
    const mc = activeCat?p.category===activeCat:true;
    const q = search.toLowerCase();
    const mq = !q||p.name.toLowerCase().includes(q)||p.artisan.toLowerCase().includes(q)||p.country.toLowerCase().includes(q);
    return mc&&mq;
  });

  const doTrack = () => {
    if(!trackId.trim()){setTrackErr("Entrez un numéro de commande");return;}
    const o = orders.find(o=>o.id===trackId.trim());
    if(o){setTrackResult(o);setTrackErr("");}else{setTrackResult(null);setTrackErr("Commande introuvable. Vérifiez le numéro (ex: BDR-2025-XXXX)");}
  };

  const confirmOrder = async () => {
    if(!form.name||!form.email||!form.address){toast("Veuillez remplir les champs obligatoires","info");return;}
    const oid = "BDR-"+new Date().getFullYear()+"-"+String(Math.floor(Math.random()*9000)+1000);
    const newOrder = {
      id:oid,
      date:new Date().toISOString().slice(0,10),
      status:"confirmed",
      customer:form.name,
      email:form.email,
      phone:form.phone,
      address:form.address+", "+form.city+", "+form.province+" "+form.postal,
      items:cart.map(i=>({pid:i.id,name:i.name,qty:i.qty,price:i.price})),
      total,
      shipping,
      payMethod:"Carte",
      events:[{step:"confirmed",date:new Date().toLocaleDateString("fr-CA",{day:"numeric",month:"short"})}]
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    await saveData("orders", updatedOrders);
    // Decrease stock
    const updatedProducts = products.map(p=>{const ci=cart.find(c=>c.id===p.id);return ci?{...p,stock:Math.max(0,p.stock-ci.qty)}:p;});
    setProducts(updatedProducts);
    await saveData("products", updatedProducts);
    toast(`Commande ${oid} confirmée ! Merci !`);
    setCart([]);setPayStep("cart");setForm({name:"",email:"",phone:"",address:"",city:"Montréal",province:"QC",postal:""});goPage("home");
  };

  const navItems = [{k:"home",l:"Accueil"},{k:"boutique",l:"Boutique"},{k:"artisans",l:"Artisans"},{k:"suivi",l:"Suivi"},{k:"commande",l:"Sur mesure"}];
  const gc = (d,t,m) => mobile?m:tablet?t:d;
  const FInp = ({label,...props}) => (<div style={{marginBottom:16}}>{label&&<label style={{display:"block",fontSize:10,letterSpacing:2,color:RED,textTransform:"uppercase",marginBottom:5,fontFamily:"Georgia",fontWeight:"bold"}}>{label}</label>}<input {...props} style={{width:"100%",padding:"12px 14px",background:"white",border:`2px solid ${BORDER}`,color:DARK,fontSize:14,fontFamily:"Georgia",borderRadius:6,...(props.style||{})}} /></div>);

  if(loading) return (
    <div style={{fontFamily:"Georgia",background:DARK,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <div style={{fontSize:36,fontWeight:"bold",color:G,letterSpacing:8}}>BADAOUR</div>
      <div style={{fontSize:12,color:"#A0845C",letterSpacing:3}}>Chargement de la boutique...</div>
      <div style={{width:40,height:40,border:`3px solid ${G}33`,borderTopColor:G,borderRadius:"50%",animation:"spin 1s linear infinite"}} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{fontFamily:"'Georgia','Times New Roman',serif",background:BG,minHeight:"100vh",color:DARK,overflowX:"hidden"}}>
      <style>{`
        @keyframes fadeSlide{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0;}
        input:focus,textarea:focus,select:focus{border-color:${G}!important;outline:none;}
        .hcard{transition:transform .25s ease,box-shadow .25s ease;} .hcard:hover{transform:translateY(-4px);box-shadow:0 14px 36px rgba(26,10,0,.12);}
        button{transition:opacity .15s,background .2s,transform .1s;cursor:pointer;} button:active:not(:disabled){transform:scale(.97);}
        body{overflow-x:hidden;-webkit-tap-highlight-color:transparent;}
      `}</style>

      {/* NOTIFICATION */}
      {notif&&<div style={{position:"fixed",top:14,left:mobile?14:"auto",right:14,zIndex:99999,background:notif.type==="info"?"#1A5276":GREEN,color:"white",padding:"14px 20px",borderRadius:8,fontSize:13,fontFamily:"Georgia",boxShadow:"0 8px 32px rgba(0,0,0,.3)",animation:"fadeSlide .3s ease",maxWidth:400}}>{notif.msg}</div>}

      {/* ═══ HEADER ═══ */}
      <header style={{background:DARK,borderBottom:`3px solid ${G}`,position:"sticky",top:0,zIndex:100}}>
        {!mobile&&<div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #3A1F00",padding:"5px 0",fontSize:10,color:G,letterSpacing:1}}>
          <span>🌍 Livraison Afrique → Canada · 14–21 jours</span>
          {!tablet&&<span>Commerce éthique · Artisanat authentique · Impact direct</span>}
          <span>📞 {PHONE}</span>
        </div></div>}
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 "+(mobile?"14px":"24px")}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:mobile?"10px 0":"14px 0",gap:10}}>
            <div onClick={()=>goPage("home")} style={{cursor:"pointer",flexShrink:0}}>
              <div style={{fontSize:mobile?22:28,fontWeight:"bold",color:G,letterSpacing:mobile?4:7}}>BADAOUR</div>
              {!mobile&&<div style={{fontSize:8,color:"#A0845C",letterSpacing:3,marginTop:-2}}>L'AFRIQUE À VOTRE PORTE</div>}
            </div>
            {!mobile&&<div style={{flex:1,maxWidth:320,margin:"0 16px",position:"relative"}}>
              <input value={search} onChange={e=>{setSearch(e.target.value);if(e.target.value){goPage("boutique");setActiveCat(null);}}} placeholder="Rechercher un produit, artisan..." style={{width:"100%",padding:"10px 14px 10px 34px",background:"#2A1000",border:`1px solid ${G}33`,borderRadius:6,color:CREAM,fontSize:13,fontFamily:"Georgia"}} />
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13,opacity:.6}}>🔍</span>
            </div>}
            {!mobile&&!tablet&&<nav style={{display:"flex",gap:6,alignItems:"center"}}>{navItems.map(({k,l})=>(<button key={k} onClick={()=>goPage(k)} style={{background:"none",border:"none",color:page===k?G:"#A0845C",fontSize:12,letterSpacing:1,fontFamily:"Georgia",borderBottom:page===k?`2px solid ${G}`:"2px solid transparent",padding:"6px 8px"}}>{l}</button>))}</nav>}
            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              <button onClick={()=>{setPayStep("cart");goPage("panier");}} style={{background:G,border:"none",borderRadius:6,padding:mobile?"8px 12px":"8px 16px",color:DARK,fontFamily:"Georgia",fontSize:13,fontWeight:"bold",position:"relative"}}>🛒{!mobile&&" Panier"}{cartQty>0&&<span style={{position:"absolute",top:-7,right:-7,background:"#C0392B",color:"white",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:"bold"}}>{cartQty}</span>}</button>
              {(mobile||tablet)&&<button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"1px solid #3A1F00",borderRadius:6,padding:"7px 10px",color:G,fontSize:18}}>{menuOpen?"✕":"☰"}</button>}
            </div>
          </div>
        </div>
        {(mobile||tablet)&&menuOpen&&<div style={{background:"#1A0800",borderTop:`1px solid ${G}33`,padding:"10px "+(mobile?"14px":"24px")}}>{navItems.map(({k,l})=>(<button key={k} onClick={()=>goPage(k)} style={{display:"block",width:"100%",textAlign:"left",background:page===k?"#2A1000":"transparent",border:"none",color:page===k?G:"#A0845C",fontSize:15,fontFamily:"Georgia",padding:"12px 16px",borderLeft:page===k?`3px solid ${G}`:"3px solid transparent",marginBottom:3,borderRadius:4}}>{l}</button>))}</div>}
      </header>

      <div style={{maxWidth:1200,margin:"0 auto"}}>

        {/* ═══ HOME ═══ */}
        {page==="home"&&(<>
          <div style={{background:`linear-gradient(135deg,${DARK},${BROWN},${DARK})`,padding:mobile?"44px 16px":tablet?"56px 24px":"80px 24px",borderBottom:`4px solid ${G}`,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,right:0,width:300,height:300,background:`radial-gradient(circle,${G}08,transparent)`,borderRadius:"50%"}} />
            <div style={{maxWidth:580,position:"relative",animation:"fadeUp .6s ease"}}>
              <div style={{fontSize:10,letterSpacing:5,color:G,marginBottom:16,borderLeft:`3px solid ${G}`,paddingLeft:14}}>ARTISANAT AFRICAIN AUTHENTIQUE · MONTRÉAL</div>
              <h1 style={{fontSize:mobile?30:tablet?42:54,fontWeight:"bold",color:CREAM,lineHeight:1.1,marginBottom:18}}>L'âme de l'Afrique,<br/><span style={{color:G}}>livrée chez vous.</span></h1>
              <p style={{fontSize:mobile?14:16,color:"#C4945C",lineHeight:1.9,maxWidth:460,marginBottom:28}}>Habillement traditionnel, oeuvres d'art et produits africains. Du tailleur directement à votre porte.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button onClick={()=>goPage("boutique")} style={{background:G,color:DARK,border:"none",padding:"14px 30px",fontSize:13,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,textTransform:"uppercase",borderRadius:6}}>Découvrir la boutique</button>
                <button onClick={()=>goPage("suivi")} style={{background:"transparent",color:G,border:`2px solid ${G}`,padding:"14px 24px",fontSize:13,fontFamily:"Georgia",letterSpacing:2,textTransform:"uppercase",borderRadius:6}}>Suivre ma commande</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:mobile?"repeat(2,1fr)":"repeat(4,1fr)",gap:mobile?18:48,marginTop:mobile?32:52,borderTop:"1px solid #3A1F00",paddingTop:24}}>
                {[["50+","Artisans"],["10+","Pays"],["100%","Éthique"],["4.9★","Satisfaction"]].map(([v,l])=>(<div key={l}><div style={{fontSize:mobile?22:26,color:G,fontWeight:"bold"}}>{v}</div><div style={{fontSize:10,color:"#A0845C",letterSpacing:1}}>{l}</div></div>))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div style={{padding:mobile?"28px 14px":"52px 24px"}}>
            <div style={{textAlign:"center",marginBottom:mobile?18:36}}><div style={{fontSize:10,letterSpacing:5,color:RED,marginBottom:8}}>EXPLORER PAR UNIVERS</div><h2 style={{fontSize:mobile?24:34,color:DARK}}>Nos 5 univers</h2></div>
            <div style={{display:"grid",gridTemplateColumns:gc("repeat(5,1fr)","repeat(3,1fr)","repeat(2,1fr)"),gap:mobile?10:18}}>
              {CATEGORIES.map(cat=>(<div key={cat.key} className="hcard" onClick={()=>{setActiveCat(cat.key);goPage("boutique");setSearch("");}} style={{background:CREAM,border:"1px solid "+BORDER,borderTop:`5px solid ${cat.color}`,padding:mobile?"16px 12px":"24px 20px",cursor:"pointer",textAlign:"center",borderRadius:6}}><div style={{fontSize:mobile?28:36,marginBottom:8}}>{cat.emoji}</div><div style={{fontSize:mobile?13:15,fontWeight:"bold",color:DARK,marginBottom:4}}>{mobile?cat.label:cat.full}</div>{!mobile&&<div style={{fontSize:11,color:MUTED,lineHeight:1.5}}>{cat.desc}</div>}</div>))}
            </div>
          </div>

          {/* Featured */}
          <div style={{padding:mobile?"20px 14px 40px":"36px 24px 60px",background:BGALT}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:mobile?16:28,flexWrap:"wrap",gap:10}}><div><div style={{fontSize:10,letterSpacing:5,color:RED,marginBottom:6}}>COUP DE CŒUR</div><h2 style={{fontSize:mobile?24:32,color:DARK}}>Sélection du moment</h2></div><button onClick={()=>{goPage("boutique");setActiveCat(null);setSearch("");}} style={{background:"none",border:`2px solid ${RED}`,color:RED,padding:"8px 16px",fontFamily:"Georgia",fontSize:12,borderRadius:6}}>Voir tout →</button></div>
            <div style={{display:"grid",gridTemplateColumns:gc("repeat(4,1fr)","repeat(2,1fr)","repeat(2,1fr)"),gap:mobile?10:18}}>
              {[products[0],products[3],products[9],products[12]].filter(Boolean).map(p=>(<ProductCard key={p.id} p={p} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} mobile={mobile} />))}
            </div>
          </div>

          {/* Story */}
          <div style={{background:DARK,padding:mobile?"40px 16px":"68px 24px",borderTop:`3px solid ${G}`}}>
            <div style={{maxWidth:640,margin:"0 auto",textAlign:"center"}}>
              <div style={{fontSize:10,letterSpacing:5,color:G,marginBottom:14}}>NOTRE MISSION</div>
              <h2 style={{fontSize:mobile?24:38,color:CREAM,lineHeight:1.3,marginBottom:20}}>Né en Afrique, bâti à <span style={{color:G}}>Montréal.</span></h2>
              <p style={{fontSize:mobile?13:15,color:"#C4945C",lineHeight:1.9,marginBottom:28}}>BADAOUR relie la diaspora africaine à ses racines. Chaque produit est fabriqué à la main par un artisan que nous connaissons personnellement. Zéro intermédiaire, impact direct.</p>
              <div style={{display:"flex",gap:mobile?16:40,justifyContent:"center",flexWrap:"wrap"}}>{[["Commerce éthique","Rémunération juste"],["Impact direct","Soutien aux familles"],["Authenticité","100% artisanal"]].map(([t,s])=>(<div key={t} style={{minWidth:100}}><div style={{width:36,height:2,background:G,margin:"0 auto 10px"}} /><div style={{color:CREAM,fontWeight:"bold",fontSize:13}}>{t}</div><div style={{color:"#A0845C",fontSize:11}}>{s}</div></div>))}</div>
            </div>
          </div>
        </>)}

        {/* ═══ BOUTIQUE ═══ */}
        {page==="boutique"&&(<div style={{padding:mobile?"24px 14px":"44px 24px"}}>
          <div style={{marginBottom:20}}><div style={{fontSize:10,letterSpacing:5,color:RED,marginBottom:5}}>BADAOUR</div><h1 style={{fontSize:mobile?26:36,color:DARK,marginBottom:14}}>Notre Boutique</h1>
            {mobile&&<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Rechercher..." style={{width:"100%",padding:"10px 14px",background:"white",border:`2px solid ${BORDER}`,borderRadius:6,fontSize:14,fontFamily:"Georgia",marginBottom:12}} />}
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <button onClick={()=>setActiveCat(null)} style={{background:!activeCat?DARK:"transparent",color:!activeCat?G:DARK,border:`2px solid ${DARK}`,padding:"6px 14px",fontFamily:"Georgia",fontSize:12,borderRadius:6}}>Tout ({products.length})</button>
              {CATEGORIES.map(cat=>{const count=products.filter(p=>p.category===cat.key).length;return(<button key={cat.key} onClick={()=>setActiveCat(activeCat===cat.key?null:cat.key)} style={{background:activeCat===cat.key?DARK:"transparent",color:activeCat===cat.key?G:DARK,border:`2px solid ${DARK}`,padding:"6px 14px",fontFamily:"Georgia",fontSize:12,borderRadius:6}}>{cat.emoji} {cat.label} ({count})</button>);})}
            </div>
          </div>
          {filtered.length===0?<div style={{textAlign:"center",padding:80,color:MUTED}}><div style={{fontSize:48}}>🔍</div><div style={{marginTop:12,fontSize:16}}>Aucun produit trouvé</div></div>
          :<div style={{display:"grid",gridTemplateColumns:gc("repeat(4,1fr)","repeat(3,1fr)","repeat(2,1fr)"),gap:mobile?10:18}}>{filtered.map(p=><ProductCard key={p.id} p={p} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} mobile={mobile} />)}</div>}
        </div>)}

        {/* ═══ ARTISANS ═══ */}
        {page==="artisans"&&(<div style={{padding:mobile?"24px 14px":"48px 24px",animation:"fadeUp .4s ease"}}>
          <div style={{marginBottom:mobile?18:34}}><div style={{fontSize:10,letterSpacing:5,color:RED,marginBottom:5}}>LES MAINS QUI CRÉENT</div><h1 style={{fontSize:mobile?26:36,color:DARK}}>Nos Artisans</h1><p style={{color:MUTED,marginTop:6,fontSize:14}}>Chaque produit est fabriqué par un artisan que nous connaissons personnellement.</p></div>
          <div style={{display:"grid",gridTemplateColumns:gc("repeat(3,1fr)","repeat(2,1fr)","1fr"),gap:mobile?12:20}}>
            {ARTISANS.map(a=>(<div key={a.name} className="hcard" style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"18px 16px":"28px 24px",borderRadius:8}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:`linear-gradient(135deg,${BROWN},${DARK})`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><span style={{fontSize:24}}>✂️</span></div>
              <div style={{fontSize:17,fontWeight:"bold",color:DARK,marginBottom:2}}>{a.name}</div>
              <div style={{fontSize:12,color:RED,fontWeight:"bold",marginBottom:4}}>{a.craft}</div>
              <div style={{fontSize:11,color:MUTED,marginBottom:8}}>📍 {a.city}, {a.country} · {a.exp} ans d'expérience</div>
              <div style={{fontSize:12,color:"#555",lineHeight:1.7,fontStyle:"italic"}}>"{a.bio}"</div>
            </div>))}
          </div>
        </div>)}

        {/* ═══ SUIVI ═══ */}
        {page==="suivi"&&(<div style={{padding:mobile?"24px 14px":"48px 24px",maxWidth:700,margin:"0 auto",animation:"fadeUp .4s ease"}}>
          <div style={{marginBottom:20}}><div style={{fontSize:10,letterSpacing:5,color:RED,marginBottom:5}}>SUIVI</div><h1 style={{fontSize:mobile?26:36,color:DARK,marginBottom:6}}>Suivre ma commande</h1><p style={{color:MUTED,fontSize:14}}>Entrez votre numéro de commande pour voir son statut.</p></div>
          <div style={{display:"flex",gap:10,marginBottom:20}}>
            <input value={trackId} onChange={e=>setTrackId(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doTrack()} placeholder="BDR-2025-XXXX" style={{flex:1,padding:"14px 16px",background:"white",border:`2px solid ${BORDER}`,fontSize:15,fontFamily:"Georgia",borderRadius:6}} />
            <button onClick={doTrack} style={{background:DARK,color:G,border:"none",padding:"14px 24px",fontFamily:"Georgia",fontSize:13,fontWeight:"bold",letterSpacing:1,borderRadius:6}}>Rechercher</button>
          </div>
          {trackErr&&<div style={{background:"#FFF3F3",border:"1px solid #E74C3C",padding:"14px 18px",borderRadius:8,color:"#C0392B",fontSize:13,marginBottom:16}}>⚠️ {trackErr}</div>}
          {trackResult&&(<div style={{background:CREAM,border:`2px solid ${G}`,borderRadius:10,padding:mobile?"18px":"28px",animation:"fadeUp .3s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:8}}>
              <div><div style={{fontSize:18,fontWeight:"bold",color:DARK}}>{trackResult.id}</div><div style={{fontSize:12,color:MUTED}}>{trackResult.customer} · {trackResult.date}</div></div>
              <div style={{background:GREEN+"22",color:GREEN,padding:"6px 14px",borderRadius:6,fontWeight:"bold",fontSize:12}}>{statusLabels[trackResult.status]||trackResult.status}</div>
            </div>
            <div style={{position:"relative",paddingLeft:24}}>
              {TRACKING_STEPS.map((step,i)=>{const done=(trackResult.events||[]).some(e=>e.step===step.key);const isLast=i===TRACKING_STEPS.length-1;return(
                <div key={step.key} style={{display:"flex",gap:14,marginBottom:isLast?0:20,position:"relative"}}>
                  {!isLast&&<div style={{position:"absolute",left:12,top:28,width:2,height:"calc(100% - 4px)",background:done?G:BORDER}} />}
                  <div style={{width:26,height:26,borderRadius:"50%",background:done?G:"white",border:done?"none":`2px solid ${BORDER}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0,zIndex:1}}>{done?step.icon:"○"}</div>
                  <div style={{paddingTop:2}}><div style={{fontSize:13,fontWeight:done?"bold":"normal",color:done?DARK:MUTED}}>{step.label}</div><div style={{fontSize:11,color:MUTED}}>{step.desc}{(trackResult.events||[]).find(e=>e.step===step.key)?.note&&` · ${(trackResult.events||[]).find(e=>e.step===step.key).note}`}</div></div>
                </div>
              );})}
            </div>
            <div style={{marginTop:20,borderTop:`1px solid ${BORDER}`,paddingTop:14,textAlign:"right"}}><div style={{fontSize:20,fontWeight:"bold",color:RED}}>Total : {fmt(trackResult.total)} $</div></div>
          </div>)}
        </div>)}

        {/* ═══ PANIER ═══ */}
        {page==="panier"&&(<div style={{padding:mobile?"24px 14px":"48px 24px",animation:"fadeUp .4s ease"}}>
          <div style={{marginBottom:20}}><div style={{fontSize:10,letterSpacing:5,color:RED,marginBottom:5}}>VOTRE SÉLECTION</div><h1 style={{fontSize:mobile?26:36,color:DARK}}>{payStep==="cart"?"Mon Panier":payStep==="info"?"Informations":"Confirmation"}</h1></div>

          {payStep==="cart"&&(<>
            {cart.length===0?<div style={{textAlign:"center",padding:60,color:MUTED}}><div style={{fontSize:52}}>🛒</div><div style={{marginTop:12,fontSize:16}}>Votre panier est vide</div><button onClick={()=>goPage("boutique")} style={{marginTop:16,background:DARK,color:G,border:"none",padding:"12px 24px",fontFamily:"Georgia",fontSize:13,borderRadius:6}}>Découvrir la boutique</button></div>
            :<div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"2fr 1fr",gap:20}}>
              <div>{cart.map(item=>(<div key={item.id} style={{display:"flex",gap:14,padding:"16px",background:CREAM,border:"1px solid "+BORDER,borderRadius:8,marginBottom:10}}>
                <div style={{width:70,height:70,borderRadius:6,background:`linear-gradient(145deg,${item.color||BROWN},${DARK})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:28}}>{CATEGORIES.find(c=>c.key===item.category)?.emoji||"✨"}</span></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:"bold",color:DARK}}>{item.name}</div>
                  <div style={{fontSize:11,color:MUTED}}>✂️ {item.artisan}</div>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
                    <button onClick={()=>updateQty(item.id,-1)} style={{width:28,height:28,background:"white",border:"1px solid "+BORDER,borderRadius:4,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontWeight:"bold",fontSize:14}}>{item.qty}</span>
                    <button onClick={()=>updateQty(item.id,1)} style={{width:28,height:28,background:"white",border:"1px solid "+BORDER,borderRadius:4,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    <span style={{flex:1}} />
                    <span style={{fontSize:16,fontWeight:"bold",color:RED}}>{fmt(item.price*item.qty)} $</span>
                    <button onClick={()=>removeItem(item.id)} style={{background:"none",border:"none",fontSize:16,color:"#999"}}>✕</button>
                  </div>
                </div>
              </div>))}</div>
              <div style={{background:CREAM,border:"1px solid "+BORDER,padding:"20px",borderRadius:8,alignSelf:"start"}}>
                <h3 style={{fontSize:14,color:DARK,marginBottom:12,borderBottom:"1px solid "+BORDER,paddingBottom:8}}>Récapitulatif</h3>
                {[["Sous-total",`${fmt(subtotal)} $`],["Livraison",shipping===0?"GRATUIT ✨":`${shipping} $`],["Taxes (14.975%)",`${fmt(taxes)} $`]].map(([l,v])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}><span style={{color:MUTED}}>{l}</span><span>{v}</span></div>))}
                <div style={{borderTop:`2px solid ${DARK}`,paddingTop:12,marginTop:8,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:15,fontWeight:"bold"}}>Total</span><span style={{fontSize:19,fontWeight:"bold",color:RED}}>{fmt(total)} $</span></div>
                <button onClick={()=>setPayStep("info")} style={{width:"100%",background:DARK,color:G,border:"none",padding:"14px",marginTop:14,fontSize:13,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:2,textTransform:"uppercase",borderRadius:6}}>Passer la commande →</button>
                <div style={{textAlign:"center",marginTop:8,fontSize:10,color:MUTED}}>🔒 Paiement sécurisé · Livraison suivie</div>
              </div>
            </div>}
          </>)}

          {payStep==="info"&&(<div style={{maxWidth:600}}>
            <div style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"20px":"32px",borderRadius:8}}>
              <h3 style={{fontSize:16,color:DARK,marginBottom:18}}>📋 Vos informations</h3>
              <FInp label="Nom complet *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Mamadou Diallo" />
              <FInp label="Email *" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="votre@email.com" />
              <FInp label="Téléphone" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="438-XXX-XXXX" />
              <FInp label="Adresse *" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="1234 Rue Exemple" />
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:10}}>
                <FInp label="Ville" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} />
                <FInp label="Province" value={form.province} onChange={e=>setForm({...form,province:e.target.value})} />
                <FInp label="Code postal" value={form.postal} onChange={e=>setForm({...form,postal:e.target.value})} placeholder="H2X 1Y4" />
              </div>
              <div style={{borderTop:"1px solid "+BORDER,paddingTop:16,marginTop:8,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                <div style={{fontSize:18,fontWeight:"bold",color:RED}}>Total : {fmt(total)} $</div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setPayStep("cart")} style={{background:"white",color:DARK,border:"1px solid "+BORDER,padding:"12px 20px",fontFamily:"Georgia",fontSize:12,borderRadius:6}}>← Retour</button>
                  <button onClick={confirmOrder} style={{background:GREEN,color:"white",border:"none",padding:"12px 24px",fontFamily:"Georgia",fontSize:13,fontWeight:"bold",letterSpacing:1,borderRadius:6}}>Confirmer la commande ✓</button>
                </div>
              </div>
            </div>
          </div>)}
        </div>)}

        {/* ═══ SUR MESURE ═══ */}
        {page==="commande"&&(<div style={{padding:mobile?"24px 14px":"48px 24px",maxWidth:700,margin:"0 auto",animation:"fadeUp .4s ease"}}>
          <div style={{marginBottom:20}}><div style={{fontSize:10,letterSpacing:5,color:RED,marginBottom:5}}>PERSONNALISÉ</div><h1 style={{fontSize:mobile?26:36,color:DARK,marginBottom:8}}>Commande sur mesure</h1><p style={{color:MUTED,fontSize:14}}>Décrivez le vêtement ou produit que vous souhaitez, et nos artisans le créeront pour vous.</p></div>
          <div style={{background:CREAM,border:"1px solid "+BORDER,padding:mobile?"20px":"32px",borderRadius:8}}>
            <FInp label="Nom complet" placeholder="Mamadou Diallo" />
            <FInp label="Email" type="email" placeholder="votre@email.com" />
            <FInp label="Téléphone / WhatsApp" type="tel" placeholder={PHONE} />
            <div style={{marginBottom:16}}><label style={{display:"block",fontSize:10,letterSpacing:2,color:RED,textTransform:"uppercase",marginBottom:5,fontWeight:"bold"}}>Catégorie</label><select style={{width:"100%",padding:"12px 14px",background:"white",border:`2px solid ${BORDER}`,color:DARK,fontSize:14,fontFamily:"Georgia",borderRadius:6}}>
              {["Habillement Homme","Habillement Femme","Habillement Enfant","Oeuvre d'art","Divers / Accessoires"].map(o=><option key={o}>{o}</option>)}
            </select></div>
            <div style={{marginBottom:16}}><label style={{display:"block",fontSize:10,letterSpacing:2,color:RED,textTransform:"uppercase",marginBottom:5,fontWeight:"bold"}}>Détails de la commande</label><textarea placeholder="Décrivez le produit souhaité : couleurs, taille, matières, occasion..." rows={5} style={{width:"100%",padding:"12px 14px",background:"white",border:`2px solid ${BORDER}`,color:DARK,fontSize:14,fontFamily:"Georgia",resize:"vertical",borderRadius:6}} /></div>
            <div style={{marginBottom:20}}><label style={{display:"block",fontSize:10,letterSpacing:2,color:RED,textTransform:"uppercase",marginBottom:5,fontWeight:"bold"}}>Budget estimé</label><select style={{width:"100%",padding:"12px 14px",background:"white",border:`2px solid ${BORDER}`,color:DARK,fontSize:14,fontFamily:"Georgia",borderRadius:6}}>
              {["Moins de 50 $CA","50 – 150 $CA","150 – 300 $CA","300 – 500 $CA","Plus de 500 $CA"].map(o=><option key={o}>{o}</option>)}
            </select></div>
            <button onClick={()=>toast("Demande envoyée avec succès ! Nous vous répondons sous 48h.")} style={{width:"100%",background:DARK,color:G,border:"none",padding:"16px",fontSize:13,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:3,textTransform:"uppercase",borderRadius:6}}>ENVOYER MA DEMANDE</button>
            <div style={{textAlign:"center",marginTop:10,fontSize:10,color:MUTED}}>🔒 Données protégées · Réponse garantie sous 48h</div>
          </div>
        </div>)}
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer style={{background:"#0D0500",color:"#A0845C",padding:mobile?"28px 0 14px":"44px 0 20px",borderTop:"3px solid #3A1F00",marginTop:40}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 "+(mobile?"14px":"24px"),display:"grid",gridTemplateColumns:mobile?"1fr":tablet?"1fr 1fr":"2fr 1fr 1fr 1fr",gap:mobile?20:30,marginBottom:20}}>
          <div><div style={{fontSize:20,color:G,letterSpacing:5,fontWeight:"bold",marginBottom:10}}>BADAOUR</div><p style={{fontSize:12,lineHeight:1.8,color:MUTED}}>L'Afrique à votre porte. Commerce éthique, artisanat authentique.</p><div style={{marginTop:10,fontSize:12,color:MUTED}}>📞 {PHONE}<br/>✉️ {EMAIL}</div></div>
          {!mobile&&[["Boutique",["Homme","Femme","Enfant","Art","Divers"]],["Services",["Livraison","Sur mesure","Suivi","Contact"]],["Info",["À propos","Artisans","FAQ","Retours"]]].map(([t,links])=>(<div key={t}><div style={{color:G,fontWeight:"bold",letterSpacing:2,fontSize:10,textTransform:"uppercase",marginBottom:10}}>{t}</div>{links.map(l=><div key={l} style={{color:MUTED,fontSize:12,marginBottom:6,cursor:"pointer"}}>{l}</div>)}</div>))}
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 "+(mobile?"14px":"24px"),borderTop:"1px solid #3A1F00",paddingTop:12,display:"flex",justifyContent:"space-between",fontSize:10,flexWrap:"wrap",gap:4}}><span>© 2025 BADAOUR · Montréal, Québec, Canada</span><span style={{color:G}}>❤️ Fait avec amour pour la diaspora africaine</span></div>
      </footer>
    </div>
  );
}
