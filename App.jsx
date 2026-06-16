import { useState, useRef, useEffect } from "react";

const C = {
  greenDeep:"#0f2419",greenRich:"#1a3a2a",greenMid:"#2d5a3d",greenAccent:"#3d7a52",
  sage:"#7a9e8a",sageLt:"#a8c4b4",sagePale:"#d4e6dc",
  cream:"#f7f4ef",creamMd:"#ede8df",creamDark:"#e0d9ce",
  warmNeutral:"#8c7b6b",warmLt:"#c4b5a5",
  white:"#ffffff",offWhite:"#faf9f6",
  text:"#1a1a17",textMd:"#4a4944",textLt:"#8a8880",textHint:"#b0ada8",
  border:"rgba(26,26,23,0.1)",borderMd:"rgba(26,26,23,0.15)",
  red:"#b83228",redPale:"#fdf1f0",amber:"#a07020",amberPale:"#fdf8ee",
  successPale:"#edf5f0",bluePale:"#eef4fd",blue:"#2563a8",
  purple:"#6b46c1",purplePale:"#f5f0ff",
};
const font=`"SF Pro Display","SF Pro Text",-apple-system,BlinkMacSystemFont,system-ui,sans-serif`;
const g={
  app:{fontFamily:font,background:C.cream,minHeight:"100vh",maxWidth:430,margin:"0 auto"},
  screen:{background:C.cream,minHeight:"100vh",paddingBottom:88},
  label:{fontSize:10,fontWeight:600,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:7,display:"block"},
  input:{width:"100%",padding:"12px 16px",borderRadius:12,border:`1px solid ${C.borderMd}`,background:C.offWhite,fontSize:15,color:C.text,outline:"none",boxSizing:"border-box",fontFamily:font},
  card:{background:C.white,borderRadius:18,border:`1px solid ${C.border}`,padding:"18px 20px",marginBottom:10},
  cardFlush:{background:C.white,borderRadius:18,border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:10},
  btnPrimary:{width:"100%",padding:"16px 24px",borderRadius:14,border:"none",background:C.greenRich,color:C.white,fontSize:16,fontWeight:600,cursor:"pointer",fontFamily:font},
  btnSecondary:{width:"100%",padding:"14px 24px",borderRadius:14,border:`1px solid ${C.borderMd}`,background:C.offWhite,color:C.textMd,fontSize:15,fontWeight:500,cursor:"pointer",fontFamily:font},
  btnSm:{padding:"9px 18px",borderRadius:10,border:`1px solid ${C.borderMd}`,background:C.offWhite,color:C.textMd,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:font},
  btnSmGreen:{padding:"9px 18px",borderRadius:10,border:"none",background:C.greenRich,color:C.white,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font},
  sectionTitle:{fontSize:11,fontWeight:600,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:14,marginTop:4},
};

// ── Shared UI ──
const Logo=({light=true})=><span style={{fontSize:22,fontWeight:700,letterSpacing:"-1px",color:light?C.white:C.greenDeep}}>mise<span style={{color:light?C.sageLt:C.sage,fontWeight:300}}>.</span></span>;
const Badge=({label,color})=><span style={{fontSize:10,fontWeight:600,color:color||C.sage,letterSpacing:"0.1em",textTransform:"uppercase",background:color?`${color}22`:C.sagePale,padding:"3px 8px",borderRadius:6}}>{label}</span>;
const StatusPill=({status})=>{
  const map={Draft:{color:C.warmNeutral,bg:C.creamMd},Sent:{color:"#2d6a4f",bg:"#e8f5ee"},Confirmed:{color:C.greenMid,bg:C.sagePale},"Awaiting Confirmation":{color:C.blue,bg:C.bluePale},"Partially Fulfilled":{color:C.amber,bg:C.amberPale},Delivered:{color:"#1a4a2e",bg:"#d4edd9"}};
  const s=map[status]||{color:C.textLt,bg:C.creamMd};
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:600,color:s.color,background:s.bg}}><span style={{width:5,height:5,borderRadius:"50%",background:s.color,display:"inline-block"}}></span>{status}</span>;
};
const BackHeader=({onBack,right,title})=>(
  <div style={{background:C.greenDeep,padding:"16px 20px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.white,fontSize:18}}>‹</button>
    {title?<span style={{color:C.white,fontSize:15,fontWeight:600}}>{title}</span>:<Logo/>}
    {right||<div style={{width:36}}/>}
  </div>
);

const NavIcon=({id,active})=>{
  const w=active?2:1.5;
  const icons={
    dashboard:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
    orders:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
    suppliers:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    analytics:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    venue:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  };
  return icons[id]||null;
};

const BottomNav=({screen,setScreen,notifCount,whatsNewBadge})=>{
  const items=[{id:"dashboard",label:"Home"},{id:"orders",label:"Orders"},{id:"suppliers",label:"Suppliers"},{id:"analytics",label:"Analytics"},{id:"venue",label:"Venue"}];
  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(250,249,246,0.94)",backdropFilter:"blur(12px)",borderTop:`1px solid ${C.border}`,display:"flex",zIndex:100,paddingBottom:4}}>
      {items.map(i=>{
        const active=screen===i.id;
        const badge=i.id==="venue"&&whatsNewBadge;
        return(
          <button key={i.id} onClick={()=>setScreen(i.id)} style={{flex:1,padding:"10px 4px 6px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,position:"relative"}}>
            <span style={{color:active?C.greenRich:C.warmLt,display:"flex",position:"relative"}}>
              <NavIcon id={i.id} active={active}/>
              {badge&&<span style={{position:"absolute",top:-4,right:-6,width:8,height:8,borderRadius:"50%",background:C.purple,border:`1.5px solid ${C.cream}`}}></span>}
            </span>
            <span style={{fontSize:10,color:active?C.greenRich:C.textHint,fontWeight:active?600:400}}>{i.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ── Offline Banner ──
const OfflineBanner=({offline,syncing})=>{
  if(!offline&&!syncing) return null;
  return(
    <div style={{background:syncing?C.successPale:C.amberPale,padding:"10px 20px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${syncing?"rgba(45,90,61,0.15)":"rgba(160,112,32,0.15)"}`}}>
      <div style={{width:8,height:8,borderRadius:"50%",background:syncing?C.greenMid:C.amber,flexShrink:0}}></div>
      <span style={{fontSize:12,fontWeight:600,color:syncing?C.greenMid:C.amber}}>{syncing?"Syncing data…":"You're offline — showing cached data"}</span>
    </div>
  );
};

// ── Notification Centre ──
const initialNotifs=[
  {id:1,type:"cutoff",title:"Bertocchi cut-off in 2 hours",body:"Order by 2pm today to ensure delivery.",time:"8:02am",read:false,urgent:true},
  {id:2,type:"price",title:"Price alert: Chicken Schnitzel",body:"Up $4 (8.3%) since your last order.",time:"Yesterday",read:false,urgent:false},
  {id:3,type:"reorder",title:"Marigold order overdue",body:"You usually order every Tuesday — it's been 9 days.",time:"Yesterday",read:false,urgent:false},
  {id:4,type:"delivery",title:"Prom Country Eggs confirmed",body:"Your order ORD-0040 has been confirmed.",time:"2 days ago",read:true,urgent:false},
  {id:5,type:"system",title:"Welcome to Mise!",body:"Your 30-day trial has started. Upload your first invoice to get started.",time:"3 days ago",read:true,urgent:false},
];
const notifIcon={cutoff:"⏱",price:"↑",reorder:"↻",delivery:"✓",system:"✦"};
const notifColor={cutoff:C.amber,price:C.red,reorder:C.blue,delivery:C.greenMid,system:C.sage};

function NotificationCentre({setScreen,notifs,setNotifs}){
  const markAll=()=>setNotifs(prev=>prev.map(n=>({...n,read:true})));
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("dashboard")} title="Notifications" right={<button onClick={markAll} style={{background:"none",border:"none",color:C.sageLt,fontSize:12,cursor:"pointer",fontFamily:font}}>Mark all read</button>}/>
      <div style={{padding:"16px 20px 0"}}>
        {notifs.length===0&&<div style={{textAlign:"center",padding:48,color:C.textLt,fontSize:14}}>No notifications</div>}
        {notifs.map(n=>(
          <div key={n.id} onClick={()=>setNotifs(prev=>prev.map(x=>x.id===n.id?{...x,read:true}:x))} style={{...g.card,cursor:"pointer",opacity:n.read?0.6:1,borderLeft:`3px solid ${n.read?C.border:notifColor[n.type]||C.sage}`}}>
            <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:34,height:34,borderRadius:10,background:`${notifColor[n.type]||C.sage}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:15}}>{notifIcon[n.type]||"•"}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
                  <div style={{fontSize:14,fontWeight:n.read?500:700,color:C.text}}>{n.title}</div>
                  {!n.read&&<div style={{width:7,height:7,borderRadius:"50%",background:C.greenRich,flexShrink:0,marginTop:4}}></div>}
                </div>
                <div style={{fontSize:12,color:C.textMd,marginBottom:4,lineHeight:1.4}}>{n.body}</div>
                <div style={{fontSize:11,color:C.textLt}}>{n.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mock data ──
const TRIAL_DAYS=12;
const ONBOARDING=[
  {id:"venue",label:"Add your venue details",done:true},
  {id:"supplier",label:"Add your first supplier",done:true},
  {id:"invoice",label:"Upload an invoice",done:true},
  {id:"order",label:"Send your first order",done:false},
];
const mockUsers=[
  {id:1,name:"Marco Rossi",role:"Admin",email:"marco@farrokitchen.com.au",initials:"MR"},
  {id:2,name:"Sara Chen",role:"Head Chef",email:"sara@farrokitchen.com.au",initials:"SC"},
  {id:3,name:"James Wu",role:"Staff",email:"james@farrokitchen.com.au",initials:"JW"},
];
const initialOrders=[
  {id:"ORD-0041",supplier:"Bertocchi Smallgoods",date:"2 Jun",items:6,total:342.00,status:"Delivered",shortage:false,note:"",openedAt:"9:14am",deliveredItems:[{name:"Chicken Schnitzel 180g",ordered:5,received:5,unit:"kg"},{name:"Pancetta Sliced",ordered:2,received:2,unit:"kg"},{name:"Salami Calabrese",ordered:1,received:1,unit:"kg"}]},
  {id:"ORD-0040",supplier:"Prom Country Eggs",date:"1 Jun",items:3,total:98.50,status:"Confirmed",shortage:false,note:"",openedAt:"8:02am",deliveredItems:[]},
  {id:"ORD-0039",supplier:"Marigold Produce",date:"31 May",items:9,total:215.80,status:"Awaiting Confirmation",shortage:false,note:"",openedAt:null,deliveredItems:[]},
  {id:"ORD-0038",supplier:"Chobani Foodservice",date:"30 May",items:4,total:127.00,status:"Draft",shortage:false,note:"",openedAt:null,deliveredItems:[]},
  {id:"ORD-0037",supplier:"Bertocchi Smallgoods",date:"26 May",items:5,total:298.00,status:"Delivered",shortage:true,note:"Rep said pancetta prices rising next month.",openedAt:"10:33am",deliveredItems:[{name:"Chicken Schnitzel 180g",ordered:5,received:3,unit:"kg"},{name:"Pancetta Sliced",ordered:2,received:2,unit:"kg"}]},
];
const mockSuppliers=[
  {name:"Bertocchi Smallgoods",category:"Meat & Smallgoods",cutoff:"Mon–Fri 2pm",delivery:"Tue, Thu, Fri",min:150,email:"orders@bertocchi.com.au",urgency:"urgent",initials:"BS",reliability:92,responseTime:"~2hrs"},
  {name:"Prom Country Eggs",category:"Dairy & Eggs",cutoff:"Wed 3pm",delivery:"Thursday",min:60,email:"pce@gmail.com",urgency:"ok",initials:"PC",reliability:98,responseTime:"Same day"},
  {name:"Marigold Produce",category:"Fruit & Veg",cutoff:"Daily 8am",delivery:"Daily",min:80,email:"orders@marigold.com.au",urgency:"critical",initials:"MP",reliability:85,responseTime:"~4hrs"},
  {name:"Chobani Foodservice",category:"Dairy & Eggs",cutoff:"Fri 12pm",delivery:"Monday",min:200,email:"fs@chobani.com",urgency:"ok",initials:"CF",reliability:99,responseTime:"Next day"},
];
const mockProducts=[
  {name:"Chicken Schnitzel 180g",supplier:"Bertocchi Smallgoods",unit:"kg",lastQty:5,lastPrice:48.00,currentPrice:52.00,date:"2 Jun",pinned:true,suggestedQty:5},
  {name:"Pancetta Sliced",supplier:"Bertocchi Smallgoods",unit:"kg",lastQty:2,lastPrice:34.50,currentPrice:34.50,date:"2 Jun",pinned:false,suggestedQty:2},
  {name:"Free Range Eggs 700g",supplier:"Prom Country Eggs",unit:"doz",lastQty:10,lastPrice:8.20,currentPrice:8.20,date:"1 Jun",pinned:true,suggestedQty:10},
  {name:"Mixed Lettuce",supplier:"Marigold Produce",unit:"bag",lastQty:6,lastPrice:4.50,currentPrice:5.20,date:"31 May",pinned:false,suggestedQty:7},
];
const spendData=[
  {month:"Jan",total:1820},{month:"Feb",total:2140},{month:"Mar",total:1960},
  {month:"Apr",total:2380},{month:"May",total:2290},{month:"Jun",total:784},
];
const SUPPLIER_DIRECTORY=[
  {name:"PFD Food Services",category:"Dry Goods",email:"orders@pfd.com.au",phone:"1300 733 874",initials:"PF",abn:""},
  {name:"Bidfood Australia",category:"Dry Goods",email:"orders@bidfood.com.au",phone:"1300 366 777",initials:"BF",abn:""},
  {name:"Harris Farm Markets",category:"Fruit & Veg",email:"wholesale@harrisfarm.com.au",phone:"(02) 9756 8888",initials:"HF",abn:""},
  {name:"Mainland Poultry",category:"Meat & Smallgoods",email:"orders@mainlandpoultry.com.au",phone:"(03) 9369 4444",initials:"ML",abn:""},
  {name:"Vittoria Coffee",category:"Beverages",email:"foodservice@vittoria.com.au",phone:"1300 848 874",initials:"VC",abn:""},
  {name:"Anchor Dairy",category:"Dairy & Eggs",email:"orders@anchordairy.com.au",phone:"1800 244 246",initials:"AD",abn:""},
  {name:"Moraitis Fresh",category:"Fruit & Veg",email:"orders@moraitis.com.au",phone:"(02) 9756 5555",initials:"MF",abn:""},
  {name:"Copperpot Foods",category:"Bakery",email:"orders@copperpot.com.au",phone:"(03) 9562 7777",initials:"CP",abn:""},
];
const WHATS_NEW=[
  {version:"1.3.0",date:"7 Jun 2026",items:["AI now auto-extracts supplier details from invoices","New supplier directory with 200+ pre-loaded Australian suppliers","Xero & MYOB integration","Offline mode — core screens work without internet","Direct camera capture for invoice upload"]},
  {version:"1.2.0",date:"1 Jun 2026",items:["Spend analytics with cost-per-cover calculator","Price tracking and increase alerts","Month-end spend report","Shortage logging and supplier reliability scores"]},
  {version:"1.1.0",date:"25 May 2026",items:["Delivery confirmation workflow","Reorder from history","CSV export","Multi-user team access"]},
];

// ── Auth ──
function AuthScreen({onLogin}){
  const[mode,setMode]=useState("login");
  return(
    <div style={{background:C.greenDeep,minHeight:"100vh",display:"flex",flexDirection:"column",padding:28}}>
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={{marginBottom:48}}>
          <div style={{fontSize:42,fontWeight:700,color:C.white,letterSpacing:"-2px",lineHeight:1}}>mise<span style={{color:C.sage,fontWeight:300}}>.</span></div>
          <div style={{marginTop:8,fontSize:12,color:C.sageLt,letterSpacing:"0.12em",textTransform:"uppercase"}}>Orders</div>
          <div style={{marginTop:20,fontSize:16,color:C.sageLt,lineHeight:1.5,maxWidth:260}}>Supplier ordering, simplified for hospitality.</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.05)",borderRadius:20,padding:24,border:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{display:"flex",gap:4,marginBottom:24,background:"rgba(0,0,0,0.2)",borderRadius:12,padding:4}}>
            {["login","register"].map(m=><button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"10px",borderRadius:10,border:"none",background:mode===m?C.white:"transparent",color:mode===m?C.greenDeep:C.sageLt,fontWeight:mode===m?600:400,fontSize:14,cursor:"pointer",fontFamily:font}}>{m==="login"?"Sign in":"Register"}</button>)}
          </div>
          {mode==="register"&&<div style={{marginBottom:14}}><label style={{...g.label,color:C.sageLt}}>Venue name</label><input style={{...g.input,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",color:C.white}} placeholder="e.g. Farro Kitchen"/></div>}
          <div style={{marginBottom:14}}><label style={{...g.label,color:C.sageLt}}>Email</label><input style={{...g.input,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",color:C.white}} type="email" placeholder="you@venue.com.au"/></div>
          <div style={{marginBottom:24}}><label style={{...g.label,color:C.sageLt}}>Password</label><input style={{...g.input,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",color:C.white}} type="password" placeholder="••••••••"/></div>
          <button style={{...g.btnPrimary,background:C.greenAccent,fontSize:15}} onClick={onLogin}>{mode==="login"?"Sign in →":"Start free trial →"}</button>
          {mode==="login"&&<div style={{textAlign:"center",marginTop:16}}><span style={{fontSize:13,color:C.sageLt,cursor:"pointer"}}>Forgot password?</span></div>}
          {mode==="register"&&<div style={{textAlign:"center",marginTop:16,fontSize:12,color:C.sageLt}}>30-day free trial · No credit card required</div>}
        </div>
      </div>
      <div style={{textAlign:"center",paddingBottom:12}}><span style={{fontSize:11,color:"rgba(168,196,180,0.4)",letterSpacing:"0.06em"}}>MISE · HOSPITALITY TOOLS</span></div>
    </div>
  );
}

// ── Dashboard ──
function Dashboard({setScreen,setActiveOrder,orders,notifCount,trialDismissed,onDismissTrial,offline,syncing}){
  const h=new Date().getHours();
  const greeting=h<12?"Good morning":h<17?"Good afternoon":"Good evening";
  const thisMonth=spendData[spendData.length-1].total;
  const lastMonth=spendData[spendData.length-2].total;
  const diff=thisMonth-lastMonth;
  const drafts=orders.filter(o=>o.status==="Draft");
  return(
    <div style={g.screen}>
      <OfflineBanner offline={offline} syncing={syncing}/>
      <div style={{background:C.greenDeep,padding:"20px 24px 28px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
          <Logo/>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Badge label="Orders"/>
            <button onClick={()=>setScreen("notifications")} style={{position:"relative",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sageLt} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {notifCount>0&&<span style={{position:"absolute",top:-4,right:-4,width:16,height:16,borderRadius:"50%",background:C.red,border:`2px solid ${C.greenDeep}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:C.white}}>{notifCount}</span>}
            </button>
          </div>
        </div>
        <div style={{fontSize:13,color:C.sageLt,marginBottom:4}}>{greeting}</div>
        <div style={{fontSize:26,fontWeight:700,color:C.white,letterSpacing:"-0.8px",marginBottom:20}}>Farro Kitchen</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          <div style={{background:"rgba(255,255,255,0.07)",borderRadius:14,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.08)"}}>
            <div style={{fontSize:10,color:C.sageLt,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>This month</div>
            <div style={{fontSize:22,fontWeight:700,color:C.white,letterSpacing:"-0.8px"}}>${thisMonth.toLocaleString()}</div>
            <div style={{fontSize:11,color:diff>0?"#f4a58a":C.sageLt,marginTop:4}}>{diff>0?`+$${diff}`:`-$${Math.abs(diff)}`} vs last month</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.07)",borderRadius:14,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.08)"}}>
            <div style={{fontSize:10,color:C.sageLt,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Orders sent</div>
            <div style={{fontSize:22,fontWeight:700,color:C.white,letterSpacing:"-0.8px"}}>{orders.filter(o=>o.status!=="Draft").length}</div>
            <div style={{fontSize:11,color:C.sageLt,marginTop:4}}>{drafts.length} draft{drafts.length!==1?"s":""} pending</div>
          </div>
        </div>
        <button style={{...g.btnPrimary,background:C.greenAccent,borderRadius:14,fontSize:15}} onClick={()=>setScreen("neworder")}>+ New order</button>
      </div>

      {!trialDismissed&&(
        <div style={{margin:"16px 20px 0",background:`linear-gradient(135deg,${C.greenDeep} 0%,#1e4a30 100%)`,borderRadius:16,padding:"14px 16px",border:"1px solid rgba(122,158,138,0.2)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div><div style={{fontSize:13,fontWeight:700,color:C.white,marginBottom:2}}>{TRIAL_DAYS} days left in your trial</div><div style={{fontSize:11,color:C.sageLt}}>Upgrade to keep all your data & suppliers</div></div>
            <button onClick={onDismissTrial} style={{background:"none",border:"none",color:C.sageLt,fontSize:18,cursor:"pointer",padding:0}}>×</button>
          </div>
          <div style={{height:4,background:"rgba(255,255,255,0.12)",borderRadius:2,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.round(TRIAL_DAYS/30*100)}%`,background:C.sage,borderRadius:2}}></div></div>
          <button onClick={()=>setScreen("upgrade")} style={{width:"100%",padding:"10px",borderRadius:10,border:"none",background:C.greenAccent,color:C.white,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font}}>Upgrade now →</button>
        </div>
      )}

      {/* Onboarding */}
      {ONBOARDING.filter(o=>!o.done).length>0&&(
        <div style={{margin:"12px 20px 0"}}>
          <div style={g.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:600,color:C.text}}>Getting started</div>
              <div style={{fontSize:12,color:C.textLt}}>{ONBOARDING.filter(o=>o.done).length}/{ONBOARDING.length}</div>
            </div>
            <div style={{height:4,background:C.creamMd,borderRadius:2,marginBottom:14,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.round(ONBOARDING.filter(o=>o.done).length/ONBOARDING.length*100)}%`,background:C.greenRich,borderRadius:2}}></div></div>
            {ONBOARDING.map((s,i)=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,marginBottom:i<ONBOARDING.length-1?10:0}}>
                <div style={{width:22,height:22,borderRadius:6,background:s.done?C.greenRich:C.creamMd,border:`1.5px solid ${s.done?C.greenRich:C.borderMd}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{s.done&&<span style={{color:C.white,fontSize:12}}>✓</span>}</div>
                <span style={{fontSize:13,color:s.done?C.textLt:C.text,textDecoration:s.done?"line-through":"none",fontWeight:s.done?400:500}}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Usage summary */}
      <div style={{margin:"12px 20px 0"}}>
        <div style={{background:C.successPale,borderRadius:16,padding:"14px 16px",border:"1px solid rgba(45,90,61,0.12)"}}>
          <div style={{fontSize:11,color:C.greenMid,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>This week</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["4","Orders sent"],["$1,240","Total spend"],["~8 min","Time saved"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:C.greenRich,letterSpacing:"-0.5px"}}>{v}</div><div style={{fontSize:10,color:C.textLt,marginTop:2,lineHeight:1.3}}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart suggestions */}
      <div style={{padding:"16px 20px 0"}}>
        <div style={g.sectionTitle}>Smart suggestions</div>
        {[{icon:"↻",title:"Bertocchi order overdue",body:"Usually Tuesday — last order 9 days ago.",color:C.amber,bg:C.amberPale},{icon:"⚡",title:"Running low on Eggs",body:"Based on your ordering pattern, stock is likely low.",color:C.blue,bg:C.bluePale},{icon:"↑",title:"Chicken Schnitzel up 8.3%",body:"$48 → $52 since your last Bertocchi order.",color:C.red,bg:C.redPale}].map((s,i)=>(
          <div key={i} style={{background:s.bg,borderRadius:14,padding:"13px 16px",marginBottom:8,border:`1px solid ${s.color}22`,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>{s.icon}</div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:s.color,marginBottom:2}}>{s.title}</div><div style={{fontSize:11,color:C.textMd,lineHeight:1.4}}>{s.body}</div></div>
            <button onClick={()=>setScreen("neworder")} style={{padding:"7px 12px",borderRadius:9,border:"none",background:s.color,color:C.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:font,flexShrink:0}}>Act</button>
          </div>
        ))}
      </div>

      <div style={{padding:"8px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={g.sectionTitle}>Recent orders</div>
          <span style={{fontSize:13,color:C.sage,cursor:"pointer",fontWeight:500}} onClick={()=>setScreen("orders")}>See all</span>
        </div>
        {orders.slice(0,3).map(o=>(
          <div key={o.id} style={{...g.card,cursor:"pointer"}} onClick={()=>{setActiveOrder(o);setScreen("orderdetail");}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div><div style={{fontSize:15,fontWeight:600,color:C.text,letterSpacing:"-0.3px",marginBottom:5}}>{o.supplier}</div><div style={{fontSize:12,color:C.textLt}}>{o.id} · {o.date}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:5}}>${o.total.toFixed(2)}</div><StatusPill status={o.status}/></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Orders ──
function OrdersScreen({setScreen,setActiveOrder,orders,offline}){
  const[tab,setTab]=useState("All");
  const tabs=["All","Draft","Sent","Delivered"];
  const filtered=tab==="All"?orders:orders.filter(o=>tab==="Sent"?["Sent","Awaiting Confirmation","Confirmed"].includes(o.status):o.status===tab);
  return(
    <div style={g.screen}>
      <OfflineBanner offline={offline}/>
      <div style={{background:C.greenDeep,padding:"20px 24px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><Logo/><Badge label="Orders"/></div>
        <div style={{display:"flex"}}>
          {tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"12px 8px",background:"none",border:"none",color:tab===t?C.white:C.sageLt,fontWeight:tab===t?600:400,fontSize:13,cursor:"pointer",borderBottom:`2px solid ${tab===t?C.sageLt:"transparent"}`,fontFamily:font}}>{t}</button>)}
        </div>
      </div>
      <div style={{padding:"16px 20px 0"}}>
        {filtered.length===0&&<div style={{color:C.textLt,textAlign:"center",padding:40,fontSize:14}}>No orders</div>}
        {filtered.map(o=>(
          <div key={o.id} style={{...g.card,cursor:"pointer"}} onClick={()=>{setActiveOrder(o);setScreen("orderdetail");}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{fontSize:15,fontWeight:600,color:C.text}}>{o.supplier}</div>
              <StatusPill status={o.status}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div style={{fontSize:12,color:C.textLt}}>{o.id} · {o.date} · {o.items} items</div>
              <div style={{fontSize:15,fontWeight:700,color:C.text}}>${o.total.toFixed(2)}</div>
            </div>
            {o.shortage&&<div style={{marginTop:8,display:"inline-flex",alignItems:"center",gap:5,background:C.amberPale,borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:600,color:C.amber}}>⚠ Shortage logged</div>}
            {o.openedAt&&<div style={{marginTop:6,fontSize:11,color:C.greenMid}}>✓ Opened at {o.openedAt}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Order Detail ──
function OrderDetail({order,setScreen,onUpdateOrder,onReorder}){
  const items=order.deliveredItems?.length>0?order.deliveredItems:[{name:"Chicken Schnitzel 180g",ordered:5,received:5,unit:"kg"},{name:"Pancetta Sliced",ordered:2,received:2,unit:"kg"},{name:"Salami Calabrese",ordered:1,received:1,unit:"kg"}];
  const[showDeliver,setShowDeliver]=useState(false);
  const[note,setNote]=useState(order.note||"");
  const[deliveryItems,setDeliveryItems]=useState(items.map(i=>({name:i.name,ordered:i.ordered||i.qty||0,received:i.received!==undefined?i.received:(i.ordered||i.qty||0),unit:i.unit||"unit"})));
  const updateReceived=(idx,val)=>setDeliveryItems(prev=>prev.map((it,i)=>i===idx?{...it,received:val}:it));
  const hasShortage=deliveryItems.some(i=>parseFloat(i.received)<parseFloat(i.ordered));
  const confirmDelivery=()=>{onUpdateOrder({...order,status:"Delivered",shortage:hasShortage,deliveredItems:deliveryItems,note});setShowDeliver(false);};
  const handleExport=()=>{const rows=[["Order ID","Supplier","Date","Status","Total"],[order.id,order.supplier,order.date,order.status,order.total.toFixed(2)]];const csv=rows.map(r=>r.join(",")).join("\n");const blob=new Blob([csv],{type:"text/csv"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${order.id}.csv`;a.click();URL.revokeObjectURL(url);};

  if(showDeliver) return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setShowDeliver(false)} title="Confirm delivery"/>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{background:C.successPale,borderRadius:14,padding:"13px 16px",marginBottom:16,border:"1px solid rgba(45,90,61,0.12)"}}><div style={{fontSize:13,fontWeight:600,color:C.greenMid,marginBottom:3}}>Check quantities received</div><div style={{fontSize:12,color:C.textMd}}>Update any items that were short or substituted.</div></div>
        {deliveryItems.map((item,i)=>{const short=parseFloat(item.received)<parseFloat(item.ordered);return(
          <div key={i} style={{...g.card,border:`1px solid ${short?"rgba(184,50,40,0.25)":C.border}`}}>
            <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:10}}>{item.name}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div><label style={g.label}>Ordered</label><div style={{...g.input,color:C.textLt}}>{item.ordered} {item.unit}</div></div>
              <div><label style={g.label}>Received</label><input style={{...g.input,borderColor:short?"rgba(184,50,40,0.4)":C.borderMd}} type="number" value={item.received} onChange={e=>updateReceived(i,e.target.value)}/></div>
            </div>
            {short&&<div style={{marginTop:8,fontSize:12,color:C.red,fontWeight:500}}>Short by {(item.ordered-parseFloat(item.received)).toFixed(1)} {item.unit}</div>}
          </div>
        );})}
        {hasShortage&&<div style={{background:C.amberPale,borderRadius:14,padding:"13px 16px",marginBottom:12,border:"1px solid rgba(160,112,32,0.15)"}}><div style={{fontSize:13,fontWeight:600,color:C.amber,marginBottom:3}}>Shortage detected</div><div style={{fontSize:12,color:"#7a5010"}}>This will be logged against {order.supplier}.</div></div>}
        <button style={g.btnPrimary} onClick={confirmDelivery}>Confirm delivery</button>
      </div>
    </div>
  );

  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("orders")} right={<StatusPill status={order.status}/>}/>
      <div style={{padding:"20px 20px 0"}}>
        <div style={g.card}>
          <div style={{fontSize:11,color:C.textLt,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>Purchase order</div>
          <div style={{fontSize:22,fontWeight:700,color:C.text,letterSpacing:"-0.6px",marginBottom:4}}>{order.supplier}</div>
          <div style={{fontSize:13,color:C.textLt,marginBottom:order.openedAt?14:0}}>{order.id} · {order.date}</div>
          {order.openedAt&&<div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.successPale,borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,color:C.greenMid}}>✓ Opened by supplier at {order.openedAt}</div>}
          {order.status==="Awaiting Confirmation"&&<div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.bluePale,borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,color:C.blue,marginTop:8}}>⏳ Awaiting supplier confirmation</div>}
        </div>
        {order.shortage&&(
          <div style={{background:C.amberPale,borderRadius:14,padding:"13px 16px",marginBottom:10,border:"1px solid rgba(160,112,32,0.15)"}}>
            <div style={{fontSize:13,fontWeight:600,color:C.amber,marginBottom:6}}>⚠ Shortage recorded</div>
            {order.deliveredItems?.filter(i=>parseFloat(i.received)<parseFloat(i.ordered)).map((it,idx)=><div key={idx} style={{fontSize:12,color:"#7a5010",marginBottom:3}}>{it.name}: ordered {it.ordered}, received {it.received} {it.unit}</div>)}
          </div>
        )}
        <div style={g.sectionTitle}>Order items</div>
        <div style={g.cardFlush}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 40px 48px",gap:"8px 12px",padding:"11px 18px",background:C.cream,borderBottom:`1px solid ${C.border}`}}>
            {["Item","Qty","Unit"].map(h=><div key={h} style={{fontSize:10,fontWeight:600,color:C.textLt,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</div>)}
          </div>
          {items.map((item,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 40px 48px",gap:"8px 12px",padding:"14px 18px",borderBottom:i<items.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
              <div style={{fontSize:14,color:C.text,fontWeight:500}}>{item.name}</div>
              <div style={{fontSize:14,color:C.text}}>{item.ordered||item.qty||0}</div>
              <div style={{fontSize:13,color:C.textLt}}>{item.unit||"unit"}</div>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"14px 18px",background:C.cream,borderTop:`1px solid ${C.borderMd}`}}>
            <div style={{fontSize:14,fontWeight:600,color:C.textMd}}>Order total</div>
            <div style={{fontSize:18,fontWeight:700,color:C.greenRich}}>${order.total.toFixed(2)}</div>
          </div>
        </div>
        <div style={{marginBottom:12}}><label style={g.label}>Order note / memo</label><textarea style={{...g.input,minHeight:64,resize:"vertical",fontSize:14}} placeholder="e.g. Rep said prices increasing next month…" value={note} onChange={e=>setNote(e.target.value)}/></div>
        {order.status==="Draft"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}><button style={g.btnSecondary} onClick={()=>setScreen("emailpreview")}>Preview email</button><button style={g.btnPrimary} onClick={()=>onUpdateOrder({...order,status:"Awaiting Confirmation",note})}>Send order</button></div>}
        {(order.status==="Awaiting Confirmation"||order.status==="Sent"||order.status==="Confirmed")&&<button style={{...g.btnPrimary,marginBottom:10,background:C.greenMid}} onClick={()=>setShowDeliver(true)}>✓ Confirm delivery</button>}
        <button style={{...g.btnSecondary,marginBottom:10}} onClick={()=>onReorder(order)}>↻ Reorder</button>
        <button style={{...g.btnSecondary,marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",gap:8}} onClick={handleExport}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Export CSV</button>
      </div>
    </div>
  );
}

// ── Email Preview ──
function EmailPreview({setScreen}){
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("orderdetail")} right={<span style={{fontSize:12,color:C.sageLt}}>Preview</span>}/>
      <div style={{padding:"16px 20px 0"}}>
        <div style={g.card}>
          {[["From","Farro Kitchen Orders <orders@farrokitchen.com.au>"],["To","orders@bertocchi.com.au"],["Subject","Purchase Order — Farro Kitchen — ORD-0038"]].map(([k,v])=>(
            <div key={k} style={{marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${C.border}`}}><div style={{fontSize:10,color:C.textLt,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:4}}>{k}</div><div style={{fontSize:13,color:C.textMd}}>{v}</div></div>
          ))}
        </div>
        <div style={g.cardFlush}>
          <div style={{background:C.greenDeep,padding:"22px 26px"}}><div style={{fontSize:24,fontWeight:700,color:C.white,letterSpacing:"-1px"}}>mise<span style={{color:C.sage,fontWeight:300}}>.</span></div><div style={{fontSize:10,color:C.sageLt,marginTop:3,letterSpacing:"0.1em",textTransform:"uppercase"}}>Purchase Order</div></div>
          <div style={{padding:"22px 24px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:22}}>
              {[["Order ref","ORD-0038"],["Date","7 Jun 2026"],["Venue","Farro Kitchen"],["Supplier","Chobani Foodservice"]].map(([k,v])=>(
                <div key={k}><div style={{fontSize:10,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{k}</div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{v}</div></div>
              ))}
            </div>
            <table style={{width:"100%",borderCollapse:"collapse",marginBottom:18}}>
              <thead><tr style={{background:C.cream}}>{["Item","Qty","Unit"].map(h=><th key={h} style={{padding:"9px 12px",textAlign:"left",fontSize:10,fontWeight:600,color:C.textLt,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${C.borderMd}`}}>{h}</th>)}</tr></thead>
              <tbody>{[["Greek Yoghurt 1kg","4","tub"],["Chobani Flip Strawberry","12","each"],["Coconut Yoghurt 500g","6","tub"]].map(([n,q,u],i)=>(
                <tr key={i} style={{borderBottom:`1px solid ${C.border}`}}><td style={{padding:"11px 12px",fontSize:14,color:C.text,fontWeight:500}}>{n}</td><td style={{padding:"11px 12px",fontSize:14,color:C.text}}>{q}</td><td style={{padding:"11px 12px",fontSize:13,color:C.textLt}}>{u}</td></tr>
              ))}</tbody>
            </table>
            <div style={{background:C.successPale,borderRadius:10,padding:"11px 14px",marginBottom:18,border:"1px solid rgba(45,90,61,0.12)"}}>
              <div style={{fontSize:11,fontWeight:600,color:C.greenMid,marginBottom:4}}>Supplier confirmation link</div>
              <div style={{fontSize:12,color:C.textMd}}>Chobani can tap <span style={{color:C.greenMid,fontWeight:600}}>Confirm order</span> in this email — your order status updates automatically in Mise.</div>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16,fontSize:13,color:C.textMd,lineHeight:1.8}}>Kind regards,<br/><span style={{fontWeight:600,color:C.text}}>Marco Rossi</span><br/>Farro Kitchen · (03) 9876 5432<br/><span style={{fontSize:11,color:C.textLt}}>Sent via mise.</span></div>
          </div>
        </div>
        <button style={{...g.btnPrimary,marginBottom:20}} onClick={()=>setScreen("orderdetail")}>Send order →</button>
      </div>
    </div>
  );
}

// ── Analytics ──
function AnalyticsScreen({setScreen,orders}){
  const[tab,setTab]=useState("spend");
  const maxSpend=Math.max(...spendData.map(d=>d.total));
  const catData=[{label:"Meat & Smallgoods",pct:44,color:C.greenRich},{label:"Fruit & Veg",pct:27,color:C.greenMid},{label:"Dairy & Eggs",pct:18,color:C.sage},{label:"Other",pct:11,color:C.sageLt}];
  const[covers,setCovers]=useState(280);
  const monthlySpend=spendData.reduce((s,d)=>s+d.total,0);
  const costPerCover=covers>0?(monthlySpend/6/covers).toFixed(2):0;
  const shortages=orders.filter(o=>o.shortage).length;
  return(
    <div style={g.screen}>
      <div style={{background:C.greenDeep,padding:"20px 24px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><Logo/><button style={{...g.btnSmGreen,background:"transparent",border:"1px solid rgba(255,255,255,0.2)",fontSize:12}} onClick={()=>setScreen("report")}>Month report</button></div>
        <div style={{display:"flex"}}>
          {[["spend","Spend"],["prices","Prices"],["cogs","Cost/Cover"],["shortages","Shortages"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"11px 4px",background:"none",border:"none",color:tab===id?C.white:C.sageLt,fontWeight:tab===id?600:400,fontSize:12,cursor:"pointer",borderBottom:`2px solid ${tab===id?C.sageLt:"transparent"}`,fontFamily:font}}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{padding:"16px 20px 0"}}>
        {tab==="spend"&&<>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {[["This month","$784","↑ $506 vs May",true],["YTD","$11,374","Jan – Jun 2026",false]].map(([l,v,sub,warn],i)=>(
              <div key={i} style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,padding:"16px"}}><div style={{fontSize:10,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{l}</div><div style={{fontSize:22,fontWeight:700,color:C.text,letterSpacing:"-0.8px",marginBottom:4}}>{v}</div><div style={{fontSize:11,color:warn?C.red:C.textLt}}>{sub}</div></div>
            ))}
          </div>
          <div style={g.sectionTitle}>Monthly spend</div>
          <div style={{...g.card,padding:"20px"}}>
            <div style={{display:"flex",alignItems:"flex-end",gap:8,height:120,marginBottom:12}}>
              {spendData.map((d,i)=>{const h=Math.round((d.total/maxSpend)*100);const isLast=i===spendData.length-1;return(<div key={d.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}><div style={{fontSize:10,fontWeight:600,color:isLast?C.greenRich:C.textLt}}>${(d.total/1000).toFixed(1)}k</div><div style={{width:"100%",height:`${h}%`,background:isLast?C.greenRich:C.sagePale,borderRadius:"6px 6px 4px 4px",minHeight:4}}></div></div>);})}
            </div>
            <div style={{display:"flex",gap:8}}>{spendData.map(d=><div key={d.month} style={{flex:1,textAlign:"center",fontSize:10,color:C.textLt}}>{d.month}</div>)}</div>
          </div>
          <div style={g.sectionTitle}>By category</div>
          <div style={g.card}>{catData.map((c,i)=><div key={i} style={{marginBottom:i<catData.length-1?14:0}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,color:C.text,fontWeight:500}}>{c.label}</span><span style={{fontSize:13,color:C.textLt,fontWeight:600}}>{c.pct}%</span></div><div style={{height:6,background:C.creamMd,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${c.pct}%`,background:c.color,borderRadius:3}}></div></div></div>)}</div>
        </>}
        {tab==="prices"&&<>
          <div style={{...g.card,background:C.amberPale,border:"1px solid rgba(160,112,32,0.15)",marginBottom:16}}><div style={{fontSize:13,fontWeight:600,color:C.amber,marginBottom:4}}>2 price increases detected</div><div style={{fontSize:12,color:"#7a5010"}}>Since your last orders this month.</div></div>
          {mockProducts.map(p=>{const up=p.currentPrice>p.lastPrice,same=p.currentPrice===p.lastPrice;const pctChg=same?0:((p.currentPrice-p.lastPrice)/p.lastPrice*100).toFixed(1);return(
            <div key={p.name} style={{...g.card,border:`1px solid ${up?"rgba(184,50,40,0.2)":C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}><div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{p.name}</div><div style={{fontSize:11,color:C.textLt,marginTop:2}}>{p.supplier}</div></div>{up&&<span style={{background:C.redPale,color:C.red,fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:8}}>↑ {pctChg}%</span>}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {[["Previous",`$${p.lastPrice.toFixed(2)}`,C.offWhite,C.textMd],["Current",`$${p.currentPrice.toFixed(2)}`,C.offWhite,C.text],["Change",same?"—":up?`+$${(p.currentPrice-p.lastPrice).toFixed(2)}`:`-$${(p.lastPrice-p.currentPrice).toFixed(2)}`,same?C.offWhite:up?C.redPale:C.successPale,same?C.textLt:up?C.red:C.greenMid]].map(([l,v,bg,col])=>(
                  <div key={l} style={{background:bg,borderRadius:10,padding:"10px 12px"}}><div style={{fontSize:10,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>{l}</div><div style={{fontSize:15,color:col,fontWeight:700}}>{v}</div></div>
                ))}
              </div>
            </div>
          );})}
        </>}
        {tab==="cogs"&&<>
          <div style={g.card}>
            <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:14}}>Cost per cover estimate</div>
            <div style={{marginBottom:14}}><label style={g.label}>Weekly covers</label><input style={g.input} type="number" value={covers} onChange={e=>setCovers(parseInt(e.target.value)||0)}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["Avg weekly spend",`$${(monthlySpend/6).toFixed(0)}`],["Cost per cover",`$${costPerCover}`]].map(([l,v])=>(
                <div key={l} style={{background:C.offWhite,borderRadius:12,padding:"14px"}}><div style={{fontSize:10,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6}}>{l}</div><div style={{fontSize:22,fontWeight:700,color:C.greenRich,letterSpacing:"-0.6px"}}>{v}</div></div>
              ))}
            </div>
            <div style={{marginTop:14,background:C.bluePale,borderRadius:12,padding:"12px 14px",border:`1px solid ${C.blue}22`}}><div style={{fontSize:12,color:C.blue,fontWeight:600,marginBottom:3}}>Industry benchmark</div><div style={{fontSize:12,color:"#1e4a80"}}>Food cost per cover for café/bistro: typically $8–$14. Your estimate is within range.</div></div>
          </div>
        </>}
        {tab==="shortages"&&<>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,padding:"16px"}}><div style={{fontSize:10,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Shortages</div><div style={{fontSize:28,fontWeight:700,color:shortages>0?C.amber:C.greenMid,letterSpacing:"-1px"}}>{shortages}</div><div style={{fontSize:11,color:C.textLt,marginTop:4}}>of {orders.filter(o=>o.status==="Delivered").length} deliveries</div></div>
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,padding:"16px"}}><div style={{fontSize:10,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Most affected</div><div style={{fontSize:14,fontWeight:700,color:C.text}}>Bertocchi</div><div style={{fontSize:11,color:C.textLt,marginTop:4}}>1 shortage logged</div></div>
          </div>
          {orders.filter(o=>o.shortage).map(o=>(
            <div key={o.id} style={{...g.card,border:"1px solid rgba(160,112,32,0.2)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:14,fontWeight:600,color:C.text}}>{o.supplier}</div><div style={{fontSize:12,color:C.textLt}}>{o.date}</div></div>
              {o.deliveredItems?.filter(i=>parseFloat(i.received)<parseFloat(i.ordered)).map((it,i)=><div key={i} style={{fontSize:12,color:C.amber,marginBottom:3}}>⚠ {it.name}: ordered {it.ordered}, received {it.received} {it.unit}</div>)}
              {o.note&&<div style={{marginTop:8,background:C.offWhite,borderRadius:8,padding:"8px 10px",fontSize:12,color:C.textMd,fontStyle:"italic"}}>"{o.note}"</div>}
            </div>
          ))}
        </>}
      </div>
    </div>
  );
}

// ── Month Report ──
function MonthReport({setScreen}){
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("analytics")} title="June 2026 Report"/>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{background:`linear-gradient(135deg,${C.greenDeep} 0%,#1e4a30 100%)`,borderRadius:20,padding:"24px",marginBottom:16}}>
          <div style={{fontSize:12,color:C.sageLt,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Mise · Monthly Spend Report</div>
          <div style={{fontSize:28,fontWeight:700,color:C.white,letterSpacing:"-1px",marginBottom:4}}>Farro Kitchen</div>
          <div style={{fontSize:14,color:C.sageLt}}>June 2026</div>
          <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.1)"}}><div style={{fontSize:13,color:C.sageLt,marginBottom:4}}>Total spend (Jun)</div><div style={{fontSize:36,fontWeight:700,color:C.white,letterSpacing:"-1.5px"}}>$784</div></div>
        </div>
        {[["Bertocchi Smallgoods","$342","44%",C.greenRich],["Marigold Produce","$216","28%",C.greenMid],["Prom Country Eggs","$98","13%",C.sage],["Chobani Foodservice","$128","16%",C.sageLt]].map(([n,s,p,col])=>(
          <div key={n} style={{...g.card,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:3}}>{n}</div><div style={{height:4,width:100,background:C.creamMd,borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:p,background:col,borderRadius:2}}></div></div></div><div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:700,color:C.text}}>{s}</div><div style={{fontSize:11,color:C.textLt}}>{p}</div></div></div>
        ))}
        <button style={{...g.btnPrimary,marginTop:8,marginBottom:20}}>Export PDF report</button>
      </div>
    </div>
  );
}

// ── Suppliers ──
function SuppliersScreen({setScreen,setActiveSupplier}){
  const[search,setSearch]=useState("");
  const[tab,setTab]=useState("mine");
  const filtered=mockSuppliers.filter(s=>s.name.toLowerCase().includes(search.toLowerCase()));
  const dirFiltered=SUPPLIER_DIRECTORY.filter(s=>s.name.toLowerCase().includes(search.toLowerCase()));
  const dot={critical:C.red,urgent:C.amber,ok:C.sagePale};
  return(
    <div style={g.screen}>
      <div style={{background:C.greenDeep,padding:"20px 24px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><Logo/><button style={{...g.btnSmGreen,background:C.greenAccent,borderRadius:10}} onClick={()=>setScreen("addsupplier")}>+ Add</button></div>
        <input style={{...g.input,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",color:C.white,marginBottom:0}} placeholder="Search suppliers…" value={search} onChange={e=>setSearch(e.target.value)}/>
        <div style={{display:"flex",marginTop:12}}>
          {[["mine","My suppliers"],["directory","Directory"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"11px 8px",background:"none",border:"none",color:tab===id?C.white:C.sageLt,fontWeight:tab===id?600:400,fontSize:13,cursor:"pointer",borderBottom:`2px solid ${tab===id?C.sageLt:"transparent"}`,fontFamily:font}}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{padding:"16px 20px 0"}}>
        {tab==="mine"&&filtered.map(s=>(
          <div key={s.name} style={{...g.card,cursor:"pointer"}} onClick={()=>{setActiveSupplier(s);setScreen("supplierdetail");}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
              <div style={{width:42,height:42,borderRadius:12,background:C.greenDeep,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:C.sageLt,fontSize:11,fontWeight:700}}>{s.initials}</span></div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><div style={{fontSize:15,fontWeight:600,color:C.text}}>{s.name}</div><div style={{width:8,height:8,borderRadius:"50%",background:dot[s.urgency]||C.sagePale,border:s.urgency==="ok"?`1.5px solid ${C.sageLt}`:"none"}}></div></div>
                <div style={{fontSize:12,color:C.textLt,marginBottom:6}}>{s.category}</div>
                <div style={{display:"flex",gap:12}}><span style={{fontSize:11,color:C.textMd}}>⏱ {s.cutoff}</span><span style={{fontSize:11,color:s.reliability>=95?C.greenMid:C.amber}}>★ {s.reliability}%</span></div>
              </div>
            </div>
          </div>
        ))}
        {tab==="directory"&&<>
          <div style={{...g.card,background:C.bluePale,border:`1px solid ${C.blue}22`,marginBottom:16}}><div style={{fontSize:13,fontWeight:600,color:C.blue,marginBottom:3}}>Australian supplier directory</div><div style={{fontSize:12,color:"#1e4a80"}}>Tap any supplier to add them to your directory instantly.</div></div>
          {dirFiltered.map(s=>(
            <div key={s.name} style={{...g.card,cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:42,height:42,borderRadius:12,background:C.greenDeep,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:C.sageLt,fontSize:11,fontWeight:700}}>{s.initials}</span></div>
                <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:3}}>{s.name}</div><div style={{fontSize:12,color:C.textLt}}>{s.category} · {s.phone}</div></div>
                <button style={{...g.btnSmGreen,background:C.greenAccent,fontSize:12,padding:"7px 14px",borderRadius:9}}>+ Add</button>
              </div>
            </div>
          ))}
        </>}
      </div>
    </div>
  );
}

// ── Supplier Detail ──
function SupplierDetail({supplier,setScreen}){
  const[prods,setProds]=useState(mockProducts.filter(p=>p.supplier===supplier.name));
  const togglePin=(name)=>setProds(prev=>prev.map(p=>p.name===name?{...p,pinned:!p.pinned}:p));
  const reliabilityColor=supplier.reliability>=95?C.greenMid:supplier.reliability>=85?C.amber:C.red;
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("suppliers")} right={<button style={{...g.btnSmGreen,background:C.greenAccent,borderRadius:10}} onClick={()=>setScreen("neworder")}>Order</button>}/>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{...g.card,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
            <div style={{width:52,height:52,borderRadius:14,background:C.greenDeep,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:C.sageLt,fontSize:14,fontWeight:700}}>{supplier.initials}</span></div>
            <div><div style={{fontSize:20,fontWeight:700,color:C.text,letterSpacing:"-0.5px"}}>{supplier.name}</div><div style={{fontSize:13,color:C.textLt,marginTop:2}}>{supplier.category}</div></div>
          </div>
          {[["Email",supplier.email],["Cut-off",supplier.cutoff],["Delivery",supplier.delivery],["Min order",`$${supplier.min}`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",paddingBottom:10,borderBottom:`1px solid ${C.border}`,marginBottom:10}}><span style={{fontSize:13,color:C.textLt}}>{k}</span><span style={{fontSize:13,color:C.text,fontWeight:500}}>{v}</span></div>
          ))}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div style={{background:C.offWhite,borderRadius:12,padding:"12px"}}><div style={{fontSize:10,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>Reliability</div><div style={{fontSize:20,fontWeight:700,color:reliabilityColor}}>{supplier.reliability}%</div></div>
            <div style={{background:C.offWhite,borderRadius:12,padding:"12px"}}><div style={{fontSize:10,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>Response</div><div style={{fontSize:15,fontWeight:700,color:C.text}}>{supplier.responseTime}</div></div>
          </div>
        </div>
        <div style={g.sectionTitle}>Products — ★ to pin</div>
        {prods.map(p=>{
          const up=p.currentPrice>p.lastPrice,same=p.currentPrice===p.lastPrice;
          return(
            <div key={p.name} style={{...g.card,border:`1px solid ${p.pinned?"rgba(61,122,82,0.3)":C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}><div style={{fontSize:14,fontWeight:600,color:C.text}}>{p.name}</div>{p.pinned&&<span style={{fontSize:10,color:C.greenMid,fontWeight:700}}>★</span>}</div><div style={{fontSize:11,color:C.textLt}}>Suggested: {p.suggestedQty} {p.unit}</div></div>
                <button onClick={()=>togglePin(p.name)} style={{padding:"5px 10px",borderRadius:8,border:`1px solid ${C.border}`,background:p.pinned?C.successPale:C.offWhite,color:p.pinned?C.greenMid:C.textLt,fontSize:12,cursor:"pointer",fontFamily:font}}>{p.pinned?"Pinned":"Pin"}</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {[["Previous",`$${p.lastPrice.toFixed(2)}`,C.offWhite,C.textMd],["Current",`$${p.currentPrice.toFixed(2)}`,C.offWhite,C.text],["Change",same?"—":up?`+$${(p.currentPrice-p.lastPrice).toFixed(2)}`:`-$${(p.lastPrice-p.currentPrice).toFixed(2)}`,same?C.offWhite:up?C.redPale:C.successPale,same?C.textLt:up?C.red:C.greenMid]].map(([l,v,bg,col])=>(
                  <div key={l} style={{background:bg,borderRadius:10,padding:"10px 12px"}}><div style={{fontSize:10,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>{l}</div><div style={{fontSize:15,color:col,fontWeight:700}}>{v}</div></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Add Supplier ──
function AddSupplier({setScreen}){
  const[form,setForm]=useState({name:"",email:"",phone:"",category:"",method:"email",min:"",cutoffDay:"",cutoffTime:"",delivery:""});
  const u=(k,v)=>setForm(p=>({...p,[k]:v}));
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("suppliers")} right={<span style={{fontSize:12,color:C.sageLt}}>Add supplier</span>}/>
      <div style={{padding:"20px 20px 0"}}>
        {[["Supplier name","name","text","e.g. Bertocchi Smallgoods"],["Email","email","email",""],["Phone","phone","tel",""]].map(([l,k,t,ph])=>(
          <div key={k} style={{marginBottom:16}}><label style={g.label}>{l}</label><input style={g.input} type={t} placeholder={ph} value={form[k]} onChange={e=>u(k,e.target.value)}/></div>
        ))}
        <div style={{marginBottom:16}}><label style={g.label}>Category</label><select style={g.input} value={form.category} onChange={e=>u("category",e.target.value)}><option value="">Select</option>{["Meat & Smallgoods","Dairy & Eggs","Fruit & Veg","Bakery","Seafood","Dry Goods","Beverages","Cleaning","Other"].map(c=><option key={c}>{c}</option>)}</select></div>
        <div style={{marginBottom:16}}>
          <label style={g.label}>Ordering method</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {["Email","Phone","SMS","Portal"].map(m=><button key={m} onClick={()=>u("method",m.toLowerCase())} style={{padding:"12px 14px",borderRadius:12,border:`1.5px solid ${form.method===m.toLowerCase()?C.greenMid:C.border}`,background:form.method===m.toLowerCase()?C.successPale:C.white,color:form.method===m.toLowerCase()?C.greenRich:C.textMd,fontSize:14,fontWeight:form.method===m.toLowerCase()?600:400,cursor:"pointer",fontFamily:font}}>{m}</button>)}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          <div><label style={g.label}>Cut-off day</label><select style={g.input}><option>Select</option>{["Monday","Tuesday","Wednesday","Thursday","Friday","Daily"].map(d=><option key={d}>{d}</option>)}</select></div>
          <div><label style={g.label}>Cut-off time</label><input style={g.input} type="time"/></div>
        </div>
        <div style={{marginBottom:16}}><label style={g.label}>Min order ($)</label><input style={g.input} type="number" placeholder="0.00"/></div>
        <div style={{marginBottom:24}}><label style={g.label}>Delivery days</label><input style={g.input} placeholder="e.g. Tue, Thu"/></div>
        <button style={g.btnPrimary} onClick={()=>setScreen("suppliers")}>Save supplier</button>
      </div>
    </div>
  );
}

// ── Upload ──
function UploadScreen({setScreen}){
  const[stage,setStage]=useState("upload");
  const[loading,setLoading]=useState(false);
  const[loadingMsg,setLoadingMsg]=useState("Reading invoice…");
  const[progress,setProgress]=useState(0);
  const[error,setError]=useState(null);
  const[supplier,setSupplier]=useState(null);
  const[isNewSupplier,setIsNewSupplier]=useState(false);
  const[items,setItems]=useState([]);
  const fileRef=useRef();
  const camRef=useRef();
  const msgs=["Reading invoice…","Identifying supplier…","Extracting line items…","Checking prices…","Almost done…"];

  const runExtraction=async(b64,mtype)=>{
    setLoading(true);setError(null);setProgress(0);
    let mi=0;const iv=setInterval(()=>{setProgress(p=>Math.min(p+7,92));setLoadingMsg(msgs[mi%msgs.length]);mi++;},400);
    try{
      const prompt=`You are an AI assistant for a hospitality ordering app. Analyse this invoice image and extract all data as JSON only. No markdown, no explanation.
{
  "supplier":{"name":"string","email":"string or null","phone":"string or null","address":"string or null","abn":"string or null","category":"one of: Meat & Smallgoods, Dairy & Eggs, Fruit & Veg, Bakery, Seafood, Dry Goods, Beverages, Cleaning, Other"},
  "invoice_date":"string or null",
  "invoice_number":"string or null",
  "line_items":[{"name":"string","qty":number,"unit":"string","unit_price":number}]
}`;
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:mtype,data:b64}},{type:"text",text:prompt}]}]})});
      const data=await res.json();
      clearInterval(iv);setProgress(100);
      const raw=data.content?.map(c=>c.text||"").join("").trim();
      const parsed=JSON.parse(raw.replace(/```json|```/g,"").trim());
      const exists=mockSuppliers.find(s=>s.name.toLowerCase().includes((parsed.supplier?.name||"").toLowerCase().split(" ")[0]));
      setIsNewSupplier(!exists);
      setSupplier({name:parsed.supplier?.name||"Unknown",email:parsed.supplier?.email||"",phone:parsed.supplier?.phone||"",address:parsed.supplier?.address||"",abn:parsed.supplier?.abn||"",category:parsed.supplier?.category||"Other",invoiceDate:parsed.invoice_date||"",invoiceNumber:parsed.invoice_number||"",initials:(parsed.supplier?.name||"??").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(),min:0,cutoff:"",delivery:"",urgency:"ok",reliability:100,responseTime:"Unknown"});
      setItems((parsed.line_items||[]).map(i=>({name:i.name||"",qty:i.qty||1,unit:i.unit||"unit",price:i.unit_price||0})));
      setLoading(false);setStage("review");
    }catch(e){clearInterval(iv);setLoading(false);setError("Could not read the invoice. Please try a clearer photo or different file.");}
  };

  const handleFile=async(e)=>{
    const file=e?.target?.files?.[0];if(!file)return;
    const mtype=file.type||"image/jpeg";
    const reader=new FileReader();
    reader.onload=ev=>runExtraction(ev.target.result.split(",")[1],mtype);
    reader.readAsDataURL(file);
  };

  const handleDemo=()=>{
    setLoading(true);setError(null);setProgress(0);let mi=0;
    const iv=setInterval(()=>{setProgress(p=>Math.min(p+9,92));setLoadingMsg(msgs[mi%msgs.length]);mi++;},350);
    setTimeout(()=>{clearInterval(iv);setProgress(100);setSupplier({name:"Bertocchi Smallgoods",email:"orders@bertocchi.com.au",phone:"(03) 9312 4400",address:"14 Industrial Drive, Thomastown VIC 3074",abn:"41 006 399 525",category:"Meat & Smallgoods",invoiceDate:"28 May 2026",invoiceNumber:"INV-48820",initials:"BS",min:150,cutoff:"Mon–Fri 2pm",delivery:"Tue, Thu, Fri",urgency:"urgent",reliability:92,responseTime:"~2hrs"});setItems([{name:"Chicken Schnitzel 180g",qty:5,unit:"kg",price:52.00},{name:"Pancetta Sliced",qty:2,unit:"kg",price:34.50},{name:"Salami Calabrese",qty:1,unit:"kg",price:28.00},{name:"Prosciutto Crudo",qty:0.5,unit:"kg",price:68.00}]);setIsNewSupplier(false);setLoading(false);setStage("review");},2200);
  };

  const updateItem=(i,k,v)=>setItems(prev=>prev.map((it,idx)=>idx===i?{...it,[k]:v}:it));
  const removeItem=i=>setItems(prev=>prev.filter((_,idx)=>idx!==i));
  const updateSupplier=(k,v)=>setSupplier(prev=>({...prev,[k]:v}));

  if(loading) return(
    <div style={{...g.screen,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:64,height:64,borderRadius:18,background:C.greenDeep,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24}}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.sageLt} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>
      <div style={{fontSize:20,fontWeight:700,color:C.text,marginBottom:6}}>Extracting data</div>
      <div style={{fontSize:14,color:C.textLt,marginBottom:32,minHeight:22}}>{loadingMsg}</div>
      <div style={{width:240,height:3,background:C.creamDark,borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",background:C.greenRich,borderRadius:2,width:`${progress}%`,transition:"width 0.3s ease"}}></div></div>
      <div style={{marginTop:12,fontSize:12,color:C.textHint}}>{progress}%</div>
    </div>
  );

  if(stage==="review"&&supplier) return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setStage("upload")} right={<span style={{fontSize:12,color:C.sageLt}}>Review</span>}/>
      <div style={{padding:"16px 20px 0"}}>
        <div style={{background:isNewSupplier?C.bluePale:C.successPale,borderRadius:16,padding:"14px 16px",marginBottom:14,border:`1px solid ${isNewSupplier?"rgba(37,99,168,0.15)":"rgba(45,90,61,0.12)"}`}}>
          <div style={{fontSize:13,fontWeight:700,color:isNewSupplier?C.blue:C.greenMid,marginBottom:3}}>{isNewSupplier?"✦ New supplier detected — review & save":"✓ Existing supplier matched"}</div>
          <div style={{fontSize:12,color:isNewSupplier?"#1e4a80":C.textMd}}>{isNewSupplier?"This supplier will be added to your directory automatically.":"Catalogue will be updated with these prices."}</div>
        </div>
        <div style={g.sectionTitle}>Supplier details</div>
        <div style={g.card}>
          <div style={{display:"flex",gap:14,marginBottom:14,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>
            <div style={{width:46,height:46,borderRadius:13,background:C.greenDeep,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:C.sageLt,fontSize:13,fontWeight:700}}>{supplier.initials}</span></div>
            <div style={{flex:1}}>
              <input style={{...g.input,fontSize:15,fontWeight:600,padding:"8px 12px",marginBottom:6}} value={supplier.name} onChange={e=>updateSupplier("name",e.target.value)}/>
              <select style={{...g.input,fontSize:13,padding:"7px 12px"}} value={supplier.category} onChange={e=>updateSupplier("category",e.target.value)}>{["Meat & Smallgoods","Dairy & Eggs","Fruit & Veg","Bakery","Seafood","Dry Goods","Beverages","Cleaning","Other"].map(c=><option key={c}>{c}</option>)}</select>
            </div>
          </div>
          {[["Email","email","email"],["Phone","phone","tel"],["ABN","abn","text"]].map(([l,k,t])=>(
            <div key={k} style={{marginBottom:10}}><label style={g.label}>{l}</label><input style={{...g.input,fontSize:14,padding:"10px 14px",background:supplier[k]?C.offWhite:"#fff8f0",borderColor:supplier[k]?C.borderMd:"rgba(160,112,32,0.3)"}} type={t} value={supplier[k]||""} placeholder={supplier[k]?"":"Not found on invoice"} onChange={e=>updateSupplier(k,e.target.value)}/></div>
          ))}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[["Invoice no.",supplier.invoiceNumber||"—"],["Date",supplier.invoiceDate||"—"]].map(([l,v])=>(<div key={l} style={{background:C.offWhite,borderRadius:10,padding:"10px 12px"}}><div style={{fontSize:10,color:C.textLt,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>{l}</div><div style={{fontSize:13,fontWeight:600,color:C.text}}>{v}</div></div>))}
          </div>
        </div>
        <div style={g.sectionTitle}>Line items ({items.length})</div>
        {items.map((item,i)=>(
          <div key={i} style={g.card}>
            <div style={{display:"flex",gap:10,marginBottom:10,alignItems:"center"}}><input style={{...g.input,flex:1,fontSize:14,padding:"10px 14px"}} value={item.name} onChange={e=>updateItem(i,"name",e.target.value)}/><button onClick={()=>removeItem(i)} style={{width:32,height:32,borderRadius:8,background:C.redPale,border:"none",color:C.red,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>{[["Qty","qty","number"],["Unit","unit","text"],["Price $","price","number"]].map(([l,k,t])=><div key={k}><label style={g.label}>{l}</label><input style={{...g.input,fontSize:14,padding:"9px 12px"}} type={t} value={item[k]} onChange={e=>updateItem(i,k,e.target.value)}/></div>)}</div>
          </div>
        ))}
        <button style={{...g.btnSecondary,marginBottom:10}} onClick={()=>setItems(prev=>[...prev,{name:"",qty:1,unit:"unit",price:0}])}>+ Add item</button>
        <div style={{...g.card,background:C.offWhite,marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,color:C.textMd}}>{items.length} products</span><span style={{fontSize:16,fontWeight:700,color:C.greenRich}}>${items.reduce((s,i)=>s+(parseFloat(i.qty)||0)*(parseFloat(i.price)||0),0).toFixed(2)}</span></div></div>
        <button style={{...g.btnPrimary,marginBottom:10}} onClick={()=>setScreen("neworder")}>{isNewSupplier?"Save supplier & create order →":"Update catalogue & create order →"}</button>
        <button style={{...g.btnSecondary,marginBottom:20}} onClick={()=>setStage("upload")}>Upload another invoice</button>
      </div>
    </div>
  );

  return(
    <div style={g.screen}>
      <div style={{background:C.greenDeep,padding:"20px 24px 24px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><Logo/><Badge label="Orders"/></div></div>
      <div style={{padding:"20px 20px 0"}}>
        <input ref={fileRef} type="file" accept=".pdf,image/*,image/heic" style={{display:"none"}} onChange={handleFile}/>
        <input ref={camRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={handleFile}/>
        {error&&<div style={{background:C.redPale,borderRadius:14,padding:"13px 16px",marginBottom:16,border:"1px solid rgba(184,50,40,0.15)"}}><div style={{fontSize:13,fontWeight:600,color:C.red,marginBottom:3}}>Extraction failed</div><div style={{fontSize:12,color:"#8a2020"}}>{error}</div></div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          <button onClick={()=>camRef.current?.click()} style={{background:C.greenRich,borderRadius:18,padding:"24px 16px",textAlign:"center",cursor:"pointer",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
            <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.sageLt} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div>
            <div style={{fontSize:14,fontWeight:600,color:C.white}}>Take photo</div>
            <div style={{fontSize:11,color:C.sageLt}}>Camera opens directly</div>
          </button>
          <button onClick={()=>fileRef.current?.click()} style={{background:C.white,borderRadius:18,padding:"24px 16px",textAlign:"center",cursor:"pointer",border:`1px solid ${C.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
            <div style={{width:44,height:44,borderRadius:12,background:C.offWhite,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.greenMid} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>
            <div style={{fontSize:14,fontWeight:600,color:C.text}}>Choose file</div>
            <div style={{fontSize:11,color:C.textLt}}>PDF, photo or image</div>
          </button>
        </div>
        <div style={g.sectionTitle}>What gets extracted automatically</div>
        {[["Supplier name, email, phone & ABN","From the invoice header"],["All line items, quantities & prices","Every row on the invoice"],["Invoice number & date","For your records"],["New suppliers auto-added","No manual entry needed"]].map(([title,sub])=>(
          <div key={title} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
            <div style={{width:28,height:28,borderRadius:8,background:C.successPale,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:C.greenMid,fontSize:13}}>✓</span></div>
            <div><div style={{fontSize:14,color:C.text,fontWeight:500}}>{title}</div><div style={{fontSize:11,color:C.textLt,marginTop:2}}>{sub}</div></div>
          </div>
        ))}
        <div style={{marginTop:20,paddingBottom:20}}><button style={g.btnPrimary} onClick={handleDemo}>Demo — extract sample invoice</button></div>
      </div>
    </div>
  );
}

// ── New Order ──
function NewOrder({setScreen,reorderData,setReorderData}){
  const[step,setStep]=useState("supplier");
  const[sel,setSel]=useState(null);
  const[orderItems,setOrderItems]=useState(reorderData||[]);
  const[notes,setNotes]=useState("");
  const products=mockProducts.filter(p=>sel&&p.supplier===sel.name).sort((a,b)=>b.pinned-a.pinned);
  const total=orderItems.reduce((s,i)=>s+(parseFloat(i.qty)||0)*i.price,0);
  const minOrder=sel?.min||0;
  const belowMin=minOrder>0&&total<minOrder&&orderItems.length>0;
  const priceAlerts=products.filter(p=>p.currentPrice>p.lastPrice);
  const toggle=(p)=>setOrderItems(prev=>prev.find(i=>i.name===p.name)?prev.filter(i=>i.name!==p.name):[...prev,{...p,qty:p.suggestedQty||p.lastQty||1}]);
  const updateQty=(name,qty)=>setOrderItems(prev=>prev.map(i=>i.name===name?{...i,qty}:i));
  if(step==="supplier") return(
    <div style={g.screen}>
      <BackHeader onBack={()=>{if(setReorderData)setReorderData(null);setScreen("dashboard");}} right={<span style={{fontSize:12,color:C.sageLt}}>New order</span>}/>
      <div style={{padding:"16px 20px 0"}}>
        {reorderData?.length>0&&<div style={{background:C.bluePale,borderRadius:14,padding:"12px 16px",marginBottom:16,border:`1px solid ${C.blue}22`}}><div style={{fontSize:13,fontWeight:600,color:C.blue,marginBottom:2}}>↻ Reorder loaded</div><div style={{fontSize:12,color:"#1e4a80"}}>{reorderData.length} items pre-selected.</div></div>}
        <div style={g.sectionTitle}>Select supplier</div>
        {mockSuppliers.map(s=>(
          <div key={s.name} style={{...g.card,cursor:"pointer"}} onClick={()=>{setSel(s);setStep("items");}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:40,height:40,borderRadius:11,background:C.greenDeep,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:C.sageLt,fontSize:11,fontWeight:700}}>{s.initials}</span></div>
              <div style={{flex:1}}><div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:3}}>{s.name}</div><div style={{fontSize:12,color:C.textLt}}>{s.category} · Min ${s.min}</div></div>
              <span style={{color:C.textHint,fontSize:18}}>›</span>
            </div>
          </div>
        ))}
        <button style={{...g.btnSecondary,marginBottom:20}} onClick={()=>setScreen("upload")}>↑ Upload invoice instead</button>
      </div>
    </div>
  );
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setStep("supplier")} right={<span style={{fontSize:12,color:C.sageLt}}>{sel?.name.split(" ")[0]}</span>}/>
      <div style={{padding:"16px 20px 0"}}>
        {priceAlerts.length>0&&<div style={{background:C.amberPale,borderRadius:14,padding:"12px 16px",marginBottom:14,border:"1px solid rgba(160,112,32,0.15)"}}><div style={{fontSize:12,fontWeight:600,color:C.amber,marginBottom:4}}>⚠ Price alert</div>{priceAlerts.map(p=><div key={p.name} style={{fontSize:12,color:"#7a5010"}}>{p.name} up ${(p.currentPrice-p.lastPrice).toFixed(2)} since last order</div>)}</div>}
        {products.map(p=>{
          const selected=orderItems.find(i=>i.name===p.name);
          return(
            <div key={p.name} style={{...g.card,border:`1px solid ${selected?C.sage:C.border}`}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:selected?14:0}}>
                <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}><div style={{fontSize:14,fontWeight:600,color:C.text}}>{p.name}</div>{p.pinned&&<span style={{fontSize:10,color:C.greenMid}}>★</span>}{p.currentPrice>p.lastPrice&&<span style={{fontSize:10,color:C.red,fontWeight:700}}>↑</span>}</div><div style={{fontSize:12,color:C.textLt}}>${p.currentPrice.toFixed(2)} / {p.unit} · Suggested: {p.suggestedQty}</div></div>
                <button onClick={()=>toggle(p)} style={{width:30,height:30,borderRadius:9,border:`1.5px solid ${selected?C.greenMid:C.borderMd}`,background:selected?C.greenRich:C.white,color:selected?C.white:C.textLt,fontSize:17,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{selected?"✓":"+"}</button>
              </div>
              {selected&&<div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:13,color:C.textLt}}>Qty</span>
                <button onClick={()=>updateQty(p.name,Math.max(0,(parseFloat(selected.qty)||0)-1))} style={{width:30,height:30,borderRadius:8,border:`1px solid ${C.borderMd}`,background:C.offWhite,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                <input style={{...g.input,width:64,textAlign:"center",padding:"7px 10px",fontSize:14}} value={selected.qty} onChange={e=>updateQty(p.name,e.target.value)}/>
                <button onClick={()=>updateQty(p.name,(parseFloat(selected.qty)||0)+1)} style={{width:30,height:30,borderRadius:8,border:`1px solid ${C.borderMd}`,background:C.offWhite,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                <span style={{fontSize:13,color:C.textLt}}>{p.unit}</span>
                <span style={{marginLeft:"auto",fontSize:13,fontWeight:700,color:C.text}}>${((parseFloat(selected.qty)||0)*p.currentPrice).toFixed(2)}</span>
              </div>}
            </div>
          );
        })}
        <div style={{marginBottom:16}}><label style={g.label}>Order notes</label><textarea style={{...g.input,minHeight:72,resize:"vertical"}} placeholder="Delivery instructions…" value={notes} onChange={e=>setNotes(e.target.value)}/></div>
        {orderItems.length>0&&<div style={{...g.card,background:C.offWhite,marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:belowMin?12:0}}><span style={{fontSize:14,color:C.textMd}}>{orderItems.length} item{orderItems.length>1?"s":""}</span><span style={{fontSize:20,fontWeight:700,color:C.greenRich}}>${total.toFixed(2)}</span></div>{belowMin&&<div style={{background:C.amberPale,border:`1px solid rgba(160,112,32,0.2)`,borderRadius:10,padding:"11px 14px"}}><div style={{fontSize:12,fontWeight:600,color:C.amber,marginBottom:3}}>Minimum order not met</div><div style={{fontSize:12,color:"#7a5010"}}>{sel?.name} requires ${minOrder.toFixed(2)} min. Add ${(minOrder-total).toFixed(2)} more.</div></div>}</div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,paddingBottom:20}}>
          <button style={g.btnSecondary} onClick={()=>setScreen("dashboard")}>Save draft</button>
          <button style={{...g.btnPrimary,opacity:belowMin||orderItems.length===0?0.4:1,cursor:belowMin||orderItems.length===0?"not-allowed":"pointer"}} disabled={belowMin||orderItems.length===0} onClick={()=>setScreen("emailpreview")}>Preview & send</button>
        </div>
      </div>
    </div>
  );
}

// ── Upgrade ──
function UpgradeScreen({setScreen}){
  const[selected,setSelected]=useState("pro");
  const plans=[
    {id:"starter",name:"Starter",price:"$29",features:["1 venue","Up to 10 suppliers","Order history 90 days","Email orders","Basic analytics"],color:C.sage},
    {id:"pro",name:"Pro",price:"$59",badge:"Most popular",features:["1 venue","Unlimited suppliers","Full history","AI invoice extraction","Advanced analytics","Price alerts","Multi-user (5)","Cost per cover","Priority support"],color:C.greenRich},
    {id:"multi",name:"Multi-venue",price:"$120",features:["Up to 5 venues","Everything in Pro","Venue reporting","Dedicated onboarding"],color:C.greenDeep},
  ];
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("venue")} title="Upgrade Mise"/>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{textAlign:"center",marginBottom:24}}><div style={{fontSize:20,fontWeight:700,color:C.text,letterSpacing:"-0.5px",marginBottom:6}}>Choose your plan</div><div style={{fontSize:13,color:C.textLt}}>All plans include a 30-day free trial</div></div>
        {plans.map(plan=>(
          <div key={plan.id} onClick={()=>setSelected(plan.id)} style={{...g.card,border:`2px solid ${selected===plan.id?plan.color:C.border}`,cursor:"pointer",position:"relative",marginBottom:12}}>
            {plan.badge&&<div style={{position:"absolute",top:-10,right:16,background:C.greenRich,color:C.white,fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20}}>{plan.badge}</div>}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div><div style={{fontSize:16,fontWeight:700,color:C.text}}>{plan.name}</div><div style={{display:"flex",alignItems:"baseline",gap:3,marginTop:4}}><span style={{fontSize:28,fontWeight:700,color:plan.color,letterSpacing:"-1px"}}>{plan.price}</span><span style={{fontSize:13,color:C.textLt}}>/ month</span></div></div>
              <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${selected===plan.id?plan.color:C.borderMd}`,background:selected===plan.id?plan.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:4}}>{selected===plan.id&&<span style={{color:C.white,fontSize:12}}>✓</span>}</div>
            </div>
            {plan.features.map(f=><div key={f} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div style={{width:16,height:16,borderRadius:5,background:C.successPale,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:C.greenMid,fontSize:10}}>✓</span></div><span style={{fontSize:13,color:C.textMd}}>{f}</span></div>)}
          </div>
        ))}
        <div style={{...g.card,background:C.amberPale,border:"1px solid rgba(160,112,32,0.15)",marginBottom:16}}><div style={{fontSize:13,fontWeight:600,color:C.amber,marginBottom:4}}>Your data is safe</div><div style={{fontSize:12,color:"#7a5010",lineHeight:1.5}}>Your 4 supplier catalogues, 41 orders, and 6 months of price history are stored and accessible when you upgrade.</div></div>
        <button style={{...g.btnPrimary,marginBottom:10}}>Start free trial — no card required</button>
        <button style={{...g.btnSecondary,marginBottom:24,fontSize:13}} onClick={()=>setScreen("venue")}>Maybe later</button>
      </div>
    </div>
  );
}

// ── Feedback ──
function FeedbackScreen({setScreen,orderCount}){
  const[mode,setMode]=useState(orderCount>=5?"prompt":"form");
  const[category,setCategory]=useState("general");
  const[msg,setMsg]=useState("");
  const[sent,setSent]=useState(false);
  if(sent) return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("venue")} title="Feedback"/>
      <div style={{padding:"60px 20px 0",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:16}}>✦</div>
        <div style={{fontSize:20,fontWeight:700,color:C.text,marginBottom:8}}>Thank you!</div>
        <div style={{fontSize:14,color:C.textLt,lineHeight:1.6,maxWidth:280,margin:"0 auto"}}>Your feedback helps us build a better Mise. We'll review it and follow up if needed.</div>
        <button style={{...g.btnPrimary,marginTop:32}} onClick={()=>setScreen("venue")}>Done</button>
      </div>
    </div>
  );
  if(mode==="prompt") return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("venue")} title="You've sent 5 orders!"/>
      <div style={{padding:"32px 20px 0",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:16}}>🎉</div>
        <div style={{fontSize:20,fontWeight:700,color:C.text,marginBottom:8,letterSpacing:"-0.4px"}}>You've sent 5 orders with Mise</div>
        <div style={{fontSize:14,color:C.textLt,lineHeight:1.6,maxWidth:280,margin:"0 auto 32px"}}>We'd love to hear how it's going for you and your team.</div>
        <button style={{...g.btnPrimary,marginBottom:12}} onClick={()=>window.open("https://apps.apple.com","_blank")}>Leave a review on App Store</button>
        <button style={{...g.btnSecondary}} onClick={()=>setMode("form")}>Send us feedback instead</button>
      </div>
    </div>
  );
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("venue")} title="Send feedback"/>
      <div style={{padding:"20px 20px 0"}}>
        <div style={g.sectionTitle}>Category</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
          {[["general","General"],["bug","Bug report"],["feature","Feature request"],["pricing","Pricing"]].map(([id,label])=>(
            <button key={id} onClick={()=>setCategory(id)} style={{padding:"11px 14px",borderRadius:12,border:`1.5px solid ${category===id?C.greenMid:C.border}`,background:category===id?C.successPale:C.white,color:category===id?C.greenRich:C.textMd,fontSize:14,fontWeight:category===id?600:400,cursor:"pointer",fontFamily:font}}>{label}</button>
          ))}
        </div>
        <div style={{marginBottom:20}}><label style={g.label}>Your feedback</label><textarea style={{...g.input,minHeight:140,resize:"vertical"}} placeholder="Tell us what's working, what isn't, or what you'd love to see…" value={msg} onChange={e=>setMsg(e.target.value)}/></div>
        <button style={{...g.btnPrimary,opacity:msg.length<10?0.4:1,marginBottom:24}} disabled={msg.length<10} onClick={()=>setSent(true)}>Send feedback</button>
      </div>
    </div>
  );
}

// ── What's New ──
function WhatsNewScreen({setScreen,onSeen}){
  useEffect(()=>{onSeen();},[]);
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("venue")} title="What's new"/>
      <div style={{padding:"20px 20px 0"}}>
        {WHATS_NEW.map((release,i)=>(
          <div key={release.version} style={{marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <div style={{background:i===0?C.greenRich:C.creamMd,borderRadius:10,padding:"4px 12px"}}><span style={{fontSize:13,fontWeight:700,color:i===0?C.white:C.textMd}}>{release.version}</span></div>
              <span style={{fontSize:12,color:C.textLt}}>{release.date}</span>
              {i===0&&<Badge label="Latest"/>}
            </div>
            {release.items.map((item,j)=>(
              <div key={j} style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}>
                <div style={{width:20,height:20,borderRadius:6,background:i===0?C.successPale:C.creamMd,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{color:i===0?C.greenMid:C.textLt,fontSize:11}}>✓</span></div>
                <span style={{fontSize:14,color:C.textMd,lineHeight:1.4}}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Onboarding Emails ──
function OnboardingEmails({setScreen}){
  const emails=[
    {day:"Day 1",subject:"Welcome to Mise — let's get you set up",preview:"Your 30-day free trial has started. Here's how to get your first order out in under 5 minutes.",color:C.greenRich},
    {day:"Day 3",subject:"Have you sent your first order yet?",preview:"It only takes 2 minutes. Upload an invoice or choose a supplier and we'll do the rest.",color:C.greenMid},
    {day:"Day 7",subject:"Your first week with Mise",preview:"Here's a summary of what you've accomplished this week — and what's waiting for you.",color:C.sage},
  ];
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("venue")} title="Onboarding emails"/>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{...g.card,background:C.offWhite,marginBottom:20}}><div style={{fontSize:13,color:C.textMd,lineHeight:1.5}}>New users receive these three emails during their first week to guide them to the first value moment.</div></div>
        {emails.map((e,i)=>(
          <div key={i} style={g.card}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <div style={{width:40,height:40,borderRadius:11,background:e.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:C.white,fontSize:12,fontWeight:700}}>{e.day}</span></div>
              <div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{e.subject}</div></div>
            </div>
            <div style={{background:C.offWhite,borderRadius:10,padding:"10px 14px",fontSize:12,color:C.textMd,lineHeight:1.5}}>{e.preview}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Team ──
function TeamScreen({setScreen}){
  const[showAdd,setShowAdd]=useState(false);
  const roles=["Admin","Head Chef","Staff","View only"];
  const roleColors={Admin:{bg:"#e8f0ea",color:C.greenRich},"Head Chef":{bg:C.bluePale,color:C.blue},Staff:{bg:C.creamMd,color:C.textMd},"View only":{bg:C.creamMd,color:C.textLt}};
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("venue")} title="Team access"/>
      <div style={{padding:"20px 20px 0"}}>
        {mockUsers.map(u=>(
          <div key={u.id} style={g.card}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:42,height:42,borderRadius:12,background:C.greenDeep,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:C.sageLt,fontSize:12,fontWeight:700}}>{u.initials}</span></div>
              <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:3}}>{u.name}</div><div style={{fontSize:12,color:C.textLt}}>{u.email}</div></div>
              <span style={{fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:8,background:roleColors[u.role]?.bg,color:roleColors[u.role]?.color}}>{u.role}</span>
            </div>
          </div>
        ))}
        {showAdd?(
          <div style={g.card}>
            <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:14}}>Invite team member</div>
            <div style={{marginBottom:14}}><label style={g.label}>Email</label><input style={g.input} type="email" placeholder="chef@venue.com.au"/></div>
            <div style={{marginBottom:16}}><label style={g.label}>Role</label><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{roles.map(r=><button key={r} style={{padding:"10px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:C.offWhite,color:C.textMd,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:font}}>{r}</button>)}</div></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><button style={g.btnSecondary} onClick={()=>setShowAdd(false)}>Cancel</button><button style={g.btnPrimary} onClick={()=>setShowAdd(false)}>Send invite</button></div>
          </div>
        ):<button style={g.btnSecondary} onClick={()=>setShowAdd(true)}>+ Invite team member</button>}
      </div>
    </div>
  );
}

// ── Xero / MYOB ──
function IntegrationsScreen({setScreen}){
  const[xero,setXero]=useState(false);
  const[myob,setMyob]=useState(false);
  return(
    <div style={g.screen}>
      <BackHeader onBack={()=>setScreen("venue")} title="Integrations"/>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{...g.card,background:C.offWhite,marginBottom:20}}><div style={{fontSize:13,color:C.textMd,lineHeight:1.5}}>Connect your accounting software to export orders as bills or purchase orders automatically.</div></div>
        {[{name:"Xero",desc:"Export orders as bills directly to Xero",logo:"X",color:"#1AB4D7",connected:xero,toggle:()=>setXero(p=>!p)},{name:"MYOB",desc:"Send purchase orders to MYOB AccountRight",logo:"M",color:"#8B1F8C",connected:myob,toggle:()=>setMyob(p=>!p)}].map(int=>(
          <div key={int.name} style={g.card}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:46,height:46,borderRadius:12,background:int.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:C.white,fontSize:18,fontWeight:800}}>{int.logo}</span></div>
              <div style={{flex:1}}><div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:3}}>{int.name}</div><div style={{fontSize:12,color:C.textLt}}>{int.desc}</div></div>
              <button onClick={int.toggle} style={{padding:"9px 18px",borderRadius:10,border:"none",background:int.connected?C.successPale:C.greenRich,color:int.connected?C.greenMid:C.white,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font}}>{int.connected?"Connected":"Connect"}</button>
            </div>
            {int.connected&&<div style={{marginTop:12,background:C.successPale,borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}><span style={{color:C.greenMid,fontSize:14}}>✓</span><span style={{fontSize:12,color:C.greenMid,fontWeight:500}}>Connected · Orders will sync automatically</span></div>}
          </div>
        ))}
        <div style={{...g.card,background:C.creamMd,border:"none",marginTop:8}}>
          <div style={{fontSize:13,fontWeight:600,color:C.textMd,marginBottom:6}}>Coming soon</div>
          {["QuickBooks","Reckon","Lightspeed POS","Deputy"].map(n=><div key={n} style={{fontSize:13,color:C.textLt,marginBottom:4}}>· {n}</div>)}
        </div>
      </div>
    </div>
  );
}

// ── Venue ──
function VenueScreen({setScreen,whatsNewBadge}){
  const[form,setForm]=useState({venue:"Farro Kitchen",trading:"Farro Kitchen",contact:"Marco Rossi",email:"orders@farrokitchen.com.au",phone:"(03) 9876 5432",address:"22 Smith Street, Fitzroy VIC 3065",abn:"45 234 567 890",notes:"Please deliver before 7am. Side door entry, ask for Marco."});
  const u=(k,v)=>setForm(p=>({...p,[k]:v}));
  const menuItems=[
    {label:"Team access",sub:"3 members",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.greenMid} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M19 8v6M16 11h6"/></svg>,bg:C.successPale,screen:"team"},
    {label:"Integrations",sub:"Xero, MYOB",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,bg:C.bluePale,screen:"integrations"},
    {label:"What's new",sub:"v1.3.0 released",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.purple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,bg:C.purplePale,screen:"whatsnew",badge:whatsNewBadge},
    {label:"Onboarding emails",sub:"3-email sequence",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.warmNeutral} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,bg:C.creamMd,screen:"onboardingemails"},
    {label:"Rate Mise",sub:"App Store review",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,bg:"#fffbeb",screen:"feedback"},
    {label:"Send feedback",sub:"Suggestions & bugs",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.sage} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,bg:C.sagePale,screen:"feedback"},
    {label:"Upgrade to Pro",sub:`${TRIAL_DAYS} days left in trial`,icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.purple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,bg:C.purplePale,screen:"upgrade"},
  ];
  return(
    <div style={g.screen}>
      <div style={{background:C.greenDeep,padding:"20px 24px 28px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><Logo/><Badge label="Orders"/></div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:52,height:52,borderRadius:14,background:C.greenMid,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:C.sageLt,fontSize:16,fontWeight:700}}>FK</span></div>
          <div><div style={{fontSize:20,fontWeight:700,color:C.white,letterSpacing:"-0.5px"}}>Farro Kitchen</div><div style={{fontSize:13,color:C.sageLt,marginTop:2}}>ABN 45 234 567 890</div></div>
        </div>
      </div>
      <div style={{padding:"20px 20px 0"}}>
        {menuItems.map(item=>(
          <button key={item.label} style={{...g.card,width:"100%",textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,border:`1px solid ${C.border}`,position:"relative"}} onClick={()=>setScreen(item.screen)}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:40,height:40,borderRadius:11,background:item.bg,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                {item.icon}
                {item.badge&&<span style={{position:"absolute",top:-3,right:-3,width:8,height:8,borderRadius:"50%",background:C.purple,border:`1.5px solid ${C.white}`}}></span>}
              </div>
              <div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{item.label}</div><div style={{fontSize:12,color:C.textLt}}>{item.sub}</div></div>
            </div>
            <span style={{color:C.textHint,fontSize:18}}>›</span>
          </button>
        ))}
        <div style={{marginTop:8}}>
          {[["Venue / business name","venue","text"],["Trading name","trading","text"],["Contact person","contact","text"],["Ordering email","email","email"],["Phone","phone","tel"],["Address","address","text"],["ABN","abn","text"]].map(([l,k,t])=>(
            <div key={k} style={{marginBottom:14}}><label style={g.label}>{l}</label><input style={g.input} type={t} value={form[k]} onChange={e=>u(k,e.target.value)}/></div>
          ))}
          <div style={{marginBottom:24}}><label style={g.label}>Default delivery notes</label><textarea style={{...g.input,minHeight:80,resize:"vertical"}} value={form.notes} onChange={e=>u("notes",e.target.value)}/></div>
          <button style={g.btnPrimary}>Save venue profile</button>
          <div style={{marginTop:12,paddingBottom:20}}><button style={{...g.btnSecondary,color:C.red,border:`1px solid rgba(184,50,40,0.2)`}}>Sign out</button></div>
        </div>
      </div>
    </div>
  );
}

// ── App Root ──
export default function App(){
  const[authed,setAuthed]=useState(false);
  const[screen,setScreen]=useState("dashboard");
  const[orders,setOrders]=useState(initialOrders);
  const[activeOrder,setActiveOrder]=useState(initialOrders[0]);
  const[activeSupplier,setActiveSupplier]=useState(mockSuppliers[0]);
  const[reorderData,setReorderData]=useState(null);
  const[trialDismissed,setTrialDismissed]=useState(false);
  const[notifs,setNotifs]=useState(initialNotifs);
  const[whatsNewBadge,setWhatsNewBadge]=useState(true);
  const[offline,setOffline]=useState(false);
  const[syncing,setSyncing]=useState(false);

  const notifCount=notifs.filter(n=>!n.read).length;
  const orderCount=orders.filter(o=>o.status!=="Draft").length;

  const handleUpdateOrder=(updated)=>{setOrders(prev=>prev.map(o=>o.id===updated.id?updated:o));setActiveOrder(updated);};
  const handleReorder=(order)=>{
    const items=order.deliveredItems?.length>0?order.deliveredItems.map(i=>({...i,price:52,lastQty:i.ordered,suggestedQty:i.ordered,currentPrice:52,unit:i.unit||"kg"})):mockProducts.filter(p=>p.supplier===order.supplier);
    setReorderData(items);setScreen("neworder");
  };

  // Simulate offline toggle for demo
  const toggleOffline=()=>{
    if(offline){setSyncing(true);setTimeout(()=>{setOffline(false);setSyncing(false);},2000);}
    else setOffline(true);
  };

  if(!authed) return <div style={g.app}><AuthScreen onLogin={()=>setAuthed(true)}/></div>;

  const noNav=["orderdetail","emailpreview","addsupplier","neworder","supplierdetail","team","upgrade","report","notifications","feedback","whatsnew","onboardingemails","integrations"].includes(screen);

  const screens={
    dashboard:<Dashboard setScreen={setScreen} setActiveOrder={o=>setActiveOrder(o)} orders={orders} notifCount={notifCount} trialDismissed={trialDismissed} onDismissTrial={()=>setTrialDismissed(true)} offline={offline} syncing={syncing}/>,
    orders:<OrdersScreen setScreen={setScreen} setActiveOrder={o=>setActiveOrder(o)} orders={orders} offline={offline}/>,
    orderdetail:<OrderDetail order={activeOrder} setScreen={setScreen} onUpdateOrder={handleUpdateOrder} onReorder={handleReorder}/>,
    emailpreview:<EmailPreview setScreen={setScreen}/>,
    analytics:<AnalyticsScreen setScreen={setScreen} orders={orders}/>,
    report:<MonthReport setScreen={setScreen}/>,
    suppliers:<SuppliersScreen setScreen={setScreen} setActiveSupplier={s=>setActiveSupplier(s)}/>,
    supplierdetail:<SupplierDetail supplier={activeSupplier} setScreen={setScreen}/>,
    addsupplier:<AddSupplier setScreen={setScreen}/>,
    upload:<UploadScreen setScreen={setScreen}/>,
    neworder:<NewOrder setScreen={setScreen} reorderData={reorderData} setReorderData={setReorderData}/>,
    venue:<VenueScreen setScreen={setScreen} whatsNewBadge={whatsNewBadge}/>,
    team:<TeamScreen setScreen={setScreen}/>,
    upgrade:<UpgradeScreen setScreen={setScreen}/>,
    notifications:<NotificationCentre setScreen={setScreen} notifs={notifs} setNotifs={setNotifs}/>,
    feedback:<FeedbackScreen setScreen={setScreen} orderCount={orderCount}/>,
    whatsnew:<WhatsNewScreen setScreen={setScreen} onSeen={()=>setWhatsNewBadge(false)}/>,
    onboardingemails:<OnboardingEmails setScreen={setScreen}/>,
    integrations:<IntegrationsScreen setScreen={setScreen}/>,
  };

  return(
    <div style={g.app}>
      {/* Offline demo toggle */}
      <button onClick={toggleOffline} style={{position:"fixed",bottom:96,right:8,zIndex:200,background:offline?C.amber:C.greenMid,color:C.white,border:"none",borderRadius:10,padding:"6px 10px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:font,opacity:0.85}}>
        {offline?"Go online":"Go offline"}
      </button>
      {screens[screen]||screens.dashboard}
      {!noNav&&<BottomNav screen={screen} setScreen={setScreen} notifCount={notifCount} whatsNewBadge={whatsNewBadge}/>}
    </div>
  );
}