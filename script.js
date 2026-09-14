(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const safeGet = (key, fallback = null) => { try { return localStorage.getItem(key) ?? fallback; } catch (_) { return fallback; } };
  const safeSet = (key, value) => { try { localStorage.setItem(key, value); return true; } catch (_) { return false; } };
  const safeRemove = (key) => { try { localStorage.removeItem(key); } catch (_) {} };

  const loader = $('#loader');
  window.addEventListener('load', () => { window.setTimeout(() => loader?.remove(), 350); }, { once: true });

  const nav = $('.nav-wrap');
  const menuBtn = $('#menuBtn');
  const navLinks = $('#navLinks');
  const setMenu = (open) => { nav?.classList.toggle('menu-open', open); menuBtn?.setAttribute('aria-expanded', String(open)); };
  menuBtn?.addEventListener('click', () => setMenu(!nav?.classList.contains('menu-open')));
  $$('#navLinks a').forEach(link => link.addEventListener('click', () => setMenu(false)));

  const settings = $('#settings');
  const settingsBtn = $('#settingsBtn');
  const closeSettings = $('#closeSettings');
  const setSettings = (open) => { settings?.classList.toggle('open', open); settings?.setAttribute('aria-hidden', String(!open)); settingsBtn?.setAttribute('aria-expanded', String(open)); };
  settingsBtn?.addEventListener('click', () => setSettings(!settings?.classList.contains('open')));
  closeSettings?.addEventListener('click', () => setSettings(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { setSettings(false); setMenu(false); } });
  document.addEventListener('click', event => { if (settings?.classList.contains('open') && !settings.contains(event.target) && event.target !== settingsBtn) setSettings(false); });

  const theme = $('#theme');
  const fontSize = $('#fontSize');
  const reduceMotion = $('#reduceMotion');
  const applyPrefs = () => {
    const savedTheme = safeGet('orinoquia-theme', 'llano');
    const savedSize = safeGet('orinoquia-size', '100');
    const savedMotion = safeGet('orinoquia-motion', '0') === '1';
    document.body.classList.toggle('theme-night', savedTheme === 'noche');
    document.body.classList.toggle('theme-arena', savedTheme === 'arena');
    document.body.classList.toggle('reduce-motion', savedMotion);
    document.documentElement.style.setProperty('--scale', String(Number(savedSize) / 100));
    if (theme) theme.value = savedTheme;
    if (fontSize) fontSize.value = savedSize;
    if (reduceMotion) reduceMotion.checked = savedMotion;
  };
  theme?.addEventListener('change', () => { safeSet('orinoquia-theme', theme.value); applyPrefs(); });
  fontSize?.addEventListener('input', () => { safeSet('orinoquia-size', fontSize.value); applyPrefs(); });
  reduceMotion?.addEventListener('change', () => { safeSet('orinoquia-motion', reduceMotion.checked ? '1' : '0'); applyPrefs(); });
  $('#resetSettings')?.addEventListener('click', () => { safeRemove('orinoquia-theme'); safeRemove('orinoquia-size'); safeRemove('orinoquia-motion'); applyPrefs(); });
  applyPrefs();

  const layerData = {
    paisaje: { big:'01', title:'Sabanas que parecen infinitas', text:'Las llanuras, esteros y bosques de galería forman un mosaico de ambientes. El relieve relativamente plano ayuda a explicar el aspecto abierto de buena parte del paisaje.', chips:['Sabanas','Esteros','Bosques de galería'] },
    agua: { big:'02', title:'El agua organiza el territorio', text:'Ríos y humedales sostienen ecosistemas, actividades humanas y conexiones naturales. La dinámica del agua cambia notablemente entre las temporadas de lluvia y sequía.', chips:['Ríos','Humedales','Ciclo estacional'] },
    poblacion: { big:'03', title:'Personas y territorio', text:'Las comunidades urbanas y rurales mantienen relaciones distintas con el paisaje. La cultura llanera reúne conocimientos, oficios, música y prácticas asociadas al territorio.', chips:['Ciudades','Comunidades rurales','Identidad'] },
    conservacion: { big:'04', title:'Conservar es pensar a largo plazo', text:'La protección de humedales, bosques y sabanas requiere equilibrar biodiversidad, producción y bienestar de las comunidades.', chips:['Biodiversidad','Uso sostenible','Restauración'] }
  };
  const renderLayer = key => {
    const data = layerData[key] || layerData.paisaje;
    const view = $('#layerView'); if (!view) return;
    view.replaceChildren();
    const big = document.createElement('div'); big.className = 'big'; big.textContent = data.big;
    const title = document.createElement('h3'); title.textContent = data.title;
    const text = document.createElement('p'); text.textContent = data.text;
    const chips = document.createElement('div'); chips.className = 'chips';
    data.chips.forEach(item => { const chip = document.createElement('span'); chip.textContent = item; chips.appendChild(chip); });
    view.append(big, title, text, chips);
  };
  $$('.layer-tab').forEach(btn => btn.addEventListener('click', () => { $$('.layer-tab').forEach(b => b.classList.remove('active')); btn.classList.add('active'); renderLayer(btn.dataset.layer); }));
  renderLayer('paisaje');

  const wildData = {
    'chigüiro': ['Chigüiro','Es uno de los mamíferos más representativos de los Llanos y está asociado a ambientes con agua y vegetación de sabana.'],
    aves: ['Aves','Los humedales, sabanas y bosques ofrecen alimento y refugio para numerosas especies de aves residentes y migratorias.'],
    humedales: ['Humedales','Estos ambientes almacenan agua, sirven como refugio para la fauna y cumplen funciones ecológicas importantes durante los ciclos de lluvia y sequía.']
  };
  $$('.wild-card').forEach(card => card.addEventListener('click', () => {
    const data = wildData[card.dataset.info] || ['Biodiversidad','La Orinoquía reúne ambientes que sostienen una gran variedad de formas de vida.'];
    const box = $('#wildDetail'); if (!box) return;
    box.replaceChildren();
    const eyebrow = document.createElement('p'); eyebrow.className = 'eyebrow'; eyebrow.textContent = 'BIODIVERSIDAD';
    const title = document.createElement('h3'); title.textContent = data[0];
    const text = document.createElement('p'); text.textContent = data[1];
    box.append(eyebrow, title, text);
    box.scrollIntoView({ behavior: document.body.classList.contains('reduce-motion') ? 'auto' : 'smooth', block: 'nearest' });
  }));

  const econData = {
    agro:['01','Agro y producción rural','La agricultura y la ganadería tienen un papel importante en la economía regional. La productividad debe relacionarse con el cuidado del suelo, el agua y los ecosistemas.',['Ganadería','Agricultura','Suelo']],
    energia:['02','Energía y recursos','La región también participa en actividades energéticas. Su desarrollo plantea preguntas sobre infraestructura, empleo, territorio y sostenibilidad.',['Energía','Infraestructura','Territorio']],
    turismo:['03','Turismo de naturaleza','Paisajes, ríos, fauna y cultura pueden impulsar experiencias de turismo responsable cuando se protege el patrimonio natural y cultural.',['Naturaleza','Cultura','Turismo responsable']],
    servicios:['04','Comercio y servicios','Las ciudades y centros poblados conectan productos, personas y servicios. La conectividad ayuda a integrar territorios rurales y urbanos.',['Comercio','Conectividad','Servicios']]
  };
  const renderEcon = key => {
    const data = econData[key] || econData.agro; const view = $('#econView'); if (!view) return;
    view.replaceChildren();
    const big = document.createElement('div'); big.className='big'; big.textContent=data[0];
    const wrap = document.createElement('div'); const h = document.createElement('h3'); h.textContent=data[1]; const p=document.createElement('p'); p.textContent=data[2]; const chips=document.createElement('div'); chips.className='chips';
    data[3].forEach(item=>{const s=document.createElement('span');s.textContent=item;chips.appendChild(s);}); wrap.append(h,p,chips); view.append(big,wrap);
  };
  $$('.econ-tabs button').forEach(btn=>btn.addEventListener('click',()=>{$$('.econ-tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderEcon(btn.dataset.econ);}));
  renderEcon('agro');

  const questions = [
    { q:'¿Cuál de estos ambientes es característico de la Orinoquía?', a:['Sabanas','Glaciares urbanos','Arrecifes de coral'], correct:0, note:'Las sabanas son uno de los paisajes más representativos de la región.' },
    { q:'¿Qué expresión cultural está especialmente vinculada con la identidad llanera?', a:['Joropo','Bambuco andino','Cumbia del Caribe'], correct:0, note:'El joropo reúne música, canto y danza dentro de la tradición llanera.' },
    { q:'¿Qué idea ayuda a relacionar economía y conservación?', a:['Usar los recursos sin considerar el futuro','Buscar un uso sostenible del territorio','Eliminar todos los usos productivos'], correct:1, note:'La sostenibilidad busca equilibrar bienestar, producción y conservación.' }
  ];
  let quizIndex=0, score=0, answered=false;
  const question=$('#question'), answers=$('#answers'), feedback=$('#quizFeedback'), next=$('#nextQuestion'), count=$('#quizCount'), bar=$('#quizBar');
  const renderQuiz=()=>{ const item=questions[quizIndex]; if(!item||!question||!answers)return; answered=false; feedback.textContent=''; next.hidden=true; count.textContent=`${quizIndex+1} / ${questions.length}`; bar.style.width=`${((quizIndex)/questions.length)*100}%`; question.textContent=item.q; answers.replaceChildren(); item.a.forEach((answer,i)=>{const b=document.createElement('button');b.type='button';b.textContent=answer;b.addEventListener('click',()=>answerQuiz(i,b));answers.appendChild(b);}); };
  const answerQuiz=(choice, clicked)=>{ if(answered)return; answered=true; const item=questions[quizIndex]; $$('#answers button').forEach((b,i)=>{b.disabled=true;if(i===item.correct)b.setAttribute('aria-label','Respuesta correcta');}); if(choice===item.correct){score++;feedback.textContent=`✓ Correcto. ${item.note}`;}else{feedback.textContent=`No exactamente. ${item.note}`;} next.hidden=false; bar.style.width=`${((quizIndex+1)/questions.length)*100}%`; };
  next?.addEventListener('click',()=>{if(!answered)return;if(quizIndex<questions.length-1){quizIndex++;renderQuiz();}else{question.textContent=`Resultado: ${score}/${questions.length}`;answers.replaceChildren();feedback.textContent=score===questions.length?'¡Excelente! Ya tienes una buena base para explorar la región.':'Buen trabajo. Vuelve a recorrer las secciones y prueba de nuevo.';next.hidden=true;}});
  renderQuiz();

  const reflection=$('#reflection'); const saved=$('#reflectionSaved'); const savedText=safeGet('orinoquia-propuesta',''); if(reflection)reflection.value=savedText;
  $('#saveReflection')?.addEventListener('click',()=>{const value=(reflection?.value||'').trim(); if(!value){saved.textContent='Escribe una propuesta primero.';return;} safeSet('orinoquia-propuesta',value.slice(0,300)); saved.textContent='Propuesta guardada en este dispositivo.'; window.setTimeout(()=>{saved.textContent='';},2500);});
})();
