(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const makeImage=(src,alt)=>{const img=document.createElement('img');img.src=src;img.alt=alt;img.loading='lazy';img.decoding='async';return img};
const makeTile=(src,alt,title,text)=>{const figure=document.createElement('figure');figure.className='extra-visual-tile scroll-reveal';figure.append(makeImage(src,alt));const cap=document.createElement('figcaption');const b=document.createElement('b');b.textContent=title;const span=document.createElement('span');span.textContent=text;cap.append(b,span);figure.append(cap);return figure};
const addGallery=(sectionId,title,items)=>{const section=$(sectionId);if(!section||$('.extra-visual-block',section))return;const block=document.createElement('div');block.className='container extra-visual-block';const heading=document.createElement('div');heading.className='extra-visual-heading scroll-reveal';const label=document.createElement('span');label.textContent='AYUDA VISUAL';const h=document.createElement('h3');h.textContent=title;heading.append(label,h);const grid=document.createElement('div');grid.className='extra-visual-grid';items.forEach(x=>grid.append(makeTile(...x)));block.append(heading,grid);const anchor=section.querySelector('.container:last-of-type');if(anchor)anchor.after(block);else section.append(block)};
const addExpanders=(sectionId,title,items)=>{const section=$(sectionId);if(!section||$('.info-expansions',section))return;const block=document.createElement('div');block.className='container info-expansions scroll-reveal';const head=document.createElement('div');head.className='info-expansions-heading';const label=document.createElement('span');label.textContent='TOCA PARA AMPLIAR';const h=document.createElement('h3');h.textContent=title;head.append(label,h);const grid=document.createElement('div');grid.className='info-expansion-grid';items.forEach((x,i)=>{const d=document.createElement('details');d.className='info-expansion';const s=document.createElement('summary');const n=document.createElement('b');n.textContent=String(i+1).padStart(2,'0');const t=document.createElement('strong');t.textContent=x[0];s.append(n,t);const p=document.createElement('p');p.textContent=x[1];d.append(s,p);grid.append(d)});block.append(head,grid);const anchor=section.querySelector('.container:last-of-type');if(anchor)anchor.after(block);else section.append(block)};
const addPresentationViewer=()=>{const section=$('#presentacion');const card=$('.presentation-card',section);if(!section||!card||$('.presentation-viewer',section))return;const viewer=document.createElement('div');viewer.className='container presentation-viewer scroll-reveal';const head=document.createElement('div');head.className='viewer-heading';const label=document.createElement('span');label.textContent='PRESENTACIÓN INTEGRADA';const h=document.createElement('h3');h.textContent='Mira las diapositivas directamente aquí';const p=document.createElement('p');p.textContent='La presentación del proyecto se abre dentro de la web. No necesitas salir de Ruta Llanera para recorrer las diapositivas.';head.append(label,h,p);const frame=document.createElement('iframe');frame.className='ppt-frame';const raw='https://raw.githubusercontent.com/Juangema07/Descubriendo-la-Orinoqu-a/main/REGI%C3%93N%20ORINOQU%C3%8DA.pptx';frame.src='https://view.officeapps.live.com/op/embed.aspx?src='+encodeURIComponent(raw);frame.title='Presentación de la Región Orinoquía';frame.loading='lazy';frame.referrerPolicy='no-referrer';frame.setAttribute('allowfullscreen','');viewer.append(head,frame);card.after(viewer);const actions=document.createElement('div');actions.className='viewer-actions';const download=document.createElement('a');download.className='download-ppt';download.href=raw;download.setAttribute('download','REGIÓN ORINOQUÍA.pptx');download.textContent='Descargar PowerPoint ↓';const open=document.createElement('a');open.className='repo-ppt';open.href=raw;open.target='_blank';open.rel='noopener noreferrer';open.textContent='Abrir archivo';actions.append(download,open);viewer.append(actions)};
const addScrollEffects=()=>{const targets=$$('.section > .container, .photo-break, .visual-card, .nature-card, .people-grid article, .culture-list > div, .economy-cards article, .challenge-grid details, .park-grid article, .game-card, .resource-list a, .extra-visual-tile, .info-expansion');targets.forEach((el,i)=>{if(el.classList.contains('scroll-reveal'))return;el.classList.add('scroll-reveal');el.style.setProperty('--reveal-delay',`${Math.min(i%6,5)*55}ms`)});const items=$$('.scroll-reveal');if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});items.forEach(x=>io.observe(x))}else items.forEach(x=>x.classList.add('is-visible'))};
const init=()=>{
addGallery('#territorio','La región también se entiende mirando el territorio',[
['https://upload.wikimedia.org/wikipedia/commons/7/9/Mapa_de_Colombia_%28regi%C3%B3n_de_la_Orinoqu%C3%ADa%29.svg','Mapa de la región natural de la Orinoquía','Ubicación','La región se localiza al oriente de Colombia y está relacionada con la cuenca del Orinoco.'],
['https://upload.wikimedia.org/wikipedia/commons/7/79/Yopal-Casanare.jpg','Vista de Yopal, Casanare','Casanare','Una ciudad que funciona como centro urbano y de servicios del departamento.'],
['https://upload.wikimedia.org/wikipedia/commons/5/59/Cerro_La_Bandera%2C_Puerto_Carre%C3%B1o_-_panoramio.jpg','Cerro La Bandera en Puerto Carreño','Vichada','Desde este sector se aprecia el paisaje urbano y parte del entorno del río Orinoco.']
]);
addGallery('#naturaleza','Paisajes diferentes dentro de una misma región',[
['https://upload.wikimedia.org/wikipedia/commons/8/8d/Cuenca_Rio_Cravo_Sur.jpg','Cuenca del río Cravo Sur','Ríos y relieve','Los cursos de agua ayudan a explicar cómo se organiza el paisaje.'],
['https://upload.wikimedia.org/wikipedia/commons/f/f7/Perdidos_en_la_sabana.jpg','Paisaje de sabana','Sabana','Las sabanas son uno de los ambientes más representativos de los Llanos.'],
['https://upload.wikimedia.org/wikipedia/commons/0/0b/Boa_constrictor_aliada_en_el_equilibrio_ecosistemico.jpg','Boa constrictor en la Orinoquía','Fauna','La fauna también hace parte de la dinámica de estos ecosistemas.']
]);
addGallery('#biodiversidad','Fauna y flora para mirar con otros ojos',[
['https://upload.wikimedia.org/wikipedia/commons/7/7b/Curiosidad_en_el_Dosel%2C_Mono_Maicero_de_la_Orinoqu%C3%ADa.png','Mono maicero de la Orinoquía','Mamíferos','Los bosques y corredores de vegetación ofrecen refugio y alimento a distintas especies.'],
['https://upload.wikimedia.org/wikipedia/commons/e/e7/Melanerpes_cruentatus_Little_Woodpecker.png','Carpinterito de la Orinoquía','Aves','Las aves permiten observar la variedad de ambientes presentes en la región.'],
['https://upload.wikimedia.org/wikipedia/commons/2/2a/Racimo_de_la_palmera_corneto.jpg','Racimo de palmera corneto','Flora','Las plantas también son parte clave de las redes ecológicas del territorio.']
]);
addGallery('#gente','Personas, ciudades y formas de conectar el territorio',[
['https://upload.wikimedia.org/wikipedia/commons/e/e7/Navegabilidad_por_el_R%C3%ADo_Meta.jpg','Navegación por el río Meta','Conectividad','El transporte fluvial puede ser importante para conectar comunidades y actividades.'],
['https://upload.wikimedia.org/wikipedia/commons/2/21/Calle_principal_de_Puerto_Carre%C3%B1o_-_panoramio.jpg','Calle principal de Puerto Carreño','Vida urbana','La vida urbana también hace parte de la diversidad territorial de la Orinoquía.'],
['https://upload.wikimedia.org/wikipedia/commons/8/84/Panam%C3%A1_de_Arauca%2C_Arauquita-Col.jpg','Panamá de Arauca, Arauquita','Arauca','Una muestra del territorio del departamento de Arauca.']
]);
addGallery('#cultura','Imágenes de la identidad llanera',[
['https://upload.wikimedia.org/wikipedia/commons/e/1/Bailando_Joropo.jpg','Personas bailando joropo','Joropo','Música y danza son expresiones centrales de la cultura llanera.'],
['https://upload.wikimedia.org/wikipedia/commons/d/f/JOROPO.jpg','Baile de joropo','Tradición viva','Las expresiones culturales se mantienen, se enseñan y también evolucionan.'],
['https://upload.wikimedia.org/wikipedia/commons/b/b4/Alphons_St%C3%BCbel_llanero_de_Casanare.png','Llanero de Casanare, registro histórico','Memoria','Las imágenes históricas también ayudan a conocer cómo se ha representado la vida llanera.']
]);
addGallery('#economia','Producción, agricultura y territorio',[
['https://upload.wikimedia.org/wikipedia/commons/9/9b/Llanos_Orientales_-_Arroz.jpg','Arroz en los Llanos Orientales','Agricultura','Los cultivos forman parte de la actividad agropecuaria de la región.'],
['https://upload.wikimedia.org/wikipedia/commons/8/84/Hacienda_de_Cumaral.jpg','Hacienda de Cumaral','Actividad rural','Las haciendas y espacios rurales muestran otra dimensión del paisaje productivo.'],
['https://upload.wikimedia.org/wikipedia/commons/e/e7/Navegabilidad_por_el_R%C3%ADo_Meta.jpg','Transporte por el río Meta','Comercio y conexión','Mover personas y productos también depende de las conexiones territoriales.']
]);
addGallery('#retos','Cambios del territorio que vale la pena observar',[
['https://upload.wikimedia.org/wikipedia/commons/0/02/%22Bajo%22_llanura_inundada_en_La_Primavera%2C_Vichada.jpg','Llanura inundada en Vichada','Agua','Las temporadas húmedas cambian temporalmente la apariencia y dinámica del paisaje.'],
['https://upload.wikimedia.org/wikipedia/commons/8/8d/Morichal_en_La_Primavera%2C_Vichada.jpg','Morichal en La Primavera','Ecosistemas','Los ambientes asociados al agua necesitan manejo y conservación.'],
['https://upload.wikimedia.org/wikipedia/commons/8/8d/Cuenca_Rio_Cravo_Sur.jpg','Cuenca del río Cravo Sur','Territorio y agua','Observar las cuencas ayuda a entender la relación entre actividades humanas y recursos hídricos.']
]);
addGallery('.parks','Áreas naturales y paisajes protegidos',[
['https://upload.wikimedia.org/wikipedia/commons/8/0/TuparroNPP_banner.jpg','Paisaje de El Tuparro','El Tuparro','Un área protegida del Vichada de gran importancia natural.'],
['https://upload.wikimedia.org/wikipedia/commons/f/f9/PNN_Sierra_de_la_Macarena.jpg','Sierra de La Macarena','Meta','Un territorio de gran diversidad ambiental y paisajística.']
]);
addExpanders('#territorio','Detalles para ubicarte mejor',[
['¿Por qué se habla de cuatro departamentos?','Para este proyecto usamos principalmente Arauca, Casanare, Meta y Vichada como referencia escolar de la Orinoquía colombiana.'],
['¿La región es solo una llanura?','No. También encontramos piedemonte, ríos, humedales, morichales, bosques y otros paisajes.'],
['¿Qué papel tiene el Orinoco?','La región está vinculada a la gran cuenca del río Orinoco, que conecta sistemas de agua y ecosistemas.']
]);
addExpanders('#naturaleza','Pequeñas explicaciones que ayudan a entender el paisaje',[
['Piedemonte','Es la zona de transición entre la cordillera y las áreas más bajas de los Llanos.'],
['Estero','Es una zona baja que puede acumular agua durante periodos húmedos y tiene importancia ecológica.'],
['Bosque de galería','Son franjas de vegetación asociadas a los cursos de agua que aportan refugio y ayudan a proteger las orillas.']
]);
addExpanders('#biodiversidad','Conoce un poco más sobre la vida regional',[
['¿Por qué hay tanta variedad?','La combinación de sabanas, bosques, ríos y humedales crea diferentes condiciones para plantas y animales.'],
['Fauna y agua','Muchas especies dependen de ríos, lagunas, esteros y otros ambientes húmedos para alimentarse o refugiarse.'],
['Conservar también es conocer','Identificar especies y ecosistemas facilita comprender qué se puede proteger y por qué.']
]);
addExpanders('#gente','Más contexto sobre la geografía humana',[
['Ciudades como puntos de conexión','Villavicencio, Yopal, Arauca y Puerto Carreño cumplen funciones urbanas y conectan servicios, comercio y transporte.'],
['Ruralidad','En muchas zonas la vida cotidiana está relacionada con actividades del campo y con las condiciones del suelo, el clima y el agua.']
]);
addExpanders('#cultura','Lo que hay detrás de una tradición',[
['Joropo','Es una expresión cultural muy reconocida de los Llanos y reúne música, canto y danza.'],
['Tradición oral','Coplas, relatos y memorias ayudan a transmitir conocimientos y formas de interpretar el territorio.'],
['Trabajo y cultura','Los oficios rurales también forman parte de la identidad porque conectan prácticas, paisaje y memoria.']
]);
addExpanders('#economia','Entiende la economía por partes',[
['Sector primario','Incluye actividades como agricultura y ganadería y otras relacionadas directamente con el aprovechamiento de recursos naturales.'],
['Sector secundario','Transforma materias primas mediante procesos productivos.'],
['Sector terciario','Reúne servicios, comercio, transporte, educación, turismo y otras actividades que conectan a la población.']
]);
addPresentationViewer();addScrollEffects()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();