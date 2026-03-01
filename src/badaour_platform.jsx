import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  gold:"#C9A84C",goldLight:"#E8D5A0",
  black:"#0C0A08",dark:"#14120F",charcoal:"#1E1C18",sidebar:"#18160F",
  cream:"#FAF7F2",ivory:"#F5F0E8",sand:"#E8DFD0",
  terra:"#A0522D",wine:"#6B1D2A",green:"#2D6A4F",emerald:"#40916C",
  muted:"#8A7E6E",border:"#E4DDD0",bg:"#FAFAF8",
  white:"#FFFFFF",blue:"#2563EB",red:"#DC2626",orange:"#EA580C",
};

const PHONE="438-988-6682";const EMAIL="service@badaour.com";

const CATS=[
  {key:"homme",label:"Homme",emoji:"👘",color:"#1A3A6B"},
  {key:"femme",label:"Femme",emoji:"👗",color:T.wine},
  {key:"enfant",label:"Enfant",emoji:"🧒",color:T.green},
  {key:"art",label:"Art",emoji:"🏺",color:"#6A0572"},
  {key:"divers",label:"Divers",emoji:"✨",color:T.gold},
];

const STATUS_MAP={confirmed:{l:"Confirmée",c:T.green},preparation:{l:"Préparation",c:T.terra},shipped:{l:"Expédiée",c:T.blue},transit:{l:"En transit",c:"#6A0572"},customs:{l:"Dédouanement",c:T.orange},delivery:{l:"En livraison",c:T.blue},delivered:{l:"Livré",c:T.green}};

const initProducts=[
  {id:1,name:"Grand Boubou Brodé",category:"homme",sub:"Boubou",artisan:"Moussa Diallo",city:"Dakar",country:"Sénégal",price:189,stock:12,sold:47,tag:"Best",desc:"Broderie main sur bazin riche, teinture naturelle indigo.",emoji:"👘",photos:[]},
  {id:2,name:"Dashiki Festif",category:"homme",sub:"Chemise",artisan:"Koffi Asante",city:"Accra",country:"Ghana",price:78,stock:25,sold:33,tag:"Nouveau",desc:"Coton léger brodé, col en V, manches courtes.",emoji:"👔",photos:[]},
  {id:3,name:"Agbada Cérémonie",category:"homme",sub:"Tenue complète",artisan:"Adebayo Okafor",city:"Lagos",country:"Nigeria",price:245,stock:5,sold:18,tag:"Premium",desc:"Ensemble 3 pièces : robe, tunique et pantalon.",emoji:"🎩",photos:[]},
  {id:4,name:"Robe Wax Élégance",category:"femme",sub:"Robe",artisan:"Fatoumata Koné",city:"Bamako",country:"Mali",price:134,stock:18,sold:62,tag:"Best",desc:"Robe droite en wax hollandais, ceinture tissée.",emoji:"👗",photos:[]},
  {id:5,name:"Ensemble Bogolan Chic",category:"femme",sub:"Ensemble",artisan:"Awa Traoré",city:"Bamako",country:"Mali",price:168,stock:8,sold:24,tag:"Artisanal",desc:"Haut et jupe assortis en bogolan peint à la main.",emoji:"✨",photos:[]},
  {id:6,name:"Kaftan Soirée Brodé",category:"femme",sub:"Kaftan",artisan:"Aïcha Diop",city:"Dakar",country:"Sénégal",price:212,stock:6,sold:31,tag:"Premium",desc:"Kaftan en voile de coton, broderies au fil d'or.",emoji:"🌸",photos:[]},
  {id:7,name:"Mini Boubou Enfant",category:"enfant",sub:"Boubou",artisan:"Moussa Diallo",city:"Dakar",country:"Sénégal",price:64,stock:30,sold:55,tag:"Populaire",desc:"Version enfant du grand boubou. Coton lavable.",emoji:"👶",photos:[]},
  {id:8,name:"Robe Wax Princesse",category:"enfant",sub:"Robe",artisan:"Koffi Mensah",city:"Lomé",country:"Togo",price:52,stock:20,sold:38,tag:"Nouveau",desc:"Robe à volants en wax coloré. 3-10 ans.",emoji:"🎀",photos:[]},
  {id:9,name:"Ensemble Kente Junior",category:"enfant",sub:"Ensemble",artisan:"Kweku Mensah",city:"Kumasi",country:"Ghana",price:88,stock:10,sold:22,tag:"Artisanal",desc:"Ensemble kente authentique tissé main.",emoji:"🧒",photos:[]},
  {id:10,name:"Masque Ancestral Sénoufo",category:"art",sub:"Masque",artisan:"Cheikh Ndiaye",city:"Thiès",country:"Sénégal",price:320,stock:3,sold:8,tag:"Unique",desc:"Masque cérémoniel sculpté. Bois de venn.",emoji:"🎭",photos:[]},
  {id:11,name:"Sculpture Baobab Bronze",category:"art",sub:"Sculpture",artisan:"Cheikh Ndiaye",city:"Thiès",country:"Sénégal",price:445,stock:4,sold:5,tag:"Premium",desc:"Baobab bronze coulé, socle ébène.",emoji:"🌳",photos:[]},
  {id:12,name:"Tableau Sahel Acrylique",category:"art",sub:"Tableau",artisan:"Amadou Sow",city:"Nouakchott",country:"Mauritanie",price:278,stock:2,sold:11,tag:"Artisanal",desc:"Acrylique sur toile 80×60cm.",emoji:"🖼️",photos:[]},
  {id:13,name:"Collier Perles Krobo",category:"divers",sub:"Bijoux",artisan:"Abena Asante",city:"Accra",country:"Ghana",price:86,stock:15,sold:44,tag:"Artisanal",desc:"Perles verre recyclé, techniques Krobo.",emoji:"📿",photos:[]},
  {id:14,name:"Sac Bogolan Cuir",category:"divers",sub:"Sac",artisan:"Fatoumata Koné",city:"Bamako",country:"Mali",price:112,stock:9,sold:28,tag:"Artisanal",desc:"Sac bogolan, cuir tannage végétal.",emoji:"👜",photos:[]},
  {id:15,name:"Huile de Karité Pure",category:"divers",sub:"Beauté",artisan:"Mariam Ouédraogo",city:"Ouagadougou",country:"Burkina Faso",price:34,stock:50,sold:120,tag:"Bio",desc:"Karité brut non raffiné. 200ml.",emoji:"🧴",photos:[]},
  {id:16,name:"Tissu Wax 6 yards",category:"divers",sub:"Tissu",artisan:"Koffi Mensah",city:"Lomé",country:"Togo",price:58,stock:35,sold:88,tag:"Populaire",desc:"Wax hollandais double face. 6 yards.",emoji:"🧵",photos:[]},
];

const initOrders=[
  {id:"BDR-2026-0042",date:"2026-01-10",status:"transit",client:"Mamadou Diallo",email:"mamadou@test.com",address:"4500 Sherbrooke, Montréal QC",items:[{name:"Grand Boubou Brodé",qty:1,price:189},{name:"Robe Wax Élégance",qty:1,price:134}],total:355.25,payMethod:"Interac"},
  {id:"BDR-2026-0038",date:"2026-01-08",status:"delivered",client:"Aïssata Camara",email:"aissata@test.com",address:"1200 Av. des Pins, Montréal QC",items:[{name:"Kaftan Soirée Brodé",qty:1,price:212}],total:264.78,payMethod:"Carte"},
  {id:"BDR-2026-0035",date:"2026-01-05",status:"preparation",client:"Omar Sy",email:"omar@test.com",address:"550 Blvd René-Lévesque, Montréal QC",items:[{name:"Masque Sénoufo",qty:1,price:320},{name:"Collier Krobo",qty:2,price:86}],total:536.12,payMethod:"PayPal"},
];

// ─── PHOTO UPLOADER COMPONENT ─────────────────────────────────────────────
function PhotoUploader({photos=[],onChange,maxPhotos=8}){
  const fileRef=useRef(null);

  const handleFiles=(e)=>{
    const files=Array.from(e.target.files);
    const remaining=maxPhotos-photos.length;
    const toProcess=files.slice(0,remaining);
    toProcess.forEach(file=>{
      if(!file.type.startsWith("image/"))return;
      if(file.size>5*1024*1024){alert(`${file.name} dépasse 5MB`);return;}
      const reader=new FileReader();
      reader.onload=(ev)=>{
        onChange(prev=>[...prev,{id:Date.now()+Math.random(),url:ev.target.result,name:file.name,size:(file.size/1024).toFixed(0)+"KB"}]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value="";
  };

  const removePhoto=(id)=>onChange(prev=>prev.filter(p=>p.id!==id));

  const movePhoto=(idx,dir)=>{
    onChange(prev=>{
      const arr=[...prev];
      const newIdx=idx+dir;
      if(newIdx<0||newIdx>=arr.length)return arr;
      [arr[idx],arr[newIdx]]=[arr[newIdx],arr[idx]];
      return arr;
    });
  };

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <label style={{fontSize:11,fontWeight:700,letterSpacing:"1.5px",color:T.terra,textTransform:"uppercase"}}>
          Photos du produit ({photos.length}/{maxPhotos}) — min. 5 recommandées
        </label>
        {photos.length<maxPhotos&&(
          <button onClick={()=>fileRef.current?.click()} style={{background:T.dark,color:"#fff",border:"none",padding:"8px 18px",fontSize:12,fontWeight:600,cursor:"pointer",borderRadius:8,fontFamily:"'DM Sans',sans-serif"}}>
            + Ajouter des photos
          </button>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{display:"none"}}/>

      {/* Photo grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:8}}>
        {photos.map((photo,idx)=>(
          <div key={photo.id} style={{position:"relative",borderRadius:12,overflow:"hidden",aspectRatio:"1",border:`2px solid ${idx===0?T.gold:T.border}`,background:T.cream}}>
            <img src={photo.url} alt={photo.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            {idx===0&&<div style={{position:"absolute",top:8,left:8,background:T.gold,color:T.dark,padding:"3px 10px",fontSize:9,fontWeight:700,borderRadius:100,letterSpacing:"1px"}}>PRINCIPALE</div>}
            <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.7))",padding:"20px 10px 8px",display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
              <span style={{color:"#fff",fontSize:9,opacity:.8}}>{photo.name?.slice(0,15)}{photo.name?.length>15?"...":""}</span>
              <div style={{display:"flex",gap:4}}>
                {idx>0&&<button onClick={()=>movePhoto(idx,-1)} style={{background:"rgba(255,255,255,.2)",border:"none",color:"#fff",width:22,height:22,borderRadius:4,cursor:"pointer",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>}
                {idx<photos.length-1&&<button onClick={()=>movePhoto(idx,1)} style={{background:"rgba(255,255,255,.2)",border:"none",color:"#fff",width:22,height:22,borderRadius:4,cursor:"pointer",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center"}}>→</button>}
                <button onClick={()=>removePhoto(photo.id)} style={{background:"rgba(220,38,38,.8)",border:"none",color:"#fff",width:22,height:22,borderRadius:4,cursor:"pointer",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty slots */}
        {Array.from({length:Math.max(0,5-photos.length)}).map((_,i)=>(
          <div key={"slot-"+i} onClick={()=>fileRef.current?.click()} style={{aspectRatio:"1",border:`2px dashed ${T.border}`,borderRadius:12,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",background:T.cream,transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.gold;e.currentTarget.style.background=T.ivory;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background=T.cream;}}>
            <div style={{fontSize:24,opacity:.3,marginBottom:4}}>📷</div>
            <div style={{fontSize:10,color:T.muted,fontWeight:600}}>Photo {photos.length+i+1}</div>
          </div>
        ))}
      </div>
      {photos.length<5&&<div style={{fontSize:11,color:T.orange,fontWeight:600,marginTop:8}}>⚠️ Ajoutez au moins 5 photos pour une fiche produit optimale</div>}
      <div style={{fontSize:11,color:T.muted,marginTop:4}}>Formats : JPG, PNG, WebP · Max 5MB par image · Glissez pour réordonner</div>
    </div>
  );
}

// ─── MAIN ADMIN PANEL ────────────────────────────────────────────────────────
const GITHUB_PRODUCTS_URL = "https://raw.githubusercontent.com/Badaour/badaour/main/data/products.json";

export default function BADAOURAdmin(){
  const [page,setPage]=useState("dashboard");
  const [products,setProducts]=useState(initProducts);

  useEffect(()=>{
    fetch(GITHUB_PRODUCTS_URL+"?t="+Date.now())
      .then(r=>r.json()).then(data=>{if(Array.isArray(data)&&data.length>0)setProducts(data);}).catch(()=>{});
  },[]);

  const saveToGitHub=async(updated)=>{
    try{
      await fetch("/api/save-products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({products:updated})});
    }catch(e){console.error("Save error:",e);}
  };
  const [orders,setOrders]=useState(initOrders);
  const [editProduct,setEditP]=useState(null);
  const [showNew,setShowNew]=useState(false);
  const [newP,setNewP]=useState({name:"",category:"homme",sub:"",artisan:"",city:"",country:"Sénégal",price:"",stock:"",tag:"Nouveau",desc:"",emoji:"👘",photos:[]});
  const [notif,setNotif]=useState(null);
  const [filterCat,setFC]=useState(null);
  const [searchQ,setSQ]=useState("");
  const [sideCollapsed,setSC]=useState(false);

  // Artisan state
  const initArtisans=[
    {id:1,name:"Moussa Diallo",metier:"Tailleur brodeur",city:"Dakar",country:"Sénégal",emoji:"✂️",exp:"23 ans",bio:"Moussa perpétue l'art du grand boubou. Chaque broderie prend 4 jours.",email:"moussa@artisan.sn",phone:"+221 77 123 4567",photo:""},
    {id:2,name:"Fatoumata Koné",metier:"Artisane bogolan",city:"Bamako",country:"Mali",emoji:"🎨",exp:"18 ans",bio:"Fatoumata ressuscite les motifs anciens du bogolan peint à la boue.",email:"fatoumata@artisan.ml",phone:"+223 66 789 0123",photo:""},
    {id:3,name:"Abena Asante",metier:"Perlière Krobo",city:"Accra",country:"Ghana",emoji:"🔮",exp:"15 ans",bio:"Abena dirige une coopérative de 12 femmes artisanes.",email:"abena@artisan.gh",phone:"+233 20 456 7890",photo:""},
    {id:4,name:"Cheikh Ndiaye",metier:"Sculpteur sur bois",city:"Thiès",country:"Sénégal",emoji:"🌳",exp:"30 ans",bio:"Maître sculpteur, Cheikh crée des pièces uniques en bois de venn.",email:"cheikh@artisan.sn",phone:"+221 76 234 5678",photo:""},
    {id:5,name:"Kweku Mensah",metier:"Tisserand kente",city:"Kumasi",country:"Ghana",emoji:"🧵",exp:"25 ans",bio:"Tisserand royal, gardien de la tradition kente Ashanti.",email:"kweku@artisan.gh",phone:"+233 24 567 8901",photo:""},
    {id:6,name:"Aïcha Diop",metier:"Couturière haute couture",city:"Dakar",country:"Sénégal",emoji:"👗",exp:"20 ans",bio:"Aïcha allie couture traditionnelle africaine et tendances contemporaines.",email:"aicha@artisan.sn",phone:"+221 78 345 6789",photo:""},
  ];
  const [artisans,setArtisans]=useState(initArtisans);
  const [showNewArt,setShowNewArt]=useState(false);
  const [editArt,setEditArt]=useState(null);
  const [newArt,setNewArt]=useState({name:"",metier:"",city:"",country:"Sénégal",emoji:"✂️",exp:"",bio:"",email:"",phone:"",photo:""});
  const [artSearch,setArtSearch]=useState("");

  const toast=(msg)=>{setNotif(msg);setTimeout(()=>setNotif(null),3000);};

  // Stats
  const totalRev=products.reduce((s,p)=>s+p.price*p.sold,0);
  const totalSold=products.reduce((s,p)=>s+p.sold,0);
  const totalStock=products.reduce((s,p)=>s+p.stock,0);
  const pendingOrders=orders.filter(o=>o.status!=="delivered").length;

  const filteredP=products.filter(p=>{
    const mc=filterCat?p.category===filterCat:true;
    const q=searchQ.toLowerCase();
    const mq=!q||p.name.toLowerCase().includes(q)||p.artisan.toLowerCase().includes(q);
    return mc&&mq;
  });

  const saveToAPI=async(prods)=>{
    try{await fetch("/api/save-products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({products:prods})});}catch(e){console.error("Save error",e);}
  };

  const handleSaveNew=()=>{
    if(!newP.name||!newP.price){toast("❌ Nom et prix obligatoires");return;}
    const p={...newP,id:Date.now(),price:+newP.price,stock:+newP.stock||0,sold:0};
    setProducts(prev=>{const u=[p,...prev];saveToGitHub(u);return u;});
    setShowNew(false);
    setNewP({name:"",category:"homme",sub:"",artisan:"",city:"",country:"Sénégal",price:"",stock:"",tag:"Nouveau",desc:"",emoji:"👘",photos:[]});
    toast("✅ Produit ajouté ! Visible sur la boutique dans ~30s");
  };

  const handleUpdateProduct=(updated)=>{
    setProducts(prev=>{const u=prev.map(p=>p.id===updated.id?updated:p);saveToGitHub(u);return u;});
    setEditP(null);
    toast("✅ Produit mis à jour !");
  };

  const handleDeleteProduct=(id)=>{
    setProducts(prev=>{const u=prev.filter(p=>p.id!==id);saveToGitHub(u);return u;});
    setEditP(null);
    toast("🗑️ Produit supprimé");
  };

  const handleStatusChange=(orderId,newStatus)=>{
    setOrders(prev=>prev.map(o=>o.id===orderId?{...o,status:newStatus}:o));
    toast("✅ Statut mis à jour");
  };

  // ─── ARTISAN HANDLERS ───
  const handleSaveNewArt=()=>{
    if(!newArt.name||!newArt.metier){toast("❌ Nom et métier obligatoires");return;}
    const a={...newArt,id:Date.now()};
    setArtisans(prev=>[a,...prev]);
    setShowNewArt(false);
    setNewArt({name:"",metier:"",city:"",country:"Sénégal",emoji:"✂️",exp:"",bio:"",email:"",phone:"",photo:""});
    toast("✅ Artisan ajouté avec succès !");
  };

  const handleUpdateArt=(updated)=>{
    setArtisans(prev=>prev.map(a=>a.id===updated.id?updated:a));
    setEditArt(null);
    toast("✅ Artisan mis à jour !");
  };

  const handleDeleteArt=(id)=>{
    if(!confirm("Supprimer cet artisan ?"))return;
    setArtisans(prev=>prev.filter(a=>a.id!==id));
    setEditArt(null);
    toast("🗑️ Artisan supprimé");
  };

  const filteredArt=artisans.filter(a=>{
    const q=artSearch.toLowerCase();
    return !q||a.name.toLowerCase().includes(q)||a.metier.toLowerCase().includes(q)||a.country.toLowerCase().includes(q);
  });

  const Sidebar=()=>(
    <div style={{width:sideCollapsed?72:240,background:T.sidebar,height:"100vh",position:"fixed",left:0,top:0,zIndex:50,borderRight:`1px solid rgba(201,168,76,.1)`,transition:"width .3s cubic-bezier(.2,.8,.2,1)",overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{padding:sideCollapsed?"20px 16px":"24px 20px",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
        <div style={{fontSize:sideCollapsed?14:20,fontWeight:800,color:T.gold,letterSpacing:"4px",fontFamily:"'Playfair Display',Georgia,serif",whiteSpace:"nowrap",overflow:"hidden"}}>{sideCollapsed?"B":"BADAOUR"}</div>
        {!sideCollapsed&&<div style={{fontSize:9,color:"rgba(201,168,76,.4)",letterSpacing:"3px",marginTop:2,fontWeight:600}}>ADMINISTRATION</div>}
      </div>
      <nav style={{flex:1,padding:"16px 8px"}}>
        {[
          {k:"dashboard",l:"Dashboard",icon:"📊"},
          {k:"products",l:"Produits",icon:"📦"},
          {k:"orders",l:"Commandes",icon:"📋"},
          {k:"artisans",l:"Artisans",icon:"✂️"},
          {k:"analytics",l:"Analytique",icon:"📈"},
          {k:"settings",l:"Paramètres",icon:"⚙️"},
        ].map(({k,l,icon})=>(
          <button key={k} onClick={()=>setPage(k)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:sideCollapsed?"12px 16px":"12px 16px",background:page===k?"rgba(201,168,76,.12)":"transparent",color:page===k?T.gold:"rgba(255,255,255,.4)",border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:page===k?700:500,fontFamily:"'DM Sans',sans-serif",marginBottom:4,textAlign:"left",transition:"all .2s",whiteSpace:"nowrap",overflow:"hidden"}}>
            <span style={{fontSize:18,flexShrink:0}}>{icon}</span>
            {!sideCollapsed&&l}
          </button>
        ))}
      </nav>
      <div style={{padding:"16px 8px",borderTop:"1px solid rgba(255,255,255,.05)"}}>
        <button onClick={()=>setSC(!sideCollapsed)} style={{width:"100%",padding:"10px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:8,color:"rgba(255,255,255,.3)",cursor:"pointer",fontSize:16}}>{sideCollapsed?"→":"←"}</button>
        {!sideCollapsed&&<a href="#" onClick={e=>{e.preventDefault();toast("Lien boutique: badaour.com");}} style={{display:"block",textAlign:"center",fontSize:11,color:T.gold,marginTop:12,textDecoration:"none",fontWeight:600}}>🌐 Voir la boutique →</a>}
      </div>
    </div>
  );

  const FInp=({label,textarea,...props})=>(
    <div style={{marginBottom:16}}>
      <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:"1.5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>{label}</label>
      {textarea?<textarea {...props} style={{width:"100%",padding:"11px 14px",background:T.cream,border:`1.5px solid ${T.border}`,color:T.dark,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",borderRadius:8,resize:"vertical",boxSizing:"border-box",...(props.style||{})}}/>
      :<input {...props} style={{width:"100%",padding:"11px 14px",background:T.cream,border:`1.5px solid ${T.border}`,color:T.dark,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",borderRadius:8,boxSizing:"border-box",...(props.style||{})}}/>}
    </div>
  );

  // ─── PRODUCT FORM (for new & edit) ───
  const ProductForm=({data,setData,onSave,onCancel,title,onDelete})=>(
    <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:40,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)",overflow:"auto"}}>
      <div style={{background:T.white,borderRadius:20,width:"90%",maxWidth:720,padding:"32px",boxShadow:"0 24px 64px rgba(0,0,0,.2)",maxHeight:"90vh",overflow:"auto",margin:"20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <h2 style={{fontSize:24,fontWeight:800,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",margin:0}}>{title}</h2>
          <button onClick={onCancel} style={{background:T.sand,border:"none",width:36,height:36,borderRadius:10,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <FInp label="Nom du produit *" placeholder="Grand Boubou Brodé" value={data.name} onChange={e=>setData({...data,name:e.target.value})}/>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:"1.5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>Catégorie *</label>
            <select value={data.category} onChange={e=>setData({...data,category:e.target.value})} style={{width:"100%",padding:"11px 14px",background:T.cream,border:`1.5px solid ${T.border}`,fontSize:14,fontFamily:"'DM Sans',sans-serif",borderRadius:8,outline:"none"}}>
              {CATS.map(c=><option key={c.key} value={c.key}>{c.emoji} {c.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          <FInp label="Sous-catégorie" placeholder="Boubou, Robe..." value={data.sub} onChange={e=>setData({...data,sub:e.target.value})}/>
          <FInp label="Prix ($CA) *" type="number" placeholder="189" value={data.price} onChange={e=>setData({...data,price:e.target.value})}/>
          <FInp label="Stock" type="number" placeholder="12" value={data.stock} onChange={e=>setData({...data,stock:e.target.value})}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          <FInp label="Artisan" placeholder="Moussa Diallo" value={data.artisan} onChange={e=>setData({...data,artisan:e.target.value})}/>
          <FInp label="Ville" placeholder="Dakar" value={data.city} onChange={e=>setData({...data,city:e.target.value})}/>
          <FInp label="Pays" placeholder="Sénégal" value={data.country} onChange={e=>setData({...data,country:e.target.value})}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:"1.5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>Tag</label>
            <select value={data.tag} onChange={e=>setData({...data,tag:e.target.value})} style={{width:"100%",padding:"11px 14px",background:T.cream,border:`1.5px solid ${T.border}`,fontSize:14,fontFamily:"'DM Sans',sans-serif",borderRadius:8,outline:"none"}}>
              {["Best","Nouveau","Artisanal","Populaire","Unique","Bio","Premium"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <FInp label="Emoji" placeholder="👘" value={data.emoji} onChange={e=>setData({...data,emoji:e.target.value})}/>
        </div>

        <FInp label="Description" textarea placeholder="Description détaillée du produit..." rows={3} value={data.desc} onChange={e=>setData({...data,desc:e.target.value})}/>

        {/* PHOTO UPLOADER */}
        <div style={{background:T.cream,borderRadius:14,padding:20,marginBottom:20,border:`1px solid ${T.border}`}}>
          <PhotoUploader photos={data.photos||[]} onChange={(updater)=>{
            if(typeof updater==="function"){setData(d=>({...d,photos:updater(d.photos||[])}));}
            else{setData({...data,photos:updater});}
          }}/>
        </div>

        <div style={{display:"flex",gap:10,justifyContent:"space-between"}}>
          <div style={{display:"flex",gap:10}}>
            {onDelete&&<button onClick={()=>{if(confirm("Supprimer ce produit ?"))onDelete();}} style={{background:T.red,color:"#fff",border:"none",padding:"12px 24px",fontSize:13,fontWeight:700,cursor:"pointer",borderRadius:10,fontFamily:"'DM Sans',sans-serif"}}>🗑️ Supprimer</button>}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={onCancel} style={{background:"transparent",color:T.dark,border:`1.5px solid ${T.border}`,padding:"12px 24px",fontSize:13,fontWeight:600,cursor:"pointer",borderRadius:10,fontFamily:"'DM Sans',sans-serif"}}>Annuler</button>
            <button onClick={onSave} style={{background:T.dark,color:"#fff",border:"none",padding:"12px 32px",fontSize:13,fontWeight:700,cursor:"pointer",borderRadius:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:".5px"}}>💾 Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── ARTISAN FORM MODAL ───
  const ArtisanForm=({data,setData,onSave,onCancel,title,onDelete})=>{
    const photoRef=useRef(null);
    const handlePhoto=(e)=>{
      const file=e.target.files?.[0];
      if(!file)return;
      const ext=file.name.split(".").pop().toLowerCase();
      const validExt=["jpg","jpeg","png","webp","gif","heic","avif"].includes(ext);
      if(!file.type.startsWith("image/")&&!validExt){alert("Fichier image requis (jpg, png, webp...)");return;}
      if(file.size>5*1024*1024){alert("Max 5MB");return;}
      const reader=new FileReader();
      reader.onload=(ev)=>setData({...data,photo:ev.target.result});
      reader.readAsDataURL(file);
      e.target.value="";
    };
    return(
    <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:60,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)",overflow:"auto"}}>
      <div style={{background:T.white,borderRadius:20,width:"90%",maxWidth:580,padding:"32px",boxShadow:"0 24px 64px rgba(0,0,0,.2)",maxHeight:"85vh",overflow:"auto",margin:"20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <h2 style={{fontSize:24,fontWeight:800,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",margin:0}}>{title}</h2>
          <button onClick={onCancel} style={{background:T.sand,border:"none",width:36,height:36,borderRadius:10,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        {/* PHOTO DE PROFIL */}
        <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:24,padding:20,background:T.cream,borderRadius:14,border:`1.5px dashed ${T.border}`}}>
          <input ref={photoRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/>
          <div onClick={()=>photoRef.current?.click()} style={{width:90,height:90,borderRadius:"50%",background:data.photo?"transparent":T.dark,border:data.photo?`3px solid ${T.gold}`:`3px dashed ${T.gold}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden",flexShrink:0,transition:"all .2s",position:"relative"}}
            onMouseEnter={e=>{if(data.photo){e.currentTarget.querySelector('.photo-overlay').style.opacity='1';}}}
            onMouseLeave={e=>{if(data.photo){e.currentTarget.querySelector('.photo-overlay').style.opacity='0';}}}>
            {data.photo
              ?<><img src={data.photo} alt="profil" style={{width:"100%",height:"100%",objectFit:"cover"}}/><div className="photo-overlay" style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity .2s",borderRadius:"50%"}}><span style={{color:"#fff",fontSize:11,fontWeight:700}}>Changer</span></div></>
              :<div style={{textAlign:"center"}}><div style={{fontSize:28,marginBottom:2}}>{data.emoji||"📷"}</div><div style={{fontSize:8,color:T.gold,fontWeight:700,letterSpacing:".5px"}}>AJOUTER</div></div>
            }
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:T.dark,marginBottom:4}}>Photo de profil / Logo</div>
            <div style={{fontSize:11,color:T.muted,lineHeight:1.6,marginBottom:10}}>Ajoutez une photo de l'artisan ou un logo. Formats : JPG, PNG, WebP. Max 5MB.</div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>photoRef.current?.click()} style={{background:T.dark,color:"#fff",border:"none",padding:"7px 16px",fontSize:11,fontWeight:600,cursor:"pointer",borderRadius:8,fontFamily:"'DM Sans',sans-serif"}}>{data.photo?"📷 Changer":"📷 Importer"}</button>
              {data.photo&&<button onClick={()=>setData({...data,photo:""})} style={{background:"transparent",border:`1px solid ${T.red}`,color:T.red,padding:"7px 14px",fontSize:11,fontWeight:600,cursor:"pointer",borderRadius:8,fontFamily:"'DM Sans',sans-serif"}}>✕ Retirer</button>}
            </div>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 70px",gap:14,alignItems:"flex-end"}}>
          <FInp label="Nom complet *" placeholder="Moussa Diallo" value={data.name} onChange={e=>setData({...data,name:e.target.value})}/>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:"1.5px",color:T.terra,textTransform:"uppercase",marginBottom:6}}>Emoji</label>
            <input value={data.emoji} onChange={e=>setData({...data,emoji:e.target.value})} style={{width:"100%",padding:"11px 14px",background:T.cream,border:`1.5px solid ${T.border}`,fontSize:20,borderRadius:8,outline:"none",textAlign:"center",boxSizing:"border-box"}}/>
          </div>
        </div>

        <FInp label="Métier / Spécialité *" placeholder="Tailleur brodeur, Sculpteur..." value={data.metier} onChange={e=>setData({...data,metier:e.target.value})}/>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          <FInp label="Ville" placeholder="Dakar" value={data.city} onChange={e=>setData({...data,city:e.target.value})}/>
          <FInp label="Pays" placeholder="Sénégal" value={data.country} onChange={e=>setData({...data,country:e.target.value})}/>
          <FInp label="Expérience" placeholder="15 ans" value={data.exp} onChange={e=>setData({...data,exp:e.target.value})}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <FInp label="Email" type="email" placeholder="artisan@email.com" value={data.email} onChange={e=>setData({...data,email:e.target.value})}/>
          <FInp label="Téléphone" type="tel" placeholder="+221 77 123 4567" value={data.phone} onChange={e=>setData({...data,phone:e.target.value})}/>
        </div>

        <FInp label="Biographie" textarea placeholder="Parcours, savoir-faire, histoire de l'artisan..." rows={4} value={data.bio} onChange={e=>setData({...data,bio:e.target.value})}/>

        <div style={{display:"flex",gap:10,justifyContent:"space-between",marginTop:8}}>
          <div>{onDelete&&<button onClick={()=>onDelete(data.id)} style={{background:T.red,color:"#fff",border:"none",padding:"12px 24px",fontSize:13,fontWeight:700,cursor:"pointer",borderRadius:10,fontFamily:"'DM Sans',sans-serif"}}>🗑️ Supprimer l'artisan</button>}</div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={onCancel} style={{background:"transparent",color:T.dark,border:`1.5px solid ${T.border}`,padding:"12px 24px",fontSize:13,fontWeight:600,cursor:"pointer",borderRadius:10,fontFamily:"'DM Sans',sans-serif"}}>Annuler</button>
            <button onClick={onSave} style={{background:T.dark,color:"#fff",border:"none",padding:"12px 32px",fontSize:13,fontWeight:700,cursor:"pointer",borderRadius:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:".5px"}}>💾 Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
    );
  };

  return(
    <div style={{fontFamily:"'DM Sans',sans-serif",background:T.bg,minHeight:"100vh",color:T.dark}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:${T.gold};color:${T.dark}}
        input:focus,textarea:focus,select:focus{border-color:${T.gold}!important;box-shadow:0 0 0 3px rgba(201,168,76,.12)!important;}
        button{transition:all .2s;}
        button:hover:not(:disabled){opacity:.9;}
        ::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px;}
      `}</style>

      {notif&&<div style={{position:"fixed",top:20,right:20,zIndex:9999,background:T.dark,color:T.gold,padding:"14px 24px",borderRadius:12,fontSize:13,fontWeight:600,boxShadow:"0 8px 32px rgba(0,0,0,.3)",animation:"slideIn .3s ease",maxWidth:340}}>
        <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}`}</style>
        {notif}
      </div>}

      <Sidebar/>

      {/* Product Forms */}
      {showNew&&<ProductForm data={newP} setData={setNewP} title="✨ Nouveau produit" onSave={handleSaveNew} onCancel={()=>setShowNew(false)}/>}
      {editProduct&&<ProductForm data={editProduct} setData={setEditP} title="✏️ Modifier le produit" onSave={()=>handleUpdateProduct(editProduct)} onCancel={()=>setEditP(null)} onDelete={()=>handleDeleteProduct(editProduct.id)}/>}

      {/* Artisan Modals */}
      {showNewArt&&<ArtisanForm data={newArt} setData={setNewArt} title="✨ Nouvel artisan" onSave={handleSaveNewArt} onCancel={()=>setShowNewArt(false)}/>}
      {editArt&&<ArtisanForm data={editArt} setData={setEditArt} title="✏️ Modifier l'artisan" onSave={()=>handleUpdateArt(editArt)} onCancel={()=>setEditArt(null)} onDelete={handleDeleteArt}/>}

      {/* MAIN CONTENT */}
      <div style={{marginLeft:sideCollapsed?72:240,transition:"margin-left .3s cubic-bezier(.2,.8,.2,1)",minHeight:"100vh"}}>

        {/* Top bar */}
        <div style={{background:T.white,borderBottom:`1px solid ${T.border}`,padding:"16px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:40}}>
          <div>
            <h1 style={{fontSize:20,fontWeight:800,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",margin:0}}>{
              {dashboard:"Dashboard",products:"Gestion des Produits",orders:"Gestion des Commandes",artisans:"Nos Artisans",analytics:"Analytique",settings:"Paramètres"}[page]
            }</h1>
            <div style={{fontSize:12,color:T.muted,marginTop:2}}>{new Date().toLocaleDateString("fr-CA",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
          </div>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:T.dark,display:"flex",alignItems:"center",justifyContent:"center",color:T.gold,fontSize:14,fontWeight:700}}>A</div>
            <div><div style={{fontSize:13,fontWeight:700}}>Admin</div><div style={{fontSize:11,color:T.muted}}>admin@badaour.com</div></div>
          </div>
        </div>

        <div style={{padding:"28px 32px"}}>

        {/* ════════ DASHBOARD ════════ */}
        {page==="dashboard"&&(<>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:28}}>
            {[
              {icon:"💰",label:"Chiffre d'affaires",val:`${(totalRev/1000).toFixed(1)}K $CA`,sub:"Total des ventes",color:T.green,bg:"#F0FFF4"},
              {icon:"📦",label:"Articles vendus",val:totalSold,sub:`Sur ${products.length} produits`,color:T.blue,bg:"#EFF6FF"},
              {icon:"🏪",label:"Stock total",val:totalStock,sub:"Unités en inventaire",color:T.orange,bg:"#FFF7ED"},
              {icon:"📋",label:"Commandes actives",val:pendingOrders,sub:`${orders.length} total`,color:"#6A0572",bg:"#FAF5FF"},
            ].map(({icon,label,val,sub,color,bg})=>(
              <div key={label} style={{background:T.white,borderRadius:16,padding:"24px",border:`1px solid ${T.border}`,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-10,right:-10,width:80,height:80,borderRadius:"50%",background:bg,opacity:.6}}/>
                <div style={{position:"relative"}}>
                  <div style={{fontSize:28,marginBottom:8}}>{icon}</div>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.5px",color:T.muted,textTransform:"uppercase",marginBottom:6}}>{label}</div>
                  <div style={{fontSize:28,fontWeight:800,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif"}}>{val}</div>
                  <div style={{fontSize:12,color:T.muted,marginTop:4}}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:28}}>
            <div style={{background:T.white,borderRadius:16,padding:"24px",border:`1px solid ${T.border}`}}>
              <h3 style={{fontSize:16,fontWeight:700,color:T.dark,marginBottom:16,fontFamily:"'Playfair Display',Georgia,serif"}}>⚡ Actions rapides</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <button onClick={()=>{setPage("products");setShowNew(true);}} style={{background:T.dark,color:"#fff",border:"none",padding:"14px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:13}}>+ Nouveau produit</button>
                <button onClick={()=>setPage("orders")} style={{background:T.terra,color:"#fff",border:"none",padding:"14px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:13}}>📋 Commandes</button>
                <button onClick={()=>setPage("products")} style={{background:"transparent",color:T.dark,border:`1.5px solid ${T.border}`,padding:"14px",borderRadius:10,cursor:"pointer",fontWeight:600,fontSize:13}}>📦 Inventaire</button>
                <button onClick={()=>setPage("analytics")} style={{background:"transparent",color:T.dark,border:`1.5px solid ${T.border}`,padding:"14px",borderRadius:10,cursor:"pointer",fontWeight:600,fontSize:13}}>📈 Stats</button>
              </div>
            </div>
            <div style={{background:T.white,borderRadius:16,padding:"24px",border:`1px solid ${T.border}`}}>
              <h3 style={{fontSize:16,fontWeight:700,color:T.dark,marginBottom:16,fontFamily:"'Playfair Display',Georgia,serif"}}>📋 Commandes récentes</h3>
              {orders.slice(0,3).map(o=>(
                <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${T.border}`}}>
                  <div><div style={{fontSize:13,fontWeight:700}}>{o.id}</div><div style={{fontSize:11,color:T.muted}}>{o.client}</div></div>
                  <span style={{background:STATUS_MAP[o.status]?.c||"#666",color:"#fff",padding:"3px 10px",fontSize:10,fontWeight:700,borderRadius:100}}>{STATUS_MAP[o.status]?.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top products */}
          <div style={{background:T.white,borderRadius:16,padding:"24px",border:`1px solid ${T.border}`}}>
            <h3 style={{fontSize:16,fontWeight:700,color:T.dark,marginBottom:16,fontFamily:"'Playfair Display',Georgia,serif"}}>🏆 Top produits par ventes</h3>
            <div style={{display:"grid",gap:8}}>
              {[...products].sort((a,b)=>b.sold-a.sold).slice(0,5).map((p,i)=>(
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:14,padding:"10px 12px",borderRadius:10,background:i===0?T.ivory:"transparent"}}>
                  <span style={{fontSize:22}}>{p.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700}}>{p.name}</div>
                    <div style={{fontSize:11,color:T.muted}}>{p.artisan} · {p.country}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:14,fontWeight:700,color:T.dark}}>{p.sold} vendus</div>
                    <div style={{fontSize:12,color:T.muted}}>{p.price} $CA</div>
                  </div>
                  <div style={{width:60,height:6,background:T.sand,borderRadius:3,overflow:"hidden"}}>
                    <div style={{width:`${(p.sold/products[0]?.sold||1)*100}%`,height:"100%",background:T.gold,borderRadius:3}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>)}

        {/* ════════ PRODUCTS ════════ */}
        {page==="products"&&(<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
              <input value={searchQ} onChange={e=>setSQ(e.target.value)} placeholder="🔍 Rechercher un produit..." style={{padding:"10px 16px",border:`1.5px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",width:220,background:T.white}}/>
              <div style={{display:"flex",gap:4}}>
                <button onClick={()=>setFC(null)} style={{padding:"8px 14px",borderRadius:8,border:`1.5px solid ${!filterCat?T.dark:T.border}`,background:!filterCat?T.dark:"transparent",color:!filterCat?"#fff":T.dark,fontSize:12,fontWeight:600,cursor:"pointer"}}>Tout ({products.length})</button>
                {CATS.map(c=>{const count=products.filter(p=>p.category===c.key).length;return(
                  <button key={c.key} onClick={()=>setFC(filterCat===c.key?null:c.key)} style={{padding:"8px 14px",borderRadius:8,border:`1.5px solid ${filterCat===c.key?T.dark:T.border}`,background:filterCat===c.key?T.dark:"transparent",color:filterCat===c.key?"#fff":T.dark,fontSize:12,fontWeight:600,cursor:"pointer"}}>{c.emoji} {count}</button>
                );})}
              </div>
            </div>
            <button onClick={()=>setShowNew(true)} style={{background:T.dark,color:"#fff",border:"none",padding:"12px 24px",fontSize:13,fontWeight:700,cursor:"pointer",borderRadius:10,letterSpacing:".5px"}}>+ Nouveau produit</button>
          </div>

          <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"48px 2fr 1fr 80px 80px 80px 80px 100px",padding:"14px 18px",background:T.cream,fontSize:10,fontWeight:700,letterSpacing:"1.5px",color:T.muted,textTransform:"uppercase",borderBottom:`1px solid ${T.border}`}}>
              <span></span><span>Produit</span><span>Artisan</span><span>Prix</span><span>Stock</span><span>Vendus</span><span>Photos</span><span>Actions</span>
            </div>
            {filteredP.map(p=>(
              <div key={p.id} style={{display:"grid",gridTemplateColumns:"48px 2fr 1fr 80px 80px 80px 80px 100px",padding:"14px 18px",alignItems:"center",borderBottom:`1px solid ${T.border}`,transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background=T.cream} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span style={{fontSize:24}}>{p.emoji}</span>
                <div><div style={{fontSize:14,fontWeight:700,color:T.dark}}>{p.name}</div><div style={{fontSize:11,color:T.muted}}>{p.sub} · {p.country}</div></div>
                <div style={{fontSize:13,color:T.muted}}>{p.artisan}, {p.city}</div>
                <div style={{fontSize:14,fontWeight:700}}>{p.price} $</div>
                <div style={{fontSize:13}}><span style={{color:p.stock<5?T.red:p.stock<10?T.orange:T.green,fontWeight:700}}>{p.stock}</span></div>
                <div style={{fontSize:13,fontWeight:600}}>{p.sold}</div>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <span style={{fontSize:12,fontWeight:700,color:(p.photos||[]).length>=5?T.green:(p.photos||[]).length>0?T.orange:T.muted}}>{(p.photos||[]).length}</span>
                  <span style={{fontSize:10,color:T.muted}}>/ 5</span>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>setEditP({...p})} style={{background:T.cream,border:`1px solid ${T.border}`,borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:11,fontWeight:600}}>✏️ Éditer</button>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {/* ════════ ORDERS ════════ */}
        {page==="orders"&&(<>
          <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
            {["Toutes","confirmed","preparation","shipped","transit","delivered"].map(s=>{
              const label=s==="Toutes"?"Toutes":STATUS_MAP[s]?.l||s;
              const count=s==="Toutes"?orders.length:orders.filter(o=>o.status===s).length;
              return <button key={s} style={{padding:"8px 16px",borderRadius:8,border:`1.5px solid ${T.border}`,background:T.white,fontSize:12,fontWeight:600,cursor:"pointer"}}>{label} ({count})</button>;
            })}
          </div>

          <div style={{display:"grid",gap:14}}>
            {orders.map(o=>(
              <div key={o.id} style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,padding:"24px",transition:"box-shadow .2s"}}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,.06)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                  <div>
                    <div style={{fontSize:18,fontWeight:800,letterSpacing:"1.5px",color:T.dark,fontFamily:"'Playfair Display',Georgia,serif"}}>{o.id}</div>
                    <div style={{fontSize:12,color:T.muted,marginTop:4}}>{o.date} · {o.client} · {o.email}</div>
                    <div style={{fontSize:12,color:T.muted}}>{o.address}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:20,fontWeight:800,color:T.dark,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:6}}>{o.total.toFixed(2)} $CA</div>
                    <span style={{background:STATUS_MAP[o.status]?.c||"#666",color:"#fff",padding:"4px 14px",fontSize:11,fontWeight:700,borderRadius:100}}>{STATUS_MAP[o.status]?.l}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
                  {o.items.map((item,i)=><div key={i} style={{background:T.cream,borderRadius:8,padding:"8px 14px",fontSize:12,fontWeight:600}}>{item.name} ×{item.qty} — {item.price} $</div>)}
                  <div style={{background:T.ivory,borderRadius:8,padding:"8px 14px",fontSize:12,color:T.muted}}>💳 {o.payMethod}</div>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <span style={{fontSize:11,fontWeight:700,color:T.muted,padding:"8px 0",marginRight:8}}>Changer statut →</span>
                  {Object.entries(STATUS_MAP).map(([key,{l,c}])=>(
                    <button key={key} onClick={()=>handleStatusChange(o.id,key)} style={{padding:"6px 14px",borderRadius:8,border:o.status===key?`2px solid ${c}`:`1px solid ${T.border}`,background:o.status===key?c:"transparent",color:o.status===key?"#fff":T.dark,fontSize:11,fontWeight:o.status===key?700:500,cursor:"pointer"}}>{l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>)}

        {/* ════════ ARTISANS ════════ */}
        {page==="artisans"&&(<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <input value={artSearch} onChange={e=>setArtSearch(e.target.value)} placeholder="🔍 Rechercher un artisan..." style={{padding:"10px 16px",border:`1.5px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",width:260,background:T.white}}/>
              <div style={{background:T.cream,borderRadius:8,padding:"8px 14px",fontSize:12,fontWeight:700,color:T.muted}}>{artisans.length} artisan{artisans.length>1?"s":""}</div>
            </div>
            <button onClick={()=>setShowNewArt(true)} style={{background:T.dark,color:"#fff",border:"none",padding:"12px 24px",fontSize:13,fontWeight:700,cursor:"pointer",borderRadius:10,letterSpacing:".5px"}}>+ Nouvel artisan</button>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {filteredArt.map(a=>{
              const artProducts=products.filter(p=>p.artisan===a.name||(p.artisan+", "+p.city)===a.name+", "+a.city);
              const artRev=artProducts.reduce((s,p)=>s+p.price*p.sold,0);
              const artSold=artProducts.reduce((s,p)=>s+p.sold,0);
              return(
                <div key={a.id} style={{background:T.white,borderRadius:16,padding:"24px",border:`1px solid ${T.border}`,transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.06)";e.currentTarget.style.borderColor=T.gold;}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=T.border;}}>
                  <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:14}}>
                    <div style={{width:52,height:52,borderRadius:"50%",background:a.photo?"transparent":T.dark,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:`2px solid ${T.gold}`,flexShrink:0,overflow:"hidden"}}>
                      {a.photo?<img src={a.photo} alt={a.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:a.emoji}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:15,fontWeight:700,fontFamily:"'Playfair Display',Georgia,serif"}}>{a.name}</div>
                      <div style={{fontSize:11,color:T.muted}}>{a.metier}</div>
                      <div style={{fontSize:11,color:T.muted}}>📍 {a.city}, {a.country}{a.exp?` · ⭐ ${a.exp}`:""}</div>
                    </div>
                  </div>

                  {a.bio&&<p style={{fontSize:12,color:"#888",lineHeight:1.6,marginBottom:14,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{a.bio}</p>}

                  {(a.email||a.phone)&&(
                    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
                      {a.email&&<div style={{background:T.cream,borderRadius:6,padding:"4px 10px",fontSize:10,color:T.muted}}>✉️ {a.email}</div>}
                      {a.phone&&<div style={{background:T.cream,borderRadius:6,padding:"4px 10px",fontSize:10,color:T.muted}}>📞 {a.phone}</div>}
                    </div>
                  )}

                  <div style={{display:"flex",gap:10,marginBottom:16}}>
                    <div style={{background:T.cream,borderRadius:10,padding:"10px 14px",flex:1,textAlign:"center"}}>
                      <div style={{fontSize:18,fontWeight:800,color:T.dark}}>{artProducts.length}</div>
                      <div style={{fontSize:10,color:T.muted,fontWeight:600}}>Produits</div>
                    </div>
                    <div style={{background:T.cream,borderRadius:10,padding:"10px 14px",flex:1,textAlign:"center"}}>
                      <div style={{fontSize:18,fontWeight:800,color:T.dark}}>{artSold}</div>
                      <div style={{fontSize:10,color:T.muted,fontWeight:600}}>Vendus</div>
                    </div>
                    <div style={{background:T.cream,borderRadius:10,padding:"10px 14px",flex:1,textAlign:"center"}}>
                      <div style={{fontSize:18,fontWeight:800,color:T.green}}>{artRev>999?(artRev/1000).toFixed(1)+"K":artRev}</div>
                      <div style={{fontSize:10,color:T.muted,fontWeight:600}}>Rev. $CA</div>
                    </div>
                  </div>

                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>setEditArt({...a})} style={{flex:1,background:T.cream,border:`1px solid ${T.border}`,borderRadius:8,padding:"9px",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>✏️ Modifier</button>
                    <button onClick={()=>handleDeleteArt(a.id)} style={{background:"transparent",border:`1px solid ${T.red}`,borderRadius:8,padding:"9px 14px",cursor:"pointer",fontSize:12,fontWeight:600,color:T.red,fontFamily:"'DM Sans',sans-serif"}}>🗑️</button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredArt.length===0&&(
            <div style={{textAlign:"center",padding:60,color:T.muted}}>
              <div style={{fontSize:44}}>✂️</div>
              <div style={{fontSize:16,marginTop:12,fontFamily:"'Playfair Display',Georgia,serif"}}>Aucun artisan trouvé</div>
              <button onClick={()=>setShowNewArt(true)} style={{marginTop:16,background:T.dark,color:"#fff",border:"none",padding:"10px 24px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,borderRadius:100}}>+ Ajouter un artisan</button>
            </div>
          )}

          {/* Call to action */}
          <div style={{background:T.dark,padding:"36px 32px",borderRadius:16,marginTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 90% 50%,rgba(201,168,76,.08),transparent 50%)"}}/>
            <div style={{position:"relative"}}>
              <h3 style={{color:T.gold,fontSize:20,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,marginBottom:6}}>Élargir le réseau</h3>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:13}}>Ajoutez de nouveaux artisans partenaires depuis toute l'Afrique.</p>
            </div>
            <button onClick={()=>setShowNewArt(true)} style={{background:T.gold,color:T.dark,border:"none",padding:"12px 28px",fontSize:13,fontWeight:700,cursor:"pointer",borderRadius:10,fontFamily:"'DM Sans',sans-serif",position:"relative",flexShrink:0}}>+ Nouvel artisan</button>
          </div>
        </>)}

        {/* ════════ ANALYTICS ════════ */}
        {page==="analytics"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{background:T.white,borderRadius:16,padding:"24px",border:`1px solid ${T.border}`}}>
              <h3 style={{fontSize:16,fontWeight:700,marginBottom:20,fontFamily:"'Playfair Display',Georgia,serif"}}>📊 Ventes par catégorie</h3>
              {CATS.map(c=>{const catP=products.filter(p=>p.category===c.key);const catSold=catP.reduce((s,p)=>s+p.sold,0);const catRev=catP.reduce((s,p)=>s+p.price*p.sold,0);return(
                <div key={c.key} style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <span style={{fontSize:20}}>{c.emoji}</span>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>{c.label}</div><div style={{fontSize:11,color:T.muted}}>{catSold} vendus · {(catRev/1000).toFixed(1)}K $</div>
                    <div style={{width:"100%",height:6,background:T.sand,borderRadius:3,marginTop:6}}><div style={{width:`${(catSold/totalSold)*100}%`,height:"100%",background:c.color,borderRadius:3,transition:"width .5s"}}/></div>
                  </div>
                </div>
              );})}
            </div>
            <div style={{background:T.white,borderRadius:16,padding:"24px",border:`1px solid ${T.border}`}}>
              <h3 style={{fontSize:16,fontWeight:700,marginBottom:20,fontFamily:"'Playfair Display',Georgia,serif"}}>🌍 Ventes par pays</h3>
              {["Sénégal","Ghana","Mali","Nigeria","Togo","Burkina Faso","Mauritanie"].map(country=>{const catP=products.filter(p=>p.country===country);const catSold=catP.reduce((s,p)=>s+p.sold,0);if(!catSold)return null;return(
                <div key={country} style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:T.gold}}/>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>{country}</div><div style={{fontSize:11,color:T.muted}}>{catSold} articles vendus</div>
                    <div style={{width:"100%",height:6,background:T.sand,borderRadius:3,marginTop:6}}><div style={{width:`${(catSold/totalSold)*100}%`,height:"100%",background:T.gold,borderRadius:3}}/></div>
                  </div>
                </div>
              );})}
            </div>
            <div style={{background:T.white,borderRadius:16,padding:"24px",border:`1px solid ${T.border}`,gridColumn:"1/-1"}}>
              <h3 style={{fontSize:16,fontWeight:700,marginBottom:16,fontFamily:"'Playfair Display',Georgia,serif"}}>📷 Couverture photo des produits</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {products.map(p=>(
                  <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:T.cream,borderRadius:10}}>
                    <span style={{fontSize:20}}>{p.emoji}</span>
                    <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div></div>
                    <div style={{fontSize:12,fontWeight:700,color:(p.photos||[]).length>=5?T.green:(p.photos||[]).length>0?T.orange:T.red}}>{(p.photos||[]).length}/5</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════ SETTINGS ════════ */}
        {page==="settings"&&(
          <div style={{maxWidth:600}}>
            <div style={{background:T.white,borderRadius:16,padding:"28px",border:`1px solid ${T.border}`,marginBottom:16}}>
              <h3 style={{fontSize:16,fontWeight:700,marginBottom:20,fontFamily:"'Playfair Display',Georgia,serif"}}>🏪 Informations boutique</h3>
              <div style={{display:"grid",gap:12}}>
                <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${T.border}`}}><span style={{color:T.muted,fontWeight:600}}>Nom</span><span style={{fontWeight:700}}>BADAOUR</span></div>
                <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${T.border}`}}><span style={{color:T.muted,fontWeight:600}}>Téléphone</span><span>{PHONE}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${T.border}`}}><span style={{color:T.muted,fontWeight:600}}>Email</span><span>{EMAIL}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${T.border}`}}><span style={{color:T.muted,fontWeight:600}}>Localisation</span><span>Montréal, Québec, Canada</span></div>
                <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0"}}><span style={{color:T.muted,fontWeight:600}}>Frais livraison</span><span>18 $CA</span></div>
              </div>
            </div>
            <div style={{background:T.white,borderRadius:16,padding:"28px",border:`1px solid ${T.border}`}}>
              <h3 style={{fontSize:16,fontWeight:700,marginBottom:16,fontFamily:"'Playfair Display',Georgia,serif"}}>🔗 Liens</h3>
              <div style={{background:T.cream,borderRadius:10,padding:"14px",marginBottom:10}}>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:"1px",marginBottom:4}}>Boutique (client)</div>
                <div style={{fontSize:14,fontWeight:600,color:T.blue}}>badaour.com</div>
              </div>
              <div style={{background:T.cream,borderRadius:10,padding:"14px"}}>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:"1px",marginBottom:4}}>Administration</div>
                <div style={{fontSize:14,fontWeight:600,color:T.blue}}>admin.badaour.com</div>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
