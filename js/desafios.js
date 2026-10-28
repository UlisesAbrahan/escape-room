/* Contenido y respuestas de los 10 desafíos. (Validación solo para controlar el flujo; no es seguridad real.) */
const ZOO=[['Hormiga', 'ant'], ['Murciélago', 'bat'], ['Oso', 'bear'], ['Abeja', 'bee'], ['Mariposa', 'butterfly'], ['Camello', 'camel'], ['Gato', 'cat'], ['Vaca', 'cow'], ['Cangrejo', 'crab'], ['Cocodrilo', 'crocodile'], ['Ciervo', 'deer'], ['Perro', 'dog'], ['Delfín', 'dolphin'], ['Burro', 'donkey'], ['Pato', 'duck'], ['Águila', 'eagle'], ['Elefante', 'elephant'], ['Flamenco', 'flamingo'], ['Zorro', 'fox'], ['Rana', 'frog'], ['Jirafa', 'giraffe'], ['Cabra', 'goat'], ['Gorila', 'gorilla'], ['Hipopótamo', 'hippopotamus'], ['Caballo', 'horse'], ['Canguro', 'kangaroo'], ['Koala', 'koala'], ['Leopardo', 'leopard'], ['Guepardo', 'cheetah'], ['Bisonte', 'bison'], ['Hiena', 'hyena'], ['Jaguar', 'jaguar'], ['Erizo', 'hedgehog'], ['León', 'lion'], ['Llama', 'llama'], ['Mono', 'monkey'], ['Ratón', 'mouse'], ['Pulpo', 'octopus'], ['Avestruz', 'ostrich'], ['Búho', 'owl'], ['Panda', 'panda'], ['Loro', 'parrot'], ['Pingüino', 'penguin'], ['Conejo', 'rabbit'], ['Tiburón', 'shark'], ['Serpiente', 'snake'], ['Tigre', 'tiger'], ['Tortuga', 'turtle'], ['Lobo', 'wolf'], ['Cebra', 'zebra']];
const cand=p=>{let c=[...Array(9).keys()];p.forEach(w=>{c=c.filter(i=>w.r==='='?!w.L.includes(i)&&!w.R.includes(i):w.r==='L'?w.L.includes(i):w.R.includes(i))});return c};
const DESAFIOS=[null,
{titulo:'El archivo de los tres dígitos',ph:'Código de 3 cifras',respuesta:'042',
 html:`<p class="hist">Un archivo de seguridad guarda intentos fallidos de acceso. Con ellos se puede reconstruir el código de tres cifras (todas distintas).</p>
 <div class="pista"><b>427</b>Dos cifras son correctas, pero ambas están mal ubicadas.</div>
 <div class="pista"><b>509</b>Una cifra es correcta, pero está mal ubicada.</div>
 <div class="pista"><b>086</b>Una cifra es correcta y está bien ubicada.</div>
 <div class="pista"><b>173</b>Ninguna cifra es correcta.</div>
 <div class="archivo" id="arch">[ BLOQUEADO ]</div>`,
 exito(el){const a=el.querySelector('#arch');a.textContent='[ ARCHIVO ABIERTO ]';a.classList.add('abierto')}},
{titulo:'El zoológico invertido',ph:'Número',respuesta:'17',
 html:`<p class="hist">Un empleado de sistemas olvidó la clave de acceso al sistema. Como ayudamemoria, había escrito un acertijo en una nota que le permitía recordarla. La nota dice:</p>
 <blockquote class="nota">«En un zoológico hay 50 animales ordenados al revés en orden secuencial. ¿En qué orden de la secuencia está el león?»</blockquote>
 <p>Al pie de la nota, en letra pequeña: <em>«Traducir al inglés».</em></p>
 <p>Animales del zoológico:</p>
 <div class="zoo">${ZOO.map((a,i)=>`<span>${ZOO[(i*37)%50][0]}</span>`).join('')}</div>`},
{titulo:'El número secreto',ph:'Número',respuesta:'3',
 html:`<p class="hist">Ficha de investigación matemática N.º 3.</p>
 <table class="tabla"><tr><th>Condición</th><th>Descripción</th></tr>
 <tr><td>A</td><td>Soy un número natural.</td></tr>
 <tr><td>B</td><td>Soy mayor que la raíz cuadrada de 4 y menor que la raíz cuadrada de 25.</td></tr>
 <tr><td>C</td><td>Si me multiplico por mí mismo y me restan 5, el resultado es 4.</td></tr></table><p>¿Quién soy?</p>`},
{titulo:'El cifrado César',ph:'Clave en cifras',respuesta:'731',
 html:`<p class="hist">Un mensaje interceptado fue cifrado con el método de Julio César.</p>
 <p>Cada letra se reemplaza por la que está <strong>3 posiciones adelante</strong> en el alfabeto. Para descifrar se retrocede 3 posiciones. Ejemplo: al cifrar SOL se obtiene VRO.</p>
 <div class="abc">${[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(c=>`<span>${c}</span>`).join('')}</div>
 <div class="cifrado">HO FRGLJR HV VHWHFLHQWRV WUHLQWD B XQR</div><p>Descifren el mensaje e introduzcan la clave en cifras.</p>`},
{titulo:'El archivo de las secuencias',ph:'Número que continúa',respuesta:'42',
 html:`<p class="hist">Un archivo dañado conserva solo una secuencia. Descubran la regla que la genera.</p>
 <div class="seq">2, 6, 12, 20, 30, ?</div><p>¿Qué número continúa la secuencia?</p>`},
{titulo:'Las monedas falsas',ph:'N.º de la moneda falsa (1-9)',intentos:3,
 html:`<p class="hist">Hay nueve monedas aparentemente idénticas y una es falsa: pesa menos.</p>
 <p>Solo disponen de una balanza de dos platos y de <strong>dos pesadas</strong>. Toquen cada moneda para ubicarla: 1 toque = plato izquierdo, 2 toques = plato derecho, 3 toques = fuera. Ambos platos deben tener igual cantidad de monedas. Pulsen PESAR, observen el resultado y retiren las monedas antes de la siguiente pesada. Cuando puedan asegurarlo, escriban el número de la moneda falsa. Tienen <strong>solo 3 intentos</strong> para acertar: al tercer error, el sistema se bloquea definitivamente.</p>
 <div class="balanza"><div class="viga" id="viga"><div class="plato"><small>IZQUIERDO</small><div class="chips" id="pi"></div></div><div class="plato"><small>DERECHO</small><div class="chips" id="pd"></div></div></div><div class="eje"></div></div>
 <div class="resbal" id="resbal"></div>
 <div class="monedas" id="mon"></div>
 <p><button class="btn sec" id="pesar">PESAR</button> <button class="btn sec" id="retirar">RETIRAR MONEDAS</button> <span id="rest"></span></p><div class="msg" id="aviso"></div><ol class="reg" id="reg"></ol>`,
 init(el){const J=Juego,$=i=>el.querySelector('#'+i);let sel=Array(9).fill(0);
  const chips=a=>a.map(i=>`<span class="chip">${i+1}</span>`).join('')||'<em>vacío</em>';
  const txt=r=>r==='='?'Equilibrio: ninguna de las monedas pesadas es falsa.':r==='L'?'El plato IZQUIERDO sube: es el más liviano.':'El plato DERECHO sube: es el más liviano.';
  const pint=()=>{const s=J.leer(),p=s.pesadas,pes=!!(s.bal&&s.bal.fase==='pesado'),u=p[p.length-1],fin=s.resuelto;let L=[],R=[];
   if(pes){L=s.bal.L;R=s.bal.R}else sel.forEach((v,i)=>{v==1&&L.push(i);v==2&&R.push(i)});
   $('viga').style.setProperty('--a',pes?(u.r==='L'?'7deg':u.r==='R'?'-7deg':'0deg'):'0deg');
   $('pi').innerHTML=chips(L);$('pd').innerHTML=chips(R);$('resbal').textContent=pes?txt(u.r):'';
   $('mon').innerHTML='';for(let i=0;i<9;i++){const v=L.includes(i)?1:R.includes(i)?2:0,b=document.createElement('button');b.className='moneda e'+v;b.textContent=i+1;b.disabled=pes||fin;b.onclick=()=>{sel[i]=(sel[i]+1)%3;pint()};$('mon').append(b)}
   $('pesar').hidden=pes||p.length>=2;$('pesar').disabled=fin;$('retirar').hidden=!(pes&&p.length<2)||fin;
   $('rest').textContent='Pesadas restantes: '+(2-p.length);
   $('reg').innerHTML=p.map(w=>`<li>[${w.L.map(x=>x+1).join(', ')}] contra [${w.R.map(x=>x+1).join(', ')}]: ${txt(w.r)}</li>`).join('')};
  $('pesar').onclick=()=>{const s=J.leer();if(s.resuelto||s.pesadas.length>=2||(s.bal&&s.bal.fase==='pesado'))return;const L=[],R=[];sel.forEach((v,i)=>{v==1&&L.push(i);v==2&&R.push(i)});
   if(!L.length||L.length!==R.length){$('aviso').className='msg mal';$('aviso').textContent='Los platos deben tener la misma cantidad de monedas (al menos una en cada uno).';return}
   $('aviso').textContent='';s.pesadas.push({L,R,r:L.includes(s.fake)?'L':R.includes(s.fake)?'R':'='});s.bal={fase:'pesado',L,R};J.guardar(s);pint()};
  $('retirar').onclick=()=>{const s=J.leer();s.bal=null;J.guardar(s);sel.fill(0);pint()};
  pint()},
 check(raw,s){if(!/^[1-9]$/.test(raw))return {libre:true,msg:'escriban un número del 1 al 9.'};
  if(!s.pesadas.length)return {libre:true,msg:'realicen al menos una pesada antes de identificar la moneda.'};
  const c=cand(s.pesadas);if(c.length!==1)return 'identificación no concluyente: sus pesadas no permiten asegurarlo.';
  return c[0]===+raw-1}},
{titulo:'El juicio de los perímetros',ph:'Suma correcta (cm)',respuesta:'71',
 html:`<p class="hist">Dos estudiantes sumaron los perímetros de estas tres figuras y obtuvieron <strong>66 cm</strong> y <strong>64 cm</strong>.</p>
 <div class="figs">
 <figure><svg viewBox="0 0 220 140"><rect x="20" y="15" width="160" height="100" fill="none" stroke="#3da5ff" stroke-width="3"/><text x="85" y="132">8 cm</text><text x="186" y="70">5 cm</text></svg><figcaption>Rectángulo</figcaption></figure>
 <figure><svg viewBox="0 0 170 150"><rect x="20" y="10" width="120" height="120" fill="none" stroke="#39ff88" stroke-width="3"/><text x="55" y="147">6 cm</text><text x="144" y="75">6</text></svg><figcaption>Cuadrado</figcaption></figure>
 <figure><svg viewBox="0 0 190 150"><polygon points="20,125 160,125 90,4" fill="none" stroke="#ff3b4e" stroke-width="3"/><text x="75" y="145">7 cm</text><text x="130" y="60">7 cm</text><text x="25" y="60">7 cm</text></svg><figcaption>Triángulo equilátero</figcaption></figure></div>
 <p>¿Alguno tiene razón? Escriban la suma correcta de los perímetros, en centímetros.</p>`},
{titulo:'El número primo',ph:'Contraseña de 3 cifras',respuesta:'253',
 html:`<p class="hist">La contraseña tiene tres cifras distintas.</p>
 <div class="pista"><b>1.ª</b>Es el único número primo par.</div>
 <div class="pista"><b>2.ª</b>Es el menor número primo mayor que 3.</div>
 <div class="pista"><b>3.ª</b>Es la cantidad de divisores positivos del número 9.</div>`},
{titulo:'La recuperación del sistema',ph:'Clave final de 4 cifras',respuesta:'1731',
 html:`<p class="hist">El último archivo exige reunir fragmentos de la contraseña que ya obtuvieron. El sistema no guarda las respuestas anteriores: usen sus notas.</p>
 <div class="pista"><b>I</b>Resultado completo del <em>Zoológico invertido</em> (Desafío 2).</div>
 <div class="pista"><b>II</b>Resultado de <em>El número secreto</em> (Desafío 3).</div>
 <div class="pista"><b>III</b>Cifra de las unidades del resultado de <em>El juicio de los perímetros</em> (Desafío 7).</div>
 <p>Unan los fragmentos en ese orden para formar la clave de cuatro cifras.</p>`}
];
