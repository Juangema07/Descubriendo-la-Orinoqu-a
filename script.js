(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const safeGet = (key, fallback = null) => { try { return localStorage.getItem(key) ?? fallback; } catch (_) { return fallback; } };
  const safeSet = (key, value) => { try { localStorage.setItem(key, value); return true; } catch (_) { return false; } };
  const safeRemove = (key) => { try { localStorage.removeItem(key); } catch (_) {} };

  const loader = $('#loader');
  window.addEventListener('load', () => window.setTimeout(() => loader?.classList.add('done'), 250), { once: true });

  const header = $('.site-header');
  const menuBtn = $('#menuBtn');
  const navLinks = $('#navLinks');
  const setMenu = open => {
    navLinks?.classList.toggle('mobile-open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
  };
  menuBtn?.addEventListener('click', () => setMenu(!navLinks?.classList.contains('mobile-open')));
  $$('#navLinks a').forEach(link => link.addEventListener('click', () => setMenu(false)));

  const settings = $('#settings');
  const settingsBtn = $('#settingsBtn');
  const closeSettings = $('#closeSettings');
  const setSettings = open => {
    settings?.classList.toggle('open', open);
    settings?.setAttribute('aria-hidden', String(!open));
    settingsBtn?.setAttribute('aria-expanded', String(open));
  };
  settingsBtn?.addEventListener('click', () => setSettings(!settings?.classList.contains('open')));
  closeSettings?.addEventListener('click', () => setSettings(false));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { setSettings(false); setMenu(false); }
  });
  document.addEventListener('click', event => {
    if (settings?.classList.contains('open') && !settings.contains(event.target) && event.target !== settingsBtn) setSettings(false);
  });

  const theme = $('#theme');
  const fontSize = $('#fontSize');
  const reduceMotion = $('#reduceMotion');
  const applyPrefs = () => {
    const savedTheme = safeGet('ruta-theme', 'llano');
    const savedSize = safeGet('ruta-size', '100');
    const savedMotion = safeGet('ruta-motion', '0') === '1';
    document.body.classList.toggle('theme-noche', savedTheme === 'noche');
    document.body.classList.toggle('theme-arena', savedTheme === 'arena');
    document.body.classList.toggle('reduce-motion', savedMotion);
    document.documentElement.style.setProperty('--font-scale', String(Number(savedSize) / 100));
    if (theme) theme.value = savedTheme;
    if (fontSize) fontSize.value = savedSize;
    if (reduceMotion) reduceMotion.checked = savedMotion;
  };
  theme?.addEventListener('change', () => { safeSet('ruta-theme', theme.value); applyPrefs(); });
  fontSize?.addEventListener('input', () => { safeSet('ruta-size', fontSize.value); applyPrefs(); });
  reduceMotion?.addEventListener('change', () => { safeSet('ruta-motion', reduceMotion.checked ? '1' : '0'); applyPrefs(); });
  $('#resetSettings')?.addEventListener('click', () => { safeRemove('ruta-theme'); safeRemove('ruta-size'); safeRemove('ruta-motion'); applyPrefs(); });
  applyPrefs();

  const deptData = {
    meta: ['Meta', 'Villavicencio', 'Es una puerta de entrada a los Llanos y combina piedemonte, sabanas, actividad agropecuaria, servicios y destinos naturales como la Sierra de La Macarena.'],
    casanare: ['Casanare', 'Yopal', 'Tiene una fuerte relación con la ganadería y la actividad agropecuaria, además de una historia económica marcada por la explotación de hidrocarburos.'],
    arauca: ['Arauca', 'Arauca', 'Está en el extremo norte de la Orinoquía y combina cordillera, piedemonte y llanura aluvial. También tiene una importante relación fronteriza con Venezuela.'],
    vichada: ['Vichada', 'Puerto Carreño', 'Es un territorio de grandes extensiones de sabana y bosques, con ríos como el Orinoco y el Meta y áreas de alto valor para la conservación.']
  };
  const renderDept = key => {
    const data = deptData[key] || deptData.meta;
    const box = $('#deptInfo'); if (!box) return;
    box.replaceChildren();
    const h = document.createElement('h3'); h.textContent = `${data[0]} · ${data[1]}`;
    const p = document.createElement('p'); p.textContent = data[2];
    box.append(h, p);
  };
  $$('.dept').forEach(btn => btn.addEventListener('click', () => {
    $$('.dept').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDept(btn.dataset.dept);
  }));
  renderDept('meta');

  const layerData = {
    paisaje: ['01','Sabanas que parecen infinitas','Las llanuras, esteros y bosques de galería forman un mosaico de ambientes. El relieve relativamente plano ayuda a explicar el aspecto abierto de buena parte del paisaje.',['Sabanas','Esteros','Bosques de galería']],
    agua: ['02','El agua organiza el territorio','Ríos y humedales sostienen ecosistemas, actividades humanas y conexiones naturales. La dinámica del agua cambia entre las temporadas de lluvia y sequía.',['Ríos','Humedales','Ciclo estacional']],
    poblacion: ['03','Personas y territorio','Las comunidades urbanas y rurales mantienen relaciones distintas con el paisaje. La cultura llanera reúne conocimientos, oficios, música y prácticas asociadas al territorio.',['Ciudades','Comunidades rurales','Identidad']],
    conservacion: ['04','Conservar es pensar a largo plazo','La protección de humedales, bosques y sabanas requiere equilibrar biodiversidad, producción y bienestar de las comunidades.',['Biodiversidad','Uso sostenible','Restauración']]
  };
  const renderLayer = key => {
    const data = layerData[key] || layerData.paisaje;
    const view = $('#layerView'); if (!view) return;
    view.replaceChildren();
    const big = document.createElement('div'); big.className = 'big'; big.textContent = data[0];
    const title = document.createElement('h3'); title.textContent = data[1];
    const text = document.createElement('p'); text.textContent = data[2];
    const chips = document.createElement('div'); chips.className = 'chips';
    data[3].forEach(item => { const chip = document.createElement('span'); chip.textContent = item; chips.appendChild(chip); });
    view.append(big, title, text, chips);
  };
  $$('.layer-tab').forEach(btn => btn.addEventListener('click', () => {
    $$('.layer-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderLayer(btn.dataset.layer);
  }));
  renderLayer('paisaje');

  const bioData = {
    'chigüiro': ['Chigüiro','Es uno de los mamíferos más representativos de los Llanos y está asociado a ambientes con agua y vegetación de sabana.'],
    aves: ['Aves','Los humedales, sabanas y bosques ofrecen alimento y refugio para numerosas especies de aves residentes y migratorias.'],
    cocodrilo: ['Caimán llanero','Es una especie amenazada y un ejemplo de por qué la conservación de ríos y humedales importa para toda la región.'],
    macarena: ['Sierra de La Macarena','En este espacio convergen ambientes de Amazonía, Orinoquía y zonas de montaña, lo que ayuda a explicar su gran diversidad.']
  };
  $$('.bio-card').forEach(card => card.addEventListener('click', () => {
    const data = bioData[card.dataset.bio] || ['Biodiversidad','La Orinoquía reúne ambientes que sostienen una gran variedad de formas de vida.'];
    const box = $('#bioDetail'); if (!box) return;
    box.replaceChildren();
    const eyebrow = document.createElement('p'); eyebrow.className = 'eyebrow'; eyebrow.textContent = 'FICHA RÁPIDA';
    const title = document.createElement('h3'); title.textContent = data[0];
    const text = document.createElement('p'); text.textContent = data[1];
    box.append(eyebrow, title, text);
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
    const wrap = document.createElement('div'); const h=document.createElement('h3'); h.textContent=data[1]; const p=document.createElement('p'); p.textContent=data[2]; const chips=document.createElement('div'); chips.className='chips';
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
  const question=$('#quizQuestion'), answers=$('#quizAnswers'), feedback=$('#quizResult'), next=$('#quizNext');
  const renderQuiz=()=>{const item=questions[quizIndex];if(!item||!question||!answers)return;answered=false;feedback.textContent='';next.hidden=true;question.textContent=item.q;answers.replaceChildren();item.a.forEach((answer,i)=>{const b=document.createElement('button');b.type='button';b.textContent=answer;b.addEventListener('click',()=>{if(answered)return;answered=true;$$('#quizAnswers button').forEach((btn,index)=>{btn.disabled=true;if(index===item.correct)btn.classList.add('correct');});if(i===item.correct){score++;feedback.textContent=`✓ Correcto. ${item.note}`;}else{b.classList.add('wrong');feedback.textContent=`No exactamente. ${item.note}`;}next.hidden=false;});answers.appendChild(b);});};
  next?.addEventListener('click',()=>{if(!answered)return;if(quizIndex<questions.length-1){quizIndex++;renderQuiz();}else{question.textContent=`Resultado: ${score}/${questions.length}`;answers.replaceChildren();feedback.textContent=score===questions.length?'¡Excelente! Ya tienes una buena base para explorar la región.':'Buen trabajo. Recorre de nuevo las secciones y vuelve a intentarlo.';next.hidden=true;}});
  renderQuiz();

  const tfButtons=$$('[data-tf]');
  tfButtons.forEach(btn=>btn.addEventListener('click',()=>{
    const result=$('#tfResult'); const correct=btn.dataset.tf==='true';
    result.textContent=correct?'✓ Verdadero. La Sierra de La Macarena está en el Meta.':'✕ Falso. La afirmación es verdadera: está en el Meta.';
  }));

  let matchTarget=null;
  const matchResult=$('#matchResult');
  $$('.match-list button').forEach(btn=>btn.addEventListener('click',()=>{matchTarget=btn.dataset.match;$$('.match-list button').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');matchResult.textContent='Ahora escoge el sector que corresponde.';}));
  $$('.match-options button').forEach(btn=>btn.addEventListener('click',()=>{
    if(!matchTarget){matchResult.textContent='Primero selecciona una actividad.';return;}
    const ok=btn.dataset.sector===matchTarget;
    matchResult.textContent=ok?'✓ Bien relacionado.':'Todavía no. Piensa en si la actividad obtiene recursos, transforma productos o presta servicios.';
    if(ok){const target=$(`[data-match="${matchTarget}"]`);target?.classList.add('matched');matchTarget=null;}
  }));

  const reflection=$('#reflection');
  const saved=$('#reflectionSaved');
  if(reflection) reflection.value=safeGet('ruta-propuesta','');
  $('#saveReflection')?.addEventListener('click',()=>{
    const value=(reflection?.value||'').trim();
    if(!value){saved.textContent='Escribe una propuesta primero.';return;}
    safeSet('ruta-propuesta',value.slice(0,300));saved.textContent='Propuesta guardada en este dispositivo.';
    window.setTimeout(()=>{saved.textContent='';},2500);
  });

  const revealItems=$$('.reveal');
  if('IntersectionObserver' in window && !document.body.classList.contains('reduce-motion')){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
    revealItems.forEach(item=>observer.observe(item));
  }else revealItems.forEach(item=>item.classList.add('visible'));
})();
