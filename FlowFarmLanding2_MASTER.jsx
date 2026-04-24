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

const B = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';
const CLOUD = 'dghn2xpif';
const cdn = (url, w = 1400) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/f_auto,q_auto,w_' + w + ',c_limit/' + encodeURIComponent(url);
const cdnInt = (url) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/' + encodeURIComponent(url);
const cdnExt = (url) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1600,c_limit/' + encodeURIComponent(url);
const cdnSharp = (url) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/e_sharpen:200,e_vibrance:30,e_brightness:8,e_saturation:20,f_auto,q_auto,w_2000,c_limit/' + encodeURIComponent(url);

const IMG = {
  // Hero shots -- real professional photos
  living:        B + 'f4af32cdd_260115107LindenTrailF-9619.jpg',
  conservatory:  B + '8cb2578a0_MONEYSHOT.jpg',
  conservatoryDome: B + '1fd157275_260115107LindenTrailF-9565.jpg',
  kitchen:       B + '1c4b8a04f_SOGOODKITCHEN.jpg',
  dining:        B + 'db01725cb_sogoodtolivingroom.jpg',
  spabath:       B + '08da5b97d_spaprimarybath.jpg',
  foyer:         B + '9b1d02a04_260115107LindenTrailF-9727.jpg',
  powderroom:    B + '4e58028ab_260115107LindenTrailF-9769-2.jpg',
  wolf:          B + 'ef4b4a364_WOLFDOUBLEGASRANGE.jpg',
  kitchen2:      B + '1c4b8a04f_SOGOODKITCHEN.jpg',
  office:        B + '2b920c3b0_markofficemoneyshot.jpg',
  hallway:       B + '8e3d794f9_secondfloorhallway.jpg',
  // Grounds / aerial
  aerial:        cdn('https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg', 2400),
  forestcanopy:  cdn('https://media.base44.com/images/public/69e248a2469cc39540781cce/fbfaf627b_generated_image.png', 2400),
  grounds:       cdn('https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg', 2400),
  exterior:      cdn('https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg', 2400),
  trail:         cdn('https://media.base44.com/images/public/69e248a2469cc39540781cce/41690f47b_107LindenTrail-822.jpg', 2400),
  // Structures
  cabana:        cdn('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg', 1600),
  tunnel:        cdn('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg', 1600),
  workshop:      cdn('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg', 1600),
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
  const started = React.useRef(false);
  const timers = React.useRef([]);

  React.useEffect(() => {
    // Only ever run once per mount -- memo keeps this stable
    if (started.current) return;
    started.current = true;

    const _target = target;
    const _duration = duration || 1600;
    const _delay = delay != null ? delay : 800;
    const _decimals = decimals || 0;
    const steps = 60;
    const stepTime = _duration / steps;
    let current = 0;

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
  }, []);

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
        color: '#fff',
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
    { value: 15, prefix: '', suffix: '', decimals: 0, label1: 'USDA', label2: 'ACRES', duration: 2000, delay: 400 },
    { value: 7, prefix: '', suffix: '', decimals: 0, label1: 'BUILDABLE', label2: 'ACRES', duration: 2000, delay: 550 },
    { value: 3, prefix: '', suffix: '', decimals: 0, label1: 'ACRE VEGANIC', label2: 'FARM', duration: 2000, delay: 700 },
    { value: 5.25, prefix: '$', suffix: 'M', decimals: 2, label1: 'LIST', label2: 'PRICE', duration: 2000, delay: 850 },
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
        background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.25)',
        color: '#fff', fontFamily: 'sans-serif', fontSize: '11px',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        padding: '0.5rem 1.2rem', borderRadius: '2rem', cursor: 'pointer',
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
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.94) 100%)' }} />



      {!mob && (
        <nav style={{ position: 'absolute', top: '2.4rem', right: '3rem', zIndex: 10, display: 'flex', gap: '2.8rem', ...show(1) }}>
          {['The Estate', 'The Land', 'Inquire'].map(n => (
            <a key={n} href={'#' + n.toLowerCase().replace(' ', '-')}
              style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none' }}>
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
            fontSize: mob ? '2.3rem' : w < 1024 ? '4.2rem' : 'clamp(4rem, 5.5vw, 5.6rem)',
            lineHeight: 1.06, margin: 0, letterSpacing: '-0.02em',
            textShadow: '0 4px 80px rgba(0,0,0,0.6)',
          }}>
            Agritourism <em>Established.</em><br />Legacy Ready.
          </h1>
        </div>
        <div style={{ ...show(3), marginTop: mob ? '1rem' : '1.4rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* !! LOCKED SUBHEAD -- DO NOT CHANGE WITHOUT RACHEL APPROVAL !! */}
          <p style={{
            color: '#F5F0E8', fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: mob ? '0.82rem' : '1.1rem', margin: mob ? '0 0 1.2rem' : '0 0 1.2rem',
            letterSpacing: '0.01em', lineHeight: 1.7,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            The farm unlocks everything. Three miles from Pinehurst.
          </p>
          <HeroStats mob={mob} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: mob ? '0.75rem' : '1rem', justifyContent: 'center', alignItems: 'center', marginTop: mob ? '1rem' : '0' }}>
            <button onClick={() => setVideoOpen(true)} style={{ display: 'inline-block', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.55)', color: '#fff', fontFamily: 'sans-serif', fontSize: mob ? '9px' : '10px', letterSpacing: '0.32em', textTransform: 'uppercase', padding: mob ? '0.85rem 2rem' : '1rem 2.8rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 500, cursor: 'pointer', transition: 'background 0.3s ease', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 24px rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
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
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const BG_URL = 'https://res.cloudinary.com/dghn2xpif/image/fetch/f_auto,q_auto,w_2400,e_vibrance:40,e_saturation:20,e_brightness:15,e_sharpen:60/' + encodeURIComponent('https://media.base44.com/images/public/69e248a2469cc39540781cce/fbfaf627b_generated_image.png');
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
        backgroundPosition: 'center ' + (50 + scrollY * 0.15) + '%',
        transform: 'scale(1.08)',
        transition: 'background-position 0.1s linear',
        filter: 'saturate(1.2) brightness(0.72)',
      }} />
      {/* Dark gradient vignette -- edges only, center stays clear */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
        pointerEvents: 'none',
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
      }} />
      {/* Text -- floating directly on image, no card */}
      <div style={{
        position: 'relative',
        zIndex: 2,
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
          Not just a home.<br />A living system built for those<br />who intend to leave something behind.
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
          Fifteen acres of forest and working farmland three miles from Pinehurst Resort.
          Designed by Robert E. Clark AIA as one of his final private commissions.
          Built to operate indefinitely, independently, and beautifully.
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
  return (
    <section id="the-estate" style={{ background: '#0c0c0c', padding: mob ? '7rem 0' : '10rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', maxWidth: 1320, margin: '0 auto', padding: '0 6vw', gap: mob ? '5rem' : '8rem', alignItems: 'center' }}>
        <Fade delay={0.05}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Eyebrow>The Estate</Eyebrow>
            <GoldLine />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.018em' }}>
              A Foundation for<br />What Comes Next.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.06rem', lineHeight: 2.1, margin: 0 }}>
              A living estate rooted in sustainability, elevated by state-of-the-art
              infrastructure and refined luxury. Designed by Robert E. Clark AIA of Pinehurst
              -- one of his final and most personal works.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.06rem', lineHeight: 2.1, margin: 0 }}>
              Reclaimed Civil War-era heart pine floors, custom-laid in artisan patterns
              throughout every bedroom, hallway, and closet. A glass conservatory with
              octagonal skylight dome. Six structures across fifteen curated acres.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
              <a href={MATTERPORT} target="_blank" rel="noreferrer"
                style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.28)', paddingBottom: '0.3rem' }}>
                Virtual Tour
              </a>
              <a href="#inquire"
                style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.3rem' }}>
                Private Inquiry
              </a>
            </div>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div style={{ position: 'relative' }}>
            <img src={cdnInt(IMG.living)} alt="Flow Farm Estate" style={{ width: '100%', height: mob ? 340 : 560, objectFit: 'cover', display: 'block' }} />
            <Glass style={{ position: 'absolute', bottom: mob ? -20 : -28, left: mob ? -10 : -28, padding: '1.4rem 2rem' }}>
              <p style={{ margin: '0 0 0.3rem', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Architect</p>
              <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: '1rem', color: CREAM }}>Robert E. Clark AIA</p>
              <p style={{ margin: '0.2rem 0 0', fontFamily: 'sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>Pinehurst, NC</p>
            </Glass>
          </div>
        </Fade>
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

  const FOREST_URL = 'https://res.cloudinary.com/dghn2xpif/image/fetch/f_auto,q_auto,w_2400,e_vibrance:80,e_saturation:50,e_brightness:18,e_sharpen:100,e_clarity:40/' + encodeURIComponent('https://media.base44.com/images/public/69e248a2469cc39540781cce/fbfaf627b_generated_image.png');
  const AERIAL_URL = 'https://res.cloudinary.com/dghn2xpif/image/fetch/f_auto,q_auto,w_2400,e_improve:outdoor:70,e_vibrance:40,e_saturation:20,e_sharpen:60/' + encodeURIComponent('https://media.base44.com/images/public/69e248a2469cc39540781cce/0686082ae_3AE3BB97-CE80-4B28-BBA2-62C77E5F0AA1_1_201_a.jpg');
  const TRAIL_URL  = 'https://res.cloudinary.com/dghn2xpif/image/fetch/f_auto,q_auto,w_2400,e_improve:outdoor:60,e_vibrance:30,e_saturation:20,e_sharpen:50/' + encodeURIComponent('https://media.base44.com/images/public/69e248a2469cc39540781cce/41690f47b_107LindenTrail-822.jpg');
  const PINE_URL   = 'https://res.cloudinary.com/dghn2xpif/image/fetch/f_auto,q_auto,w_2400,e_improve:outdoor:80,e_vibrance:50,e_saturation:30,e_sharpen:80,e_brightness:5/' + encodeURIComponent('https://media.base44.com/images/public/69e248a2469cc39540781cce/116a03ad1_IMG_3206.jpg');

  const grid = [
    { label: '15 USDA ACRES',       body: 'Registered farmland. County-taxed. No HOA.' },
    { label: '3-ACRE VEGANIC FARM', body: 'In active production since 2009. Certified regenerative.' },
    { label: '8,519 SF RESIDENCE',  body: 'Architect-designed. Built for independence.' },
    { label: 'OFF-GRID CAPABLE',    body: 'Solar. Geothermal. Generator. Well. The grid is optional.' },
    { label: '7 BUILDABLE ACRES',   body: 'The vision is yours to finish.' },
  ];

  /* shared text-shadow for legibility on any bg */
  const ts = '0 2px 24px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)';

  return (
    <div style={{ position: 'relative', background: '#0a0a0a' }}>

      {/* ======= CHAPTER 1: FOREST -- A Living Place + Operational by Design ======= */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Forest background -- shared across beats 1 + 2 */}
        <div style={{
          position: 'absolute', inset: '-8% 0',
          backgroundImage: 'url(' + FOREST_URL + ')',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'saturate(1.2) brightness(1.05)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)' }} />

        {/* Beat 1 -- A Living Place */}
        <div ref={b1Ref} style={{
          position: 'relative', zIndex: 2,
          padding: mob ? '6rem 6vw 4rem' : '8rem 10vw 5rem',
          opacity: beat1 ? 1 : 0,
          transform: beat1 ? 'none' : 'translateY(32px)',
          transition: 'opacity 1.6s ease, transform 1.6s ease',
        }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.40em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1.2rem', textShadow: ts }}>Flow Farm</p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: mob ? 'clamp(2rem,7vw,2.8rem)' : 'clamp(2.6rem,4vw,3.8rem)', color: '#fff', margin: '0 0 1.6rem', lineHeight: 1.2, maxWidth: 700, textShadow: ts }}>
            A Living Place,<br /><em>Rooted in Possibility.</em>
          </h2>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, maxWidth: 560, margin: 0, textShadow: ts }}>
            Seventeen years of intention. The soil is built. The farm is running. Now it belongs to whoever is meant to take it from here.
          </p>
        </div>

        {/* Beat 2 -- Operational by Design */}
        <div ref={b2Ref} style={{
          position: 'relative', zIndex: 2,
          padding: mob ? '3rem 6vw 6rem' : '4rem 10vw 8rem',
          opacity: beat2 ? 1 : 0,
          transform: beat2 ? 'none' : 'translateY(32px)',
          transition: 'opacity 1.6s ease 0.2s, transform 1.6s ease 0.2s',
        }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.40em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1rem', textShadow: ts }}>The Estate</p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: mob ? 'clamp(1.8rem,6vw,2.4rem)' : 'clamp(2.2rem,3.5vw,3.2rem)', color: '#fff', margin: '0 0 0.6rem', lineHeight: 1.2, textShadow: ts }}>
            Operational by Design.
          </h2>
          <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '1rem' : '1.1rem', color: GOLD, margin: '0 0 2rem', textShadow: ts }}>
            Eight acres working. Seven acres waiting.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(5, 1fr)',
            gap: mob ? '0.8rem' : '1rem',
            maxWidth: 1000,
          }}>
            {grid.map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '4px',
                padding: mob ? '1.1rem' : '1.4rem 1.2rem',
              }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.30em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.6rem', fontWeight: 600 }}>{item.label}</p>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======= CHAPTER 2: PINE TRAIL -- The Land ======= */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: mob ? '50vh' : '65vh' }}>
        <div style={{
          position: 'absolute', inset: '-8% 0',
          backgroundImage: 'url(' + TRAIL_URL + ')',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
          filter: 'saturate(1.1) brightness(1.05)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)' }} />
        <div ref={b3Ref} style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          minHeight: mob ? '50vh' : '65vh',
          padding: mob ? '3rem 6vw 4rem' : '4rem 10vw 5rem',
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

      {/* ======= CHAPTER 3: AERIAL -- Seventeen Years ======= */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: mob ? '55vh' : '72vh' }}>
        <div style={{
          position: 'absolute', inset: '-8% 0',
          backgroundImage: 'url(' + AERIAL_URL + ')',
          backgroundSize: 'cover', backgroundPosition: 'center 35%',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div ref={b4Ref} style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          minHeight: mob ? '55vh' : '72vh',
          padding: mob ? '3rem 6vw 4rem' : '4rem 10vw 5rem',
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
          position: 'absolute', inset: '-8% 0',
          backgroundImage: 'url(' + PINE_URL + ')',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
          filter: 'saturate(1.15) brightness(1.0)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: mob ? '55vh' : '72vh',
          padding: mob ? '4rem 6vw' : '5rem 10vw',
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
  { id: 'main', x: 48, y: 42, label: 'Main Residence', sub: '8,519 SF -- 6 bed / 7 bath', icon: '[H]' },
  { id: 'farm', x: 28, y: 62, label: 'Veganic Farm', sub: '3-acre certified veganic operation', icon: '[F]' },
  { id: 'tunnel', x: 22, y: 55, label: 'High Tunnel', sub: '96x36 ft climate-controlled growing', icon: '[T]' },
  { id: 'workshop', x: 35, y: 70, label: 'Farm Workshop', sub: '30x40 ft with full equipment storage', icon: '[W]' },
  { id: 'guest', x: 58, y: 55, label: 'Guest Suite', sub: 'Private entrance -- 200 amp service', icon: '[G]' },
  { id: 'solar', x: 65, y: 38, label: 'Solar Array', sub: '14.3kW -- 61 Samsung panels', icon: '[S]' },
];

function PropertyMap() {
  const w = useW();
  const mob = w < 768;
  const [active, setActive] = useState(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [ref, fadeIn] = useFade();
  const mapImgRef = useRef(null);

  useEffect(() => {
    const el = mapImgRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.closest('section').getBoundingClientRect();
      const pct = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const shift = (pct - 0.5) * 80;
      el.style.transform = 'scale(1.06) translateY(' + (shift * 0.5) + 'px)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openPin = (pin) => {
    setActive(pin);
    setTimeout(() => setPanelVisible(true), 30);
  };

  const closePanel = () => {
    setPanelVisible(false);
    setTimeout(() => setActive(null), 400);
  };

  return (
    <section ref={ref} style={{ background: DARK, padding: mob ? '5rem 0 5rem' : '8rem 0 6rem' }}>
      {/* Section header */}
      <div style={{
        textAlign: 'center',
        padding: mob ? '0 6vw 3rem' : '0 6vw 4rem',
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? 'none' : 'translateY(24px)',
        transition: 'opacity 1.4s ease, transform 1.4s ease',
      }}>
        <Eyebrow center>The Estate at a Glance</Eyebrow>
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
          color: 'rgba(255,255,255,0.32)',
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
        <div style={{ position: 'relative', width: '100%', paddingBottom: mob ? '120%' : '90%', overflow: 'hidden' }}>
          {/* Aerial photo */}
          <img
            ref={mapImgRef}
            src={"https://res.cloudinary.com/dghn2xpif/image/fetch/e_sharpen:150,e_vibrance:20,e_saturation:15,f_auto,q_auto,w_3200,c_limit/" + encodeURIComponent("https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg")}
            alt="Flow Farm aerial view"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 65%',
              display: 'block',
              transform: 'scale(1.06) translateY(0px)',
              transition: 'transform 0.05s linear',
              willChange: 'transform',
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
              <div style={{ position: 'relative', width: mob ? 16 : 20, height: mob ? 16 : 20 }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  border: '1.5px solid ' + GOLD,
                  opacity: active && active.id === pin.id ? 0 : 0.5,
                  animation: 'pinPulse 2.4s ease-in-out infinite',
                  transform: 'scale(1.7)',
                }} />
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '50%',
                  background: active && active.id === pin.id ? GOLD : 'rgba(201,169,110,0.85)',
                  border: '1.5px solid ' + GOLD,
                  boxShadow: '0 0 12px rgba(201,169,110,0.6)',
                  transition: 'background 0.3s ease',
                }} />
              </div>
              {/* Label */}
              <div style={{
                background: 'rgba(8,8,8,0.78)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(201,169,110,0.22)',
                padding: mob ? '2px 7px' : '3px 10px',
                whiteSpace: 'nowrap',
              }}>
                <span style={{
                  fontFamily: 'sans-serif',
                  fontSize: mob ? '6px' : '8px',
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
              width: mob ? '100%' : Math.min(380, w * 0.32) + 'px',
              zIndex: 20,
              opacity: panelVisible ? 1 : 0,
              transform: panelVisible
                ? (mob ? 'translateY(0)' : 'translateY(-50%)')
                : (mob ? 'translateY(20px)' : 'translateY(calc(-50% + 16px))'),
              transition: 'opacity 0.38s ease, transform 0.38s ease',
            }}>
              <div style={{
                background: 'rgba(8,8,8,0.88)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(201,169,110,0.18)',
                padding: mob ? '1.6rem 1.4rem' : '2.4rem 2.2rem',
                position: 'relative',
              }}>
                {/* Close */}
                <button onClick={closePanel} style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem', lineHeight: 1, padding: '4px 8px',
                }}>x</button>

                <p style={{ margin: '0 0 0.6rem', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD }}>{active.category}</p>
                <h3 style={{ margin: '0 0 0.5rem', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.3rem' : '1.5rem', color: '#fff', lineHeight: 1.2 }}>{active.label}</h3>
                <p style={{ margin: '0 0 0.4rem', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '0.82rem' : '0.9rem', color: GOLD }}>{active.headline}</p>
                <p style={{ margin: '0 0 1.4rem', fontFamily: 'Georgia, serif', fontSize: mob ? '0.82rem' : '0.88rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.75 }}>{active.description}</p>

                {/* Systems tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: active.cta ? '1.4rem' : 0 }}>
                  {active.systems.map((s, i) => (
                    <span key={i} style={{
                      fontFamily: 'sans-serif', fontSize: mob ? '7px' : '7.5px', letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
                      border: '1px solid rgba(255,255,255,0.12)', padding: '4px 8px',
                    }}>{s}</span>
                  ))}
                </div>

                {/* CTA */}
                {active.cta && (
                  <a href={active.cta.url} target="_blank" rel="noreferrer" style={{
                    display: 'inline-block', marginTop: '0.2rem',
                    fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.26em',
                    textTransform: 'uppercase', color: GOLD,
                    border: '1px solid rgba(201,169,110,0.4)',
                    padding: '0.7rem 1.4rem', textDecoration: 'none',
                    transition: 'background 0.25s ease',
                  }}>
                    {active.cta.label} ->
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dot nav */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.8rem' }}>
          {MAP_PINS.map((pin) => (
            <button key={pin.id} onClick={() => openPin(pin)} style={{
              width: active && active.id === pin.id ? 20 : 6,
              height: 6, borderRadius: 3,
              background: active && active.id === pin.id ? GOLD : 'rgba(255,255,255,0.18)',
              border: 'none', cursor: 'pointer', padding: 0,
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

      {/* Walk the Land CTA */}
      <div style={{ textAlign: 'center', padding: '2.5rem 0 3.5rem', position: 'relative', zIndex: 10 }}>
        <a
          href="https://portal.nucleus4d.com/3ec4ff02-9412-4f29-87ba-4926145df7a1/exterior-d302c992-e611-4197-b2df-ff6931a8827a"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: GOLD,
            color: DARK,
            fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase',
            fontWeight: 700,
            padding: '1.1rem 2.8rem',
            borderRadius: '2rem',
            textDecoration: 'none',
            boxShadow: '0 4px 30px rgba(201,169,110,0.35)',
            transition: 'opacity 0.2s ease',
          }}
        >
          &#127758; Walk the Land
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
        }}>Control4 -- 143 Individually Addressable Circuits</p>
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
          The House That Quietly Steals<br />the Whole Show.
        </h2>
        <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '0.9rem' : '1.05rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, maxWidth: 960, margin: '0 auto', whiteSpace: mob ? 'normal' : 'nowrap' }}>
          Architect-designed, materially rich, and impossible to confuse with ordinary luxury.
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
            <Glass style={{ padding: mob ? '2.5rem 2rem' : '3.5rem 4rem', maxWidth: mob ? '100%' : 520 }}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {eyebrow && <div style={{ width: 28, height: 1, background: GOLD, opacity: 0.35, margin: '1.4rem 0' }} />}
              <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.7rem' : '2.5rem', lineHeight: 1.22, margin: '0 0 1.6rem', letterSpacing: '-0.015em', whiteSpace: 'pre-line' }}>
                {headline}
              </h2>
              {body && <p style={{ color: 'rgba(255,255,255,0.44)', fontFamily: 'Georgia, serif', fontSize: mob ? '0.95rem' : '1rem', lineHeight: 2, margin: 0 }}>{body}</p>}
            </Glass>
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
    <div ref={ref} style={{ textAlign: 'center', padding: mob ? '3rem 1rem' : '4rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
      <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '2.8rem', fontWeight: 400, margin: '0 0 0.7rem', letterSpacing: '-0.03em' }}>{display}</p>
      <p style={{ color: 'rgba(255,255,255,0.16)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
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
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: 1020, margin: '0 auto', padding: '0 5vw', borderTop: '1px solid rgba(255,255,255,0.05)', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
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
            <p style={{ color: 'rgba(255,255,255,0.26)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.12rem', lineHeight: 2.1, maxWidth: 560, margin: '0 auto' }}>
              1,200 amps across three dedicated services. The main house alone runs on 600 -- the capacity of a small hotel. Control4 ties it all together. Solar, geothermal, and a 30kW generator hand off so cleanly you won't notice the transition.
            </p>
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : tab ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: '2rem' }}>
          {cols.map((col, i) => (
            <Fade key={col.label} delay={i * 0.1}>
              <Glass style={{ padding: mob ? '2.5rem 2rem' : '3rem 2.5rem' }}>
                <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 1.8rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {col.label}
                </p>
                {col.items.map(item => (
                  <p key={item} style={{ color: 'rgba(255,255,255,0.36)', fontFamily: 'Georgia, serif', fontSize: '0.94rem', lineHeight: 2, margin: '0 0 0.4rem' }}>{item}</p>
                ))}
              </Glass>
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
    { src: IMG.cabana,   label: 'Cabana House',           detail: '1 Bed | 1 Bath | Full Kitchen | Private Entrance', body: 'A private guest retreat with the feel of a boutique inn. Direct access to the grounds, full kitchen, and a private entrance that keeps guests comfortable and independent.' },
    { src: IMG.tunnel,   label: 'High Tunnel Greenhouse', detail: '96 x 36 Ft | Geothermal Climate Control',          body: 'Year-round production at commercial scale. Pineapples, avocados, citrus. Climate-controlled by the same geothermal system that heats and cools the main residence.' },
    { src: IMG.workshop, label: 'Farm Workshop',          detail: '30 x 40 Ft | Plumbing | Electrical | Walk-In Cooler', body: 'Built to run a real operation. Plumbing, electrical, and a 12 by 8 foot walk-in cooler. This is the infrastructure behind the idea.' },
  ];
  return (
    <section id="the-land" style={{ background: '#0c0c0c', padding: mob ? '6rem 0' : '10rem 0' }}>
      <Fade up>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.4rem', marginBottom: mob ? '6rem' : '10rem', padding: '0 6vw', textAlign: 'center' }}>
          <Eyebrow center>The Land</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.7rem' : '3.2rem', lineHeight: 1.28, margin: 0, letterSpacing: '-0.018em' }}>
            Three acres producing.<br />Seven acres waiting.
          </h2>
          <GoldLine />
          <p style={{ color: 'rgba(255,255,255,0.26)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.12rem', lineHeight: 2.1, maxWidth: 540, margin: 0 }}>
            USDA-certified veganic. O2Compost regenerative systems.
            Biochar production. 1,400-ft double deer fence.
            A farm already running -- and seven raw acres ready for whatever comes next.
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
              <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: '0.98rem', lineHeight: 2, margin: '1.8rem 0 0' }}>{s.body}</p>
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
    <div ref={ref} style={{
      background: DARK,
      padding: mob ? '6rem 6vw' : '8rem 10vw',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: 'opacity 1.6s ease, transform 1.6s ease',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1.6rem' }}>The Opportunity</p>
        <h2 style={{
          fontFamily: 'Georgia, serif', fontWeight: 400,
          fontSize: mob ? 'clamp(2rem, 7vw, 2.8rem)' : 'clamp(2.6rem, 3.8vw, 4rem)',
          color: '#fff', lineHeight: 1.12, letterSpacing: '-0.02em',
          margin: '0 0 2rem',
        }}>
          The zoning is already<br /><em>unlocked.</em>
        </h2>
        <div style={{
          width: '40px', height: '1px', background: GOLD, margin: '0 0 2.4rem', opacity: 0.6,
        }} />
        <p style={{
          fontFamily: 'Georgia, serif', fontSize: mob ? '1.05rem' : '1.2rem',
          color: CREAM, lineHeight: 1.8, maxWidth: 680, margin: '0 0 3rem',
        }}>
          NC Qualifying Farmer Exemption is in place. Retreat centers, event venues, agritourism, commercial kitchens, equestrian operations -- all permitted. Most buyers spend years and real capital securing what this property already has.
        </p>
        {/* Pinehurst callout */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(201,169,110,0.1)',
          border: '1px solid rgba(201,169,110,0.35)',
          borderRadius: '2px',
          padding: mob ? '1.4rem 1.8rem' : '1.8rem 2.6rem',
          maxWidth: 560,
        }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.7rem' }}>Location</p>
          <p style={{
            fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: mob ? '1.1rem' : '1.35rem',
            color: '#fff', lineHeight: 1.5, margin: 0,
          }}>
            Three miles from Pinehurst Resort -- one of the most visited golf destinations in the world.
          </p>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: '0.9rem 0 0',
          }}>
            Resort economy. County taxation. No HOA. No city limits. The location is not incidental -- it is part of the thesis.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LOCATION
// ============================================================
function Location() {
  const w = useW();
  const mob = w < 768;
  return (
    <section style={{ background: DARK, padding: mob ? '7rem 0' : '10rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: mob ? '5rem' : '8rem', alignItems: 'center' }}>
        <Fade delay={0.05}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Eyebrow>Location</Eyebrow>
            <GoldLine />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.9rem' : '2.6rem', lineHeight: 1.24, margin: 0, letterSpacing: '-0.015em' }}>
              Private by Nature.<br />Pinehurst by Proximity.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.06rem', lineHeight: 2, margin: 0 }}>
              Three miles from Pinehurst Resort. A transferable Pinehurst Country Club
              Signature Golf Membership -- unlimited access to Course No. 7 and No. 9 --
              is included with the sale.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              {['Pinehurst Resort -- 3 Miles', 'Moore County Regional -- Private Aviation', 'Raleigh-Durham International -- 1 Hour', 'FirstHealth Moore Regional Hospital', 'Pinehurst CC Membership Included'].map(item => (
                <p key={item} style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ display: 'inline-block', width: 20, height: 1, background: GOLD, opacity: 0.4, flexShrink: 0 }} />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <img src={cdnExt(IMG.exterior)} alt="Flow Farm Estate" style={{ width: '100%', height: mob ? 320 : 560, objectFit: 'cover', display: 'block' }} />
        </Fade>
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
    <section id="inquire" style={{ background: '#0c0c0c', padding: mob ? '7rem 0' : '10rem 0' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
        <Fade up>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.6rem' }}>
            <Eyebrow center>Private Inquiry</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '2.8rem', lineHeight: 1.2, margin: 0, letterSpacing: '-0.018em' }}>
              Begin the Conversation.
            </h2>
            <GoldLine />
            <p style={{ color: 'rgba(255,255,255,0.24)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 2, margin: 0 }}>
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
      body: 'A USDA-registered veganic operation building soil since 2009. CSA members, a high tunnel, a biochar kiln -- all active. The farm is not a feature. It is the legal and strategic foundation for everything that follows.',
    },
    {
      eyebrow: 'The Zoning',
      headline: 'The Key Is Already Cut.',
      body: 'NC Qualifying Farmer Exemption in place. Retreat centers, event venues, commercial kitchens, equestrian operations -- all permitted. What others spend years and capital to unlock, this estate has already secured.',
    },
    {
      eyebrow: 'The Infrastructure',
      headline: 'Independent by Design.',
      body: 'Two deep private wells. 14.3 kW solar with battery backup. Five geothermal zones from twenty wells at 300 feet. 30 kW standby generator. The estate operates entirely off municipal systems -- by intention, not circumstance.',
    },
    {
      eyebrow: 'The Position',
      headline: 'Three Miles from a Million Visitors.',
      body: 'Close enough to draw on a resort economy. Far enough to remain outside city limits. Resort-caliber proximity with county-level taxation. The location is not incidental -- it is part of the thesis.',
    },
  ];

  const summary = [
    { num: '15', label: 'Acres of Working Land', sub: 'USDA-registered agricultural standing inside a dense natural forest buffer -- permanent, protected, and fully active.' },
    { num: '3', label: 'The Farm at Its Heart', sub: 'A veganic operation building soil since 2009. The farm sustains the zoning. The zoning unlocks the land.' },
    { num: '7+', label: 'Acres Ready to Build', sub: 'A guest house shell designed by Robert E. Clark AIA already on the parcel. The infrastructure exists. The vision is yours.' },
    { num: '~7,500', label: 'Square Feet of Residence', sub: 'Eight structures designed as a compound -- not a house with outbuildings, but a full estate in deliberate balance.' },
    { num: '5', label: 'Climate Zones, Zero Grid', sub: 'Twenty geothermal wells. 14.3 kW solar with battery. Two deep wells. The estate answers to nothing municipal.' },
    { num: '6', label: 'Structures on the Land', sub: 'Main house, wing, cabana, workshop, high tunnel, cottage. A compound that absorbs a family or an enterprise without strain.' },
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
              The Opportunity
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
              The farm sustains the zoning. The zoning unlocks the land. The infrastructure removes every barrier between ownership and what comes next. Fifteen acres -- a compound, not simply a residence -- that absorbs a growing family or a growing enterprise without ever feeling the strain.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
              gap: mob ? '1rem' : '1.2rem',
            }}>
              {cards.map((c, i) => (
                <div key={c.eyebrow} style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '2px',
                  padding: mob ? '2rem 1.8rem' : '2.6rem 2.4rem',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)',
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
              color: 'rgba(255,255,255,0.25)', fontFamily: 'Georgia, serif', fontStyle: 'italic',
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
              Investment Summary
            </p>
          </Fade>
          <Fade up delay={0.08}>
            <h2 style={{
              color: 'rgba(255,255,255,0.82)', fontFamily: 'Georgia, serif', fontWeight: 400,
              fontSize: mob ? '1.5rem' : '2rem', textAlign: 'center',
              margin: mob ? '0 0 4rem' : '0 0 5.5rem', lineHeight: 1.3,
            }}>
              The strategic value of the land.
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
                    color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif',
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
// ============================================================
// v2
export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, margin: 0, padding: 0, overflowX: 'hidden' }}>
      <Hero />
      <ForestIntro />
      <PropertyMap />
      <Manifesto />
      <Foundation />
      <StealTheShow />
      <CinematicReveal
        src={cdnInt(IMG.living)}
        eyebrow="The Residence"
        headline={"A grand living room.\n27 feet wide. 17 feet tall."}
        body="Exposed king post trusses. Grand piano. Heart pine floors. French doors to the covered porch. And beyond -- the conservatory, the kitchen, the farm. All of it visible from where you stand. Sound fills seventeen feet without effort. You won't find the speakers."
        position="center 35%"
      />
      <Numbers />
      <CinematicReveal
        src={cdnSharp(IMG.conservatoryDome)}
        eyebrow="The Conservatory"
        headline={"The room that stops\nevery conversation."}
        body="19.5 by 17.7 feet, entirely glass-wrapped. An octagonal dome overhead tracks the sky from morning to dusk. Views of the farm, the cabana, the pines. The room that reminds you why you came here."
        align="right"
        position="center center"
      />
      <CinematicReveal
        src={cdnExt(IMG.aerial)}
        headline={"Autonomy at this scale is not inherited. It is engineered."}
        quote
        position="center 60%"
      />
      <CinematicReveal
        src={cdnInt(IMG.wolf)}
        eyebrow="The Kitchen"
        headline={"Sub-Zero. Wolf 60\".\nBuilt for the serious cook."}
        body="A 60-inch dual fuel Wolf range with red knobs, six burners, griddle, grill, and warming drawer. Two KitchenAid dishwashers. Butcher block island. Scullery with full Sub-Zero and wine fridge. The water from every tap is filtered. Drink it straight. Music plays from somewhere you can't locate. That's the point."
        position="center 40%"
      />
      <Land />
      <ZoningOpportunity />
      <Mechanism />
      <CinematicReveal
        src={cdnInt(IMG.spabath)}
        eyebrow="The Primary Suite"
        headline={"A spa.\nA sanctuary.\nA reason to stay."}
        body="Dual vanities. Freestanding soaking tub beneath a window to the forest. Body-jet shower. Mosaic tile floors. A room that earns the word primary. The lights are already at ten percent when you walk in. Control4 knows."
        align="right"
        position="center 30%"
      />
      <CinematicReveal
        src={cdnInt(IMG.foyer)}
        eyebrow="The Welcome"
        headline={"Every arrival\nshould feel like this."}
        body="Herringbone heart pine floors laid on the diagonal. A reclaimed wood door with transom light overhead. A star lantern casting warm light across the entry. The first impression that sets the tone for everything that follows. One tap. The whole house shifts."
        position="center top"
      />
      <SpaBathPullQuote />
      <LightingCircuits />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}

