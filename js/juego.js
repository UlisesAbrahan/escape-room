/* Motor del juego: tiempo, estado, validación y pantallas finales. */
const CONFIG={tiempoDesafio:420,tiempoGlobal:2400,total:9,claveAdmin:'docente2026',claveDocente:'DOCENTE',clave:'sb_estado'};
const Juego=(()=>{
const K=CONFIG.clave;let iv;
const leer=()=>{try{return JSON.parse(sessionStorage.getItem(K))}catch(e){return null}};
const guardar=s=>sessionStorage.setItem(K,JSON.stringify(s));
const ir=u=>location.replace(u);
const fmt=t=>{t=Math.max(0,Math.ceil(t));return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')};
function nuevo(){const t=Date.now();return{actual:1,inicioD:t,inicioG:t,resuelto:false,res:[],fake:Math.floor(Math.random()*9),pesadas:[],estado:'jugando',fin:null}}
function tiempos(s){const n=Date.now();return{g:CONFIG.tiempoGlobal-(n-s.inicioG)/1000,d:CONFIG.tiempoDesafio-(n-s.inicioD)/1000}}
function expirado(s){const t=tiempos(s);if(t.g<=0||(!s.resuelto&&t.d<=0)){s.estado='perdido';s.motivo='tiempo';s.fin=Date.now();guardar(s);final(s);return true}return false}
function final(s){clearInterval(iv);document.body.className='fin';
 if(s.estado==='victoria'){const tot=Math.round((s.fin-s.inicioG)/1000);
  document.body.innerHTML=`<div class="final ok"><div class="candado"><span></span><b></b></div><h1>SISTEMA RESTAURADO</h1><h2>MISIÓN CUMPLIDA</h2><p>Tiempo total utilizado: <strong>${fmt(tot)}</strong></p><ul class="resumen">${s.res.map(r=>`<li><span>✔ Desafío ${r.n}: ${DESAFIOS[r.n].titulo}</span><em>${fmt(r.seg)}</em></li>`).join('')}</ul><button class="btn sec" onclick="Juego.reiniciar()">REINICIAR JUEGO</button></div>`}
 else document.body.innerHTML=`<div class="final mal"><div class="calavera"><i></i><i></i><b></b></div><h1>GAME OVER — ${s.motivo==='intentos'?'INTENTOS AGOTADOS':'TIEMPO AGOTADO'}</h1><p>${s.motivo==='intentos'?'El sistema detectó demasiados intentos fallidos y quedó bloqueado definitivamente.':'El sistema permanece bloqueado. No lograron recuperar todos los archivos a tiempo.'}</p><p class="peq">Desafíos superados: ${s.res.length}/${CONFIG.total}. </p><button class="btn sec" onclick="Juego.reiniciar()">REINICIAR JUEGO</button><p class="peq">Requiere la clave del docente.</p></div>`}
function reiniciar(){const c=prompt('Clave del docente para reiniciar TODO el juego:');if(c===null)return;
 if(c.trim().toUpperCase()!==CONFIG.claveDocente){alert('Clave incorrecta.');return}
 sessionStorage.removeItem(K);location.replace('index.html')}
function pagina(n){const s=leer();if(!s)return ir('index.html');
 if(s.estado!=='jugando')return final(s);
 if(expirado(s))return;
 if(n!==s.actual)return ir('desafio'+s.actual+'.html');
 montar(n,s)}
function montar(n,s){const d=DESAFIOS[n];
 document.getElementById('app').innerHTML=`<header class="top"><div class="marca">SISTEMA BLOQUEADO</div><div class="prog">${Array.from({length:CONFIG.total},(_,i)=>`<span class="pt" id="pt${i+1}"></span>`).join('')}</div><div class="tiempos"><span><span class="reloj" id="rd">--:--</span><small>desafío</small></span><span><span class="tg" id="rg">--:--</span><small>total</small></span></div></header><div class="barra"><i id="bar"></i></div>
<main class="panel" id="panel"><h2>Desafío ${n} de ${CONFIG.total}: ${d.titulo}</h2><div id="contenido"></div><div class="resp"><input id="ans" autocomplete="off" placeholder="${d.ph||'Respuesta'}"><button class="btn" id="ver">VERIFICAR RESPUESTA</button></div><div class="msg" id="msg"></div><button class="btn verde" id="sig" disabled>SIGUIENTE DESAFÍO</button> <button class="btn sec" id="rei" hidden>REINICIAR JUEGO</button></main>`;
 const $=i=>document.getElementById(i),panel=$('panel'),ans=$('ans');
 $('contenido').innerHTML=d.html;ans.hidden=!!d.ocultarInput;d.init&&d.init($('contenido'));
 const resuelto=()=>{panel.classList.add('ok');ans.disabled=$('ver').disabled=true;$('msg').className='msg bien';$('msg').textContent='CLAVE VALIDADA';$('rei').hidden=false;$('rei').onclick=reiniciar;
  if(n<CONFIG.total){$('sig').disabled=false;$('sig').onclick=()=>{const t=leer();if(!t.resuelto||t.actual!==n)return;$('sig').disabled=true;t.actual=n+1;t.resuelto=false;t.fallos=0;t.inicioD=Date.now();guardar(t);location.href='desafio'+t.actual+'.html'}}};
 const verificar=()=>{if($('ver').disabled)return;const t=leer();if(!t||t.estado!=='jugando'||t.resuelto||expirado(t))return;
  const raw=ans.value.trim().toLowerCase();if(!raw){$('msg').className='msg mal';$('msg').textContent=d.ocultarInput?'Seleccionen una opción primero.':'Introduzcan una respuesta.';return}
  const r=d.check?d.check(raw,t):raw===d.respuesta.toLowerCase();
  if(r===true){const now=Date.now();t.resuelto=true;t.res.push({n,seg:Math.round((now-t.inicioD)/1000)});if(n===CONFIG.total){t.estado='victoria';t.fin=now}guardar(t);resuelto();d.exito&&d.exito($('contenido'));
   if(n===CONFIG.total){$('msg').textContent='CLAVE VALIDADA — restaurando sistema…';setTimeout(()=>final(t),2500)}}
  else{let extra='';const libre=r&&r.libre;
   if(d.intentos&&!libre){t.fallos=(t.fallos||0)+1;if(t.fallos>=d.intentos){t.estado='perdido';t.motivo='intentos';t.fin=Date.now();guardar(t);final(t);return}guardar(t);extra=' Intentos restantes: '+(d.intentos-t.fallos)+'.'}
   const m=r&&r.msg?r.msg:typeof r==='string'?r:'respuesta incorrecta';
   $('msg').className='msg mal';$('msg').textContent='ACCESO DENEGADO: '+m+extra;panel.classList.remove('mal');void panel.offsetWidth;panel.classList.add('mal');if(d.espera){const b=$('ver');let k=d.espera;b.disabled=true;b.textContent='ESPERE '+k+' s';const w=setInterval(()=>{if(--k>0)b.textContent='ESPERE '+k+' s';else{clearInterval(w);b.disabled=false;b.textContent='VERIFICAR RESPUESTA'}},1000)}}};
 $('ver').onclick=verificar;ans.onkeydown=e=>{if(e.key==='Enter')verificar()};
 if(d.intentos&&!s.resuelto){$('msg').textContent='Intentos disponibles: '+(d.intentos-(s.fallos||0));$('msg').className='msg'}
 if(s.resuelto)resuelto();
 const tick=()=>{const t=leer();if(!t||t.estado!=='jugando')return;if(expirado(t))return;
  const q=tiempos(t);$('rg').textContent=fmt(q.g);
  for(let i=1;i<=CONFIG.total;i++)$('pt'+i).className='pt'+(i<t.actual||(i===t.actual&&t.resuelto)?' hecho':i===t.actual?' cur':'');
  if(t.resuelto){$('rd').textContent='✔';$('bar').style.width='100%';document.body.className='';return}
  $('rd').textContent=fmt(q.d);$('bar').style.width=Math.max(0,q.d/CONFIG.tiempoDesafio*100)+'%';
  document.body.className=q.d<=30?'critico':q.d<60?'aviso':''};
 tick();iv=setInterval(tick,250)}
function index(){
 if(/[?&]admin/.test(location.search)){const c=prompt('Clave de administración:');if(c===CONFIG.claveAdmin){sessionStorage.removeItem(K);alert('Partida reiniciada.')}return ir('index.html')}
 const s=leer();if(s&&s.estado!=='jugando')return final(s);
 const b=document.getElementById('iniciar');if(s)b.textContent='CONTINUAR MISIÓN';
 b.onclick=()=>{if(!leer())guardar(nuevo());location.href='desafio'+leer().actual+'.html'};
 const L=['> escaneando servidores de la escuela...','> contraseña principal: FRAGMENTADA','> archivos dañados detectados: 9','!! ERROR: acceso denegado','> esperando operadores...'],t=document.getElementById('term');let i=0;
 (function sig(){if(i<L.length){const p=document.createElement('div');p.textContent=L[i];if(L[i][0]==='!')p.className='err';t.insertBefore(p,t.lastChild);i++;setTimeout(sig,900)}})()}
window.addEventListener('pageshow',e=>{if(e.persisted)location.reload()});
window.reiniciarPartida=c=>{if(c===CONFIG.claveAdmin){sessionStorage.removeItem(K);location.replace('index.html');return'Partida reiniciada'}return'Clave incorrecta'};
return{pagina,index,leer,guardar,reiniciar}})();
