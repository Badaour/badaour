import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import BADAOUR from './BADAOUR.jsx'
import BADAOURPlatform from './badaour_platform.jsx'

const ADMIN_CODE = "BADAOUR2025";

function AdminGate() {
  const [code, setCode] = useState("");
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("badaour_admin") === "1") setAuth(true);
  }, []);

  const handleSubmit = () => {
    if (code === ADMIN_CODE) {
      sessionStorage.setItem("badaour_admin", "1");
      setAuth(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (auth) return <BADAOURPlatform />;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#1A0A00 0%,#3D1A00 50%,#1A0A00 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif"}}>
      <div style={{background:"#FDF6EC",borderRadius:16,padding:"48px 40px",maxWidth:420,width:"90%",textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
        <div style={{fontSize:42,marginBottom:8}}>🔐</div>
        <h1 style={{color:"#1A0A00",fontSize:28,margin:"0 0 4px"}}>BADAOUR</h1>
        <p style={{color:"#D4AF37",fontSize:13,letterSpacing:3,margin:"0 0 24px"}}>ESPACE ADMINISTRATION</p>
        <p style={{color:"#8B6A3E",fontSize:14,marginBottom:24}}>Entrez le code d'accès pour continuer</p>        <div style={{position:"relative",marginBottom:16}}>
          <input
            type={show ? "text" : "password"}
            value={code}
            onChange={e => { setCode(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Code d'accès..."
            style={{width:"100%",padding:"14px 48px 14px 16px",border:error?"2px solid #C0392B":"2px solid #E8D5B7",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",background:"#FFF8EE"}}
          />
          <button onClick={() => setShow(!show)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:18}}>{show ? "👁️" : "🔒"}</button>
        </div>
        {error && <p style={{color:"#C0392B",fontSize:13,margin:"0 0 12px"}}>⚠️ Code incorrect. Réessayez.</p>}
        <button onClick={handleSubmit} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#D4AF37,#B8960C)",color:"#1A0A00",border:"none",borderRadius:10,fontSize:16,fontWeight:"bold",cursor:"pointer",letterSpacing:1}}>
          CONNEXION
        </button>
        <a href="#/" style={{display:"block",marginTop:20,color:"#8B6A3E",fontSize:13,textDecoration:"none"}}>← Retour à la boutique</a>
      </div>
    </div>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route === "#/admin") return <AdminGate />;
  return <BADAOUR />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
