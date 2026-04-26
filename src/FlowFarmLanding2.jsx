import React, { useState, useEffect, useRef } from 'react'; // v2

// Load Cormorant Garamond for ultra-thin editorial numerals
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap';
  document.head.appendChild(link);
}


const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';

// LOCKED VIDEO IDs -- DO NOT CHANGE WITHOUT RACHEL APPROVAL
const VIDEO_BG_ID = '5d06a3b0e25b768ac6dc681dbf4f5b81'; // forest loop (hero bg)
const VIDEO_TOUR_ID = 'de1885d159ae310508174f03f775c797'; // property tour (Enter Flow Farm)
const CF_STREAM = 'https://customer-qqzxuq43g9w49ny2.cloudflarestream.com';
const MATTERPORT = 'https://my.matterport.com/show/?m=xZRfSiQPuQ8';

const B = 'https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/'; // LAW: NEVER media.base44.com — always base44.app upload URL
const CLOUD = 'dghn2xpif';
const cdn = (url, w = 1400) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/f_auto,q_auto,w_' + w + ',c_limit/' + encodeURIComponent(url);
const cdnInt = (url) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/' + encodeURIComponent(url);
const cdnExt = (url) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1600,c_limit/' + encodeURIComponent(url);
const cdnSharp = (url) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/e_sharpen:200,e_vibrance:30,e_brightness:8,e_saturation:20,f_auto,q_auto,w_2000,c_limit/' + encodeURIComponent(url);

const IMG = {
  // Interior shots -- direct Cloudinary upload, indoor enhancement pipeline
  living:           'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_living.jpg',
  conservatory:     'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_conservatory.jpg',
  conservatoryDome: 'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_conservatory_dome.jpg',
  kitchen:          'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_kitchen.jpg',
  dining:           'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_dining.jpg',
  spabath:          'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_spabath.jpg',
  foyer:            'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_foyer.jpg',
  powderroom:       'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_powderroom.jpg',
  wolf:             'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_wolf.jpg',
  kitchen2:         'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_kitchen.jpg',
  office:           'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_office.jpg',
  hallway:          'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/ff_hallway.jpg',
  // Exterior / aerial -- direct Cloudinary upload, outdoor enhancement pipeline
  aerial:           'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1920,c_limit/ff_aerial_master.jpg',
  forestcanopy:     'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1920,c_limit/ff_forest_canopy.jpg',
  grounds:          'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1920,c_limit/ff_grounds.jpg',
  exterior:         'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1920,c_limit/ff_exterior.jpg',
  trail:            'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1920,c_limit/ff_trail.jpg',
  // Structures -- outdoor enhancement
  cabana:           'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1920,c_limit/ff_cabana.jpg',
  tunnel:           'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1920,c_limit/ff_tunnel.jpg',
  workshop:         'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1920,c_limit/ff_workshop.jpg',
  pine:             'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1920,c_limit/ff_pine.jpg',
  aerialmap:        'https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1920,c_limit/ff_aerial_map.jpg',
};

function useW() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

function useFade() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); o.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, on];
}

function useCounter(target, duration, delay, decimals) {
  const [count, setCount] = React.useState(0);
  const timers = React.useRef([]);

  React.useEffect(() => {
    const _target = target;
    const _duration = duration || 1600;
    const _delay = delay != null ? delay : 200;
    const _decimals = decimals || 0;
    const steps = 60;
    const stepTime = _duration / steps;
    let current = 0;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    const tick = () => {
      current++;
      const progress = current / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((ease * _target).toFixed(_decimals)));
      if (current < steps) {
        const t = setTimeout(tick, stepTime);
        timers.current.push(t);
      }
    };

    const t0 = setTimeout(tick, _delay);
    timers.current.push(t0);

    return () => { timers.current.forEach(clearTimeout); };
  }, [target, duration, delay]);

  return [count];
}



function Fade({ children, delay, up, style }) {
  const [ref, on] = useFade();
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'none' : (up ? 'translateY(36px)' : 'translateY(20px)'),
      transition: `opacity 1.6s ease ${delay || 0}s, transform 1.6s ease ${delay || 0}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Glass({ children, style }) {
  return (
    <div style={{
      background: 'rgba(8,8,8,0.62)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.07)',
      ...style,
    }}>
      {children}
    </div>
  );
}

function Eyebrow({ children, center }) {
  return (
    <p style={{
      fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em',
      textTransform: 'uppercase', color: GOLD, margin: 0,
      textAlign: center ? 'center' : 'left',
    }}>{children}</p>
  );
}

function GoldLine() {
  return <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.35 }} />;
}

// ============================================================
// HERO
// ============================================================
const HeroStat = React.memo(function HeroStat({ value, prefix, suffix, decimals, label1, label2, duration, delay, mob }) {
  const [count] = useCounter(value, duration || 1600, delay || 600, decimals || 0);
  const display = (prefix || '') + (decimals ? count.toFixed(decimals) : Math.round(count).toLocaleString()) + (suffix || '');
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{
        color: '#F5F0E8',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: mob ? '1.7rem' : '3.2rem',
        fontWeight: 300,
        lineHeight: 1,
        marginBottom: '0.7rem',
        letterSpacing: '-0.01em',
        fontStyle: 'normal',
      }}>{display}</div>
      <div style={{
        color: 'rgba(255,255,255,0.55)',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: mob ? '6px' : '8px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        lineHeight: 1.6,
        fontWeight: 400,
      }}>{label1}<br />{label2}</div>
    </div>
  );
});

const HeroStats = React.memo(function HeroStats({ mob }) {
  const stats = [
    { value: 15, prefix: '', suffix: '', decimals: 0, label1: 'USDA', label2: 'ACRES', duration: 900, delay: 200 },
    { value: 7, prefix: '', suffix: '', decimals: 0, label1: 'BUILDABLE', label2: 'ACRES · ZONING', duration: 900, delay: 300 },
    { value: 3, prefix: '', suffix: '', decimals: 0, label1: 'ACRE VEGANIC', label2: 'FARM', duration: 900, delay: 400 },
    { value: 5.25, prefix: '$', suffix: 'M', decimals: 2, label1: 'LIST', label2: 'PRICE', duration: 900, delay: 500 },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', margin: mob ? '0 0 0.8rem' : '0 0 2.6rem', gap: 0 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          {i > 0 && (
            <div style={{
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.18) 80%, transparent)',
              margin: mob ? '0 1.0rem' : '0 2rem',
              alignSelf: 'stretch',
              minHeight: mob ? '48px' : '60px',
            }} />
          )}
          <HeroStat {...s} mob={mob} />
        </div>
      ))}
    </div>
  );
});


// ============================================================
// ROTATE NUDGE -- mobile portrait only, fades out after 3s
// ============================================================
function RotateNudge() {
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t);
  }, []);
  // Only show on portrait mobile
  const isPortrait = window.innerHeight > window.innerWidth;
  const isMobile = window.innerWidth < 768;
  if (!isPortrait || !isMobile) return null;
  return (
    <div style={{
      position: 'fixed', bottom: '5rem', left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      opacity: visible ? 0.7 : 0,
      transition: 'opacity 1s ease',
      pointerEvents: 'none',
      zIndex: 10002,
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" transform="rotate(90 12 12)" />
        <path d="M17 12l-5-5-5 5" />
      </svg>
      <span style={{
        color: '#C9A96E', fontFamily: 'sans-serif', fontSize: '9px',
        letterSpacing: '0.25em', textTransform: 'uppercase',
      }}>Rotate for full view</span>
    </div>
  );
}

// ============================================================
// VIDEO LIGHTBOX
// ============================================================
function VideoLightbox({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    // Lock scroll AND save position so closing doesn't jump
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.3s ease',
    }}>
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      {/* Video box -- natural 16/9 on both mobile and desktop. Mobile: fits width, letterboxes naturally with dark above/below */}
      <div onClick={e => e.stopPropagation()} style={{
        position: 'relative',
        width: '95vw',
        maxWidth: '1100px',
        aspectRatio: '16/9',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
      }}>
        <iframe
          src="https://iframe.cloudflarestream.com/de1885d159ae310508174f03f775c797?autoplay=true&controls=true&preload=auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Flow Farm property tour"
        />
      </div>

      {/* Rotate nudge -- mobile portrait only, fades out after 3s */}
      <RotateNudge />

      <button onClick={onClose} style={{
        position: 'fixed', top: '1.2rem', right: '1.2rem',
        background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.25)',
        color: 'rgba(255,255,255,0.65)', fontFamily: 'sans-serif', fontSize: '10px',
        letterSpacing: '0.28em', textTransform: 'uppercase',
        padding: '0.3rem 0', cursor: 'pointer',
        zIndex: 10001,
      }}>
        Close
      </button>
    </div>
  );
}

function Hero() {
  const w = useW();
  const mob = w < 768;
  const [p, setP] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  // Preconnect to Vimeo on mount so video loads instantly on click
  useEffect(() => {
    const link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://iframe.cloudflarestream.com';
    document.head.appendChild(link1);
    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://customer-qqzxuq43g9w49ny2.cloudflarestream.com';
    document.head.appendChild(link2);
  }, []);

  useEffect(() => {
    const t = [
      setTimeout(() => setP(1), 200),
      setTimeout(() => setP(2), 1200),
      setTimeout(() => setP(3), 2400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  const show = n => ({
    opacity: p >= n ? 1 : 0,
    transform: p >= n ? 'none' : 'translateY(22px)',
    transition: 'opacity 2.2s ease, transform 2.2s ease',
  });

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: mob ? 600 : 700, overflow: 'hidden', background: '#000' }}>
      {/* BG video -- cover technique: fills viewport at any aspect ratio, no black bars */}
      {/* Mobile portrait: focal point biased to 42% top to frame property not sky */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden', opacity: 0.80 }}>
        <iframe
          src={`${CF_STREAM}/${VIDEO_BG_ID}/iframe?autoplay=true&loop=true&muted=true&controls=false&preload=auto`}
          style={{
            position: 'absolute',
            top: mob ? '42%' : '48%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max(100%, 177.78vh)',
            height: 'max(100%, 56.25vw)',
            border: 'none',
            pointerEvents: 'none',
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          title="Flow Farm background"
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.5) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 28%, transparent 42%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,1) 100%)' }} />



      {!mob && (
        <nav style={{ position: 'absolute', top: '2.4rem', right: '3rem', zIndex: 10, display: 'flex', gap: '2.8rem', ...show(1) }}>
          {['The Estate', 'The Land', 'Inquire'].map(n => (
            <a key={n} href={'#' + n.toLowerCase().replace(' ', '-')}
              style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none' }}>
              {n}
            </a>
          ))}
        </nav>
      )}

      {/* Address pinned to top */}
      <div style={{ position: 'absolute', top: mob ? '4.5rem' : '3.8rem', left: 0, right: 0, zIndex: 6, display: 'flex', justifyContent: 'center', ...show(2) }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: mob ? '7px' : '10px', letterSpacing: mob ? '0.16em' : '0.36em', textTransform: 'uppercase', color: GOLD, margin: 0, whiteSpace: 'nowrap' }}>
          107 Linden Trail&nbsp;&nbsp;Aberdeen, NC 28315&nbsp;&nbsp;<span style={{ color: 'rgba(201,169,110,0.5)' }}>|</span>&nbsp;&nbsp;Pinehurst ETJ
        </p>
      </div>
      {/* Center block -- headline + subhead + stats + button */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: mob ? '0 6vw' : '0 10vw', maxWidth: '100%' }}>
        <div style={{ ...show(2), width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{
            color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: mob ? '2rem' : w < 1024 ? '3.6rem' : 'clamp(3.2rem, 4.8vw, 5rem)',
            lineHeight: 1.12, margin: 0, letterSpacing: '-0.02em',
            textShadow: '0 4px 80px rgba(0,0,0,0.6)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1em',
          }}>
            <span style={{ color: 'rgba(201,169,110,0.65)', fontSize: '0.62em', letterSpacing: '0.22em', fontFamily: 'sans-serif', fontStyle: 'normal', fontWeight: 300, textTransform: 'uppercase' }}>Agritourism</span>
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)', margin: '0.15em 0' }} />
            <em style={{ fontStyle: 'italic', color: '#F5F0E8', lineHeight: 1, textShadow: '0 0 60px rgba(201,169,110,0.25)' }}>Established.</em>
            <span style={{ fontSize: '0.52em', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)', fontStyle: 'normal', fontWeight: 300, textTransform: 'uppercase' }}>Legacy Ready.</span>
          </h1>
        </div>
        <div style={{ ...show(3), marginTop: mob ? '1rem' : '1.4rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* !! LOCKED SUBHEAD -- DO NOT CHANGE WITHOUT RACHEL APPROVAL !! */}
          <p style={{
            color: 'rgba(245,240,232,0.62)', fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: mob ? '0.82rem' : '1.05rem', margin: mob ? '0 0 1.2rem' : '0 0 1.2rem',
            letterSpacing: '0.01em', lineHeight: 1.7,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            Fifteen years in the making. Three miles from Pinehurst.
          </p>
          <div style={{ width: mob ? '60px' : '80px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.7), transparent)', margin: mob ? '0 auto 1.2rem' : '0 auto 1.8rem' }} />
          <HeroStats mob={mob} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: mob ? '0.75rem' : '1rem', justifyContent: 'center', alignItems: 'center', marginTop: mob ? '1rem' : '0' }}>
            <button onClick={() => setVideoOpen(true)} style={{ display: 'inline-block', background: 'none', border: 'none', borderBottom: '1px solid rgba(201,169,110,0.5)', color: GOLD, fontFamily: 'sans-serif', fontSize: mob ? '9px' : '10px', letterSpacing: '0.38em', textTransform: 'uppercase', padding: '0 0 0.3rem 0', textDecoration: 'none', fontWeight: 400, cursor: 'pointer', transition: 'opacity 0.3s ease', opacity: 0.85 }}>
              Enter Flow Farm
            </button>
            {videoOpen && <VideoLightbox onClose={() => setVideoOpen(false)} />}

          </div>
        </div>
      </div>


    </section>
  );
}

// ============================================================
// MANIFESTO
// ============================================================
function Manifesto() {
  const w = useW();
  const mob = w < 768;
  const [ref, visible] = useFade();
  const BG_URL = 'https://res.cloudinary.com/dghn2xpif/image/upload/f_auto,q_auto,w_2400,e_vibrance:40,e_saturation:20,e_brightness:15,e_sharpen:60/ff_forest_canopy.jpg';
  return (
    <section ref={ref} style={{
      position: 'relative',
      minHeight: mob ? '80vh' : '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Full-bleed forest bg with parallax */}
      <div style={{
        position: 'absolute',
        inset: '-10%',
        backgroundImage: 'url(' + BG_URL + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center 50%',
        transform: 'scale(1.08)',
        transition: 'background-position 0.1s linear',
        filter: 'saturate(1.2) brightness(0.72)',
      }} />
      {/* Top fade from black -- bleeds in from hero */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '28%',
        background: 'linear-gradient(to bottom, ' + DARK + ', transparent)',
        pointerEvents: 'none',
        zIndex: 3,
      }} />
      {/* Dark gradient vignette -- edges only, center stays clear */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      {/* Bottom fade into dark */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '35%',
        background: 'linear-gradient(to bottom, transparent, ' + DARK + ')',
        pointerEvents: 'none',
        zIndex: 3,
      }} />
      {/* Text -- floating directly on image, no card */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        textAlign: 'center',
        maxWidth: 820,
        padding: mob ? '0 7vw' : '0 6vw',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(32px)',
        transition: 'opacity 1.8s ease 0.2s, transform 1.8s ease 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: mob ? '2rem' : '2rem',
      }}>
        <p style={{
          fontFamily: 'sans-serif',
          fontSize: '10px',
          letterSpacing: '0.40em',
          textTransform: 'uppercase',
          color: GOLD,
          margin: 0,
          textShadow: '0 1px 8px rgba(0,0,0,0.6)',
        }}>107 Linden Trail -- Aberdeen, North Carolina</p>
        <h2 style={{
          color: '#ffffff',
          fontFamily: 'Georgia, serif',
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: mob ? '2rem' : w < 1024 ? '2.4rem' : 'clamp(2rem, 3.2vw, 2.8rem)',
          lineHeight: 1.28,
          margin: 0,
          letterSpacing: '-0.018em',
          textShadow: '0 2px 24px rgba(0,0,0,0.5)',
        }}>
          Not a listing.<br />A transfer of something rare.
        </h2>
        <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.5 }} />
        <p style={{
          color: 'rgba(255,255,255,0.82)',
          fontFamily: 'Georgia, serif',
          fontSize: mob ? '1rem' : '1.1rem',
          lineHeight: 1.95,
          margin: 0,
          maxWidth: 560,
          textShadow: '0 1px 12px rgba(0,0,0,0.5)',
        }}>
          Fifteen acres. Three miles from Pinehurst. Designed by Robert E. Clark AIA as one of his final private commissions. Operational by design. Independent by engineering. Ready now.
        </p>
        <a href={MATTERPORT} target="_blank" rel="noreferrer" style={{
          color: GOLD,
          fontFamily: 'sans-serif',
          fontSize: '10px',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          borderBottom: '1px solid rgba(201,169,110,0.4)',
          paddingBottom: '0.3rem',
          textShadow: '0 1px 8px rgba(0,0,0,0.4)',
        }}>
          Begin the Virtual Tour
        </a>
      </div>
    </section>
  );
}

// ============================================================
// FOUNDATION
// ============================================================
function Foundation() {
  const w = useW();
  const mob = w < 768;
  const [ref, visible] = useFade();
  return (
    <section id="the-estate" style={{ position: 'relative', minHeight: mob ? '85vh' : '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img src={IMG.exterior} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'rgba(0,0,0,0.20)' }} />
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1360, margin: '0 auto', padding: mob ? '6rem 5vw' : '10rem 6vw' }}>
        <div ref={ref} style={{
          maxWidth: mob ? '100%' : 500,
          background: 'rgba(8,8,8,0.52)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(201,169,110,0.18)',
          padding: mob ? '2.2rem 1.8rem' : '3.2rem 3.6rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateX(-40px)',
          transition: 'opacity 1.6s cubic-bezier(.16,1,.3,1), transform 1.6s cubic-bezier(.16,1,.3,1)',
        }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1rem' }}>The Estate</p>
          <div style={{ width: 24, height: 1, background: GOLD, opacity: 0.4, marginBottom: '1.4rem' }} />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.7rem' : '2.4rem', lineHeight: 1.22, margin: '0 0 1.4rem', letterSpacing: '-0.018em' }}>
            Structure That<br />Holds Freedom.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.80)', fontFamily: 'Georgia, serif', fontSize: mob ? '0.92rem' : '0.97rem', lineHeight: 1.95, margin: '0 0 1rem' }}>
            Robert E. Clark AIA designed this as one of his final private commissions. Structural integrity of a commercial build. Warmth of a home deeply lived in. Every system specified to last.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Georgia, serif', fontSize: mob ? '0.92rem' : '0.97rem', lineHeight: 1.95, margin: '0 0 1.8rem' }}>
            Civil War-era heart pine floors, custom-laid in artisan patterns. A glass conservatory with an octagonal dome. Six structures across fifteen acres.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href={MATTERPORT} target="_blank" rel="noreferrer"
              style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.28)', paddingBottom: '0.3rem' }}>
              Virtual Tour
            </a>
            <a href="#inquire"
              style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '0.3rem' }}>
              Private Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// A LIVING PLACE
// ============================================================
// ============================================================
// FOREST INTRO -- unified chapter (A Living Place + Operational + Opportunity)
// ============================================================

// THE POSITION STATEMENT — why this exists nowhere else
function PositionStatement() {
  const mob = useW() < 768;
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fade = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 1.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
  });

  return (
    <section ref={ref} style={{ background: DARK, padding: mob ? '7rem 6vw' : '10rem 10vw', borderBottom: '1px solid rgba(201,169,110,0.15)' }}>

      {/* Top gold rule */}
      <div style={{ ...fade(0), width: '3rem', height: '1px', background: GOLD, marginBottom: '3.5rem' }} />

      {/* Eyebrow */}
      <p style={{ ...fade(0.1), fontFamily: 'var(--sans)', letterSpacing: '0.28em', fontSize: '0.68rem', color: GOLD, textTransform: 'uppercase', marginBottom: '2rem', opacity: visible ? 0.9 : 0 }}>
        Pinehurst, NC · Golf Capital of America · 3 Miles
      </p>

      {/* Headline — the big swing */}
      <h2 style={{ ...fade(0.2), fontFamily: 'var(--serif)', fontWeight: 300, fontSize: mob ? 'clamp(2.2rem,9vw,3.5rem)' : 'clamp(3rem,5vw,5.5rem)', color: CREAM, lineHeight: 1.08, marginBottom: '3rem', maxWidth: '20ch' }}>
        An engineered estate.<br />A once-in-a-generation address.
      </h2>

      {/* Body — the three threads */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? '2.5rem' : '4rem 8rem', maxWidth: '90rem', marginBottom: '5rem' }}>
        <div style={fade(0.3)}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '1.05rem', color: CREAM, opacity: 0.75, lineHeight: 1.9 }}>
            Fifteen years in the making. Three acres certified veganic. USDA registered. A 30kW generator, 61 solar panels, 20 geothermal wells, and a well that produces 50 gallons per minute. The farm does not depend on the grid. The house does not depend on the farm. Both run on their own.
          </p>
        </div>
        <div style={fade(0.4)}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '1.05rem', color: CREAM, opacity: 0.75, lineHeight: 1.9 }}>
            Seven acres are buildable. That certification — earned, not bought — unlocked agritourism zoning that does not exist on the open market. A resort. A retreat. A private compound. You are not starting from scratch. You are inheriting fifteen years of groundwork, three miles from the most storied golf address in the world.
          </p>
        </div>
      </div>

      {/* Three pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: mob ? '2.5rem' : '3rem 5rem', borderTop: '1px solid rgba(201,169,110,0.2)', paddingTop: '3.5rem' }}>
        {[
          {
            num: '01',
            label: 'Engineered Autonomy',
            body: 'Solar. Geothermal. Generator. Private well. The estate runs independently of every utility it could need.',
          },
          {
            num: '02',
            label: '7 Buildable Acres',
            body: 'Agritourism zoning already in place. The land is yours to develop — resort, retreat, events, or legacy compound.',
          },
          {
            num: '03',
            label: 'Pinehurst Address',
            body: 'Three miles from Pinehurst No. 2. Home of nine US Opens. The most consequential golf address in America. Irreplaceable.',
          },
        ].map((p, i) => (
          <div key={i} style={fade(0.3 + i * 0.12)}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.65rem', letterSpacing: '0.3em', color: GOLD, opacity: 0.6, marginBottom: '1rem', textTransform: 'uppercase' }}>{p.num}</p>
            <div style={{ width: '1.5rem', height: '1px', background: GOLD, marginBottom: '1.2rem' }} />
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: CREAM, marginBottom: '0.75rem' }}>{p.label}</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: CREAM, opacity: 0.55, lineHeight: 1.8 }}>{p.body}</p>
          </div>
        ))}
      </div>

      {/* Bottom gold rule */}
      <div style={{ ...fade(0.6), width: '3rem', height: '1px', background: GOLD, marginTop: '4rem' }} />

    </section>
  );
}

function ForestIntro() {
  const w = useW();
  const mob = w < 768;
  const [beat1, setBeat1] = useState(false);
  const [beat2, setBeat2] = useState(false);
  const [beat3, setBeat3] = useState(false);
  const [beat4, setBeat4] = useState(false);
  const b1Ref = useRef(null);
  const b2Ref = useRef(null);
  const b3Ref = useRef(null);
  const b4Ref = useRef(null);
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.target === b1Ref.current && e.isIntersecting) setBeat1(true);
        if (e.target === b2Ref.current && e.isIntersecting) setBeat2(true);
        if (e.target === b3Ref.current && e.isIntersecting) setBeat3(true);
        if (e.target === b4Ref.current && e.isIntersecting) setBeat4(true);
      });
    }, { threshold: 0.15 });
    [b1Ref, b2Ref, b3Ref, b4Ref].forEach(r => r.current && obs.observe(r.current));
    return () => obs.disconnect();
  }, []);

  const FOREST_URL = 'https://res.cloudinary.com/dghn2xpif/image/upload/f_auto,q_auto,w_2400,e_vibrance:80,e_saturation:50,e_brightness:18,e_sharpen:100/ff_forest_canopy.jpg';
  const AERIAL_URL = 'https://res.cloudinary.com/dghn2xpif/image/upload/f_auto,q_auto,w_2400,e_improve:outdoor:70,e_vibrance:40,e_saturation:20,e_sharpen:60/ff_aerial_map.jpg';
  const TRAIL_URL  = 'https://res.cloudinary.com/dghn2xpif/image/upload/f_auto,q_auto,w_2400,e_improve:outdoor:60,e_vibrance:30,e_saturation:20,e_sharpen:50/ff_trail.jpg';
  const PINE_URL   = 'https://res.cloudinary.com/dghn2xpif/image/upload/f_auto,q_auto,w_2400,e_improve:outdoor:80,e_vibrance:50,e_saturation:30,e_sharpen:80,e_brightness:5/ff_pine.jpg';

  const grid = [
    { label: '15 USDA ACRES',       body: 'Registered farmland. County-taxed. No HOA.' },
    { label: '3-ACRE VEGANIC FARM', body: 'In active production since 2009. Certified regenerative.' },
    { label: '8,519 SF RESIDENCE',  body: 'Architect-designed. Built for independence.' },
    { label: 'OFF-GRID CAPABLE',    body: 'Solar. Geothermal. Generator. Well. The grid is optional.' },
    { label: '7 BUILDABLE ACRES',   body: 'Agritourism zoning unlocked by the farm. The vision is yours.' },
  ];

  /* shared text-shadow for legibility on any bg */
  const ts = '0 2px 24px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)';

  return (
    <div style={{ position: 'relative', background: '#0a0a0a' }}>

      {/* ======= CHAPTER 1: FOREST -- A Living Place + Operational by Design ======= */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Forest background -- shared across beats 1 + 2 */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(' + FOREST_URL + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center 50%',
          filter: 'saturate(1.2) brightness(1.05)',
          transition: 'background-position 0.1s linear',
        }} />
        {/* Top bleed -- merges seamlessly with hero bottom */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '22%', background: 'linear-gradient(to bottom, #0a0a0a, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.22)' }} />

        {/* Beat 1 -- A Living Place */}
        <div ref={b1Ref} style={{
          position: 'relative', zIndex: 2,
          padding: mob ? '6rem 6vw 6rem' : '8rem 10vw 8rem',
          opacity: beat1 ? 1 : 0,
          transform: beat1 ? 'none' : 'translateY(32px)',
          transition: 'opacity 1.6s ease, transform 1.6s ease',
        }}>
          <div style={{
            maxWidth: mob ? '100%' : 480,
            background: 'rgba(8,8,8,0.50)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(201,169,110,0.18)',
            padding: mob ? '2rem 1.6rem' : '3rem 3.4rem',
          }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.40em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1rem' }}>Flow Farm</p>
            <div style={{ width: 24, height: 1, background: GOLD, opacity: 0.4, marginBottom: '1.4rem' }} />
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: mob ? '1.7rem' : '2.4rem', color: '#fff', margin: '0 0 1.4rem', lineHeight: 1.2 }}>
              A Living Place,<br /><em>Rooted in Possibility.</em>
            </h2>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: mob ? '0.92rem' : '0.97rem', color: 'rgba(255,255,255,0.80)', lineHeight: 1.95, margin: 0 }}>
              Seventeen years of intention. The soil is built. The farm is running. Now it belongs to whoever is meant to take it from here.
            </p>
          </div>
        </div>

      </div>

      {/* ======= OPERATIONAL BY DESIGN -- dark section, full breath ======= */}
      <div ref={b2Ref} style={{
        background: '#0a0a0a',
        padding: mob ? '7rem 6vw 8rem' : '10rem 10vw 12rem',
        opacity: beat2 ? 1 : 0,
        transform: beat2 ? 'none' : 'translateY(32px)',
        transition: 'opacity 1.6s ease 0.2s, transform 1.6s ease 0.2s',
      }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.40em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1.2rem' }}>The Estate</p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: mob ? 'clamp(2rem,7vw,2.8rem)' : 'clamp(2.6rem,4vw,4rem)', color: '#fff', margin: '0 0 0.7rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          Operational by Design.
        </h2>
        <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '1.05rem' : '1.2rem', color: GOLD, margin: '0 0 4rem', opacity: 0.9 }}>
          Eight acres working. Seven acres waiting.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(5, 1fr)',
          gap: mob ? '2rem 1.2rem' : '0 2rem',
          maxWidth: 1100,
        }}>
          {grid.map((item, i) => (
            <div key={i} style={{
              padding: mob ? '1.2rem 0' : '1.8rem 0',
              borderTop: '1px solid rgba(201,169,110,0.22)',
            }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.30em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.7rem', fontWeight: 400 }}>{item.label}</p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.92rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ======= CHAPTER 2: PINE TRAIL -- The Land ======= */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: mob ? '50vh' : '65vh' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(' + TRAIL_URL + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          filter: 'saturate(1.1) brightness(1.05)',
          transition: 'background-position 0.1s linear',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)' }} />
        <div ref={b3Ref} style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          minHeight: mob ? '50vh' : '65vh',
          padding: mob ? '6rem 6vw 6rem' : '8rem 10vw 8rem',
          textAlign: 'center',
          opacity: beat3 ? 1 : 0,
          transform: beat3 ? 'none' : 'translateY(28px)',
          transition: 'opacity 1.6s ease, transform 1.6s ease',
        }}>
          <div>
            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.40em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1rem', textShadow: ts }}>The Land</p>
            <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? 'clamp(1.4rem,5vw,2rem)' : 'clamp(1.8rem,3vw,2.6rem)', color: '#fff', lineHeight: 1.45, maxWidth: 660, margin: '0 auto', textShadow: ts }}>
              Seven acres of pine forest. The land has not yet been asked what it wants to become.
            </p>
          </div>
        </div>
      </div>

      {/* ======= KEY INTERSTITIAL -- The Farm is the Key ======= */}
      <div style={{ background: '#0a0a0a', padding: '10rem 10vw', textAlign: 'center' }}>
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)', margin: '0 auto 3.5rem' }} />
        <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', color: '#F5F0E8', lineHeight: 1.55, maxWidth: 780, margin: '0 auto', letterSpacing: '-0.01em' }}>
          Three acres, active and certified.<br />That&rsquo;s all it took.<br /><span style={{ color: 'rgba(201,169,110,0.85)' }}>The rest of the fifteen are yours.</span>
        </p>
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)', margin: '3.5rem auto 0' }} />
      </div>

      {/* ======= CHAPTER 3: AERIAL -- Seventeen Years ======= */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: mob ? '55vh' : '72vh' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(' + AERIAL_URL + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          transition: 'background-position 0.1s linear',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div ref={b4Ref} style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          minHeight: mob ? '55vh' : '72vh',
          padding: mob ? '6rem 6vw 6rem' : '8rem 10vw 8rem',
          textAlign: 'center',
          opacity: beat4 ? 1 : 0,
          transform: beat4 ? 'none' : 'translateY(28px)',
          transition: 'opacity 1.6s ease, transform 1.6s ease',
        }}>
          <div>
            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.40em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1rem', textShadow: ts }}>The Farm</p>
            <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? 'clamp(1.4rem,5vw,2rem)' : 'clamp(1.8rem,3vw,2.6rem)', color: '#fff', lineHeight: 1.45, maxWidth: 660, margin: '0 auto', textShadow: ts }}>
              This is what seventeen years looks like from above.
            </p>
          </div>
        </div>
      </div>

      {/* ======= CHAPTER 4: PINEAPPLE -- The High Tunnel ======= */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: mob ? '55vh' : '72vh' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(' + PINE_URL + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          filter: 'saturate(1.15) brightness(1.0)',
          transition: 'background-position 0.1s linear',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: mob ? '55vh' : '72vh',
          padding: mob ? '7rem 6vw' : '9rem 10vw',
          textAlign: 'center',
        }}>
          <div>
            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.40em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1.2rem', textShadow: ts }}>The High Tunnel</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: mob ? 'clamp(2rem,7vw,2.8rem)' : 'clamp(2.8rem,4.5vw,4rem)', color: '#fff', margin: '0 0 1.2rem', lineHeight: 1.15, textShadow: ts }}>
              Pineapples.<br />In North Carolina.
            </h2>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: mob ? '0.95rem' : '1.05rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto', textShadow: ts }}>
              The 96x36 high tunnel runs a geothermal climate battery beneath the soil. It creates its own growing zone. What thrives here has no business existing in North Carolina.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}



const MAP_PINS = [
  {
    id: 'main',
    x: 48, y: 42,
    label: 'Main Residence',
    category: 'THE ESTATE',
    headline: '8,519 SF. Designed as a whole.',
    description: 'Six bedrooms, seven baths, grand piano conservatory, 17-foot great room. Heart pine floors throughout. Control4 automation. Sound, climate, security — one tap from anywhere on the property.',
    systems: ['Control4 Smart Home', '143 Lighting Circuits', '5-Zone Geothermal', '1,200 Amp Total Service'],
    connects: ['guest', 'solar'],
    color: '#C9A96E',
  },
  {
    id: 'farm',
    x: 28, y: 62,
    label: 'Veganic Farm',
    category: 'THE ENGINE',
    headline: '3 certified acres. The legal foundation.',
    description: 'USDA-registered since 2009. Veganic certification. CSA members. Biochar kiln. This is not a garden — it is the agricultural standing that unlocks the NC Qualifying Farmer Exemption, resort use, and event permitting.',
    systems: ['USDA Registered', 'NC Qualifying Farmer Exempt', 'CSA Active', 'Biochar Kiln'],
    connects: ['tunnel', 'workshop'],
    color: '#8BAF72',
  },
  {
    id: 'tunnel',
    x: 22, y: 55,
    label: 'High Tunnel',
    category: 'THE GROWING ZONE',
    headline: '96×36 ft. Its own climate.',
    description: 'A geothermal climate battery runs beneath the soil. What grows here has no business existing in North Carolina. Pineapples, tropical varieties, year-round production — fully off-grid, fully independent.',
    systems: ['Geothermal Soil Battery', 'Year-Round Production', 'Off-Grid Climate Control', '3,456 SF Growing Floor'],
    connects: ['farm', 'solar'],
    color: '#7AA88A',
  },
  {
    id: 'workshop',
    x: 35, y: 70,
    label: 'Farm Workshop',
    category: 'THE INFRASTRUCTURE',
    headline: '30×40 ft. Built for serious work.',
    description: 'Full equipment storage, workspace, and farm operations hub. Separate electrical service. Houses the systems that keep the property running without a single call to a utility company.',
    systems: ['Full Equipment Storage', 'Separate Electrical Service', '30kW Kohler Generator', 'Independent Operations'],
    connects: ['farm', 'solar'],
    color: '#A89060',
  },
  {
    id: 'guest',
    x: 58, y: 55,
    label: 'Guest Suite',
    category: 'THE WING',
    headline: 'Private. Fully serviced.',
    description: 'Separate entrance. 200 amp dedicated service. Designed by Robert E. Clark AIA as part of the compound vision — not an afterthought, but a deliberate counterpoint to the main house.',
    systems: ['Private Entrance', '200 Amp Dedicated', 'Clark AIA Design', 'Independent HVAC'],
    connects: ['main'],
    color: '#C9A96E',
  },
  {
    id: 'solar',
    x: 65, y: 38,
    label: 'Solar Array',
    category: 'THE POWER',
    headline: '14.3kW. Zero grid dependency.',
    description: '61 Samsung panels. Battery backup. Paired with 20 geothermal wells at 300 feet and a 30kW Kohler standby generator. The estate has never needed the municipal grid — and is built so it never will.',
    systems: ['61 Samsung Panels', 'Battery Backup', '20 Geothermal Wells × 300ft', '30kW Kohler Standby'],
    connects: ['main', 'tunnel', 'workshop'],
    color: '#D4B87A',
  },
];

function PropertyMap() {
  const w = useW();
  const mob = w < 768;
  const [active, setActive] = useState(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [ref, fadeIn] = useFade();
  const mapImgRef = useRef(null);
  // parallax removed -- full aerial must always be fully visible

  const openPin = (pin) => {
    setActive(pin);
    setTimeout(() => setPanelVisible(true), 30);
  };

  const closePanel = () => {
    setPanelVisible(false);
    setTimeout(() => setActive(null), 400);
  };

  return (
    <section ref={ref} style={{ background: DARK, padding: mob ? '7rem 0 7rem' : '11rem 0 10rem' }}>
      {/* Section header */}
      <div style={{
        textAlign: 'center',
        padding: mob ? '0 6vw 4rem' : '0 6vw 6rem',
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? 'none' : 'translateY(24px)',
        transition: 'opacity 1.4s ease, transform 1.4s ease',
      }}>
        <Eyebrow center>Six Structures. One System.</Eyebrow>
        <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '1rem' : '1.1rem', color: 'rgba(255,255,255,0.72)', margin: '1rem 0 0', textAlign: 'center' }}>
          Everything here is connected. Tap any structure.
        </p>
        <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.35, margin: '1.2rem auto' }} />
        <h2 style={{
          color: CREAM,
          fontFamily: 'Georgia, serif',
          fontWeight: 400,
          fontSize: mob ? '2rem' : '2.8rem',
          lineHeight: 1.22,
          margin: '0 auto 1rem',
          letterSpacing: '-0.018em',
          maxWidth: 700,
        }}>
          Fifteen acres.<br />One integrated system.
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.78)',
          fontFamily: 'Georgia, serif',
          fontSize: mob ? '0.95rem' : '1.02rem',
          lineHeight: 1.9,
          maxWidth: 560,
          margin: '0 auto',
        }}>
          Every structure on this property serves a purpose. Every system connects to the next.
          Tap any marker to see how it all fits together.
        </p>
      </div>

      {/* Map container */}
      <div style={{
        position: 'relative',
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 4vw',
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1.8s ease 0.3s',
      }}>
        <div style={{ position: 'relative', width: '100%', paddingBottom: mob ? '100%' : '62%', overflow: 'hidden' }}>
          {/* Aerial photo */}
          <img
            ref={mapImgRef}
            src={"https://res.cloudinary.com/dghn2xpif/image/upload/e_sharpen:80,e_vibrance:20,e_saturation:15,f_auto,q_auto,w_3200,c_limit/ff_aerial_master.jpg"}
            alt="Flow Farm aerial view"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'contain', objectPosition: 'center center',
              display: 'block',
              background: '#0a0a0a',
              transform: 'none',
              transition: 'none',
              willChange: 'auto',
            }}
          />
          {/* Dark vignette overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.52) 100%)',
            zIndex: 2,
          }} />

          {/* Pins */}
          {MAP_PINS.map((pin) => (
            <button
              key={pin.id}
              onClick={() => active && active.id === pin.id ? closePanel() : openPin(pin)}
              style={{
                position: 'absolute',
                left: pin.x + '%',
                top: pin.y + '%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: mob ? '4px' : '6px',
              }}
            >
              {/* Pulse ring */}
              <div style={{ position: 'relative', width: mob ? 22 : 20, height: mob ? 22 : 20 }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  border: '1.5px solid ' + (pin.color || GOLD),
                  opacity: active && active.id === pin.id ? 0 : (active && active.connects && active.connects.includes(pin.id) ? 1 : 0.45),
                  animation: 'pinPulse 2.4s ease-in-out infinite',
                  animationDelay: pin.id === 'farm' ? '0.4s' : pin.id === 'tunnel' ? '0.8s' : pin.id === 'solar' ? '1.2s' : '0s',
                  transform: active && active.connects && active.connects.includes(pin.id) ? 'scale(2.2)' : 'scale(1.7)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }} />
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '50%',
                  background: active && active.id === pin.id ? (pin.color || GOLD) : 'rgba(201,169,110,0.75)',
                  border: '1.5px solid ' + (pin.color || GOLD),
                  boxShadow: '0 0 14px ' + (pin.color || GOLD) + '99',
                  transition: 'background 0.3s ease, transform 0.3s ease',
                  transform: active && active.id === pin.id ? 'scale(1.25)' : 'scale(1)',
                }} />
              </div>
              {/* Label */}
              <div style={{
                background: 'rgba(8,8,8,0.88)',
                padding: mob ? '2px 7px' : '3px 10px',
                whiteSpace: 'nowrap',
              }}>
                <span style={{
                  fontFamily: 'sans-serif',
                  fontSize: mob ? '7px' : '8px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: CREAM,
                  fontWeight: 400,
                }}>
                  {pin.label}
                </span>
              </div>
            </button>
          ))}

          {/* Detail panel */}
          {active && (
            <div style={{
              position: 'absolute',
              top: mob ? 'auto' : '50%',
              bottom: mob ? 0 : 'auto',
              left: mob ? 0 : '3%',
              width: mob ? '100%' : Math.min(400, w * 0.34) + 'px',
              zIndex: 20,
              opacity: panelVisible ? 1 : 0,
              transform: panelVisible
                ? (mob ? 'translateY(0)' : 'translateY(-50%)')
                : (mob ? 'translateY(100%)' : 'translateY(calc(-50% + 16px))'),
              transition: 'opacity 0.38s ease, transform 0.42s cubic-bezier(.16,1,.3,1)',
            }}>
              <div style={{
                background: 'rgba(6,6,6,0.98)',
                borderTop: '1px solid rgba(201,169,110,0.35)',
                padding: mob ? '1.4rem 1.2rem 2rem' : '2.4rem 2.2rem',
                position: 'relative',
                maxHeight: mob ? '52vh' : 'none',
                overflowY: mob ? 'auto' : 'visible',
              }}>
                {/* Color accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: active.color || GOLD, opacity: 0.7 }} />

                {/* Close */}
                <button onClick={closePanel} style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.25)', fontSize: '1rem', lineHeight: 1, padding: '4px 8px',
                }}>✕</button>

                {/* Category */}
                <p style={{ margin: '0 0 0.8rem', fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.36em', textTransform: 'uppercase', color: active.color || GOLD }}>{active.category}</p>

                {/* Title */}
                <h3 style={{ margin: '0 0 0.3rem', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.25rem' : '1.45rem', color: '#fff', lineHeight: 1.2 }}>{active.label}</h3>

                {/* Headline */}
                <p style={{ margin: '0 0 1rem', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '0.82rem' : '0.88rem', color: 'rgba(201,169,110,0.85)' }}>{active.headline}</p>

                {/* Gold rule */}
                <div style={{ width: '32px', height: '1px', background: 'rgba(201,169,110,0.35)', marginBottom: '1rem' }} />

                {/* Description */}
                <p style={{ margin: '0 0 1.4rem', fontFamily: 'Georgia, serif', fontSize: mob ? '0.8rem' : '0.85rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.8 }}>{active.description}</p>

                {/* Systems tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.4rem' }}>
                  {active.systems.map((s, i) => (
                    <span key={i} style={{
                      fontFamily: 'sans-serif', fontSize: mob ? '6.5px' : '7px', letterSpacing: '0.16em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(255,255,255,0.1)', padding: '3px 8px',
                      background: 'rgba(255,255,255,0.03)',
                    }}>{s}</span>
                  ))}
                </div>

                {/* Connected to */}
                {active.connects && active.connects.length > 0 && (
                  <div style={{ borderTop: '1px solid rgba(201,169,110,0.1)', paddingTop: '1rem' }}>
                    <p style={{ margin: '0 0 0.5rem', fontFamily: 'sans-serif', fontSize: '7px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.45)' }}>Connected to</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {active.connects.map((cid) => {
                        const cp = MAP_PINS.find(p => p.id === cid);
                        return cp ? (
                          <button key={cid} onClick={() => openPin(cp)} style={{
                            background: 'none', border: '1px solid rgba(201,169,110,0.25)',
                            color: GOLD, fontFamily: 'sans-serif', fontSize: '7px',
                            letterSpacing: '0.18em', textTransform: 'uppercase',
                            padding: '4px 10px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '5px',
                            transition: 'border-color 0.2s ease',
                          }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.25)'}
                          >
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: cp.color || GOLD, display: 'inline-block', flexShrink: 0 }} />
                            {cp.label}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dot nav */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.8rem' }}>
          {MAP_PINS.map((pin) => (
            <button key={pin.id} onClick={() => openPin(pin)} style={{
              width: active && active.id === pin.id ? (mob ? 24 : 20) : (mob ? 10 : 6),
              height: mob ? 10 : 6, borderRadius: mob ? 5 : 3,
              background: active && active.id === pin.id ? (pin.color || GOLD) : (active && active.connects && active.connects.includes(pin.id) ? 'rgba(201,169,110,0.35)' : 'rgba(255,255,255,0.18)'),
              border: 'none', cursor: 'pointer', padding: mob ? '8px 0' : 0, boxSizing: 'content-box',
              transition: 'width 0.35s ease, background 0.35s ease',
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pinPulse {
          0%, 100% { opacity: 0.18; transform: scale(1.7); }
          50% { opacity: 0.5; transform: scale(2.2); }
        }
      `}</style>

      {/* Mobile tap hint */}
      {mob && (
        <p style={{ textAlign: 'center', fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.35)', padding: '0.5rem 6vw 0', margin: 0 }}>
          Tap any pin to explore
        </p>
      )}

      {/* Walk the Land CTA */}
      <div style={{ textAlign: 'center', padding: '2.5rem 0 3.5rem', position: 'relative', zIndex: 10 }}>
        <a
          href="https://portal.nucleus4d.com/3ec4ff02-9412-4f29-87ba-4926145df7a1/exterior-d302c992-e611-4197-b2df-ff6931a8827a"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: 'transparent',
            color: GOLD,
            fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase',
            fontWeight: 400,
            padding: '1.1rem 2.8rem',
            border: '1px solid rgba(201,169,110,0.5)',
            textDecoration: 'none',
            transition: 'border-color 0.25s ease, color 0.25s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'}
        >
          Walk the Land
        </a>
        <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: '0.9rem 0 0' }}>
          Aerial 3D tour -- explore all 15 acres
        </p>
      </div>
    </section>
  );
}


// ============================================================
// SPA BATH PULL QUOTE -- full-bleed editorial moment
// ============================================================
function SpaBathPullQuote() {
  const w = useW();
  const mob = w < 768;
  const [ref, visible] = useFade();
  return (
    <section ref={ref} style={{
      background: '#050505',
      padding: mob ? '8rem 6vw' : '12rem 8vw',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: 'opacity 1.6s ease, transform 1.6s ease',
        maxWidth: 900,
        margin: '0 auto',
      }}>
        <div style={{ width: 1, height: mob ? 40 : 60, background: 'rgba(201,169,110,0.3)', margin: '0 auto 3rem' }} />
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: mob ? 'clamp(1.8rem, 7vw, 2.8rem)' : 'clamp(2.2rem, 4vw, 3.6rem)',
          color: '#ffffff',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          "The lights are already at ten percent<br />when you walk in."
        </p>
        <div style={{ width: 1, height: mob ? 40 : 60, background: 'rgba(201,169,110,0.3)', margin: '3rem auto 0' }} />
      </div>
    </section>
  );
}

// ============================================================
// 143 LIGHTING CIRCUITS -- standalone night moment
// ============================================================
function LightingCircuits() {
  const w = useW();
  const mob = w < 768;
  const [ref, visible] = useFade();
  return (
    <section ref={ref} style={{
      background: DARK,
      padding: mob ? '8rem 6vw' : '12rem 8vw',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: 'opacity 1.6s ease, transform 1.6s ease',
        maxWidth: 800,
        margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'sans-serif',
          fontSize: '10px',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: GOLD,
          margin: '0 0 2.5rem',
        }}>143 Lighting Circuits. Whole Campus. One Tap.</p>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: mob ? 'clamp(1.6rem, 6vw, 2.4rem)' : 'clamp(1.8rem, 3vw, 3rem)',
          color: '#ffffff',
          lineHeight: 1.4,
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          "143 lighting circuits.<br />Some of them are these trees."
        </p>
      </div>
    </section>
  );
}

// CINEMATIC
// ============================================================

// ============================================================
// STEAL THE SHOW QUOTE
// ============================================================
function StealTheShow() {
  const w = useW();
  const mob = w < 768;
  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Fan video background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: '#000' }}>
        <iframe
          src="https://iframe.cloudflarestream.com/de1885d159ae310508174f03f775c797?autoplay=true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', pointerEvents: 'none', opacity: 0.90 }}
          allow="autoplay; fullscreen"
          title="Fan background"
        />
      </div>
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.20) 40%, rgba(0,0,0,0.60) 100%)' }} />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: mob ? '6rem 6vw' : '8rem 8vw', maxWidth: 1100, margin: '0 auto' }}>

        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontWeight: 400,
          fontSize: mob ? 'clamp(2.4rem, 8vw, 3.4rem)' : 'clamp(3rem, 4.4vw, 4.8rem)',
          color: '#fff',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          margin: '0 0 2rem 0',
        }}>
          Impossible to Confuse<br />With Anything Else.
        </h2>
        <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '0.9rem' : '1.05rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, maxWidth: 960, margin: '0 auto', whiteSpace: mob ? 'normal' : 'nowrap' }}>
          Robert Clark designed it. Fifteen years shaped it. It shows.
        </p>
      </div>
    </section>
  );
}

function CinematicReveal({ src, eyebrow, headline, body, align, quote, position }) {
  const w = useW();
  const mob = w < 768;
  return (
    <section style={{ position: 'relative', minHeight: mob ? '80vh' : '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: position || 'center', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: quote
        ? 'rgba(0,0,0,0.48)'
        : align === 'right'
          ? 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 100%)'
          : 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 100%)'
      }} />
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1360, margin: '0 auto', padding: mob ? '6rem 6vw' : '10rem 6vw', display: 'flex', justifyContent: quote ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}>
        <Fade delay={0.1}>
          {quote ? (
            <div style={{ maxWidth: mob ? '100%' : 700, textAlign: 'center' }}>
              <p style={{ color: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '1.6rem' : w < 1024 ? '2.2rem' : '3rem', lineHeight: 1.35, margin: 0, textShadow: '0 2px 40px rgba(0,0,0,0.7)', letterSpacing: '-0.01em' }}>
                &ldquo;{headline}&rdquo;
              </p>
            </div>
          ) : (
            <div style={{ padding: mob ? '2.5rem 2rem' : '3.5rem 4rem', maxWidth: mob ? '100%' : 520 }}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {eyebrow && <div style={{ width: 28, height: 1, background: GOLD, opacity: 0.35, margin: '1.4rem 0' }} />}
              <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.7rem' : '2.5rem', lineHeight: 1.22, margin: '0 0 1.6rem', letterSpacing: '-0.015em', whiteSpace: 'pre-line', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
                {headline}
              </h2>
              {body && <p style={{ color: 'rgba(255,255,255,0.82)', fontFamily: 'Georgia, serif', fontSize: mob ? '0.95rem' : '1rem', lineHeight: 2, margin: 0, textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>{body}</p>}
            </div>
          )}
        </Fade>
      </div>
    </section>
  );
}

// ============================================================
// NUMBERS
// ============================================================
function CountStat({ value, label, prefix, suffix, decimals, duration, mob }) {
  // value = numeric target, prefix/suffix = decorative strings around the number
  const [count, ref] = useCounter(value, duration || 1800, 0, decimals || 0);
  const display = (prefix || '') + (decimals ? count.toFixed(decimals) : Math.round(count).toLocaleString()) + (suffix || '');
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: mob ? '3rem 1rem' : '4rem 1rem', borderBottom: '1px solid rgba(201,169,110,0.08)' }}>
      <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '2.8rem', fontWeight: 400, margin: '0 0 0.7rem', letterSpacing: '-0.03em' }}>{display}</p>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
    </div>
  );
}

function Numbers() {
  const w = useW();
  const mob = w < 768;
  const cols = mob ? 2 : 4;
  // [label, numeric_target, prefix, suffix, decimals, duration_ms]
  const stats = [
    ['Acres', 15, '', '', 0, 1600],
    ['Sq Ft Main Residence', 8519, '', '', 0, 2200],
    ['Beds', 6, '', '', 0, 1200],
    ['Offered At', 5.25, '$', 'M', 2, 1800],
    ['Structures', 6, '', '', 0, 1200],
    ['Amps Total Power', 1200, '', '', 0, 2000],
    ['kW Solar Array', 14.3, '', 'kW', 1, 1600],
    ['Mi To Pinehurst', 3, '', ' mi', 0, 1000],
  ];
  return (
    <section style={{ background: '#0c0c0c', padding: mob ? '6rem 0' : '9rem 0' }}>
      <Fade>
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 5rem' : '0 0 6rem', textAlign: 'center' }}>
          By The Numbers
        </p>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: 1020, margin: '0 auto', padding: '0 5vw',  }}>
        {stats.map(([label, value, prefix, suffix, decimals, duration], i) => (
          <CountStat key={label} value={value} label={label} prefix={prefix} suffix={suffix} decimals={decimals} duration={duration} mob={mob} />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// MECHANISM
// ============================================================
function Mechanism() {
  const w = useW();
  const mob = w < 768;
  const tab = w < 1024;
  const cols = [
    { label: 'Energy',     items: ['14.3kW Solar -- 61 Samsung Panels', 'Sunny Island 10k Battery Backup', '30kW Kohler Generator', '2 x 1,000 Gal Propane', '1,200 Amp Total Power'] },
    { label: 'Climate',    items: ['Geothermal -- 20 Wells x 300 Ft', '5-Zone Water Furnace', 'Energy Recovery Ventilator', 'Lennox Air Purification Per Zone', 'Zone-Independent Control'] },
    { label: 'Water',      items: ['Private Well -- Up to 50 GPM', '2 x 1,500 Gal Private Septic', 'Whole-House Water Filtration', 'Whole-House Fire Sprinkler', 'Walk-In Cooler 12 x 8 Ft'] },
    { label: 'Smart Home', items: ['Control4 -- Every Light. Every Shade. Every Degree.', 'Pool, Spa, Security + Irrigation -- One Screen', 'Monitor Energy + Adjust Anything From Anywhere', 'Araknis Enterprise Network + Whole Campus Wi-Fi', '143 Individually Addressable Lighting Circuits'] },
  ];
  return (
    <section style={{ position: 'relative', background: DARK, padding: mob ? '6rem 0' : '10rem 0', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${cdn(IMG.aerial)})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05, zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: mob ? '5rem' : '8rem', padding: '0 6vw' }}>
            <Eyebrow center>The Mechanism</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.7rem' : '3.2rem', lineHeight: 1.28, margin: '2rem 0 2.4rem', letterSpacing: '-0.018em' }}>
              Structure that holds<br /><em>freedom.</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.12rem', lineHeight: 2.1, maxWidth: 560, margin: '0 auto' }}>
              1,200 amps across three dedicated services. The main house alone runs on 600 -- the capacity of a small hotel. Control4 ties it all together. Solar, geothermal, and a 30kW generator hand off so cleanly you won't notice the transition.
            </p>
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : tab ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: '2rem' }}>
          {cols.map((col, i) => (
            <Fade key={col.label} delay={i * 0.1}>
              <div style={{ padding: mob ? '2.5rem 2rem' : '3rem 2.5rem', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
                <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 1.8rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {col.label}
                </p>
                {col.items.map(item => (
                  <p key={item} style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'Georgia, serif', fontSize: '0.94rem', lineHeight: 2, margin: '0 0 0.4rem' }}>{item}</p>
                ))}
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// THE LAND
// ============================================================
function Land() {
  const w = useW();
  const mob = w < 768;
  const structures = [
    { src: IMG.cabana,   label: 'The Cabana House',           detail: 'Robert E. Clark AIA · Commercial Grade · Partially Finished', body: 'A second residence — not a guest suite. Racquetball court, bunk room, dining suite, guest bedroom, loft, full bath. Built to commercial standard by the same architect who drew the main house. Partially finished. Entirely extraordinary.' },
    { src: IMG.tunnel,   label: 'High Tunnel Greenhouse', detail: '96 x 36 Ft | Geothermal Climate Control',          body: 'Year-round production at commercial scale. Pineapples, avocados, citrus. Climate-controlled by the same geothermal system that heats and cools the main residence.' },
    { src: IMG.workshop, label: 'Farm Workshop',          detail: '30 x 40 Ft | Plumbing | Electrical | Walk-In Cooler', body: 'Built to run a real operation. Plumbing, electrical, and a 12 by 8 foot walk-in cooler. This is the infrastructure behind the idea.' },
  ];
  return (
    <section id="the-land" style={{ background: '#0a0a0a', padding: mob ? '6rem 0' : '10rem 0' }}>
      <Fade up>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.4rem', marginBottom: mob ? '6rem' : '10rem', padding: '0 6vw', textAlign: 'center' }}>
          <Eyebrow center>The Land</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.7rem' : '3.2rem', lineHeight: 1.28, margin: 0, letterSpacing: '-0.018em' }}>
          Operational by Design.<br />Eight acres working. Seven acres waiting.
          </h2>
          <GoldLine />
          <p style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.12rem', lineHeight: 2.1, maxWidth: 540, margin: 0 }}>
            Three USDA-certified veganic acres already producing. Biochar. O2Compost. A 1,400-foot double deer fence. A walk-in cooler. A 96-by-36-foot geothermal greenhouse growing pineapples in North Carolina. The farm is not an amenity. It is an operating system. And seven buildable acres sit beside it — zoned, ready, yours.
          </p>
        </div>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: mob ? '3rem' : '3.5rem' }}>
        {structures.map((s, i) => (
          <Fade key={s.label} delay={i * 0.18}>
            <div>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={s.src} alt={s.label} style={{ width: '100%', aspectRatio: mob ? '4/3' : '2/3', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.8rem' }}>
                  <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1.15rem', margin: '0 0 0.4rem', letterSpacing: '-0.01em' }}>{s.label}</p>
                  <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>{s.detail}</p>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'Georgia, serif', fontSize: '0.98rem', lineHeight: 2, margin: '1.8rem 0 0' }}>{s.body}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ZONING OPPORTUNITY
// ============================================================
function ZoningOpportunity() {
  const w = useW();
  const mob = w < 768;
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: mob ? '85vh' : '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img src={IMG.aerial} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'rgba(0,0,0,0.22)' }} />
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1360, margin: '0 auto', padding: mob ? '6rem 5vw' : '10rem 6vw', display: 'flex', justifyContent: 'flex-end' }}>
      <div ref={ref} style={{
        maxWidth: mob ? '100%' : 540,
        background: 'rgba(8,8,8,0.54)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(201,169,110,0.18)',
        padding: mob ? '2.2rem 1.8rem' : '3.2rem 3.6rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateX(40px)',
        transition: 'opacity 1.6s cubic-bezier(.16,1,.3,1), transform 1.6s cubic-bezier(.16,1,.3,1)',
      }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1rem' }}>The Opportunity · Already Unlocked</p>
        <div style={{ width: 24, height: 1, background: GOLD, opacity: 0.4, marginBottom: '1.4rem' }} />
        <h2 style={{
          fontFamily: 'Georgia, serif', fontWeight: 400,
          fontSize: mob ? '1.7rem' : '2.2rem',
          color: '#fff', lineHeight: 1.2, letterSpacing: '-0.02em',
          margin: '0 0 1.4rem',
        }}>
          The Zoning Is Already Done.<br /><em>Fifteen years of work. Yours now.</em>
        </h2>
        <p style={{
          fontFamily: 'Georgia, serif', fontSize: mob ? '0.92rem' : '0.97rem',
          color: 'rgba(255,255,255,0.80)', lineHeight: 1.95, margin: '0 0 1.8rem',
        }}>
          NC Qualifying Farmer Exemption. Agritourism zoning. Retreat centers, event venues, commercial kitchens, equestrian — all permitted. The certification exists. The zoning exists. The infrastructure exists. The next owner steps into something already running.
        </p>
        {/* Pinehurst callout -- naked, no box */}
        <div style={{ maxWidth: 560, borderTop: '1px solid rgba(201,169,110,0.22)', borderBottom: '1px solid rgba(201,169,110,0.22)', padding: mob ? '2rem 0' : '2.8rem 0', marginTop: '1rem' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1rem' }}>Golf Capital of America · 3 Miles</p>
          <p style={{
            fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: mob ? '1.1rem' : '1.35rem',
            color: '#fff', lineHeight: 1.5, margin: 0,
          }}>
            Three miles from Pinehurst No. 2.
          </p>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: mob ? '0.95rem' : '1rem',
            color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, margin: '1rem 0 0',
          }}>
            Home of nine US Opens. The most consequential golf address in America. Resort economy. County taxation. No HOA. No city limits. You cannot manufacture this address. It either exists or it does not. It does.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}

// ============================================================
// LOCATION
// ============================================================
function Location() {
  const w = useW();
  const mob = w < 768;
  const [ref, visible] = useFade();
  return (
    <section style={{ position: 'relative', minHeight: mob ? '85vh' : '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img src={IMG.grounds} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'rgba(0,0,0,0.18)' }} />
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1360, margin: '0 auto', padding: mob ? '6rem 5vw' : '10rem 6vw' }}>
        <div ref={ref} style={{
          maxWidth: mob ? '100%' : 480,
          background: 'rgba(8,8,8,0.52)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(201,169,110,0.18)',
          padding: mob ? '2.2rem 1.8rem' : '3.2rem 3.6rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateX(-40px)',
          transition: 'opacity 1.6s cubic-bezier(.16,1,.3,1), transform 1.6s cubic-bezier(.16,1,.3,1)',
        }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1rem' }}>Location</p>
          <div style={{ width: 24, height: 1, background: GOLD, opacity: 0.4, marginBottom: '1.4rem' }} />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.7rem' : '2.2rem', lineHeight: 1.24, margin: '0 0 1.2rem', letterSpacing: '-0.015em' }}>
            Private by Nature.<br />Pinehurst by Proximity.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.80)', fontFamily: 'Georgia, serif', fontSize: mob ? '0.92rem' : '0.97rem', lineHeight: 1.95, margin: '0 0 1.6rem' }}>
            Three miles from Pinehurst Resort. A transferable Pinehurst Country Club Signature Golf Membership — unlimited access to Course No. 7 and No. 9 — is included with the sale.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {['Pinehurst Resort — 3 Miles', 'Moore County Regional — Private Aviation', 'Raleigh-Durham International — 1 Hour', 'FirstHealth Moore Regional Hospital', 'Pinehurst CC Membership Included'].map(item => (
              <p key={item} style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ display: 'inline-block', width: 16, height: 1, background: GOLD, opacity: 0.4, flexShrink: 0 }} />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INQUIRE
// ============================================================
function Inquire() {
  const w = useW();
  const mob = w < 768;
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const submit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/apps/69e248a2469cc39540781cce/entities/Inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, property: 'Flow Farm', source: 'Landing Page' })
      });
    } catch(err) { console.error(err); }
    setSaving(false);
    setSent(true);
  };
  const inp = { background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '1rem 0', width: '100%', outline: 'none' };
  return (
    <section id="inquire" style={{ background: '#0c0c0c', padding: mob ? '9rem 0' : '13rem 0' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
        <Fade up>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.6rem' }}>
            <Eyebrow center>Private Inquiry</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '2.8rem', lineHeight: 1.2, margin: 0, letterSpacing: '-0.018em' }}>
              Begin the Conversation.
            </h2>
            <GoldLine />
            <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 2, margin: 0 }}>
              This property is shown by private appointment only.
              All inquiries are handled with full discretion.
            </p>
          </div>
        </Fade>
        {sent ? (
          <Fade><p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.1rem', textAlign: 'center', lineHeight: 1.9 }}>Thank you. We will be in touch shortly.</p></Fade>
        ) : (
          <Fade style={{ width: '100%' }}>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
              <input style={inp} placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <input style={inp} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              <input style={inp} placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              <textarea style={{ ...inp, resize: 'none', height: 100 }} placeholder="Your message (optional)" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              <button type="submit" style={{ background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', padding: '1.2rem 3rem', cursor: 'pointer', alignSelf: 'center', marginTop: '1rem' }}>
                {saving ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </Fade>
        )}
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const w = useW();
  const mob = w < 768;
  return (
    <footer style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.05)', padding: mob ? '4rem 6vw' : '5rem 6vw' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: mob ? 'flex-start' : 'center', gap: '2rem' }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'Georgia, serif', fontSize: '0.85rem', margin: '0 0 0.4rem', letterSpacing: '0.12em' }}>Flow Farm</p>
          <p style={{ color: 'rgba(255,255,255,0.08)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>107 Linden Trail, Aberdeen, NC</p>
        </div>
        <div style={{ textAlign: mob ? 'left' : 'right' }}>
          <p style={{ color: 'rgba(255,255,255,0.08)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Offered at $5,250,000</p>
          <p style={{ color: 'rgba(255,255,255,0.06)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Rachel Hernandez &mdash; rachelhernandezrealtor@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}


// ============================================================
// OPPORTUNITY
// ============================================================
function Opportunity() {
  const w = useW();
  const mob = w < 768;
  const parallaxRef = useRef(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const pct = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const shift = Math.round((pct - 0.5) * 120);
      el.style.backgroundPositionY = (50 + shift * 0.35) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cards = [
    {
      eyebrow: 'The Farm',
      headline: 'The Engine Is Already Running.',
      body: 'A USDA-registered veganic operation building soil since 2009. CSA members, a high tunnel, a biochar kiln -- all active. The farm is not a feature. It is the reason any of this is possible. Fifteen years of soil building, delivered to whoever is ready for it.',
    },
    {
      eyebrow: 'The Zoning',
      headline: 'The Key Is Already Cut.',
      body: 'NC Qualifying Farmer Exemption in place. Retreat centers, event venues, commercial kitchens, equestrian operations -- all permitted. The zoning is earned, not purchased. Fifteen years of active farming unlocked it. It transfers with the land.',
    },
    {
      eyebrow: 'The Infrastructure',
      headline: 'Independent by Design.',
      body: 'Two deep private wells. 14.3 kW solar with battery backup. Five geothermal zones from twenty wells at 300 feet. 30 kW standby generator. The estate operates entirely off municipal systems -- by intention, not circumstance.',
    },
    {
      eyebrow: 'The Position',
      headline: 'Three Miles from a Million Visitors.',
      body: 'Close enough to draw on a resort economy. Far enough to remain outside city limits. Resort-caliber proximity with county-level taxation. Three miles from Pinehurst Resort. County taxation. No HOA. No city limits.',
    },
  ];

  const summary = [
    { num: '15', label: 'Acres of Working Land', sub: 'USDA-registered farmland inside a natural forest buffer. Active. Certified. Already running.' },
    { num: '3', label: 'The Farm at Its Heart', sub: 'Active since 2009. The soil took fifteen years to build. It is ready.' },
    { num: '7+', label: 'Acres Ready to Build', sub: 'What you do with them is entirely up to you. The zoning is already in place.' },
    { num: '~7,500', label: 'Square Feet of Residence', sub: 'Eight structures designed as a compound -- not a house with outbuildings, but a full estate in deliberate balance.' },
    { num: '5', label: 'Climate Zones, Zero Grid', sub: 'Twenty geothermal wells. 14.3 kW solar with battery backup. Two private wells. The grid is optional.' },
    { num: '6', label: 'Structures on the Land', sub: 'Main house, wing, cabana, workshop, high tunnel, cottage. Six structures, one cohesive estate.' },
  ];

  const vis = { opacity: 1, transform: 'none' };

  return (
    <>
      {/* CINEMATIC FULL-BLEED GLASS SECTION */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div ref={parallaxRef} style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(' + IMG.forestcanopy + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center 50%',
            backgroundRepeat: 'no-repeat',
            willChange: 'background-position',
            zIndex: 0,
          }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.55) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: mob ? '8rem 6vw' : '10rem 8vw' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>

            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 1.6rem' : '0 0 2rem' }}>
              What You Inherit
            </p>

            <h2 style={{
              color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400,
              fontSize: mob ? '1.7rem' : '3.2rem', lineHeight: 1.18,
              margin: mob ? '0 0 1.2rem' : '0 0 1.6rem',
              maxWidth: 780,
            }}>
              A Rare Convergence of<br />Sanctuary and Strategy.
            </h2>

            <p style={{
              color: 'rgba(255,255,255,0.65)', fontFamily: 'Georgia, serif',
              fontSize: mob ? '1rem' : '1.15rem', lineHeight: 1.85,
              maxWidth: 640, margin: mob ? '0 0 4rem' : '0 0 5rem',
            }}>
              The farm was built first. Then the zoning followed. Then the house. Then the solar, the geothermal, the wells. None of it was assembled -- it was grown, over fifteen years, by someone who knew what he was building toward. Whoever comes next walks into all of it on day one.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
              gap: mob ? '1rem' : '1.2rem',
            }}>
              {cards.map((c, i) => (
                <div key={c.eyebrow} style={{
                  background: 'transparent',
                  borderTop: '1px solid rgba(201,169,110,0.18)',
                  padding: mob ? '2rem 0' : '2.6rem 0',
                }}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.8rem' }}>
                    {c.eyebrow}
                  </p>
                  <h3 style={{
                    color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400,
                    fontSize: mob ? '1.1rem' : '1.25rem', lineHeight: 1.3,
                    margin: '0 0 0.9rem',
                    textShadow: '0 1px 8px rgba(0,0,0,0.4)',
                  }}>
                    {c.headline}
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.72)', fontFamily: 'Georgia, serif',
                    fontSize: '0.9rem', lineHeight: 1.78, margin: 0,
                    textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}>
                    {c.body}
                  </p>
                </div>
              ))}
            </div>

            <p style={{
              color: 'rgba(255,255,255,0.78)', fontFamily: 'Georgia, serif', fontStyle: 'italic',
              fontSize: mob ? '1rem' : '1.25rem', lineHeight: 1.7,
              textAlign: 'center', margin: mob ? '4rem 0 0' : '5rem auto 0',
              maxWidth: 600,
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: mob ? '2.5rem' : '3.5rem',
            }}>
              "Fifteen acres where every system answers to the next."
            </p>
          </div>
        </div>
      </section>

      {/* INVESTMENT SUMMARY -- dark editorial */}
      <section style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.04)', padding: mob ? '7rem 6vw' : '10rem 8vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Fade up>
            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1.2rem', textAlign: 'center' }}>
              What Is Here
            </p>
          </Fade>
          <Fade up delay={0.08}>
            <h2 style={{
              color: 'rgba(255,255,255,0.82)', fontFamily: 'Georgia, serif', fontWeight: 400,
              fontSize: mob ? '1.5rem' : '2rem', textAlign: 'center',
              margin: mob ? '0 0 4rem' : '0 0 5.5rem', lineHeight: 1.3,
            }}>
              What the next family inherits.
            </h2>
          </Fade>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderLeft: mob ? 'none' : '1px solid rgba(255,255,255,0.06)',
          }}>
            {summary.map((s, i) => (
              <Fade key={s.label} up delay={0.05 + i * 0.07}>
                <div style={{
                  padding: mob ? '2.8rem 0' : '3.5rem 3rem',
                  borderRight: mob ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: mob ? '3rem' : '3.8rem',
                    fontWeight: 300,
                    color: GOLD,
                    lineHeight: 1,
                    marginBottom: '1rem',
                  }}>{s.num}</div>
                  <p style={{
                    color: 'rgba(255,255,255,0.75)', fontFamily: 'sans-serif',
                    fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase',
                    margin: '0 0 0.75rem',
                  }}>{s.label}</p>
                  <p style={{
                    color: 'rgba(255,255,255,0.72)', fontFamily: 'Georgia, serif',
                    fontSize: '0.88rem', lineHeight: 1.7, margin: 0,
                  }}>{s.sub}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


// ============================================================
// PAGE
function SustainabilityThread() {
  const [ref, fadeIn] = useFade();
  return (
    <div ref={ref} style={{ background: DARK, padding: '6rem 6vw', textAlign: 'center', position: 'relative',
      opacity: fadeIn ? 1 : 0, transform: fadeIn ? 'none' : 'translateY(18px)',
      transition: 'opacity 1.6s ease, transform 1.6s ease',
    }}>
      <div style={{ width: '40px', height: '1px', background: 'rgba(201,169,110,0.35)', margin: '0 auto 3rem' }} />
      <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(1.05rem, 2.2vw, 1.6rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, maxWidth: 680, margin: '0 auto 2.5rem', letterSpacing: '0.01em' }}>
        The solar feeds the geothermal. The geothermal heats the tunnel.<br />
        The tunnel feeds the farm. The farm sustains the zoning.<br />
        The zoning unlocks the land.
      </p>
      <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.45)', margin: '0 auto' }}>
        Nothing here is accidental.
      </p>
      <div style={{ width: '40px', height: '1px', background: 'rgba(201,169,110,0.35)', margin: '3rem auto 0' }} />
    </div>
  );
}

// ============================================================
// v2

// CABANA SECTION
function CabanaHouse() {
  const mob = useW() < 768;
  return (
    <section style={{ background: DARK }}>

      {/* Interstitial breath — Clark attribution */}
      <div style={{ padding: mob ? '6rem 6vw' : '8rem 10vw', borderTop: '1px solid rgba(201,169,110,0.25)', borderBottom: '1px solid rgba(201,169,110,0.25)' }}>
        <div style={{ width: '3rem', height: '1px', background: GOLD, marginBottom: '3rem' }} />
        <p style={{ fontFamily: 'var(--sans)', letterSpacing: '0.25em', fontSize: '0.7rem', color: GOLD, textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0.9 }}>
          Robert E. Clark, AIA · The Second Residence
        </p>
        <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: mob ? 'clamp(2rem,8vw,3.2rem)' : 'clamp(2.5rem,4vw,4.5rem)', color: CREAM, lineHeight: 1.12, marginBottom: '2.5rem', maxWidth: '22ch' }}>
          He designed it twice.
        </h2>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '1.05rem', color: CREAM, opacity: 0.75, lineHeight: 1.9, maxWidth: '54ch', marginBottom: '1.25rem' }}>
          The same architect who drew the main house drew this one. Same commercial-grade construction standard. Same intention. The cabana structure — drawn and signed by Robert E. Clark AIA — is a complete second residence on the same land: guest bedroom, bunk room, dining suite, full bath, loft, and a 60-foot indoor racquetball court.
        </p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '1.05rem', color: CREAM, opacity: 0.75, lineHeight: 1.9, maxWidth: '54ch', marginBottom: '1.25rem' }}>
          A 12-by-8 walk-in cooler connects it to the farm. The structure is built to hold a commercial operation — or a private one. It is partially finished. The bones are Clark's. The ending is yours.
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: mob ? '1.2rem' : '1.5rem', color: GOLD, opacity: 0.85, lineHeight: 1.6, maxWidth: '40ch', marginTop: '2.5rem' }}>
          "One of his last works. It shows."
        </p>
        <div style={{ width: '3rem', height: '1px', background: GOLD, marginTop: '3rem' }} />
      </div>

      {/* Full-bleed cabana image */}
      <div style={{ width: '100%', aspectRatio: mob ? '4/3' : '21/9', overflow: 'hidden' }}>
        <img
          src={IMG.cabana}
          alt="The Cabana House — Robert E. Clark AIA"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
        />
      </div>

      {/* What's inside — plan-referenced */}
      <div style={{ padding: mob ? '5rem 6vw' : '7rem 10vw' }}>
        <p style={{ fontFamily: 'var(--sans)', letterSpacing: '0.25em', fontSize: '0.7rem', color: GOLD, textTransform: 'uppercase', marginBottom: '3rem', opacity: 0.9 }}>
          As drawn · Clark plans on file
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: mob ? '2.5rem 2rem' : '3rem 4rem' }}>
          {[
            { label: 'Racquetball Court', detail: "60'+ indoor · Commercial grade · Loft above" },
            { label: 'Guest Bedroom', detail: 'Ensuite bath · Private retreat · Natural light' },
            { label: 'Dining Suite', detail: "18' × 23' · Staff or family · Entertaining flex" },
            { label: 'Bunk Room', detail: "18' × 18' · Flexible sleeping · Guest-ready" },
            { label: 'Walk-In Cooler', detail: "12' × 8' · Farm-connected · Operational" },
            { label: 'Loft', detail: 'Above the court · Open plan · Buyer finishes' },
            { label: 'Full Bath', detail: 'Plumbed · Ready for finish · Plans available' },
            { label: 'Private Entrance', detail: 'Independent access · Separate from main house' },
          ].map((room, i) => (
            <div key={i}>
              <div style={{ width: '1.5rem', height: '1px', background: GOLD, marginBottom: '1rem' }} />
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: CREAM, marginBottom: '0.5rem' }}>{room.label}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: CREAM, opacity: 0.5, lineHeight: 1.75 }}>{room.detail}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, margin: 0, padding: 0, overflowX: 'hidden' }}>
      <Hero />

      {/* CHAPTER 1 — The Thesis */}
      <PositionStatement />

      {/* BREATH — forest photo + farm intro */}
      <ForestIntro />

      {/* CHAPTER 2 — The Residence */}
      <StealTheShow />
      <CinematicReveal
        src={IMG.living}
        eyebrow="The Residence"
        headline={"A grand living room.\n27 feet wide. 17 feet tall."}
        body="Exposed king post trusses. Grand piano. Heart pine floors. French doors to the covered porch. And beyond -- the conservatory, the kitchen, the farm. All of it visible from where you stand. Sound fills seventeen feet without effort. You won't find the speakers."
        position="center 35%"
      />
      <Foundation />
      <CinematicReveal
        src={IMG.conservatoryDome}
        eyebrow="The Conservatory"
        headline={"The room that stops\nevery conversation."}
        body="19.5 by 17.7 feet, entirely glass-wrapped. An octagonal dome overhead tracks the sky from morning to dusk. Views of the farm, the cabana, the pines. The room that reminds you why you came here."
        align="right"
        position="center center"
      />
      <CinematicReveal
        src={IMG.wolf}
        eyebrow="The Kitchen"
        headline={"Sub-Zero. Wolf 60\".\nBuilt for the serious cook."}
        body="A 60-inch dual fuel Wolf range with red knobs, six burners, griddle, grill, and warming drawer. Two KitchenAid dishwashers. Butcher block island. Farmhouse apron sink. Soapstone counters. Scullery with full Sub-Zero and wine fridge. The water from every tap is filtered. Drink it straight. Music plays from somewhere you can't locate. That's the point. The pantry door swings open. Then the other one does. Floor to ceiling, every inch -- two full-height swing-out towers, shelves on every face, built for someone who actually cooks."
        position="center 40%"
      />
      <Numbers />

      {/* CHAPTER 3 — The Land */}
      <CinematicReveal
        src={IMG.aerial}
        headline={"Autonomy at this scale is not inherited. It is engineered."}
        quote
        position="center 60%"
      />
      <Land />
      <CinematicReveal
        src={IMG.foyer}
        eyebrow="The Welcome"
        headline={"Every arrival\nshould feel like this."}
        body="Herringbone heart pine floors laid on the diagonal. A reclaimed wood door with transom light overhead. A star lantern casting warm light across the entry. The first impression that sets the tone for everything that follows. One tap. The whole house shifts."
        position="center top"
      />
      <ZoningOpportunity />

      {/* CHAPTER 4 — The Systems */}
      <Manifesto />
      <Mechanism />
      <PropertyMap />
      <SustainabilityThread />

      {/* CHAPTER 5 — The Experience */}
      <CinematicReveal
        src={IMG.spabath}
        eyebrow="The Primary Suite"
        headline={"A spa.\nA sanctuary.\nA reason to stay."}
        body="Dual vanities. Freestanding soaking tub beneath a window to the forest. Body-jet shower. Mosaic tile floors. A room that earns the word primary. The lights are already at ten percent when you walk in. Control4 knows."
        align="right"
        position="center 30%"
      />
      <SpaBathPullQuote />
      <LightingCircuits />

      {/* CHAPTER 6 — The Opportunity */}
      <CabanaHouse />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}

