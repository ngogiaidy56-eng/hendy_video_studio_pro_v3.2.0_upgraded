import {useState} from 'react';
import {verifyTelegram} from '../../services/telegram';

export function SystemControlPanel(){
  const [status,setStatus]=useState('LOCKED');
  const [msg,setMsg]=useState('');
  const [otp,setOtp]=useState('');
  const [initData,setInitData]=useState('');

  async function login(){
    try{
      const tg=window.Telegram?.WebApp;
      const r=await verifyTelegram();
      if(r.ok && ['admin','maintainer'].includes(r.user?.role)){
        setInitData(tg?.initData || '');
        setStatus('TELEGRAM VERIFIED');
      }else{
        setStatus('ACCESS DENIED');
      }
    }catch(e){
      setMsg(e instanceof Error?e.message:'Login failed');
    }
  }

  async function verify(){
    if(!initData){setMsg('Hãy Telegram Verify trước.');return;}
    const base=import.meta.env.VITE_API_BASE_URL || '';
    const r=await fetch(base+'/api/v1/auth/mcp/otp/verify',{
      method:'POST',
      headers:{'content-type':'application/json','x-telegram-init-data':initData},
      body:JSON.stringify({otp})
    });
    const j=await r.json();
    setStatus(j.ok?'MAINTENANCE':'OTP INVALID');
  }

  return <section className="panel stack"><div className="row"><strong>System Control</strong><span className="muted">{status}</span></div><div className="row"><button className="button" onClick={login}>Telegram Verify</button><input placeholder="OTP 60s" value={otp} onChange={e=>setOtp(e.target.value)}/><button className="button primary" disabled={!initData} onClick={verify}>Verify OTP</button></div>{msg&&<div className="muted">{msg}</div>}</section>;
}
