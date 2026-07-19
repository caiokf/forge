/* C4 interactive diagram engine.
   Expects a global MODEL defined before this script loads.
   Spec: references/html-diagram-design.md */

/* ========================== palette / helpers ========================== */
const PALETTE = ["#8CECFF","#588AF7","#3FE99C","#CB80F0","#FF72FC","#F07C7F","#FF8811","#F5B841","#C6ADA3","#CFD2D2"];
const KIND_LABEL = { system:"System", app:"App", store:"Store", component:"Component", actor:"Actor" };
const LEVEL_LABEL = { context:"Context", container:"Container", component:"Component" };
const techColors = {};
let paletteIdx = 0;
function techColor(t){ if(!t) return null; if(!techColors[t]) techColors[t] = PALETTE[paletteIdx++ % PALETTE.length]; return techColors[t]; }
Object.values(MODEL.diagrams).forEach(d => d.nodes.concat(d.groups||[]).forEach(n => techColor(n.tech)));
function caption(n){ return n.kind==="actor" ? "Actor" : KIND_LABEL[n.kind] + (n.tech ? ": " + n.tech : ""); }
function esc(s){ return String(s??"").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

/* ========================== state ========================== */
const views = {};                 // per-diagram pan/zoom
let current = null;               // diagram key
let selected = null;              // node id
const history = []; let histPos = -1;
const canvas = document.getElementById("canvas");
const world = document.getElementById("world");
const panel = document.getElementById("panel");

function view(){ return views[current] ??= { x:0, y:0, s:1, fitted:false }; }
function diagram(){ return MODEL.diagrams[current]; }
function applyView(){
  const v = view();
  world.style.transform = `translate(${v.x}px,${v.y}px) scale(${v.s})`;
  document.getElementById("zoomlvl").textContent = Math.round(v.s*100)+"%";
}

/* ========================== rendering ========================== */
const PERSON = '<svg viewBox="0 0 24 24"><path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"/></svg>';
const MAGNIFIER = '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 1 0-.7.7l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zM9 7h1v2h2v1h-2v2H9v-2H7V9h2V7z"/></svg>';

function render(){
  const d = diagram();
  const nl = document.getElementById("nodes-layer");
  const gl = document.getElementById("groups-layer");
  nl.innerHTML = ""; gl.innerHTML = "";

  (d.groups||[]).forEach(g => {
    const el = document.createElement("div");
    el.className = "group"; el.dataset.id = g.id;
    el.style.cssText = `left:${g.x}px;top:${g.y}px;width:${g.w}px;height:${g.h}px`;
    el.innerHTML =
      (g.childDiagram ? `<span class="drill" data-target="${esc(g.childDiagram)}">${MAGNIFIER}<span>${childCount(g.childDiagram)}</span></span>` : "") +
      `<div class="g-head" style="${g.childDiagram?'margin-left:26px':''}">` +
      (g.icon ? `<span class="icon">${esc(g.icon)}</span>` : "") +
      `<span>${esc(g.name)}</span></div>` +
      `<div class="g-caption">${esc("System" + (g.tech ? ": " + g.tech : ""))}</div>`;
    gl.appendChild(el);
  });

  d.nodes.forEach(n => {
    const el = document.createElement("div");
    el.dataset.id = n.id;
    el.className = "node " + n.kind + (n.scope==="external" ? " external" : "") + (n.id===selected ? " selected" : "");
    el.style.cssText = `left:${n.x}px;top:${n.y}px`;
    const bar = techColor(n.tech);
    const drill = n.childDiagram ? `<span class="drill" data-target="${esc(n.childDiagram)}">${MAGNIFIER}<span>${childCount(n.childDiagram)}</span></span>` : "";
    if (n.kind === "actor") {
      el.innerHTML = drill + `<span class="badge">${PERSON}</span><div class="card">` +
        `<div class="name">${esc(n.name)}</div><div class="caption">Actor</div></div>`;
    } else {
      el.innerHTML = drill +
        `<div class="head">` +
        (n.icon ? `<span class="icon">${esc(n.icon)}</span>` : "") +
        `<span class="name">${esc(n.name)}</span></div>` +
        `<div class="caption">${esc(caption(n))}</div>` +
        (bar ? `<span class="tech-bar" style="background:${bar}"></span>` : "") +
        `<span class="dots"><i style="top:-4px;left:50%"></i><i style="bottom:-4px;left:50%"></i><i style="left:-4px;top:50%"></i><i style="right:-4px;top:50%"></i></span>` +
        `<span class="handles">` +
          `<i style="top:-4px;left:-4px"></i><i style="top:-4px;left:calc(50% - 4px)"></i><i style="top:-4px;right:-4px"></i>` +
          `<i style="top:calc(50% - 4px);left:-4px"></i><i style="top:calc(50% - 4px);right:-4px"></i>` +
          `<i style="bottom:-4px;left:-4px"></i><i style="bottom:-4px;left:calc(50% - 4px)"></i><i style="bottom:-4px;right:-4px"></i></span>`;
    }
    nl.appendChild(el);
  });

  renderEdges();
  renderCrumbs();
  renderLegend();
  const v = view();
  if (!v.fitted) { v.fitted = true; fit(); } else applyView();
  refreshHighlight();
}

function childCount(key){ const d = MODEL.diagrams[key]; return d ? d.nodes.length : ""; }

function nodeRect(id){
  const el = document.querySelector(`.node[data-id="${CSS.escape(id)}"]`);
  const n = diagram().nodes.find(x => x.id===id);
  return { x:n.x, y:n.y, w: el ? el.offsetWidth : 180, h: el ? el.offsetHeight : 72 };
}
function borderPoint(r, tx, ty){
  const cx = r.x + r.w/2, cy = r.y + r.h/2, dx = tx-cx, dy = ty-cy;
  if (!dx && !dy) return {x:cx, y:cy};
  const sx = dx ? (r.w/2)/Math.abs(dx) : 1e9, sy = dy ? (r.h/2)/Math.abs(dy) : 1e9;
  const t = Math.min(sx, sy);
  return { x: cx + dx*t, y: cy + dy*t };
}

function renderEdges(){
  const g = document.getElementById("edge-g");
  const ll = document.getElementById("labels-layer");
  g.innerHTML = ""; ll.innerHTML = "";
  diagram().edges.forEach((e, i) => {
    const ra = nodeRect(e.from), rb = nodeRect(e.to);
    const ca = {x:ra.x+ra.w/2, y:ra.y+ra.h/2}, cb = {x:rb.x+rb.w/2, y:rb.y+rb.h/2};
    const a = borderPoint(ra, cb.x, cb.y), b = borderPoint(rb, ca.x, ca.y);
    const mx = (a.x+b.x)/2, my = (a.y+b.y)/2;
    const dx = b.x-a.x, dy = b.y-a.y, len = Math.hypot(dx,dy) || 1;
    const off = Math.min(0.12*len, 34);           // gentle perpendicular bow
    const qx = mx - dy/len*off, qy = my + dx/len*off;
    const path = document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("d", `M${a.x},${a.y} Q${qx},${qy} ${b.x},${b.y}`);
    path.setAttribute("class","edge-path");
    path.setAttribute("marker-end","url(#arrow)");
    path.dataset.i = i;
    g.appendChild(path);
    if (e.label){
      const lb = document.createElement("div");
      lb.className = "edge-label"; lb.dataset.i = i;
      lb.style.left = (mx*0.5 + qx*0.5) + "px";   // point on curve at t=0.5
      lb.style.top  = (my*0.5 + qy*0.5) + "px";
      lb.textContent = e.label;
      ll.appendChild(lb);
    }
  });
}

function renderCrumbs(){
  const d = diagram();
  const c = document.getElementById("crumbs");
  const up = d.parent ? `<span class="up" data-key="${esc(d.parent)}">${esc(MODEL.diagrams[d.parent].name)}</span><span style="color:var(--rock-500)">/</span>` : "";
  c.innerHTML = up + `<span>${esc(d.name)}</span><span class="lvl">${LEVEL_LABEL[d.type]||d.type}</span>`;
  c.querySelectorAll(".up").forEach(el => el.onclick = () => navigate(el.dataset.key));
  document.getElementById("nav-back").disabled = histPos <= 0;
  document.getElementById("nav-fwd").disabled  = histPos >= history.length-1;
}

let legendActive = null;
function renderLegend(){
  const counts = {};
  diagram().nodes.forEach(n => { if(n.tech) counts[n.tech] = (counts[n.tech]||0)+1; });
  const lg = document.getElementById("legend");
  lg.innerHTML = "";
  Object.entries(counts).forEach(([tech,count]) => {
    const col = techColor(tech);
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.style.cssText = `color:${col};background:${col}2E;border-color:${col}55`;
    chip.innerHTML = `${esc(tech)} <span class="n">${count}</span>`;
    chip.onmouseenter = () => { legendActive = tech; document.body.classList.add("legend-on"); refreshHighlight(); };
    chip.onmouseleave = () => { legendActive = null; document.body.classList.remove("legend-on"); refreshHighlight(); };
    lg.appendChild(chip);
  });
  lg.style.display = lg.children.length ? "flex" : "none";
}

/* ============== selection highlight / dimming ============== */
function refreshHighlight(){
  const d = diagram();
  const connected = new Set(), hlEdges = new Set();
  if (selected){
    connected.add(selected);
    d.edges.forEach((e,i) => { if (e.from===selected || e.to===selected){ hlEdges.add(i); connected.add(e.from); connected.add(e.to); } });
  }
  document.querySelectorAll(".node").forEach(el => {
    const id = el.dataset.id;
    const dimSel = selected && !connected.has(id);
    const dimLeg = legendActive && (d.nodes.find(n=>n.id===id)||{}).tech !== legendActive;
    el.classList.toggle("dim", !!(dimSel || dimLeg));
    el.classList.toggle("selected", id === selected);
  });
  document.querySelectorAll(".edge-path").forEach(p => {
    const i = +p.dataset.i, hl = hlEdges.has(i);
    p.classList.toggle("dim", !!selected && !hl);
    p.setAttribute("marker-end", hl ? "url(#arrow-hl)" : "url(#arrow)");
    p.style.stroke = hl ? "var(--accent)" : "";
  });
  document.querySelectorAll(".edge-label").forEach(l => {
    const i = +l.dataset.i, hl = hlEdges.has(i);
    l.classList.toggle("dim", !!selected && !hl);
    l.classList.toggle("hl-label", hl);
  });
  document.querySelectorAll(".group").forEach(el => el.classList.toggle("dim", !!selected));
}

/* ========================== details panel ========================== */
function openPanel(n){
  const STATUS_COLOR = { live:"#3FE99C", future:"#CB80F0", deprecated:"#FF8811", removed:"#F07C7F" };
  const rows = [
    ["Type", KIND_LABEL[n.kind] || n.kind],
    ["Scope", n.scope ? n.scope[0].toUpperCase()+n.scope.slice(1) : "Internal"],
    n.tech ? ["Technology", esc(n.tech)] : null,
    n.status ? ["Status", `<span class="pill"><i style="background:${STATUS_COLOR[n.status]||"#CFD2D2"}"></i>${esc(n.status[0].toUpperCase()+n.status.slice(1))}</span>`] : null,
  ].filter(Boolean);
  panel.innerHTML =
    `<div class="p-head">` +
    (n.kind==="actor" ? `<span class="icon">${PERSON.replace('<svg','<svg style="width:22px;height:22px"')}</span>`
                      : (n.icon ? `<span class="icon">${esc(n.icon)}</span>` : "")) +
    `<span class="t">${esc(n.name)}</span><button class="p-close">&#10005;</button></div>` +
    rows.map(([k,v]) => `<div class="row"><span class="k">${k}</span><span class="v">${v}</span></div>`).join("") +
    (n.description ? `<div class="desc">${esc(n.description)}</div>` : "") +
    (n.childDiagram ? `<span class="open-link" data-target="${esc(n.childDiagram)}">Open diagram &rarr;</span>` : "");
  panel.classList.add("open");
  panel.querySelector(".p-close").onclick = clearSelection;
  const link = panel.querySelector(".open-link");
  if (link) link.onclick = () => navigate(link.dataset.target);
}
function clearSelection(){ selected = null; panel.classList.remove("open"); refreshHighlight(); }

/* ========================== navigation ========================== */
function navigate(key, fromHistory){
  if (!MODEL.diagrams[key]) return;
  if (!fromHistory){ history.splice(histPos+1); history.push(key); histPos = history.length-1; }
  current = key; selected = null; panel.classList.remove("open");
  render();
}
document.getElementById("nav-back").onclick = () => { if (histPos>0) navigate(history[--histPos], true); };
document.getElementById("nav-fwd").onclick  = () => { if (histPos<history.length-1) navigate(history[++histPos], true); };

/* ========================== pan / zoom ========================== */
function zoomAt(cx, cy, factor){
  const v = view();
  const ns = Math.min(3, Math.max(0.2, v.s * factor));
  v.x = cx - (cx - v.x) * ns/v.s; v.y = cy - (cy - v.y) * ns/v.s; v.s = ns;
  applyView();
}
canvas.addEventListener("wheel", e => {
  e.preventDefault();
  if (e.ctrlKey || e.metaKey) zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY*0.01));
  else { const v = view(); v.x -= e.deltaX; v.y -= e.deltaY; applyView(); }
}, { passive:false });

function fit(){
  const v = view();
  const els = [...document.querySelectorAll(".node"), ...document.querySelectorAll(".group")];
  if (!els.length) return;
  let x1=1e9,y1=1e9,x2=-1e9,y2=-1e9;
  els.forEach(el => {
    const x = parseFloat(el.style.left), y = parseFloat(el.style.top);
    x1 = Math.min(x1,x); y1 = Math.min(y1,y);
    x2 = Math.max(x2, x+el.offsetWidth); y2 = Math.max(y2, y+el.offsetHeight);
  });
  const pad = 90, W = canvas.clientWidth, H = canvas.clientHeight;
  v.s = Math.min(1.4, Math.min((W-pad*2)/(x2-x1), (H-pad*2)/(y2-y1)));
  v.x = (W - (x2-x1)*v.s)/2 - x1*v.s;
  v.y = (H - (y2-y1)*v.s)/2 - y1*v.s;
  applyView();
}
document.getElementById("z-in").onclick  = () => zoomAt(canvas.clientWidth/2, canvas.clientHeight/2, 1.2);
document.getElementById("z-out").onclick = () => zoomAt(canvas.clientWidth/2, canvas.clientHeight/2, 1/1.2);
document.getElementById("z-fit").onclick = fit;
canvas.addEventListener("dblclick", e => { if (e.target.closest(".node,.group,.bar,#panel")) return; zoomAt(e.clientX, e.clientY, 1.4); });

/* ========================== pointer: drag / select ========================== */
let drag = null;
canvas.addEventListener("pointerdown", e => {
  if (e.button !== 0) return;
  if (e.target.closest(".bar") || e.target.closest("#panel")) return;
  const drillEl = e.target.closest(".drill");
  if (drillEl){ navigate(drillEl.dataset.target); e.stopPropagation(); return; }
  const nodeEl = e.target.closest(".node");
  canvas.setPointerCapture(e.pointerId);
  if (nodeEl){
    const n = diagram().nodes.find(x => x.id === nodeEl.dataset.id);
    drag = { type:"node", n, el:nodeEl, sx:e.clientX, sy:e.clientY, ox:n.x, oy:n.y, moved:false };
  } else {
    const v = view();
    drag = { type:"pan", sx:e.clientX, sy:e.clientY, ox:v.x, oy:v.y, moved:false };
  }
});
canvas.addEventListener("pointermove", e => {
  if (!drag) return;
  const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
  if (Math.abs(dx)+Math.abs(dy) > 4) drag.moved = true;
  if (!drag.moved) return;
  if (drag.type === "pan"){
    const v = view(); v.x = drag.ox + dx; v.y = drag.oy + dy; applyView();
  } else {
    const v = view();
    drag.n.x = drag.ox + dx/v.s; drag.n.y = drag.oy + dy/v.s;
    drag.el.style.left = drag.n.x+"px"; drag.el.style.top = drag.n.y+"px";
    drag.el.classList.add("dragging");
    renderEdges(); refreshHighlight();
  }
});
canvas.addEventListener("pointerup", () => {
  if (!drag) return;
  const wasClick = !drag.moved;
  const d = drag; drag = null;
  if (d.el) d.el.classList.remove("dragging");
  if (wasClick){
    if (d.type === "node"){ selected = d.n.id; refreshHighlight(); openPanel(d.n); }
    else clearSelection();
  }
});
window.addEventListener("keydown", e => {
  if (e.key === "Escape") clearSelection();
  if (e.key === "+" || e.key === "=") zoomAt(canvas.clientWidth/2, canvas.clientHeight/2, 1.2);
  if (e.key === "-") zoomAt(canvas.clientWidth/2, canvas.clientHeight/2, 1/1.2);
  if (e.key === "0") fit();
});
window.addEventListener("resize", applyView);

/* ========================== boot ========================== */
const rootKey = Object.keys(MODEL.diagrams).find(k => !MODEL.diagrams[k].parent) || Object.keys(MODEL.diagrams)[0];
document.title = "C4 Architecture — " + MODEL.title;
navigate(rootKey);
