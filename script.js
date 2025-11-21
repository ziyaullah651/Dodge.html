// script.js — inject inline SVGs and provide play/pause control that toggles CSS animations.
// Three SVGs are embedded directly as strings. Each is accessible with aria-labels and titles.

const svg1 = `<!-- SVG 1: Ramp & wheelchair with moving wheel --> 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 200" role="img" aria-labelledby="title1 desc1">
  <title id="title1">Ramps and wheelchair accessibility</title>
  <desc id="desc1">A simple animated ramp with a wheelchair rolling up to show accessible design.</desc>
  <rect width="100%" height="100%" fill="transparent"/>
  <g transform="translate(20,40)">
    <rect x="0" y="80" width="260" height="8" rx="4" fill="#e6f0ff"/>
    <polygon points="0,88 220,14 260,14 40,88" fill="#dceeff"/>
    <!-- wheelchair -->
    <g id="wheelchair" transform="translate(10,20)">
      <circle cx="200" cy="40" r="18" fill="none" stroke="#0b76ef" stroke-width="4"/>
      <circle cx="200" cy="40" r="4" fill="#0b76ef"/>
      <rect x="170" y="18" width="28" height="6" rx="3" fill="#0b76ef" />
      <circle cx="120" cy="40" r="10" fill="#0b76ef"/>
      <line x1="130" y1="40" x2="185" y2="28" stroke="#0b76ef" stroke-width="4" stroke-linecap="round"/>
    </g>
    <!-- path animation -->
    <g>
      <animateTransform xlink:href="#wheelchair" attributeName="transform" type="translate" dur="4s"
        values="10,20;40,10;80,0;120,-8;160,-12" repeatCount="indefinite"/>
      <animateTransform xlink:href="#wheelchair" attributeName="transform" type="rotate" dur="4s"
        values="0 200 40; -4 200 40; 4 200 40; 0 200 40" additive="sum" repeatCount="indefinite"/>
    </g>
  </g>
</svg>`;

const svg2 = `<!-- SVG 2: Screen with captions appearing --> 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 200" role="img" aria-labelledby="title2 desc2">
  <title id="title2">Digital accessibility — captions and assistive tech</title>
  <desc id="desc2">A monitor with text captions fading in and out to show accessible media.</desc>
  <rect width="100%" height="100%" fill="transparent"/>
  <g transform="translate(30,30)">
    <rect x="0" y="0" width="300" height="160" rx="12" fill="#fff" stroke="#dbe9ff" />
    <rect x="18" y="20" width="264" height="86" rx="6" fill="#f7fbff" />
    <rect x="18" y="112" width="264" height="18" rx="4" fill="#eef6ff" />
    <!-- caption lines -->
    <g id="captions">
      <rect x="36" y="122" width="200" height="8" rx="4" fill="#0b76ef" opacity="0.9"/>
      <rect x="36" y="134" width="150" height="6" rx="4" fill="#0b76ef" opacity="0.7"/>
    </g>
    <animate xlink:href="#captions" attributeName="opacity" dur="3s" values="1;0.2;1" repeatCount="indefinite"/>
    <!-- assistive icon -->
    <circle cx="40" cy="48" r="12" fill="#0b76ef" opacity="0.12"/>
    <text x="36" y="52" font-size="12" fill="#0b76ef">Aa</text>
  </g>
</svg>`;

const svg3 = `<!-- SVG 3: Support & counselling with pulsing hands --> 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 200" role="img" aria-labelledby="title3 desc3">
  <title id="title3">Support and accommodations</title>
  <desc id="desc3">Two hands meeting with a heartbeat-like pulse to show support services and counselling.</desc>
  <rect width="100%" height="100%" fill="transparent"/>
  <g transform="translate(40,30)">
    <circle cx="100" cy="70" r="44" fill="#eaf6ff"/>
    <path id="handL" d="M60 70 q20 -30 40 0" stroke="#0b76ef" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path id="handR" d="M140 70 q-20 -30 -40 0" stroke="#0b76ef" stroke-width="6" fill="none" stroke-linecap="round"/>
    <g id="pulse">
      <path d="M20 140 q40 -30 80 0 q40 -30 80 0" stroke="#0b76ef" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.9"/>
    </g>
    <animate xlink:href="#pulse" attributeName="opacity" dur="2.2s" values="0.9;0.2;0.9" repeatCount="indefinite"/>
    <animateTransform xlink:href="#handL" attributeName="transform" type="translate" dur="2s" values="0 0;0 -4;0 0" repeatCount="indefinite"/>
    <animateTransform xlink:href="#handR" attributeName="transform" type="translate" dur="2s" values="0 0;0 -4;0 0" repeatCount="indefinite"/>
  </g>
</svg>`;

function injectSVG(placeholderId, svgString) {
  const el = document.getElementById(placeholderId);
  if (!el) return;
  el.innerHTML = svgString;
  // Add title role
  const svg = el.querySelector('svg');
  if (svg) {
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('tabindex', '0');
  }
}

document.addEventListener('DOMContentLoaded', ()=> {
  injectSVG('svg1-placeholder', svg1);
  injectSVG('svg2-placeholder', svg2);
  injectSVG('svg3-placeholder', svg3);

  // Manage play/pause controls — toggle animations by toggling a class that pauses animations via CSS
  document.querySelectorAll('.play-pause').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const target = btn.dataset.target;
      const placeholder = document.getElementById(target + '-placeholder');
      if (!placeholder) return;
      const svg = placeholder.querySelector('svg');
      if (!svg) return;
      const paused = svg.classList.toggle('paused');
      btn.textContent = paused ? 'Play' : 'Pause';
      // for screen readers, announce
      btn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    });
  });

  // Accessibility: allow space/enter to trigger play/pause buttons
  document.querySelectorAll('.play-pause').forEach(b=>{
    b.addEventListener('keyup', (ev)=>{
      if (ev.key === ' ' || ev.key === 'Enter') b.click();
    });
  });
});
