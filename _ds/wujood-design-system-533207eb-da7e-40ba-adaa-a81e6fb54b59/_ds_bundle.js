/* @ds-bundle: {"format":3,"namespace":"WujoodDesignSystem_533207","components":[],"sourceHashes":{"ui_kits/nafas/ambient.jsx":"763b1483761e","ui_kits/nafas/app.jsx":"0c58f6461566","ui_kits/nafas/companion.jsx":"43dc099c4d69","ui_kits/nafas/components.jsx":"688c5af9ebdc","ui_kits/nafas/environment.jsx":"be3644e41652","ui_kits/nafas/ios-frame.jsx":"d67eb3ffe562","ui_kits/nafas/regulation.jsx":"1cfc31d4d43f","ui_kits/nafas/screens/Breathing.jsx":"8661cae2c81d","ui_kits/nafas/screens/CheckIn.jsx":"1d3b7b01a927","ui_kits/nafas/screens/CompanionIntro.jsx":"54e39819e393","ui_kits/nafas/screens/Landing.jsx":"260f45b3da40","ui_kits/nafas/screens/Library.jsx":"ef718df05cef","ui_kits/nafas/screens/Quiz.jsx":"3430a7809712","ui_kits/nafas/screens/Settings.jsx":"90352319b96d","ui_kits/nafas/screens/Welcome.jsx":"3208b075f235","ui_kits/nafas/support.jsx":"591d93c79696","ui_kits/nafas/wellness-activities.jsx":"aa3defe9aae7","ui_kits/nafas/wellness-activities2.jsx":"c110b3045ab3","ui_kits/nafas/wellness.jsx":"0261db4ca9a0","ui_kits/nafas/widgets.jsx":"c30a67d2295b","ui_kits/wujood/browser-window.jsx":"2e3bb69bede4","ui_kits/wujood/components.jsx":"75831c963e88"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WujoodDesignSystem_533207 = window.WujoodDesignSystem_533207 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/nafas/ambient.jsx
try { (() => {
// Nafas - Ambient atmospheric layer
// Drifting gradient blobs + floating breath-particles + soft moving light.
// Sits as a fixed background within the device frame. Reacts to the current mood.

const {
  useState: useStateAmb,
  useEffect: useEffectAmb,
  useMemo: useMemoAmb
} = React;
function AmbientLayer({
  intensity = 1.0
}) {
  const {
    mood
  } = useEmotional();
  const {
    palette,
    motion
  } = mood;

  // Build the particles ONCE per mood (so they re-seed when mood changes - feels like the
  // weather subtly turns over).
  const particles = useMemoAmb(() => {
    const arr = [];
    for (let i = 0; i < motion.particles; i++) {
      arr.push({
        id: `${mood.label}-${i}`,
        x: Math.random() * 100,
        // %
        y: Math.random() * 100,
        // %
        size: 2 + Math.random() * 6,
        delay: -Math.random() * 24,
        // negative delay → start at random phase
        duration: 22 + Math.random() * 18,
        drift: (Math.random() - 0.5) * 18,
        // horizontal wobble
        opacity: 0.25 + Math.random() * 0.4
      });
    }
    return arr;
  }, [mood.label]);
  return /*#__PURE__*/React.createElement("div", {
    className: "amb",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "amb__wash",
    style: {
      background: `linear-gradient(180deg, ${palette.bgFrom} 0%, ${palette.bgTo} 100%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "amb__blob amb__blob--a",
    style: {
      background: palette.a,
      animationDuration: `${motion.drift}s`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "amb__blob amb__blob--b",
    style: {
      background: palette.b,
      animationDuration: `${motion.drift * 1.3}s`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "amb__blob amb__blob--c",
    style: {
      background: palette.c,
      animationDuration: `${motion.drift * 1.7}s`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "amb__light",
    style: {
      background: `radial-gradient(circle at center, ${palette.glow}, transparent 60%)`,
      animationDuration: `${motion.drift * 2.4}s`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "amb__particles"
  }, particles.map(p => /*#__PURE__*/React.createElement("span", {
    key: p.id,
    className: "amb__particle",
    style: {
      left: `${p.x}%`,
      top: `${p.y}%`,
      width: p.size,
      height: p.size,
      opacity: p.opacity * intensity,
      animationDuration: `${p.duration / motion.particleSpeed}s`,
      animationDelay: `${p.delay}s`,
      '--drift': `${p.drift}px`
    }
  }))));
}
window.AmbientLayer = AmbientLayer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/ambient.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/app.jsx
try { (() => {
// Nafas app - main routing.
// State machine: welcome -> checkin -> home (library) <-> practice (breathing) <-> settings

const {
  useState: useStateApp
} = React;
function NafasApp() {
  const [screen, setScreen] = useStateApp('welcome');
  const [tab, setTab] = useStateApp('home');

  // Show bottom nav only on the main app screens (after welcome/checkin)
  const inApp = !['welcome', 'checkin', 'breathing'].includes(screen);
  const go = s => {
    setScreen(s);
    if (s === 'home') setTab('home');
    if (s === 'settings') setTab('settings');
    if (s === 'library') setTab('practice');
  };
  let content = null;
  if (screen === 'welcome') {
    content = /*#__PURE__*/React.createElement(WelcomeScreen, {
      onContinue: () => setScreen('checkin')
    });
  } else if (screen === 'checkin') {
    content = /*#__PURE__*/React.createElement(CheckInScreen, {
      onContinue: () => {
        setScreen('library');
        setTab('practice');
      },
      onSkip: () => {
        setScreen('library');
        setTab('practice');
      }
    });
  } else if (screen === 'library') {
    content = /*#__PURE__*/React.createElement(LibraryScreen, {
      onOpenPractice: () => setScreen('breathing')
    });
  } else if (screen === 'breathing') {
    content = /*#__PURE__*/React.createElement(BreathingScreen, {
      onClose: () => {
        setScreen('library');
        setTab('practice');
      }
    });
  } else if (screen === 'home') {
    // Home is the same as library - a slightly different framing might be added later
    content = /*#__PURE__*/React.createElement(LibraryScreen, {
      onOpenPractice: () => setScreen('breathing')
    });
  } else if (screen === 'settings') {
    content = /*#__PURE__*/React.createElement(SettingsScreen, null);
  }

  // Map tabs to screens
  const onTab = t => {
    setTab(t);
    if (t === 'home') setScreen('library');
    if (t === 'practice') setScreen('library');
    if (t === 'settings') setScreen('settings');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "nafas-app"
  }, content, inApp && /*#__PURE__*/React.createElement(BottomNav, {
    active: tab,
    onTab: onTab
  }));
}
window.NafasApp = NafasApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/companion.jsx
try { (() => {
// Nafas - Companion
// The Wujood mark, brought to life. Breathes, blinks, holds an emotional expression
// that mirrors the user's current mood. Appears across screens for continuity.
//
// Two render variants:
//   <Companion size={120} />          - standalone, e.g. on welcome screen
//   <Companion floating />            - small, anchored top-right of a screen for continuity

const {
  useState: useStateCo,
  useEffect: useEffectCo
} = React;
function Companion({
  size = 120,
  floating = false,
  expression: explicit,
  label = true
}) {
  const {
    mood
  } = useEmotional();
  const expression = explicit || mood && mood.companion || 'calm';

  // Idle blink every 5-10s
  const [blink, setBlink] = useStateCo(false);
  useEffectCo(() => {
    let t1, t2;
    const cycle = () => {
      const delay = 5000 + Math.random() * 5000;
      t1 = setTimeout(() => {
        setBlink(true);
        t2 = setTimeout(() => {
          setBlink(false);
          cycle();
        }, 140);
      }, delay);
    };
    cycle();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  const src = `../../assets/emotions/${expression}.png`;
  const wrap = {
    width: size,
    height: size * 0.7,
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const float = floating ? {
    position: 'absolute',
    top: 56,
    right: 18,
    zIndex: 10,
    width: 56,
    height: 40
  } : {};
  return /*#__PURE__*/React.createElement("div", {
    className: "nafas-companion",
    style: {
      ...wrap,
      ...float
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: `Companion · ${expression}`,
    className: `nafas-companion__mark${blink ? ' is-blinking' : ''}`,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  }), label && !floating && /*#__PURE__*/React.createElement("div", {
    className: "nafas-companion__whisper"
  }, mood.whisper));
}
window.Companion = Companion;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/companion.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Nafas - shared UI components
// Loaded as a Babel module; exports to window so other JSX files can use them.

const {
  useState,
  useEffect,
  useRef
} = React;

// Soft button
function NafasButton({
  variant = 'primary',
  children,
  onClick,
  fullWidth = true,
  ...rest
}) {
  const cls = `nafas-btn nafas-btn--${variant}`;
  const style = fullWidth ? {} : {
    width: 'auto',
    padding: '12px 22px'
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    style: style,
    onClick: onClick
  }, rest), children);
}

// Card with optional eyebrow / title / meta + onClick
function NafasCard({
  variant = 'default',
  eyebrow,
  title,
  body,
  meta,
  onClick,
  children
}) {
  const cls = `nafas-card${variant !== 'default' ? ' nafas-card--' + variant : ''}`;
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    onClick: onClick
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "nafas-eyebrow"
  }, eyebrow), title && /*#__PURE__*/React.createElement("div", {
    className: "nafas-card-title"
  }, title), body && /*#__PURE__*/React.createElement("div", {
    className: "nafas-card-body"
  }, body), meta && /*#__PURE__*/React.createElement("div", {
    className: "nafas-card-meta"
  }, meta), children);
}

// Emotion chip
function EmotionChip({
  label,
  selected,
  onClick
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `nafas-chip${selected ? ' nafas-chip--selected' : ''}`,
    onClick: onClick
  }, label);
}

// Toggle (controlled)
function NafasToggle({
  on,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `nafas-toggle${on ? ' nafas-toggle--on' : ''}`,
    onClick: () => onChange && onChange(!on),
    role: "switch",
    "aria-checked": on
  });
}

// Setting row
function SettingRow({
  label,
  hint,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "nafas-setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nafas-setting-row__label"
  }, label), hint && /*#__PURE__*/React.createElement("div", {
    className: "nafas-setting-row__hint"
  }, hint)), children);
}

// Bottom nav - 3 tabs (Home / Practice / Settings)
function BottomNav({
  active,
  onTab
}) {
  const tab = (key, label, icon) => /*#__PURE__*/React.createElement("div", {
    key: key,
    className: `nafas-nav__tab${active === key ? ' nafas-nav__tab--active' : ''}`,
    onClick: () => onTab(key)
  }, icon, /*#__PURE__*/React.createElement("span", null, label));
  const iconHome = /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 12 12 3l9 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 10v10h14V10"
  }));
  const iconPractice = /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 16c0-3 6-3 6-7"
  }));
  const iconSettings = /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 12a7 7 0 11-2-4.9"
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "nafas-nav"
  }, tab('home', 'Home', iconHome), tab('practice', 'Practice', iconPractice), tab('settings', 'Settings', iconSettings));
}

// Simple back-arrow header
function NafasHeader({
  title,
  onBack,
  trailing
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 4px 16px',
      minHeight: 36
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      width: 36,
      height: 36,
      borderRadius: 999,
      background: 'rgba(255,255,255,0.6)',
      border: '1px solid rgba(86,50,147,0.10)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'var(--ink-700)'
    },
    "aria-label": "Back"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 18l-6-6 6-6"
  }))), title && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      font: '600 16px var(--font-display)',
      color: 'var(--ink-900)'
    }
  }, title), trailing);
}

// Brand mark inline
function BrandMark({
  size = 64,
  white = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `nafas-mark${white ? ' nafas-mark--white' : ''}`,
    style: {
      width: size,
      height: size
    }
  });
}

// Eyebrow micro-label
function Eyebrow({
  children,
  tone = 'info'
}) {
  const colors = {
    info: 'var(--info)',
    purple: 'var(--purple-600)',
    rose: 'var(--accent)',
    soft: 'var(--ink-300)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 10px var(--font-display)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: colors[tone] || colors.info
    }
  }, children);
}
Object.assign(window, {
  NafasButton,
  NafasCard,
  EmotionChip,
  NafasToggle,
  SettingRow,
  BottomNav,
  NafasHeader,
  BrandMark,
  Eyebrow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/environment.jsx
try { (() => {
// Nafas - Emotional Environment system
// White-room palette: off-white surfaces with barely-there warm/cool tints.
// Mood is communicated through *temperature*, not saturation. Companion is the
// primary emotional signal; ambient just shifts the light.

const MOODS = {
  settled: {
    label: 'settled',
    labelAr: 'هادئ',
    palette: {
      // very pale lavender-tinted white
      a: '#f4f1f7',
      b: '#eef0f3',
      c: '#f9f7fb',
      glow: 'rgba(86,50,147,0.05)',
      ink: '#1c1230',
      bgFrom: '#fbf9fd',
      bgTo: '#f6f4f0'
    },
    companion: 'calm',
    motion: {
      drift: 60,
      particles: 6,
      particleSpeed: 0.6
    },
    whisper: 'A steady, quiet ground.'
  },
  tired: {
    label: 'tired',
    labelAr: 'متعب',
    palette: {
      // warm beige whisper
      a: '#f6f2eb',
      b: '#f3eee5',
      c: '#fbf8f2',
      glow: 'rgba(86,50,147,0.04)',
      ink: '#1c1230',
      bgFrom: '#fdfaf3',
      bgTo: '#f4f1ed'
    },
    companion: 'sleepy',
    motion: {
      drift: 80,
      particles: 5,
      particleSpeed: 0.4
    },
    whisper: 'A slower light. Rest is allowed.'
  },
  anxious: {
    label: 'anxious',
    labelAr: 'قلِق',
    palette: {
      // cool white, near-imperceptible blue tint
      a: '#eff3f6',
      b: '#f4f5f7',
      c: '#f9fafb',
      glow: 'rgba(78,178,208,0.06)',
      ink: '#1c1230',
      bgFrom: '#fafbfc',
      bgTo: '#f1f3f5'
    },
    companion: 'focused',
    motion: {
      drift: 45,
      particles: 8,
      particleSpeed: 0.9
    },
    whisper: 'Cooler light. We can slow this together.'
  },
  overwhelmed: {
    label: 'overwhelmed',
    labelAr: 'مُثقَل',
    palette: {
      // softest gray-lavender, almost no color
      a: '#f1eff3',
      b: '#eeecef',
      c: '#f7f5f8',
      glow: 'rgba(86,50,147,0.06)',
      ink: '#1c1230',
      bgFrom: '#f7f6f8',
      bgTo: '#efedf1'
    },
    companion: 'tearful',
    motion: {
      drift: 70,
      particles: 7,
      particleSpeed: 0.7
    },
    whisper: 'Softer walls. There is room here.'
  },
  hopeful: {
    label: 'hopeful',
    labelAr: 'مُتفائل',
    palette: {
      // warm honey-tinted white
      a: '#f9f4ec',
      b: '#f7f1e7',
      c: '#fcf8f0',
      glow: 'rgba(192,96,165,0.06)',
      ink: '#1c1230',
      bgFrom: '#fdfaf3',
      bgTo: '#f6f0e6'
    },
    companion: 'hopeful',
    motion: {
      drift: 55,
      particles: 6,
      particleSpeed: 0.8
    },
    whisper: 'Warmer light. A small forward.'
  }
};

// Resolve other CheckIn chip labels to one of the canonical moods
const MOOD_ALIASES = {
  settled: 'settled',
  tired: 'tired',
  anxious: 'anxious',
  overwhelmed: 'overwhelmed',
  low: 'overwhelmed',
  hopeful: 'hopeful',
  scattered: 'anxious',
  'not sure': 'settled'
};
function resolveMood(key) {
  if (!key) return MOODS.settled;
  return MOODS[MOOD_ALIASES[key] || 'settled'];
}

// React context
const EmotionalContext = React.createContext(null);
function EmotionalProvider({
  children,
  initial = 'settled'
}) {
  const [moodKey, setMoodKey] = React.useState(initial);
  const mood = resolveMood(moodKey);

  // Public API
  const value = React.useMemo(() => ({
    moodKey,
    mood,
    setMood: setMoodKey
  }), [moodKey, mood]);
  return /*#__PURE__*/React.createElement(EmotionalContext.Provider, {
    value: value
  }, children);
}
function useEmotional() {
  return React.useContext(EmotionalContext);
}
Object.assign(window, {
  MOODS,
  MOOD_ALIASES,
  resolveMood,
  EmotionalContext,
  EmotionalProvider,
  useEmotional
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/environment.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/ios-frame.jsx
try { (() => {
// iOS.jsx - Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports: IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill - blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar - glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard - iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/regulation.jsx
try { (() => {
// Nafas - Mood Regulation Activities (regulation micro-tools)
// A new dashboard section that LIVES at the end of the existing flow.
// Strict enhancement: uses existing capsule (.nafas-lcard) + ambient styling.
// No new UI system. No competitive gamification.

const {
  useState: useStateReg,
  useEffect: useEffectReg,
  useRef: useRefReg
} = React;

// ── 1. Inline live tool: Breathing rhythm orb ───────────────────────────────
// A soft expanding/contracting circle. Tap to start/stop. No score.
function BreathingOrb() {
  const [running, setRunning] = useStateReg(false);
  const [phase, setPhase] = useStateReg('rest'); // 'in' | 'hold' | 'out' | 'rest'
  const [cycle, setCycle] = useStateReg(0);
  const timerRef = useRefReg(null);
  useEffectReg(() => {
    if (!running) {
      clearTimeout(timerRef.current);
      setPhase('rest');
      return;
    }
    // 4-7-8 inspired loop, but soft: 4 in, 4 hold, 6 out
    const order = [{
      p: 'in',
      ms: 4000
    }, {
      p: 'hold',
      ms: 3200
    }, {
      p: 'out',
      ms: 6000
    }];
    let i = 0;
    const step = () => {
      setPhase(order[i].p);
      timerRef.current = setTimeout(() => {
        i = (i + 1) % order.length;
        if (i === 0) setCycle(c => c + 1);
        step();
      }, order[i].ms);
    };
    step();
    return () => clearTimeout(timerRef.current);
  }, [running]);
  const label = {
    rest: 'Tap to begin',
    in: 'Breathe in',
    hold: 'Hold',
    out: 'Breathe out'
  }[phase];
  const labelAr = {
    rest: 'اضغط لتبدأ',
    in: 'شهيق',
    hold: 'احتفظ',
    out: 'زفير'
  }[phase];
  return /*#__PURE__*/React.createElement("div", {
    className: "reg-orb-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-orb-card__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "reg-orb-card__eyebrow"
  }, "Rhythm \xB7 \u0625\u064A\u0642\u0627\u0639"), /*#__PURE__*/React.createElement("span", {
    className: "reg-orb-card__meta"
  }, running ? `Cycle ${cycle + 1}` : 'No score · no streak')), /*#__PURE__*/React.createElement("div", {
    className: `reg-orb reg-orb--${phase}${running ? ' is-on' : ''}`,
    onClick: () => setRunning(r => !r),
    role: "button",
    "aria-label": "Breathing orb"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-orb__halo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "reg-orb__body"
  }), /*#__PURE__*/React.createElement("div", {
    className: "reg-orb__label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "reg-orb__label-en"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "reg-orb__label-ar",
    dir: "rtl"
  }, labelAr))), /*#__PURE__*/React.createElement("div", {
    className: "reg-orb-card__foot"
  }, "Follow the circle. Stop whenever you feel settled."));
}

// ── 2. Capsule cards for the rest of the regulation tools ──────────────────
function RegulationActivities() {
  const tools = [{
    id: 'match',
    eyebrow: 'Pairing',
    titleAr: 'طابِق الإحساس',
    title: 'Match the feeling',
    meta: '2 min',
    hint: 'Pair an emotion with a gentle coping move.'
  }, {
    id: 'drift',
    eyebrow: 'Attention',
    titleAr: 'انتباه الذهن',
    title: 'Notice the drift',
    meta: '90 sec',
    hint: 'Tap softly when your mind wanders.'
  }, {
    id: 'steady',
    eyebrow: 'Balance',
    titleAr: 'وازِن الميزان',
    title: 'Steady the bar',
    meta: '60 sec',
    hint: 'Slide gently to find your centre.',
    variant: 'tint'
  }, {
    id: 'sequence',
    eyebrow: 'Sequence',
    titleAr: 'تتابُع هادئ',
    title: 'Calm sequence',
    meta: '2 min',
    hint: 'Watch and repeat a soft pattern of light.'
  }, {
    id: 'ground',
    eyebrow: 'Grounding',
    titleAr: 'اِرتكز الآن',
    title: 'Ground in ten',
    meta: '10 sec',
    hint: 'A micro-cycle when you only have a moment.'
  }, {
    id: 'sky',
    eyebrow: 'Environment',
    titleAr: 'سماء تتنفّس',
    title: 'A sky that breathes',
    meta: '3 min',
    hint: 'The horizon expands and settles with you.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "reg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg__heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg__eyebrow"
  }, "Regulation \xB7 \u062A\u0646\u0638\u064A\u0645"), /*#__PURE__*/React.createElement("h3", {
    className: "reg__title"
  }, "Small rituals to settle the system."), /*#__PURE__*/React.createElement("p", {
    className: "reg__sub"
  }, "Tiny tools - not games. No scores, no streaks. Take what fits this moment.")), /*#__PURE__*/React.createElement(BreathingOrb, null), /*#__PURE__*/React.createElement("div", {
    className: "reg__list"
  }, tools.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: `nafas-lcard${t.variant ? ' nafas-lcard--' + t.variant : ''}`
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 10px var(--font-display)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--info)',
      flexShrink: 0,
      minWidth: 100
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      gap: 2,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 16px var(--font-display)',
      color: 'var(--ink-900)',
      letterSpacing: '-0.005em'
    }
  }, t.title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px var(--font-body)',
      color: 'var(--ink-500)',
      fontStyle: 'italic'
    }
  }, t.hint)), /*#__PURE__*/React.createElement("span", {
    className: "ar-display",
    style: {
      fontSize: 18,
      color: 'var(--ink-700)',
      marginLeft: 8,
      flexShrink: 0
    }
  }, t.titleAr), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-body)',
      color: 'var(--fg-3)',
      letterSpacing: '0.02em',
      flexShrink: 0
    }
  }, t.meta)))));
}
window.RegulationActivities = RegulationActivities;
window.BreathingOrb = BreathingOrb;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/regulation.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/screens/Breathing.jsx
try { (() => {
// Nafas - Breathing exercise screen (v2)
// Deeper layered halo: outer particle field + multiple soft halos + breath circle.
// Tiny companion sits in the top-right keeping the user company.

const {
  useState: useStateBr2,
  useEffect: useEffectBr2,
  useRef: useRefBr2
} = React;
function BreathingScreen({
  onClose
}) {
  const {
    mood
  } = useEmotional();
  const PHASES = [{
    key: 'inhale',
    label: 'Inhale',
    labelAr: 'شَهيق',
    seconds: 4
  }, {
    key: 'hold',
    label: 'Hold',
    labelAr: 'احتباس',
    seconds: 7
  }, {
    key: 'exhale',
    label: 'Exhale',
    labelAr: 'زَفير',
    seconds: 8
  }];
  const [phaseIdx, setPhaseIdx] = useStateBr2(0);
  const [tick, setTick] = useStateBr2(0);
  const [running, setRunning] = useStateBr2(true);
  const [totalCycles, setTotalCycles] = useStateBr2(0);
  const intervalRef = useRefBr2(null);
  const phase = PHASES[phaseIdx];
  useEffectBr2(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTick(t => {
        const next = t + 0.1;
        if (next >= phase.seconds) {
          setPhaseIdx(i => {
            const ni = (i + 1) % PHASES.length;
            if (ni === 0) setTotalCycles(c => c + 1);
            return ni;
          });
          return 0;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [running, phaseIdx, phase.seconds]);
  let scale = 0.55;
  const t = tick / phase.seconds;
  if (phase.key === 'inhale') scale = 0.55 + 0.45 * t;else if (phase.key === 'hold') scale = 1.0;else if (phase.key === 'exhale') scale = 1.0 - 0.45 * t;
  const remaining = Math.ceil(phase.seconds - tick);
  return /*#__PURE__*/React.createElement("div", {
    className: "nafas-screen",
    style: {
      padding: '60px 24px 24px',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(AmbientLayer, {
    intensity: 1.2
  }), /*#__PURE__*/React.createElement(NafasHeader, {
    onBack: onClose,
    trailing: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Companion, {
      size: 48,
      label: false
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        font: '500 11px var(--font-body)',
        color: 'var(--fg-3)',
        letterSpacing: '0.04em'
      }
    }, totalCycles, " ", totalCycles === 1 ? 'cycle' : 'cycles'))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260,
      height: 260,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle, rgba(192,96,165,0.16), transparent 70%)',
      transform: `scale(${scale * 1.7})`,
      transition: 'transform 100ms linear',
      borderRadius: '50%',
      filter: 'blur(2px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 24,
      background: 'radial-gradient(circle, rgba(123,78,192,0.22), transparent 65%)',
      transform: `scale(${scale * 1.35})`,
      transition: 'transform 100ms linear',
      borderRadius: '50%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 30,
      border: '1.5px solid rgba(86,50,147,0.18)',
      transform: `scale(${scale * 1.1})`,
      transition: 'transform 100ms linear',
      borderRadius: '50%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 190,
      height: 190,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #563293 0%, #7b4ec0 50%, #c060a5 100%)',
      transform: `scale(${scale})`,
      transition: 'transform 100ms linear',
      boxShadow: `
              0 0 0 6px rgba(255,255,255,0.7),
              0 20px 60px rgba(86,50,147,0.40),
              inset 0 4px 18px rgba(255,255,255,0.30)
            `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 4,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ar-display",
    style: {
      fontSize: 32,
      color: '#fff'
    }
  }, phase.labelAr), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 12px var(--font-body)',
      letterSpacing: '0.20em',
      textTransform: 'uppercase',
      opacity: 0.85
    }
  }, phase.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '300 72px/1 var(--font-display)',
      color: 'var(--ink-900)',
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums',
      textShadow: '0 2px 20px rgba(255,255,255,0.6)'
    }
  }, remaining), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 13px var(--font-body)',
      color: 'var(--fg-2)',
      textAlign: 'center',
      maxWidth: 240,
      lineHeight: 1.55,
      fontStyle: 'italic'
    }
  }, "Inhale 4 \xB7 Hold 7 \xB7 Exhale 8", /*#__PURE__*/React.createElement("br", null), "You can stop anytime.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(NafasButton, {
    variant: running ? 'secondary' : 'primary',
    onClick: () => setRunning(r => !r)
  }, running ? 'Pause' : 'Resume')));
}
window.BreathingScreen = BreathingScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/screens/Breathing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/screens/CheckIn.jsx
try { (() => {
// Nafas - Check-in screen (v2)
// Tapping an emotion chip immediately tints the environment + companion expression.
// Live emotional preview before committing.

const {
  useState: useStateCheckIn2
} = React;
function CheckInScreen({
  onContinue,
  onSkip
}) {
  const {
    setMood,
    mood
  } = useEmotional();
  const [selected, setSelected] = useStateCheckIn2(null);
  const emotions = [{
    ar: 'هادئ',
    en: 'settled',
    mood: 'settled'
  }, {
    ar: 'متعب',
    en: 'tired',
    mood: 'tired'
  }, {
    ar: 'قلِق',
    en: 'anxious',
    mood: 'anxious'
  }, {
    ar: 'مُثقَل',
    en: 'overwhelmed',
    mood: 'overwhelmed'
  }, {
    ar: 'محبَط',
    en: 'low',
    mood: 'overwhelmed'
  }, {
    ar: 'مُتفائل',
    en: 'hopeful',
    mood: 'hopeful'
  }, {
    ar: 'مُشتت',
    en: 'scattered',
    mood: 'anxious'
  }, {
    ar: 'لا أعرف',
    en: 'not sure',
    mood: 'settled'
  }];
  const pick = e => {
    setSelected(e.en);
    setMood(e.mood); // ambient + companion shift immediately
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "nafas-screen",
    style: {
      padding: '60px 24px 24px'
    }
  }, /*#__PURE__*/React.createElement(AmbientLayer, {
    intensity: 0.8
  }), /*#__PURE__*/React.createElement(NafasHeader, {
    onBack: onSkip,
    trailing: /*#__PURE__*/React.createElement(Companion, {
      size: 48,
      label: false
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "nafas-enter",
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "info"
  }, "Check-in \xB7 \u0627\u0637\u0645\u0626\u0646\u0627\u0646"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 26px/1.18 var(--font-display)',
      color: 'var(--ink-900)'
    }
  }, "How are you arriving today?"), /*#__PURE__*/React.createElement("div", {
    className: "ar-display",
    style: {
      fontSize: 26,
      color: 'var(--ink-700)',
      textAlign: 'right'
    }
  }, "\u0643\u064A\u0641 \u062A\u0635\u0650\u0644 \u0627\u0644\u064A\u0648\u0645\u061F"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 22
    }
  }, emotions.map(e => /*#__PURE__*/React.createElement(EmotionChip, {
    key: e.en,
    label: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: 1.05,
        gap: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ar-display",
      style: {
        fontSize: 15
      }
    }, e.ar), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        opacity: 0.6,
        letterSpacing: '0.04em'
      }
    }, e.en)),
    selected: selected === e.en,
    onClick: () => pick(e)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: '14px 18px',
      background: 'rgba(255,255,255,0.55)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: 20,
      font: '400 13px/1.5 var(--font-body)',
      color: 'var(--ink-700)',
      fontStyle: 'italic',
      textAlign: 'center',
      boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 14px rgba(86,50,147,0.08)',
      transition: 'all 600ms var(--ease-soft)'
    }
  }, mood.whisper), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "nafas-field-label"
  }, "What stayed with you \xB7 optional"), /*#__PURE__*/React.createElement("textarea", {
    className: "nafas-textarea",
    placeholder: "Anything you want to set down. Doesn't save unless you ask."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(NafasButton, {
    variant: "primary",
    onClick: onContinue
  }, selected ? 'Find something gentle' : 'Continue anyway'), /*#__PURE__*/React.createElement(NafasButton, {
    variant: "ghost",
    onClick: onSkip
  }, "Not today")));
}
window.CheckInScreen = CheckInScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/screens/CheckIn.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/screens/CompanionIntro.jsx
try { (() => {
// Nafas - Companion Intro
// Cinematic, slow. After the quiz, the companion arrives and quietly speaks.
// 3 beats: arrival → naming → invitation.

const {
  useState: useStateIntro,
  useEffect: useEffectIntro
} = React;
const BEATS = [{
  duration: 4000,
  ar: 'لقد وصلت',
  en: 'You arrived.',
  body: 'The room you opened - this is it.\nIt is small. It is quiet. It is enough.'
}, {
  duration: 5000,
  ar: 'وأنا هنا',
  en: 'I am here.',
  body: "I'm not a chatbot. I'm not therapy.\nI'm a small presence the system uses\nto let you know you are not alone in the room."
}, {
  duration: 5000,
  ar: 'لنبدأ بنَفَس',
  en: "Let's begin with a breath.",
  body: 'When you are ready - not before -\nyou can step into the practices.\nThere is no hurry. There is no test.'
}];
function CompanionIntro({
  onContinue
}) {
  const [beat, setBeat] = useStateIntro(0);
  const [autoPlay, setAutoPlay] = useStateIntro(true);
  useEffectIntro(() => {
    if (!autoPlay) return;
    if (beat >= BEATS.length - 1) return;
    const t = setTimeout(() => setBeat(b => b + 1), BEATS[beat].duration);
    return () => clearTimeout(t);
  }, [beat, autoPlay]);
  const b = BEATS[beat];
  const isLast = beat === BEATS.length - 1;
  return /*#__PURE__*/React.createElement("div", {
    className: "intro"
  }, /*#__PURE__*/React.createElement(AmbientLayer, {
    intensity: 1.4
  }), /*#__PURE__*/React.createElement("div", {
    className: "intro__center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "intro__companion-wrap"
  }, /*#__PURE__*/React.createElement(Companion, {
    size: 200,
    label: false
  })), /*#__PURE__*/React.createElement("div", {
    className: "intro__beat",
    key: beat
  }, /*#__PURE__*/React.createElement("div", {
    className: "ar-display intro__ar",
    dir: "rtl"
  }, b.ar), /*#__PURE__*/React.createElement("div", {
    className: "intro__en"
  }, b.en), /*#__PURE__*/React.createElement("div", {
    className: "intro__body"
  }, b.body.split('\n').map((line, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, line)))), /*#__PURE__*/React.createElement("div", {
    className: "intro__dots"
  }, BEATS.map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: `intro__dot${i === beat ? ' is-active' : ''}${i < beat ? ' is-done' : ''}`,
    onClick: () => {
      setAutoPlay(false);
      setBeat(i);
    }
  }))), isLast && /*#__PURE__*/React.createElement("button", {
    className: "intro__begin",
    onClick: onContinue
  }, /*#__PURE__*/React.createElement("span", {
    className: "ar-display",
    dir: "rtl"
  }, "\u0627\u062F\u062E\u0644"), /*#__PURE__*/React.createElement("span", null, "Enter the room"))));
}
window.CompanionIntro = CompanionIntro;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/screens/CompanionIntro.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/screens/Landing.jsx
try { (() => {
// Nafas - Landing page (Arab-Therapy-style segmented structure)
// Same Wujood identity, colors, clouds, type, softness - only clearer
// vertical hierarchy: Hero → What is Wujood → Who it's for → How it works
// → Features → Final CTA. ONE Begin flow throughout.

function LandingScreen({
  onBegin
}) {
  const whoFor = [{
    en: 'University students',
    ar: 'طلاب الجامعات'
  }, {
    en: 'Medical students',
    ar: 'طلاب الطب'
  }, {
    en: 'Students under exam pressure',
    ar: 'تحت ضغط الامتحانات'
  }, {
    en: 'Burnout & anxiety cycles',
    ar: 'دورات الإرهاق والقلق'
  }];
  const steps = [{
    n: '01',
    en: 'Check in',
    ar: 'سجّل شعورك',
    body: 'Choose how you feel right now. Nothing is recorded.'
  }, {
    n: '02',
    en: 'Guided regulation',
    ar: 'تنظيم موجّه',
    body: 'A short, gentle path tuned to your state.'
  }, {
    n: '03',
    en: 'Breathe & ground',
    ar: 'تنفّس وارتكز',
    body: 'Soft breathing and grounding tools for the moment.'
  }, {
    n: '04',
    en: 'Track recovery',
    ar: 'تتبّع التعافي',
    body: 'Notice the small shifts, quietly, over time.'
  }];
  const features = [{
    en: 'Mood check-ins',
    ar: 'تسجيل المزاج'
  }, {
    en: 'Emotional grounding tools',
    ar: 'أدوات الارتكاز'
  }, {
    en: 'AI companion support',
    ar: 'رفيق ذكي'
  }, {
    en: 'Burnout recovery flow',
    ar: 'تعافٍ من الإرهاق'
  }, {
    en: 'Anonymous usage',
    ar: 'استخدام مجهول'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "nafas-landing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-nav-wrap"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "nl-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-nav__brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wordmark-color.png",
    alt: "WujoodCare"
  })), /*#__PURE__*/React.createElement("div", {
    className: "nl-nav__divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "nl-nav__tag"
  }, "Your Presence, Our Care"), /*#__PURE__*/React.createElement("div", {
    className: "nl-nav__spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "nl-nav__pill"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nl-nav__link is-active"
  }, "Home"), /*#__PURE__*/React.createElement("a", {
    href: "#about",
    className: "nl-nav__link"
  }, "About"), /*#__PURE__*/React.createElement("a", {
    href: "#how",
    className: "nl-nav__link"
  }, "How it works"), /*#__PURE__*/React.createElement("a", {
    href: "#features",
    className: "nl-nav__link"
  }, "Features"), /*#__PURE__*/React.createElement("a", {
    href: "#begin",
    className: "nl-nav__link"
  }, "Begin")), /*#__PURE__*/React.createElement("button", {
    className: "nl-nav__menu",
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement("section", {
    className: "nl-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-hero__eyebrow"
  }, "Take a breather between study sessions"), /*#__PURE__*/React.createElement("h1", {
    className: "nl-hero__title"
  }, "Take a Breath"), /*#__PURE__*/React.createElement("p", {
    className: "nl-hero__title-ar",
    dir: "rtl"
  }, "\u062E\u064F\u0630 \u0646\u0641\u0633"), /*#__PURE__*/React.createElement("p", {
    className: "nl-hero__sub"
  }, "A quiet space for university students in MENA - for exam stress, study pressure, and burnout. Anonymous by default, a place to breathe between deadlines and revisions."), /*#__PURE__*/React.createElement("p", {
    className: "nl-hero__sub-ar",
    dir: "rtl"
  }, "\u0645\u0633\u0627\u062D\u0629 \u0647\u0627\u062F\u0626\u0629 \u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u062C\u0627\u0645\u0639\u0627\u062A \u0641\u064A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637 \u0648\u0634\u0645\u0627\u0644 \u0623\u0641\u0631\u064A\u0642\u064A\u0627 - \u0644\u0636\u063A\u0637 \u0627\u0644\u062F\u0631\u0627\u0633\u0629 \u0648\u0627\u0644\u0627\u0645\u062A\u062D\u0627\u0646\u0627\u062A \u0648\u0627\u0644\u0625\u0631\u0647\u0627\u0642. \u0645\u062C\u0647\u0648\u0644\u0629 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0627\u064B\u060C \u0645\u0633\u0627\u062D\u0629 \u0644\u0627\u0644\u062A\u0642\u0627\u0637 \u0627\u0644\u0623\u0646\u0641\u0627\u0633 \u0628\u064A\u0646 \u0627\u0644\u0645\u0630\u0627\u0643\u0631\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F."), /*#__PURE__*/React.createElement("button", {
    className: "nl-begin",
    onClick: onBegin
  }, "Begin", /*#__PURE__*/React.createElement("span", {
    className: "nl-begin__arrow",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 7H12M12 7L7 2M12 7L7 12",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "nl-hero__prompt"
  }, "How are you feeling right now?"))), /*#__PURE__*/React.createElement("section", {
    className: "nl-sec",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-sec__inner nl-sec__inner--narrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-sec__eyebrow"
  }, "What is Wujood"), /*#__PURE__*/React.createElement("h2", {
    className: "nl-sec__title"
  }, "A quiet room, not a clinic."), /*#__PURE__*/React.createElement("p", {
    className: "nl-sec__title-ar",
    dir: "rtl"
  }, "\u063A\u0631\u0641\u0629 \u0647\u0627\u062F\u0626\u0629\u060C \u0644\u0627 \u0639\u064A\u0627\u062F\u0629."), /*#__PURE__*/React.createElement("p", {
    className: "nl-sec__lead"
  }, "Wujood - ", /*#__PURE__*/React.createElement("span", {
    className: "nl-ar-inline",
    dir: "rtl"
  }, "\u0648\u064F\u062C\u0648\u062F"), ", \u201Cpresence\u201D - is a soft emotional space for students. Not therapy, not a chatbot. A place to notice how you feel, breathe, and steady yourself between the pressures of academic life."))), /*#__PURE__*/React.createElement("section", {
    className: "nl-sec nl-sec--tint",
    id: "who"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-sec__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-sec__eyebrow"
  }, "Who it's for"), /*#__PURE__*/React.createElement("h2", {
    className: "nl-sec__title"
  }, "Built for students under pressure."), /*#__PURE__*/React.createElement("div", {
    className: "nl-tags"
  }, whoFor.map(t => /*#__PURE__*/React.createElement("span", {
    className: "nl-tag",
    key: t.en
  }, /*#__PURE__*/React.createElement("span", {
    className: "nl-tag__en"
  }, t.en), /*#__PURE__*/React.createElement("span", {
    className: "nl-tag__ar",
    dir: "rtl"
  }, t.ar)))))), /*#__PURE__*/React.createElement("section", {
    className: "nl-sec",
    id: "how"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-sec__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-sec__eyebrow"
  }, "How it works"), /*#__PURE__*/React.createElement("h2", {
    className: "nl-sec__title"
  }, "Four soft steps."), /*#__PURE__*/React.createElement("div", {
    className: "nl-steps"
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    className: "nl-step",
    key: s.n
  }, /*#__PURE__*/React.createElement("span", {
    className: "nl-step__n"
  }, s.n), /*#__PURE__*/React.createElement("span", {
    className: "nl-step__title"
  }, s.en), /*#__PURE__*/React.createElement("span", {
    className: "nl-step__ar",
    dir: "rtl"
  }, s.ar), /*#__PURE__*/React.createElement("span", {
    className: "nl-step__body"
  }, s.body)))))), /*#__PURE__*/React.createElement("section", {
    className: "nl-sec nl-sec--tint",
    id: "features"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-sec__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-sec__eyebrow"
  }, "What's inside"), /*#__PURE__*/React.createElement("h2", {
    className: "nl-sec__title"
  }, "Gentle by design."), /*#__PURE__*/React.createElement("div", {
    className: "nl-tags"
  }, features.map(f => /*#__PURE__*/React.createElement("span", {
    className: "nl-tag nl-tag--soft",
    key: f.en
  }, /*#__PURE__*/React.createElement("span", {
    className: "nl-tag__en"
  }, f.en), /*#__PURE__*/React.createElement("span", {
    className: "nl-tag__ar",
    dir: "rtl"
  }, f.ar)))))), /*#__PURE__*/React.createElement("section", {
    className: "nl-final",
    id: "begin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl-final__inner"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "nl-final__title"
  }, "How are you feeling right now?"), /*#__PURE__*/React.createElement("p", {
    className: "nl-final__title-ar",
    dir: "rtl"
  }, "\u0643\u064A\u0641 \u062A\u0634\u0639\u0631 \u0627\u0644\u0622\u0646\u061F"), /*#__PURE__*/React.createElement("button", {
    className: "nl-begin",
    onClick: onBegin
  }, "Begin", /*#__PURE__*/React.createElement("span", {
    className: "nl-begin__arrow",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 7H12M12 7L7 2M12 7L7 12",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "nl-final__hint"
  }, "Tell us to begin. ", /*#__PURE__*/React.createElement("span", {
    className: "nl-ar-inline",
    dir: "rtl"
  }, "\u0642\u0644 \u0644\u0646\u0627 \u0644\u0646\u0628\u062F\u0623.")))));
}
window.LandingScreen = LandingScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/screens/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/screens/Library.jsx
try { (() => {
// Nafas - Library / Practice home (v3)
// Capsule-shaped practice cards stacked vertically. Soft emotional containers.

function LibraryScreen({
  onOpenPractice,
  hideHeading
}) {
  const {
    mood
  } = useEmotional();
  const heroByMood = {
    settled: {
      titleAr: 'تنفس مُريح',
      title: 'Settled breath',
      body: 'A short cycle to stay where you are.',
      meta: '2 min'
    },
    tired: {
      titleAr: 'قبل النوم',
      title: 'Settle before sleep',
      body: 'A small wind-down. Lights low.',
      meta: '7 min · audio'
    },
    anxious: {
      titleAr: 'تنفس ٤ - ٧ - ٨',
      title: '4-7-8 breath',
      body: 'Slow the body. Two minutes is enough.',
      meta: '2 min · audio'
    },
    overwhelmed: {
      titleAr: 'الأرض تحتك',
      title: '5-4-3-2-1 senses',
      body: 'Find the room you are in.',
      meta: '3 min'
    },
    hopeful: {
      titleAr: 'نَفَس واحد',
      title: 'One breath, fully',
      body: 'Carry this forward, one breath.',
      meta: '60 sec'
    }
  };
  const hero = heroByMood[mood.label] || heroByMood.settled;
  const practices = [{
    id: 'ground',
    eyebrow: 'Grounding',
    titleAr: 'الأرض تحتك',
    title: '5-4-3-2-1 senses',
    meta: '3 min'
  }, {
    id: 'body',
    eyebrow: 'Body scan',
    titleAr: 'مَسح الجَسد',
    title: 'Soften, head to feet',
    meta: '7 min · audio'
  }, {
    id: 'sleep',
    eyebrow: 'Tonight',
    titleAr: 'قبل النوم',
    title: 'Settle before sleep',
    meta: '8 min · audio'
  }, {
    id: 'reset',
    eyebrow: 'Quick reset',
    titleAr: 'إعادة ضبط',
    title: 'One breath, fully',
    meta: '60 sec'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "nafas-screen",
    style: {
      padding: '60px 20px 16px'
    }
  }, /*#__PURE__*/React.createElement(AmbientLayer, {
    intensity: 0.7
  }), /*#__PURE__*/React.createElement("div", {
    className: "nafas-enter",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, !hideHeading && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "info"
  }, "Library \xB7 \u0645\u0643\u062A\u0628\u0629"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 26px/1.18 var(--font-display)',
      color: 'var(--ink-900)',
      marginTop: 6
    }
  }, "Practices that fit small moments."), /*#__PURE__*/React.createElement("div", {
    className: "ar-display",
    dir: "rtl",
    style: {
      font: '600 18px/1.5 var(--font-display-ar)',
      color: 'var(--ink-700)',
      marginTop: 2,
      opacity: 0.85
    }
  }, "\u0645\u0645\u0627\u0631\u0633\u0627\u062A \u0635\u063A\u064A\u0631\u0629 \u062A\u062A\u0633\u0639 \u0644\u0623\u064A \u0644\u062D\u0638\u0629.")), /*#__PURE__*/React.createElement(MoodWidget, null), /*#__PURE__*/React.createElement("div", {
    className: "nafas-lcard nafas-lcard--hero",
    onClick: () => onOpenPractice(hero.id)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 10px var(--font-display)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--lemon-500)',
      flexShrink: 0,
      minWidth: 100
    }
  }, "For you now"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 16px var(--font-display)',
      color: '#fff',
      flex: 1,
      letterSpacing: '-0.005em'
    }
  }, hero.title), /*#__PURE__*/React.createElement("span", {
    className: "ar-display",
    style: {
      fontSize: 18,
      color: 'rgba(255,255,255,0.9)',
      marginLeft: 8
    }
  }, hero.titleAr), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-body)',
      color: 'rgba(255,255,255,0.75)',
      letterSpacing: '0.02em',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'var(--lemon-500)',
      boxShadow: '0 0 8px rgba(251,239,130,0.8)'
    }
  }), hero.meta)), practices.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: `nafas-lcard${p.variant ? ' nafas-lcard--' + p.variant : ''}`,
    onClick: () => onOpenPractice(p.id)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 10px var(--font-display)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--info)',
      flexShrink: 0,
      minWidth: 100
    }
  }, p.eyebrow), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 16px var(--font-display)',
      color: 'var(--ink-900)',
      flex: 1,
      letterSpacing: '-0.005em'
    }
  }, p.title), /*#__PURE__*/React.createElement("span", {
    className: "ar-display",
    style: {
      fontSize: 18,
      color: 'var(--ink-700)',
      marginLeft: 8
    }
  }, p.titleAr), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-body)',
      color: 'var(--fg-3)',
      letterSpacing: '0.02em',
      flexShrink: 0
    }
  }, p.meta)))));
}
window.LibraryScreen = LibraryScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/screens/Library.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/screens/Quiz.jsx
try { (() => {
// Nafas - Onboarding Quiz (5 questions, gentle pacing)
// Each question fills the viewport. Smooth transitions between steps.
// At the end, the answers map to a mood + companion expression.

const {
  useState: useStateQuiz
} = React;
const QUESTIONS = [{
  id: 'mind',
  ar: 'كيف تشعر بعقلك مؤخراً؟',
  en: 'How has your mind been feeling lately?',
  options: [{
    label: 'Quiet and balanced',
    ar: 'هادئ ومتوازن',
    mood: 'settled'
  }, {
    label: 'Heavy and overwhelmed',
    ar: 'ثقيل ومُتعب',
    mood: 'overwhelmed'
  }, {
    label: 'Constantly racing',
    ar: 'يتسارع باستمرار',
    mood: 'anxious'
  }, {
    label: 'Emotionally exhausted',
    ar: 'مُنهَك عاطفياً',
    mood: 'tired'
  }, {
    label: 'Numb or disconnected',
    ar: 'مُتبلِّد أو منفصل',
    mood: 'overwhelmed'
  }]
}, {
  id: 'cause',
  ar: 'ما الذي يؤثر فيك أكثر هذه الأيام؟',
  en: 'What has been affecting you the most recently?',
  options: [{
    label: 'Academic pressure',
    ar: 'الضغط الدراسي'
  }, {
    label: 'Fear about the future',
    ar: 'الخوف من المستقبل'
  }, {
    label: 'Loneliness',
    ar: 'الوحدة'
  }, {
    label: 'Burnout and exhaustion',
    ar: 'الإرهاق والاحتراق'
  }, {
    label: 'Family or social pressure',
    ar: 'ضغوط الأهل أو المحيط'
  }, {
    label: "I'm not sure",
    ar: 'لا أعلم'
  }]
}, {
  id: 'stress',
  ar: 'حين يشتد الضغط، ماذا يحدث عادةً؟',
  en: 'When stress becomes too much, what usually happens?',
  options: [{
    label: 'I shut down',
    ar: 'أتوقف عن الاستجابة',
    mood: 'overwhelmed'
  }, {
    label: 'I overthink endlessly',
    ar: 'أُفكِّر بلا نهاية',
    mood: 'anxious'
  }, {
    label: 'I panic',
    ar: 'أُصاب بالهلع',
    mood: 'anxious'
  }, {
    label: 'I isolate myself',
    ar: 'أعتزل من حولي',
    mood: 'overwhelmed'
  }, {
    label: 'I lose motivation',
    ar: 'أفقد الحافز',
    mood: 'tired'
  }, {
    label: 'I keep pushing silently',
    ar: 'أُكمل بصمت',
    mood: 'tired'
  }]
}, {
  id: 'need',
  ar: 'ما الذي تحتاجه أكثر الآن؟',
  en: 'What do you need most right now?',
  options: [{
    label: 'Calmness',
    ar: 'هدوء'
  }, {
    label: 'Rest',
    ar: 'راحة'
  }, {
    label: 'Emotional support',
    ar: 'دعم عاطفي'
  }, {
    label: 'Motivation',
    ar: 'دافع'
  }, {
    label: 'Stability',
    ar: 'استقرار'
  }, {
    label: 'A safe space to breathe',
    ar: 'مكان آمن لأتنفس'
  }]
}, {
  id: 'feel',
  ar: 'كيف تريد لـ نَفَس أن تشعر؟',
  en: 'How would you like Nafas to feel?',
  options: [{
    label: 'Soft and comforting',
    ar: 'لطيف ومريح',
    mood: 'settled'
  }, {
    label: 'Quiet and minimal',
    ar: 'هادئ وبسيط',
    mood: 'tired'
  }, {
    label: 'Emotionally supportive',
    ar: 'داعم عاطفياً',
    mood: 'settled'
  }, {
    label: 'Grounding and stabilizing',
    ar: 'مُثبِّت ومُؤرِّض',
    mood: 'anxious'
  }, {
    label: 'Hopeful and uplifting',
    ar: 'مُتفائل ومُلهِم',
    mood: 'hopeful'
  }]
}];
function OnboardingQuiz({
  onComplete,
  onSkip
}) {
  const [step, setStep] = useStateQuiz(0);
  const [answers, setAnswers] = useStateQuiz({});
  const {
    setMood
  } = useEmotional();
  const q = QUESTIONS[step];
  const progress = (step + 1) / QUESTIONS.length * 100;
  const pick = opt => {
    const newAnswers = {
      ...answers,
      [q.id]: opt
    };
    setAnswers(newAnswers);

    // If this option carries a mood, glide toward it immediately for visual continuity
    if (opt.mood) setMood(opt.mood);

    // Auto-advance after a soft pause
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        // Final: derive mood from all answers
        const moodVotes = Object.values(newAnswers).filter(a => a.mood).map(a => a.mood);
        const tally = {};
        moodVotes.forEach(m => {
          tally[m] = (tally[m] || 0) + 1;
        });
        const winner = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
        const finalMood = winner ? winner[0] : 'settled';
        setMood(finalMood);
        onComplete(newAnswers, finalMood);
      }
    }, 700);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "quiz"
  }, /*#__PURE__*/React.createElement(AmbientLayer, {
    intensity: 1.0
  }), /*#__PURE__*/React.createElement("div", {
    className: "quiz__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "quiz__progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "quiz__progress-fill",
    style: {
      width: `${progress}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "quiz__progress-label"
  }, step + 1, " of ", QUESTIONS.length, /*#__PURE__*/React.createElement("button", {
    className: "quiz__skip",
    onClick: onSkip
  }, "Skip"))), /*#__PURE__*/React.createElement("div", {
    className: "quiz__center",
    key: q.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "quiz__step-eyebrow"
  }, "Step ", step + 1, " \xB7 \u0633\u0624\u0627\u0644 ", step + 1), /*#__PURE__*/React.createElement("div", {
    className: "ar-display quiz__q-ar",
    dir: "rtl"
  }, q.ar), /*#__PURE__*/React.createElement("h1", {
    className: "quiz__q-en"
  }, q.en), /*#__PURE__*/React.createElement("div", {
    className: "quiz__options"
  }, q.options.map((opt, i) => {
    const selected = answers[q.id] && answers[q.id].label === opt.label;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.label,
      className: `quiz__option${selected ? ' is-selected' : ''}`,
      onClick: () => pick(opt),
      style: {
        animationDelay: `${i * 60}ms`
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ar-display quiz__option-ar",
      dir: "rtl"
    }, opt.ar), /*#__PURE__*/React.createElement("span", {
      className: "quiz__option-en"
    }, opt.label));
  })), /*#__PURE__*/React.createElement("div", {
    className: "quiz__whisper"
  }, "You can change your mind any time. Nothing is being recorded.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "ar-display",
    dir: "rtl",
    style: {
      opacity: 0.85
    }
  }, "\u064A\u0645\u0643\u0646\u0643 \u062A\u063A\u064A\u064A\u0631 \u0631\u0623\u064A\u0643 \u0641\u064A \u0623\u064A \u0648\u0642\u062A. \u0644\u0627 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0623\u064A \u0634\u064A\u0621."))));
}
window.OnboardingQuiz = OnboardingQuiz;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/screens/Quiz.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/screens/Settings.jsx
try { (() => {
// Nafas - Settings (v2)
// Ambient background present but very subtle. Tiny companion in header.

const {
  useState: useStateSet2
} = React;
function SettingsScreen() {
  const [anon, setAnon] = useStateSet2(true);
  const [arabic, setArabic] = useStateSet2(true);
  const [haptics, setHaptics] = useStateSet2(true);
  const [voice, setVoice] = useStateSet2(true);
  const [reminders, setReminders] = useStateSet2(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "nafas-screen",
    style: {
      padding: '60px 20px 16px'
    }
  }, /*#__PURE__*/React.createElement(AmbientLayer, {
    intensity: 0.5
  }), /*#__PURE__*/React.createElement("div", {
    className: "nafas-enter",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "info"
  }, "Settings \xB7 \u0625\u0639\u062F\u0627\u062F\u0627\u062A"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 26px var(--font-display)',
      color: 'var(--ink-900)',
      marginTop: 8
    }
  }, "Quiet, by default."), /*#__PURE__*/React.createElement("div", {
    className: "ar-display",
    dir: "rtl",
    style: {
      font: '600 19px var(--font-display-ar)',
      color: 'var(--ink-700)',
      marginTop: 2,
      opacity: 0.88
    }
  }, "\u0647\u0627\u062F\u0626\u060C \u0628\u0634\u0643\u0644 \u0627\u0641\u062A\u0631\u0627\u0636\u064A."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 14px/1.5 var(--font-body)',
      color: 'var(--fg-2)',
      marginTop: 6,
      maxWidth: 260
    }
  }, "Nothing is collected unless you turn it on.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "ar-display",
    dir: "rtl",
    style: {
      opacity: 0.85
    }
  }, "\u0644\u0627 \u064A\u062A\u0645 \u062C\u0645\u0639 \u0623\u064A \u0634\u064A\u0621 \u0625\u0644\u0627 \u0625\u0630\u0627 \u0641\u0639\u0651\u0644\u062A\u0647 \u0628\u0646\u0641\u0633\u0643."))), /*#__PURE__*/React.createElement(Companion, {
    size: 64,
    label: false
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nafas-field-label"
  }, "Privacy \xB7 \u062E\u0635\u0648\u0635\u064A\u0629"), /*#__PURE__*/React.createElement(SettingRow, {
    label: "Stay anonymous",
    hint: "Nothing saved to a profile. Each visit fresh."
  }, /*#__PURE__*/React.createElement(NafasToggle, {
    on: anon,
    onChange: setAnon
  })), /*#__PURE__*/React.createElement(SettingRow, {
    label: "Gentle reminders",
    hint: "One soft notification a day, at a time you pick."
  }, /*#__PURE__*/React.createElement(NafasToggle, {
    on: reminders,
    onChange: setReminders
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nafas-field-label"
  }, "Language & sound \xB7 \u0627\u0644\u0644\u063A\u0629 \u0648\u0627\u0644\u0635\u0648\u062A"), /*#__PURE__*/React.createElement(SettingRow, {
    label: "Arabic-first",
    hint: "Show \u0627\u0644\u0639\u0631\u0628\u064A\u0629 before English."
  }, /*#__PURE__*/React.createElement(NafasToggle, {
    on: arabic,
    onChange: setArabic
  })), /*#__PURE__*/React.createElement(SettingRow, {
    label: "Voice guidance",
    hint: "Calm narration in practices. Subtitles always on."
  }, /*#__PURE__*/React.createElement(NafasToggle, {
    on: voice,
    onChange: setVoice
  })), /*#__PURE__*/React.createElement(SettingRow, {
    label: "Soft haptics",
    hint: "A small breath-pulse on the wrist."
  }, /*#__PURE__*/React.createElement(NafasToggle, {
    on: haptics,
    onChange: setHaptics
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nafas-field-label"
  }, "About \xB7 \u0639\u0646"), /*#__PURE__*/React.createElement(SettingRow, {
    label: "What Wujood is",
    hint: "A short note from the team."
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      color: 'var(--fg-3)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6"
  }))), /*#__PURE__*/React.createElement(SettingRow, {
    label: "If you need a person",
    hint: "Local helplines, by region."
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      color: 'var(--fg-3)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6"
  })))), /*#__PURE__*/React.createElement(NafasButton, {
    variant: "ghost"
  }, "Leave with no trace")));
}
window.SettingsScreen = SettingsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/screens/Settings.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/screens/Welcome.jsx
try { (() => {
// Nafas - Welcome / arrival screen (v2)
// Full ambient environment. Companion mark floats in, breathes, blinks.
// Bigger Arabic display. Particles drifting.

function WelcomeScreen({
  onContinue
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "nafas-screen",
    style: {
      padding: '76px 28px 32px',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(AmbientLayer, {
    intensity: 0.9
  }), /*#__PURE__*/React.createElement("div", null), " ", /*#__PURE__*/React.createElement("div", {
    className: "nafas-enter",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(Companion, {
    size: 140,
    label: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "ar-display",
    style: {
      fontSize: 56,
      color: 'var(--ink-900)'
    }
  }, "\u062E\u064F\u0630 \u0646\u064E\u0641\u064E\u0633"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 17px/1.5 var(--font-body)',
      color: 'var(--ink-700)',
      maxWidth: 280
    }
  }, "A quiet place to land.", /*#__PURE__*/React.createElement("br", null), "There's nothing to prove here."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 11px var(--font-body)',
      color: 'var(--fg-3)',
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      marginTop: 8
    }
  }, "Wujood \xB7 \u0648\u064F\u062C\u0648\u062F"))), /*#__PURE__*/React.createElement("div", {
    className: "nafas-enter",
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(NafasButton, {
    variant: "primary",
    onClick: onContinue
  }, "Begin"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 11px var(--font-body)',
      color: 'var(--fg-3)',
      textAlign: 'center',
      lineHeight: 1.6
    }
  }, "No account \xB7 No tracking", /*#__PURE__*/React.createElement("br", null), "Nothing saved unless you choose")));
}
window.WelcomeScreen = WelcomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/screens/Welcome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/support.jsx
try { (() => {
// Nafas - Human Support & Care Navigator
// "If you'd like support from a real person, here are safe and affordable
// options." A dashboard section: care-matching filters → live provider
// directory, budget filters, university resources, and a calm crisis area.
// Fully private - nothing here is logged or shared.

const {
  useState: useStateS,
  useMemo: useMemoS
} = React;

/* ── soft line icons ─────────────────────────────────────────── */
const SUP_ICONS = {
  shield: /*#__PURE__*/React.createElement("path", {
    d: "M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z M9 12l2 2 4-4"
  }),
  globe: /*#__PURE__*/React.createElement("path", {
    d: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"
  }),
  lang: /*#__PURE__*/React.createElement("path", {
    d: "M4 5h9M8 3v2c0 4-2 7-4 8m1-4c0 2 2.5 4 5 4M14 20l4-9 4 9M15.5 17h5"
  }),
  online: /*#__PURE__*/React.createElement("path", {
    d: "M4 5h16v10H4zM2 19h20M9 19l.5-4M15 19l-.5-4"
  }),
  pin: /*#__PURE__*/React.createElement("path", {
    d: "M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10zM12 11a2 2 0 100-.1z"
  }),
  phone: /*#__PURE__*/React.createElement("path", {
    d: "M5 4h3l2 5-2.5 1.5a11 11 0 005 5L19 13l2 5v3a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z"
  }),
  heart: /*#__PURE__*/React.createElement("path", {
    d: "M12 20s-7-4.3-7-9.5A4 4 0 0112 7a4 4 0 017 3.5C19 15.7 12 20 12 20z"
  }),
  building: /*#__PURE__*/React.createElement("path", {
    d: "M4 21V5l8-2 8 2v16M9 8h.01M9 12h.01M9 16h.01M15 8h.01M15 12h.01M15 16h.01M3 21h18"
  }),
  compass: /*#__PURE__*/React.createElement("path", {
    d: "M12 3a9 9 0 100 18 9 9 0 000-18zM15.5 8.5l-2 5-5 2 2-5z"
  }),
  cap: /*#__PURE__*/React.createElement("path", {
    d: "M3 9l9-4 9 4-9 4zM7 11.5V16c0 1 2.5 2.5 5 2.5s5-1.5 5-2.5v-4.5M21 9v5"
  }),
  spark: /*#__PURE__*/React.createElement("path", {
    d: "M12 4v4M12 16v4M4 12h4M16 12h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M17.5 6.5L15 9M9 15l-2.5 2.5"
  })
};
function SupIcon({
  name
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, SUP_ICONS[name] || SUP_ICONS.heart);
}

/* ── data ────────────────────────────────────────────────────── */
const SUPPORT_TYPES = [{
  id: 'therapist',
  en: 'Licensed therapist',
  ar: 'معالج مرخّص'
}, {
  id: 'psychologist',
  en: 'Psychologist',
  ar: 'أخصائي نفسي'
}, {
  id: 'psychiatrist',
  en: 'Psychiatrist',
  ar: 'طبيب نفسي'
}, {
  id: 'counselor',
  en: 'University counselor',
  ar: 'مرشد جامعي'
}, {
  id: 'student',
  en: 'Student support services',
  ar: 'خدمات الطلاب'
}, {
  id: 'peer',
  en: 'Peer support groups',
  ar: 'مجموعات الدعم'
}, {
  id: 'ngo',
  en: 'NGO support programs',
  ar: 'برامج جمعيات'
}, {
  id: 'hotline',
  en: 'Crisis hotlines',
  ar: 'خطوط الأزمات'
}, {
  id: 'online',
  en: 'Online counseling',
  ar: 'استشارة عن بُعد'
}];
const BUDGETS = [{
  id: 'free',
  price: 'Free',
  note: 'No cost',
  max: 0,
  free: true
}, {
  id: 'sponsored',
  price: 'Sponsored',
  note: 'Covered for you',
  max: 0,
  free: true
}, {
  id: 'student',
  price: 'Student rate',
  note: 'Discounted',
  max: 15
}, {
  id: 'u10',
  price: 'Under $10',
  note: 'per session',
  max: 10
}, {
  id: 'u25',
  price: 'Under $25',
  note: 'per session',
  max: 25
}, {
  id: 'u50',
  price: 'Under $50',
  note: 'per session',
  max: 50
}, {
  id: 'premium',
  price: 'Premium',
  note: 'Full rate',
  max: 999
}];
const PROVIDERS = [{
  id: 1,
  name: 'Dr. Layla Haddad',
  cred: 'Clinical Psychologist',
  type: 'psychologist',
  langs: ['Arabic', 'English'],
  price: 0,
  priceLabel: 'Free',
  mode: 'online',
  student: true,
  avail: 'Today',
  color: 'linear-gradient(135deg,#7b4ec0,#66c6dd)',
  initials: 'LH',
  desc: 'Anxiety, exam stress and burnout. Sponsored sessions for enrolled students.'
}, {
  id: 2,
  name: 'Campus Wellbeing Centre',
  cred: 'University counseling',
  type: 'counselor',
  langs: ['Arabic', 'English', 'French'],
  price: 0,
  priceLabel: 'Free',
  mode: 'in-person',
  student: true,
  avail: 'This week',
  color: 'linear-gradient(135deg,#66c6dd,#7b4ec0)',
  initials: 'CW',
  desc: 'Drop-in and booked sessions with campus counselors. No referral needed.'
}, {
  id: 3,
  name: 'Karim Nasser',
  cred: 'Licensed Therapist (CBT)',
  type: 'therapist',
  langs: ['Arabic', 'English'],
  price: 9,
  priceLabel: '$9',
  mode: 'online',
  student: true,
  avail: 'Tomorrow',
  color: 'linear-gradient(135deg,#c060a5,#7b4ec0)',
  initials: 'KN',
  desc: 'Practical tools for stress cycles and sleep, with a sliding student scale.'
}, {
  id: 4,
  name: 'Hope Line - Peer Circle',
  cred: 'Trained peer volunteers',
  type: 'peer',
  langs: ['Arabic', 'English'],
  price: 0,
  priceLabel: 'Free',
  mode: 'online',
  student: true,
  avail: 'Evenings',
  color: 'linear-gradient(135deg,#f0c357,#c060a5)',
  initials: 'HC',
  desc: 'Small, anonymous peer groups for students navigating similar pressures.'
}, {
  id: 5,
  name: 'Dr. Omar Sayegh',
  cred: 'Psychiatrist',
  type: 'psychiatrist',
  langs: ['Arabic', 'English'],
  price: 45,
  priceLabel: '$45',
  mode: 'in-person',
  student: false,
  avail: 'Next week',
  color: 'linear-gradient(135deg,#7b4ec0,#563293)',
  initials: 'OS',
  desc: 'Assessment and medication support where clinically appropriate.'
}, {
  id: 6,
  name: 'Sakeenah NGO Program',
  cred: 'Non-profit support',
  type: 'ngo',
  langs: ['Arabic'],
  price: 0,
  priceLabel: 'Free',
  mode: 'online',
  student: false,
  avail: 'This week',
  color: 'linear-gradient(135deg,#66c6dd,#34a279)',
  initials: 'SN',
  desc: 'Community mental-health support for young adults, fully subsidised.'
}, {
  id: 7,
  name: 'MindSpace Online',
  cred: 'Online counseling platform',
  type: 'online',
  langs: ['English', 'Arabic'],
  price: 22,
  priceLabel: '$22',
  mode: 'online',
  student: true,
  avail: 'Today',
  color: 'linear-gradient(135deg,#7b4ec0,#66c6dd)',
  initials: 'MS',
  desc: 'Video sessions with vetted counselors, student pricing on request.'
}, {
  id: 8,
  name: 'Student Support Office',
  cred: 'Academic & wellbeing',
  type: 'student',
  langs: ['Arabic', 'English'],
  price: 0,
  priceLabel: 'Free',
  mode: 'in-person',
  student: true,
  avail: 'Office hours',
  color: 'linear-gradient(135deg,#c060a5,#66c6dd)',
  initials: 'SS',
  desc: 'Help with deadlines, extensions and connecting to campus care.'
}];
const UNI_RESOURCES = [{
  icon: 'heart',
  title: 'Counseling Centre',
  desc: 'Free confidential sessions with campus counselors.'
}, {
  icon: 'building',
  title: 'Student Support Office',
  desc: 'Wellbeing, accommodations and a listening ear.'
}, {
  icon: 'cap',
  title: 'Academic Advising',
  desc: 'Deadlines, extensions and study-load support.'
}, {
  icon: 'spark',
  title: 'Wellness Programs',
  desc: 'Workshops, peer circles and quiet study spaces.'
}];
const CRISIS_LINES = [{
  name: 'National Crisis & Suicide Line',
  desc: '24/7 confidential support',
  num: '988'
}, {
  name: 'Emergency Services',
  desc: 'Immediate danger or medical emergency',
  num: '911'
}, {
  name: 'Campus Safety & Wellbeing',
  desc: 'On-campus urgent support',
  num: 'Campus'
}];
function HumanSupport() {
  const [country, setCountry] = useStateS('');
  const [city, setCity] = useStateS('');
  const [lang, setLang] = useStateS('any');
  const [student, setStudent] = useStateS('yes');
  const [types, setTypes] = useStateS([]);
  const [budget, setBudget] = useStateS(null);
  const toggleType = id => setTypes(t => t.includes(id) ? t.filter(x => x !== id) : [...t, id]);
  const filtered = useMemoS(() => {
    return PROVIDERS.filter(p => {
      if (types.length && !types.includes(p.type)) return false;
      if (lang !== 'any' && !p.langs.map(l => l.toLowerCase()).includes(lang)) return false;
      if (budget) {
        const b = BUDGETS.find(x => x.id === budget);
        if (b) {
          if ((budget === 'free' || budget === 'sponsored') && p.price !== 0) return false;
          if (budget === 'student' && !p.student) return false;
          if (b.max < 999 && p.price > b.max) return false;
        }
      }
      return true;
    });
  }, [types, lang, budget]);
  return /*#__PURE__*/React.createElement("section", {
    className: "support",
    id: "dash-support"
  }, /*#__PURE__*/React.createElement("div", {
    className: "support__heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "support__eyebrow"
  }, "Human support \xB7 \u062F\u0639\u0645 \u0625\u0646\u0633\u0627\u0646\u064A"), /*#__PURE__*/React.createElement("h3", {
    className: "support__title"
  }, "Talk to someone, when you're ready."), /*#__PURE__*/React.createElement("div", {
    className: "support__title-ar",
    dir: "rtl"
  }, "\u062A\u062D\u062F\u0651\u062B \u0625\u0644\u0649 \u0634\u062E\u0635\u060C \u062D\u064A\u0646 \u062A\u0643\u0648\u0646 \u0645\u0633\u062A\u0639\u062F\u0627\u064B."), /*#__PURE__*/React.createElement("p", {
    className: "support__sub"
  }, "If self-guided tools aren't enough, here are safe and affordable ways to reach a real person. You're always in control of what you explore."), /*#__PURE__*/React.createElement("div", {
    className: "support__privacy"
  }, /*#__PURE__*/React.createElement(SupIcon, {
    name: "shield"
  }), /*#__PURE__*/React.createElement("span", null, "Completely private. No one - not your university, not anyone - can see what you search, view, or contact."))), /*#__PURE__*/React.createElement("div", {
    className: "support__group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "support__group-label"
  }, "Find what fits you \xB7 \u0645\u0627 \u064A\u0646\u0627\u0633\u0628\u0643"), /*#__PURE__*/React.createElement("div", {
    className: "care-match"
  }, /*#__PURE__*/React.createElement("div", {
    className: "care-match__row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "care-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "care-field__label"
  }, "Country ", /*#__PURE__*/React.createElement("span", {
    className: "ar",
    dir: "rtl"
  }, "\u0627\u0644\u062F\u0648\u0644\u0629")), /*#__PURE__*/React.createElement("select", {
    className: "care-select",
    value: country,
    onChange: e => setCountry(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Choose\u2026"), ['Jordan', 'Egypt', 'Saudi Arabia', 'UAE', 'Lebanon', 'Morocco', 'Other'].map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c)))), /*#__PURE__*/React.createElement("div", {
    className: "care-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "care-field__label"
  }, "City ", /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "optional"), /*#__PURE__*/React.createElement("span", {
    className: "ar",
    dir: "rtl"
  }, "\u0627\u0644\u0645\u062F\u064A\u0646\u0629")), /*#__PURE__*/React.createElement("input", {
    className: "care-input",
    value: city,
    placeholder: "e.g. Amman",
    onChange: e => setCity(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "care-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "care-field__label"
  }, "Language ", /*#__PURE__*/React.createElement("span", {
    className: "ar",
    dir: "rtl"
  }, "\u0627\u0644\u0644\u063A\u0629")), /*#__PURE__*/React.createElement("select", {
    className: "care-select",
    value: lang,
    onChange: e => setLang(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "any"
  }, "Any language"), /*#__PURE__*/React.createElement("option", {
    value: "arabic"
  }, "Arabic"), /*#__PURE__*/React.createElement("option", {
    value: "english"
  }, "English"), /*#__PURE__*/React.createElement("option", {
    value: "french"
  }, "French"))), /*#__PURE__*/React.createElement("div", {
    className: "care-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "care-field__label"
  }, "Student status ", /*#__PURE__*/React.createElement("span", {
    className: "ar",
    dir: "rtl"
  }, "\u0627\u0644\u062D\u0627\u0644\u0629")), /*#__PURE__*/React.createElement("select", {
    className: "care-select",
    value: student,
    onChange: e => setStudent(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "yes"
  }, "Current student"), /*#__PURE__*/React.createElement("option", {
    value: "no"
  }, "Not a student")))), /*#__PURE__*/React.createElement("div", {
    className: "care-field",
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "care-field__label"
  }, "Preferred support ", /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "pick any"), /*#__PURE__*/React.createElement("span", {
    className: "ar",
    dir: "rtl"
  }, "\u0646\u0648\u0639 \u0627\u0644\u062F\u0639\u0645")), /*#__PURE__*/React.createElement("div", {
    className: "care-types"
  }, SUPPORT_TYPES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `care-type${types.includes(t.id) ? ' is-on' : ''}`,
    onClick: () => toggleType(t.id)
  }, t.en)))))), /*#__PURE__*/React.createElement("div", {
    className: "support__group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "support__group-label"
  }, "What you can spend \xB7 \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629"), /*#__PURE__*/React.createElement("div", {
    className: "budget"
  }, BUDGETS.map(b => /*#__PURE__*/React.createElement("button", {
    key: b.id,
    className: `budget__chip${b.free ? ' budget__chip--free' : ''}${budget === b.id ? ' is-on' : ''}`,
    onClick: () => setBudget(budget === b.id ? null : b.id)
  }, b.free && /*#__PURE__*/React.createElement("span", {
    className: "budget__free-flag"
  }, "No cost"), /*#__PURE__*/React.createElement("span", {
    className: "budget__price"
  }, b.price), /*#__PURE__*/React.createElement("span", {
    className: "budget__note"
  }, b.note))))), /*#__PURE__*/React.createElement("div", {
    className: "support__group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "support__group-label"
  }, "Available to you \xB7 \u0645\u062A\u0627\u062D \u0644\u0643"), /*#__PURE__*/React.createElement("div", {
    className: "providers__count"
  }, filtered.length, " ", filtered.length === 1 ? 'option' : 'options', " match", types.length || budget || lang !== 'any' ? ' your filters' : ''), /*#__PURE__*/React.createElement("div", {
    className: "providers"
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "providers__empty"
  }, "No exact matches - try widening your filters. Free campus support is always available below."), filtered.map(p => /*#__PURE__*/React.createElement("div", {
    className: "provider",
    key: p.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "provider__avatar",
    style: {
      background: p.color
    }
  }, p.initials), /*#__PURE__*/React.createElement("div", {
    className: "provider__main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "provider__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "provider__name"
  }, p.name), /*#__PURE__*/React.createElement("span", {
    className: "provider__cred"
  }, p.cred)), /*#__PURE__*/React.createElement("div", {
    className: "provider__desc"
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "provider__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: `pmeta${p.mode === 'online' ? ' pmeta--online' : ''}`
  }, /*#__PURE__*/React.createElement(SupIcon, {
    name: p.mode === 'online' ? 'online' : 'pin'
  }), p.mode === 'online' ? 'Online' : 'In-person'), /*#__PURE__*/React.createElement("span", {
    className: "pmeta"
  }, /*#__PURE__*/React.createElement(SupIcon, {
    name: "lang"
  }), p.langs.join(' · ')), p.student && /*#__PURE__*/React.createElement("span", {
    className: "pmeta pmeta--student"
  }, /*#__PURE__*/React.createElement(SupIcon, {
    name: "cap"
  }), "Student-friendly"), p.price === 0 && /*#__PURE__*/React.createElement("span", {
    className: "pmeta pmeta--free"
  }, /*#__PURE__*/React.createElement(SupIcon, {
    name: "heart"
  }), "No cost"))), /*#__PURE__*/React.createElement("div", {
    className: "provider__side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "provider__price"
  }, p.priceLabel, /*#__PURE__*/React.createElement("small", null, p.price === 0 ? 'sponsored' : 'per session')), /*#__PURE__*/React.createElement("div", {
    className: "provider__avail"
  }, p.avail), /*#__PURE__*/React.createElement("button", {
    className: "provider__cta"
  }, "View & connect")))))), /*#__PURE__*/React.createElement("div", {
    className: "support__group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "support__group-label"
  }, "From your university \xB7 \u0645\u0646 \u062C\u0627\u0645\u0639\u062A\u0643"), /*#__PURE__*/React.createElement("div", {
    className: "uni-res"
  }, UNI_RESOURCES.map(r => /*#__PURE__*/React.createElement("button", {
    className: "uni-card",
    key: r.title
  }, /*#__PURE__*/React.createElement("span", {
    className: "uni-card__icon"
  }, /*#__PURE__*/React.createElement(SupIcon, {
    name: r.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "uni-card__title"
  }, r.title), /*#__PURE__*/React.createElement("span", {
    className: "uni-card__desc"
  }, r.desc)))), /*#__PURE__*/React.createElement("p", {
    className: "crisis__note",
    style: {
      marginTop: 14
    }
  }, "You may use these freely. Your university never sees who accessed them.")), /*#__PURE__*/React.createElement("div", {
    className: "support__group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "support__group-label"
  }, "If you need help right now \xB7 \u0625\u0646 \u0627\u062D\u062A\u062C\u062A \u0627\u0644\u0622\u0646"), /*#__PURE__*/React.createElement("div", {
    className: "crisis"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crisis__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "crisis__badge"
  }, /*#__PURE__*/React.createElement(SupIcon, {
    name: "phone"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "crisis__title"
  }, "Immediate support is always here"), /*#__PURE__*/React.createElement("div", {
    className: "crisis__title-ar",
    dir: "rtl"
  }, "\u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0648\u0631\u064A \u0645\u062A\u0627\u062D \u062F\u0627\u0626\u0645\u0627\u064B"))), /*#__PURE__*/React.createElement("p", {
    className: "crisis__lead"
  }, "If things feel overwhelming or unsafe, you don't have to hold it alone. These lines are free, confidential, and open now."), /*#__PURE__*/React.createElement("div", {
    className: "crisis__list"
  }, CRISIS_LINES.map(c => /*#__PURE__*/React.createElement("div", {
    className: "crisis-line",
    key: c.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "crisis-line__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crisis-line__name"
  }, c.name), /*#__PURE__*/React.createElement("div", {
    className: "crisis-line__desc"
  }, c.desc)), /*#__PURE__*/React.createElement("a", {
    className: "crisis-line__num",
    href: c.num.match(/\d/) ? `tel:${c.num}` : '#'
  }, c.num)))), /*#__PURE__*/React.createElement("div", {
    className: "crisis__note"
  }, "Reaching out is a strong, kind thing to do for yourself."))));
}
window.HumanSupport = HumanSupport;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/support.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/wellness-activities.jsx
try { (() => {
// Nafas - Calm Activities: interactive micro-experiences
// Each is a small, gentle, self-contained tool. No scores, no streaks.
// Exports all components + the icon set to window for the section/modal.

const {
  useState: useStateW,
  useEffect: useEffectW,
  useRef: useRefW,
  useCallback: useCbW
} = React;

/* ── Soft line icons ───────────────────────────────────────── */
const CALM_ICONS = {
  orb: /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "7"
  }),
  star: /*#__PURE__*/React.createElement("path", {
    d: "M12 3l2.2 5.5L20 9.2l-4.3 3.8L17 19l-5-3-5 3 1.3-6L4 9.2l5.8-.7z"
  }),
  release: /*#__PURE__*/React.createElement("path", {
    d: "M12 21V8M12 8l-4 4M12 8l4 4M5 5h14"
  }),
  parking: /*#__PURE__*/React.createElement("path", {
    d: "M5 20V6a2 2 0 012-2h6a4 4 0 010 8H9M9 4v16"
  }),
  ground: /*#__PURE__*/React.createElement("path", {
    d: "M3 18h18M6 18l2-5M18 18l-2-5M12 18V7M12 7a3 3 0 100-2.5z"
  }),
  body: /*#__PURE__*/React.createElement("path", {
    d: "M12 4a2 2 0 100-.1zM9 9h6M12 8v7M9 21l3-6 3 6"
  }),
  jar: /*#__PURE__*/React.createElement("path", {
    d: "M8 3h8M7 7h10v11a3 3 0 01-3 3H10a3 3 0 01-3-3V7zM8 13h8"
  }),
  card: /*#__PURE__*/React.createElement("path", {
    d: "M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2zM8 10h8M8 14h5"
  }),
  timer: /*#__PURE__*/React.createElement("path", {
    d: "M12 8v5l3 2M12 4a8 8 0 100 16 8 8 0 000-16zM9 2h6"
  }),
  rain: /*#__PURE__*/React.createElement("path", {
    d: "M7 14a4 4 0 01-.5-7.96A5 5 0 0116 6a3.5 3.5 0 011 6.86M8 18l-1 2M12 18l-1 2M16 18l-1 2"
  }),
  music: /*#__PURE__*/React.createElement("path", {
    d: "M9 18V6l10-2v12M9 18a3 3 0 11-6 0 3 3 0 016 0zM19 16a3 3 0 11-6 0 3 3 0 016 0z"
  }),
  cloud: /*#__PURE__*/React.createElement("path", {
    d: "M7 18a4 4 0 01-.5-7.96A5.5 5.5 0 0117 8.5a3.5 3.5 0 01-.5 9.5z"
  }),
  color: /*#__PURE__*/React.createElement("path", {
    d: "M12 3a9 9 0 100 18c1 0 1.5-.8 1.5-1.5 0-1 .8-1.5 1.5-1.5h1.5A3.5 3.5 0 0021 14.5C21 8.2 17 3 12 3zM7.5 12a1 1 0 110-2 1 1 0 010 2zm4-3a1 1 0 110-2 1 1 0 010 2zm5 0a1 1 0 110-2 1 1 0 010 2z"
  }),
  pebble: /*#__PURE__*/React.createElement("path", {
    d: "M4 16c0-2.5 3-4 5-4s3 1.5 6 1.5S20 12 20 14.5 17 19 12 19 4 18.5 4 16zM8 11c0-1.5 2-2.5 3.5-2.5"
  }),
  garden: /*#__PURE__*/React.createElement("path", {
    d: "M12 21v-7M12 14c-3 0-5-2-5-5 3 0 5 2 5 5zM12 11c0-3 2-5 5-5 0 3-2 5-5 5z"
  })
};
function CalmIcon({
  name
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, CALM_ICONS[name] || CALM_ICONS.orb);
}

/* ── 1. Breathing Orb (full, pattern selection) ─────────────── */
const BREATH_PATTERNS = {
  calm: {
    label: 'Calm',
    meta: '4·4·6',
    steps: [['in', 4000], ['hold', 4000], ['out', 6000]]
  },
  box: {
    label: 'Box',
    meta: '4·4·4·4',
    steps: [['in', 4000], ['hold', 4000], ['out', 4000], ['hold', 4000]]
  },
  relax: {
    label: 'Relax',
    meta: '4·7·8',
    steps: [['in', 4000], ['hold', 7000], ['out', 8000]]
  }
};
function BreathingOrbFull() {
  const [pat, setPat] = useStateW('calm');
  const [running, setRunning] = useStateW(false);
  const [ph, setPh] = useStateW('rest');
  const t = useRefW(null);
  useEffectW(() => {
    if (!running) {
      clearTimeout(t.current);
      setPh('rest');
      return;
    }
    const steps = BREATH_PATTERNS[pat].steps;
    let i = 0;
    const go = () => {
      setPh(steps[i][0]);
      t.current = setTimeout(() => {
        i = (i + 1) % steps.length;
        go();
      }, steps[i][1]);
    };
    go();
    return () => clearTimeout(t.current);
  }, [running, pat]);
  const dur = {
    rest: 1200,
    in: 4000,
    hold: 600,
    out: BREATH_PATTERNS[pat].steps.find(s => s[0] === 'out')?.[1] || 6000
  }[ph];
  const big = ph === 'in' || ph === 'hold';
  const en = {
    rest: 'Tap to begin',
    in: 'Breathe in',
    hold: 'Hold',
    out: 'Breathe out'
  }[ph];
  const ar = {
    rest: 'اضغط لتبدأ',
    in: 'شهيق',
    hold: 'احتفظ',
    out: 'زفير'
  }[ph];
  return /*#__PURE__*/React.createElement("div", {
    className: "aorb-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "achips"
  }, Object.entries(BREATH_PATTERNS).map(([k, v]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: `achip${pat === k ? ' is-on' : ''}`,
    onClick: () => setPat(k)
  }, v.label, /*#__PURE__*/React.createElement("small", null, v.meta)))), /*#__PURE__*/React.createElement("div", {
    className: "aorb",
    onClick: () => setRunning(r => !r),
    role: "button"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aorb__halo",
    style: {
      transform: `scale(${big ? 1.35 : 0.9})`,
      opacity: big ? 0.9 : 0.45,
      transitionDuration: `${dur}ms`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "aorb__body",
    style: {
      transform: `scale(${big ? 1.45 : 0.86})`,
      transitionDuration: `${dur}ms`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "aorb__label"
  }, /*#__PURE__*/React.createElement("b", null, en), /*#__PURE__*/React.createElement("span", {
    dir: "rtl"
  }, ar))), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "Match your breath to the circle. Stop whenever you feel settled."));
}

/* ── 2. Star Breathing ──────────────────────────────────────── */
function StarBreathing() {
  const pts = [[150, 40], [214, 86], [190, 162], [110, 162], [86, 86]]; // 5-point star order
  const [lit, setLit] = useStateW(0);
  const phase = lit === 0 ? 'Tap a star to begin' : lit >= 5 ? 'Complete - rest here' : lit % 2 ? 'Breathe in' : 'Breathe out';
  const phaseAr = lit === 0 ? 'اضغط نجمة لتبدأ' : lit >= 5 ? 'اكتمل - استرِح' : lit % 2 ? 'شهيق' : 'زفير';
  const next = () => setLit(l => l >= 5 ? 0 : l + 1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    className: "astar",
    viewBox: "0 0 300 220",
    onClick: next
  }, /*#__PURE__*/React.createElement("polygon", {
    points: pts.map(p => p.join(',')).join(' '),
    fill: "none",
    stroke: "rgba(86,50,147,0.14)",
    strokeWidth: "2"
  }), lit > 1 && /*#__PURE__*/React.createElement("polyline", {
    points: pts.slice(0, lit).map(p => p.join(',')).join(' '),
    fill: "none",
    stroke: "url(#starg)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "starg",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#7b4ec0"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#66c6dd"
  }))), pts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: p[0],
    cy: p[1],
    r: i < lit ? 10 : 7,
    fill: i < lit ? '#7b4ec0' : '#fff',
    stroke: "#7b4ec0",
    strokeWidth: "2",
    style: {
      transition: 'all 500ms',
      filter: i < lit ? 'drop-shadow(0 0 8px rgba(123,78,192,0.6))' : 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "aground__cue",
    style: {
      marginTop: 6
    }
  }, phase), /*#__PURE__*/React.createElement("div", {
    className: "aground__cue-ar",
    dir: "rtl"
  }, phaseAr), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "Connect the stars one by one, breathing with each line."));
}

/* ── 3. Thought Release ─────────────────────────────────────── */
function ThoughtRelease() {
  const [txt, setTxt] = useStateW('');
  const [floating, setFloating] = useStateW([]);
  const release = () => {
    const v = txt.trim();
    if (!v) return;
    const id = Date.now();
    setFloating(f => [...f, {
      id,
      v
    }]);
    setTxt('');
    setTimeout(() => setFloating(f => f.filter(x => x.id !== id)), 5200);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 220,
      marginBottom: 18,
      borderRadius: 24,
      overflow: 'hidden',
      background: 'linear-gradient(180deg, rgba(123,78,192,0.08), rgba(102,198,221,0.06))'
    }
  }, floating.map(f => /*#__PURE__*/React.createElement("div", {
    className: "athought",
    key: f.id,
    style: {
      bottom: 14
    }
  }, f.v)), floating.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'italic 13px var(--font-body)',
      color: 'var(--ink-300)'
    }
  }, "The sky is open.")), /*#__PURE__*/React.createElement("textarea", {
    className: "afield",
    rows: 2,
    value: txt,
    maxLength: 120,
    placeholder: "Name the worry you'd like to let go of\u2026",
    onChange: e => setTxt(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "acta",
    onClick: release,
    disabled: !txt.trim(),
    style: {
      opacity: txt.trim() ? 1 : 0.5
    }
  }, "Release it to the sky")), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "Nothing is saved. The thought simply drifts away."));
}

/* ── 4. Worry Parking Lot ───────────────────────────────────── */
function WorryParkingLot() {
  const KEY = 'nafas-worries';
  const [list, setList] = useStateW(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });
  const [txt, setTxt] = useStateW('');
  const save = next => {
    setList(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const park = () => {
    const v = txt.trim();
    if (!v) return;
    save([...list, {
      id: Date.now(),
      v
    }]);
    setTxt('');
  };
  const remove = id => save(list.filter(x => x.id !== id));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "afield",
    rows: 2,
    value: txt,
    maxLength: 140,
    placeholder: "Park a worry here, then study with a clearer mind\u2026",
    onChange: e => setTxt(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      textAlign: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "acta acta--ghost",
    onClick: park,
    disabled: !txt.trim(),
    style: {
      opacity: txt.trim() ? 1 : 0.5
    }
  }, "Park it for later")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, list.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: 'italic 13px var(--font-body)',
      color: 'var(--ink-300)'
    }
  }, "Nothing parked. Your mind is clear."), list.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      borderRadius: 16,
      background: 'rgba(255,255,255,0.7)',
      boxShadow: '0 2px 8px rgba(86,50,147,0.05)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: '400 14px var(--font-body)',
      color: 'var(--ink-700)'
    }
  }, w.v), /*#__PURE__*/React.createElement("button", {
    onClick: () => remove(w.id),
    className: "acta--ghost",
    style: {
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(86,50,147,0.06)',
      borderRadius: 999,
      padding: '6px 14px',
      font: '600 12px var(--font-display)',
      color: 'var(--purple-700)'
    }
  }, "Let go")))), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "Worries wait here so they don't follow you into studying. Revisit only if you choose."));
}

/* ── 5. 5-4-3-2-1 Grounding ─────────────────────────────────── */
const SENSES = [{
  n: 5,
  en: 'things you can see',
  ar: 'أشياء تراها'
}, {
  n: 4,
  en: 'things you can touch',
  ar: 'أشياء تلمسها'
}, {
  n: 3,
  en: 'things you can hear',
  ar: 'أشياء تسمعها'
}, {
  n: 2,
  en: 'things you can smell',
  ar: 'أشياء تشمّها'
}, {
  n: 1,
  en: 'thing you can taste',
  ar: 'شيء تتذوقه'
}];
function Grounding54321() {
  const [step, setStep] = useStateW(0);
  const [done, setDone] = useStateW(0);
  const s = SENSES[step];
  const complete = step >= SENSES.length;
  const tap = () => {
    if (done + 1 >= s.n) {
      setDone(0);
      setStep(step + 1);
    } else setDone(done + 1);
  };
  if (complete) return /*#__PURE__*/React.createElement("div", {
    className: "aground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aground__sense"
  }, "\u2713"), /*#__PURE__*/React.createElement("div", {
    className: "aground__cue"
  }, "You're here, now."), /*#__PURE__*/React.createElement("div", {
    className: "aground__cue-ar",
    dir: "rtl"
  }, "\u0623\u0646\u062A \u0647\u0646\u0627\u060C \u0627\u0644\u0622\u0646."), /*#__PURE__*/React.createElement("button", {
    className: "acta",
    onClick: () => {
      setStep(0);
      setDone(0);
    }
  }, "Begin again"));
  return /*#__PURE__*/React.createElement("div", {
    className: "aground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aground__sense"
  }, s.n - done), /*#__PURE__*/React.createElement("div", {
    className: "aground__cue"
  }, "Notice ", s.en), /*#__PURE__*/React.createElement("div", {
    className: "aground__cue-ar",
    dir: "rtl"
  }, "\u0644\u0627\u062D\u0638 ", s.ar), /*#__PURE__*/React.createElement("div", {
    className: "aground__chips"
  }, Array.from({
    length: s.n
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `aground__dot${i < done ? ' is-done' : ''}`,
    onClick: tap
  }))), /*#__PURE__*/React.createElement("button", {
    className: "acta acta--ghost",
    onClick: tap
  }, "I noticed one"), /*#__PURE__*/React.createElement("div", {
    className: "aground__prog"
  }, SENSES.map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: i <= step ? 'on' : ''
  }))));
}

/* ── 6. Body Scan Journey ───────────────────────────────────── */
const BODY_PARTS = [{
  key: 'head',
  en: 'Soften your forehead and jaw',
  ar: 'أرخِ جبينك وفكّك',
  box: {
    w: 30,
    h: 30,
    top: 0
  }
}, {
  key: 'chest',
  en: 'Let your shoulders and chest fall',
  ar: 'دع كتفيك وصدرك يهبطان',
  box: {
    w: 54,
    h: 46,
    top: 34
  }
}, {
  key: 'belly',
  en: 'Feel your belly rise and settle',
  ar: 'اشعر ببطنك يعلو ويهدأ',
  box: {
    w: 46,
    h: 40,
    top: 84
  }
}, {
  key: 'legs',
  en: 'Release your legs into the floor',
  ar: 'حرّر ساقيك نحو الأرض',
  box: {
    w: 40,
    h: 64,
    top: 128
  }
}, {
  key: 'feet',
  en: 'Let your feet grow heavy',
  ar: 'دع قدميك تثقلان',
  box: {
    w: 48,
    h: 14,
    top: 196
  }
}];
function BodyScan() {
  const [i, setI] = useStateW(-1);
  const [playing, setPlaying] = useStateW(false);
  const t = useRefW(null);
  useEffectW(() => {
    if (!playing) {
      clearTimeout(t.current);
      return;
    }
    if (i >= BODY_PARTS.length - 1) {
      setPlaying(false);
      return;
    }
    t.current = setTimeout(() => setI(v => v + 1), 5000);
    return () => clearTimeout(t.current);
  }, [playing, i]);
  const start = () => {
    setI(0);
    setPlaying(true);
  };
  const cur = i >= 0 && i < BODY_PARTS.length ? BODY_PARTS[i] : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "abody"
  }, /*#__PURE__*/React.createElement("div", {
    className: "abody__fig"
  }, BODY_PARTS.map((p, idx) => /*#__PURE__*/React.createElement("div", {
    key: p.key,
    className: `abody__part${idx === i ? ' on' : ''}`,
    style: {
      width: p.box.w,
      height: p.box.h,
      top: p.box.top,
      borderRadius: p.key === 'head' ? '50%' : 14
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "abody__cue"
  }, cur ? cur.en : i >= BODY_PARTS.length ? 'Rest in the whole body.' : 'A slow journey through the body.'), cur && /*#__PURE__*/React.createElement("div", {
    className: "abody__cue-ar",
    dir: "rtl"
  }, cur.ar), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, !playing ? /*#__PURE__*/React.createElement("button", {
    className: "acta",
    onClick: start
  }, i >= BODY_PARTS.length ? 'Again' : 'Begin scan') : /*#__PURE__*/React.createElement("button", {
    className: "acta acta--ghost",
    onClick: () => setPlaying(false)
  }, "Pause")), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "Each area rests for a few breaths. Let attention move slowly."));
}

/* ── 7. Gratitude Jar ───────────────────────────────────────── */
function GratitudeJar() {
  const KEY = 'nafas-gratitude';
  const [list, setList] = useStateW(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });
  const [txt, setTxt] = useStateW('');
  const add = () => {
    const v = txt.trim();
    if (!v) return;
    const next = [...list, {
      id: Date.now(),
      v
    }];
    setList(next);
    setTxt('');
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const fill = Math.min(100, list.length * 9 + (list.length ? 12 : 0));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ajar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ajar__glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ajar__fill",
    style: {
      height: `${fill}%`
    }
  }), list.slice(-14).map((g, idx) => /*#__PURE__*/React.createElement("div", {
    key: g.id,
    className: "ajar__note",
    style: {
      left: `${12 + idx * 53 % 76}%`,
      bottom: `${6 + idx * 37 % Math.max(10, fill - 10)}%`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ajar__lid"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ajar__count"
  }, list.length === 0 ? 'Your jar is empty - add one good thing.' : `${list.length} good ${list.length === 1 ? 'thing' : 'things'} kept`), /*#__PURE__*/React.createElement("input", {
    className: "afield",
    value: txt,
    maxLength: 90,
    placeholder: "One small thing you're grateful for\u2026",
    onChange: e => setTxt(e.target.value),
    onKeyDown: e => e.key === 'Enter' && add(),
    style: {
      borderRadius: 999
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "acta",
    style: {
      marginTop: 14
    },
    onClick: add,
    disabled: !txt.trim()
  }, "Add to the jar"), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "Kept gently on this device. Watch it fill, one day at a time."));
}

/* ── 8. Reflection Cards ────────────────────────────────────── */
const REFLECTIONS = [{
  en: 'What is one thing that went okay today?',
  ar: 'ما الشيء الذي سار على ما يُرام اليوم؟'
}, {
  en: 'What would you say to a friend who felt how you feel?',
  ar: 'ماذا ستقول لصديق يشعر بما تشعر به؟'
}, {
  en: 'Where in your body are you holding tension right now?',
  ar: 'أين تحمل التوتر في جسدك الآن؟'
}, {
  en: 'What is enough, just for today?',
  ar: 'ما الذي يكفي، اليوم فقط؟'
}, {
  en: 'Name something you handled, even if it was hard.',
  ar: 'اذكر شيئاً تجاوزته، حتى لو كان صعباً.'
}, {
  en: 'What do you need a little more of this week?',
  ar: 'ما الذي تحتاج المزيد منه هذا الأسبوع؟'
}, {
  en: 'You are allowed to rest. What would rest look like?',
  ar: 'يُسمح لك بالراحة. كيف تبدو الراحة؟'
}, {
  en: 'What is one kind thing you can do for yourself next?',
  ar: 'ما اللطف الذي يمكنك تقديمه لنفسك تالياً؟'
}];
function ReflectionCards() {
  const [i, setI] = useStateW(() => Math.floor(Math.random() * REFLECTIONS.length));
  const [k, setK] = useStateW(0);
  const next = () => {
    setI(p => (p + 1 + Math.floor(Math.random() * (REFLECTIONS.length - 1))) % REFLECTIONS.length);
    setK(x => x + 1);
  };
  const c = REFLECTIONS[i];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "acard",
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    className: "acard__q"
  }, c.en), /*#__PURE__*/React.createElement("div", {
    className: "acard__q-ar",
    dir: "rtl"
  }, c.ar)), /*#__PURE__*/React.createElement("button", {
    className: "acta acta--ghost",
    onClick: next
  }, "Another prompt"), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "No right answers. Sit with whatever comes up."));
}

/* ── 9. Focus Timer (gentle pomodoro) ───────────────────────── */
function FocusTimer() {
  const MODES = {
    focus: {
      min: 25,
      label: 'Focus',
      ar: 'تركيز',
      color: '#7b4ec0'
    },
    break: {
      min: 5,
      label: 'Break',
      ar: 'راحة',
      color: '#66c6dd'
    }
  };
  const [mode, setMode] = useStateW('focus');
  const [left, setLeft] = useStateW(MODES.focus.min * 60);
  const [running, setRunning] = useStateW(false);
  const t = useRefW(null);
  useEffectW(() => {
    if (!running) {
      clearInterval(t.current);
      return;
    }
    t.current = setInterval(() => setLeft(l => {
      if (l <= 1) {
        const nm = mode === 'focus' ? 'break' : 'focus';
        setMode(nm);
        setRunning(false);
        return MODES[nm].min * 60;
      }
      return l - 1;
    }), 1000);
    return () => clearInterval(t.current);
  }, [running, mode]);
  const total = MODES[mode].min * 60;
  const pct = 1 - left / total;
  const R = 96,
    C = 2 * Math.PI * R;
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  const swap = m => {
    setMode(m);
    setRunning(false);
    setLeft(MODES[m].min * 60);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "atimer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "achips",
    style: {
      marginBottom: 18
    }
  }, Object.entries(MODES).map(([k, v]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: `achip${mode === k ? ' is-on' : ''}`,
    onClick: () => swap(k)
  }, v.label, /*#__PURE__*/React.createElement("small", null, v.min, " min")))), /*#__PURE__*/React.createElement("div", {
    className: "atimer__ring"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "220",
    height: "220"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "110",
    cy: "110",
    r: R,
    fill: "none",
    stroke: "rgba(86,50,147,0.10)",
    strokeWidth: "10"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "110",
    cy: "110",
    r: R,
    fill: "none",
    stroke: MODES[mode].color,
    strokeWidth: "10",
    strokeLinecap: "round",
    strokeDasharray: C,
    strokeDashoffset: C * (1 - pct),
    style: {
      transition: 'stroke-dashoffset 1s linear'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "atimer__time"
  }, /*#__PURE__*/React.createElement("b", null, mm, ":", ss), /*#__PURE__*/React.createElement("span", {
    style: {
      color: MODES[mode].color
    },
    className: "atimer__mode"
  }, MODES[mode].label, " \xB7 ", MODES[mode].ar))), /*#__PURE__*/React.createElement("div", {
    className: "acta__row",
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "acta",
    onClick: () => setRunning(r => !r)
  }, running ? 'Pause' : 'Start'), /*#__PURE__*/React.createElement("button", {
    className: "acta acta--ghost",
    onClick: () => {
      setRunning(false);
      setLeft(total);
    }
  }, "Reset")), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "A soft rhythm - study, then breathe. Breaks are part of the work."));
}
Object.assign(window, {
  CalmIcon,
  BreathingOrbFull,
  StarBreathing,
  ThoughtRelease,
  WorryParkingLot,
  Grounding54321,
  BodyScan,
  GratitudeJar,
  ReflectionCards,
  FocusTimer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/wellness-activities.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/wellness-activities2.jsx
try { (() => {
// Nafas - Calm Activities part 2: soundscapes, cloud drift, coloring,
// emotion garden, focus pebbles. Exports to window.

const {
  useState: useStateW2,
  useEffect: useEffectW2,
  useRef: useRefW2
} = React;

/* ── 10. Soundscapes (real ambient audio via WebAudio noise) ── */
const SOUNDS = {
  rain: {
    label: 'Rain',
    icon: 'rain',
    type: 'highpass',
    freq: 1100,
    q: 0.6,
    lfo: 0
  },
  ocean: {
    label: 'Ocean',
    icon: 'rain',
    type: 'lowpass',
    freq: 480,
    q: 0.5,
    lfo: 0.1
  },
  wind: {
    label: 'Wind',
    icon: 'cloud',
    type: 'bandpass',
    freq: 600,
    q: 1.2,
    lfo: 0.18
  },
  library: {
    label: 'Library',
    icon: 'card',
    type: 'lowpass',
    freq: 320,
    q: 0.4,
    lfo: 0
  },
  cafe: {
    label: 'Café',
    icon: 'music',
    type: 'bandpass',
    freq: 900,
    q: 0.7,
    lfo: 0.05
  },
  nature: {
    label: 'Forest',
    icon: 'garden',
    type: 'highpass',
    freq: 800,
    q: 0.5,
    lfo: 0.12
  }
};
function Soundscapes() {
  const [active, setActive] = useStateW2(null);
  const [vol, setVol] = useStateW2(0.5);
  const ctxRef = useRefW2(null);
  const nodesRef = useRefW2(null);
  const stop = () => {
    const n = nodesRef.current;
    if (n) {
      try {
        n.src.stop();
      } catch {}
      try {
        n.lfo && n.lfo.stop();
      } catch {}
      nodesRef.current = null;
    }
  };
  useEffectW2(() => () => {
    stop();
    if (ctxRef.current) try {
      ctxRef.current.close();
    } catch {}
  }, []);
  const play = key => {
    if (active === key) {
      stop();
      setActive(null);
      return;
    }
    stop();
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const cfg = SOUNDS[key];
      // brown-ish noise buffer
      const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
      const data = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < data.length; i++) {
        const w = Math.random() * 2 - 1;
        last = (last + 0.02 * w) / 1.02;
        data[i] = last * 3.2;
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const filt = ctx.createBiquadFilter();
      filt.type = cfg.type;
      filt.frequency.value = cfg.freq;
      filt.Q.value = cfg.q;
      const gain = ctx.createGain();
      gain.gain.value = vol * 0.7;
      src.connect(filt);
      filt.connect(gain);
      gain.connect(ctx.destination);
      let lfo = null;
      if (cfg.lfo) {
        lfo = ctx.createOscillator();
        lfo.frequency.value = cfg.lfo;
        const lg = ctx.createGain();
        lg.gain.value = vol * 0.4;
        lfo.connect(lg);
        lg.connect(gain.gain);
        lfo.start();
      }
      src.start();
      nodesRef.current = {
        src,
        gain,
        lfo
      };
      setActive(key);
    } catch (e) {
      /* audio unavailable - stay silent, UI still toggles */setActive(key);
    }
  };
  useEffectW2(() => {
    if (nodesRef.current) nodesRef.current.gain.gain.value = vol * 0.7;
  }, [vol]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "asounds"
  }, Object.entries(SOUNDS).map(([k, v]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: `asound${active === k ? ' is-on' : ''}`,
    onClick: () => play(k)
  }, /*#__PURE__*/React.createElement(CalmIcon, {
    name: v.icon
  }), /*#__PURE__*/React.createElement("span", null, v.label)))), /*#__PURE__*/React.createElement("input", {
    className: "avol",
    type: "range",
    min: "0",
    max: "1",
    step: "0.01",
    value: vol,
    onChange: e => setVol(+e.target.value),
    style: {
      display: 'block',
      width: '80%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, active ? 'Playing softly. Tap again to stop.' : 'Choose a sound to settle into.'));
}

/* ── 11. Cloud Drift ────────────────────────────────────────── */
function CloudDrift() {
  const [pos, setPos] = useStateW2({
    x: 50,
    y: 50
  });
  const [target, setTarget] = useStateW2({
    x: 78,
    y: 28
  });
  const [reached, setReached] = useStateW2(0);
  const move = (clientX, clientY, rect) => {
    const x = (clientX - rect.left) / rect.width * 100;
    const y = (clientY - rect.top) / rect.height * 100;
    setPos({
      x: Math.max(8, Math.min(92, x)),
      y: Math.max(12, Math.min(88, y))
    });
    if (Math.hypot(x - target.x, y - target.y) < 12) {
      setReached(r => r + 1);
      setTarget({
        x: 14 + Math.random() * 72,
        y: 18 + Math.random() * 60
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "adrift",
    onPointerMove: e => {
      if (e.buttons || e.pointerType === 'touch') move(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
    },
    onPointerDown: e => move(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect())
  }, /*#__PURE__*/React.createElement("div", {
    className: "adrift__target",
    style: {
      left: `${target.x}%`,
      top: `${target.y}%`
    }
  }), /*#__PURE__*/React.createElement("svg", {
    className: "adrift__cloud",
    viewBox: "0 0 100 60",
    style: {
      left: `${pos.x}%`,
      top: `${pos.y}%`,
      transform: 'translate(-50%,-50%)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 46a16 16 0 01-2-31.8A22 22 0 0162 18a14 14 0 016 27z",
    fill: "rgba(255,255,255,0.92)",
    stroke: "rgba(123,78,192,0.25)",
    strokeWidth: "1.5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "Guide the cloud slowly toward each ring. ", reached > 0 && `Drifted to ${reached}.`, " Let your movements be gentle."));
}

/* ── 12. Calm Coloring ──────────────────────────────────────── */
const COLOR_PALETTE = ['#c9b3e4', '#a8d5e0', '#f5e08c', '#e9b8d6', '#bfe3c8', '#f3cdbb'];
function CalmColoring() {
  const cells = ['M150 30 a40 40 0 0140 40 a40 40 0 01-40 40 a40 40 0 01-40-40 a40 40 0 0140-40', 'M150 70 L210 110 L186 180 L114 180 L90 110 Z', 'M60 150 a30 30 0 0160 0 a30 30 0 01-60 0', 'M180 150 a30 30 0 0160 0 a30 30 0 01-60 0', 'M110 200 q40 -30 80 0 q-40 30 -80 0'];
  const [fills, setFills] = useStateW2({});
  const [color, setColor] = useStateW2(COLOR_PALETTE[0]);
  return /*#__PURE__*/React.createElement("div", {
    className: "acolor"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 300 240"
  }, cells.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    className: "acolor__cell",
    d: d,
    fill: fills[i] || '#fff',
    stroke: "rgba(86,50,147,0.3)",
    strokeWidth: "1.6",
    onClick: () => setFills(f => ({
      ...f,
      [i]: color
    }))
  }))), /*#__PURE__*/React.createElement("div", {
    className: "acolor__swatches"
  }, COLOR_PALETTE.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: `acolor__sw${color === c ? ' is-on' : ''}`,
    style: {
      background: c
    },
    onClick: () => setColor(c)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "No lines to stay inside. Fill it however feels good - tap to clear by choosing white."));
}

/* ── 13. Emotion Garden ─────────────────────────────────────── */
const PLANTS = ['flower', 'leaf', 'tree'];
function plantSvg(kind, i) {
  const greens = ['#8fc7a0', '#7bbf94', '#a3d2b0'];
  if (kind === 'flower') return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 40 70",
    width: "34"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "70",
    x2: "20",
    y2: "34",
    stroke: greens[i % 3],
    strokeWidth: "3"
  }), [0, 72, 144, 216, 288].map(a => /*#__PURE__*/React.createElement("ellipse", {
    key: a,
    cx: "20",
    cy: "20",
    rx: "5",
    ry: "11",
    fill: COLOR_PALETTE[i % COLOR_PALETTE.length],
    transform: `rotate(${a} 20 20)`
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "20",
    r: "5",
    fill: "#f5e08c"
  }));
  if (kind === 'leaf') return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 40 70",
    width: "30"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "70",
    x2: "20",
    y2: "40",
    stroke: greens[i % 3],
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 40 q-16 -10 0 -34 q16 24 0 34",
    fill: greens[i % 3]
  }));
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 40 70",
    width: "34"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "70",
    x2: "20",
    y2: "46",
    stroke: "#9b7b53",
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "30",
    r: "16",
    fill: greens[i % 3]
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "38",
    r: "10",
    fill: greens[(i + 1) % 3]
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "29",
    cy: "38",
    r: "10",
    fill: greens[(i + 2) % 3]
  }));
}
function EmotionGarden() {
  const KEY = 'nafas-garden';
  const [plants, setPlants] = useStateW2(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });
  const plant = () => {
    const next = [...plants, {
      id: Date.now(),
      kind: PLANTS[Math.floor(Math.random() * PLANTS.length)]
    }];
    setPlants(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "agarden"
  }, plants.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'italic 13px var(--font-body)',
      color: 'var(--ink-300)',
      alignSelf: 'center',
      marginBottom: 80
    }
  }, "Plant your first check-in."), plants.slice(-16).map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: "agarden__plant"
  }, plantSvg(p.kind, i)))), /*#__PURE__*/React.createElement("button", {
    className: "acta",
    onClick: plant
  }, "Plant today's check-in"), /*#__PURE__*/React.createElement("div", {
    className: "ajar__count",
    style: {
      marginTop: 12
    }
  }, plants.length ? `${plants.length} growing` : 'Each visit adds something living.'), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "Your garden grows with consistency, not perfection."));
}

/* ── 14. Focus Pebbles ──────────────────────────────────────── */
const PEBBLE_TONES = ['#c9b3e4', '#a8d5e0', '#cdbfa8', '#bfa8cd', '#a8c2cd'];
function FocusPebbles() {
  const [pebbles, setPebbles] = useStateW2([]);
  const add = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    const w = 26 + Math.random() * 34;
    setPebbles(p => [...p, {
      id: Date.now(),
      x,
      y,
      w,
      h: w * (0.5 + Math.random() * 0.2),
      c: PEBBLE_TONES[p.length % PEBBLE_TONES.length],
      rot: -12 + Math.random() * 24
    }]);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "apebbles",
    onClick: add
  }, pebbles.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'italic 13px var(--font-body)',
      color: 'var(--ink-300)'
    }
  }, "Tap slowly to place a stone."), pebbles.map(p => /*#__PURE__*/React.createElement("svg", {
    key: p.id,
    className: "apebble",
    width: p.w,
    height: p.h,
    viewBox: "0 0 100 60",
    style: {
      left: `${p.x}%`,
      top: `${p.y}%`,
      transform: `translate(-50%,-50%) rotate(${p.rot}deg)`
    }
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "50",
    cy: "32",
    rx: "48",
    ry: "26",
    fill: p.c
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "38",
    cy: "22",
    rx: "20",
    ry: "9",
    fill: "rgba(255,255,255,0.35)"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "acta__row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "acta acta--ghost",
    onClick: () => setPebbles(p => p.slice(0, -1)),
    disabled: !pebbles.length
  }, "Remove one"), /*#__PURE__*/React.createElement("button", {
    className: "acta acta--ghost",
    onClick: () => setPebbles([]),
    disabled: !pebbles.length
  }, "Clear")), /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "Stack and balance the stones. There's no goal but the placing itself."));
}
Object.assign(window, {
  Soundscapes,
  CloudDrift,
  CalmColoring,
  EmotionGarden,
  FocusPebbles
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/wellness-activities2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/wellness.jsx
try { (() => {
// Nafas - Calm Activities section + activity modal.
// A dedicated dashboard space of gentle wellness tools. Tiles open a soft
// modal hosting the matching interactive micro-experience.

const {
  useState: useStateCW,
  useEffect: useEffectCW
} = React;

// id → live component (resolved from window at render so file order is flexible)
const ACTIVITY_COMPONENT = {
  'breathing-orb': () => window.BreathingOrbFull,
  'star-breathing': () => window.StarBreathing,
  'focus-timer': () => window.FocusTimer,
  'thought-release': () => window.ThoughtRelease,
  'worry-parking': () => window.WorryParkingLot,
  'gratitude-jar': () => window.GratitudeJar,
  'grounding': () => window.Grounding54321,
  'focus-pebbles': () => window.FocusPebbles,
  'cloud-drift': () => window.CloudDrift,
  'body-scan': () => window.BodyScan,
  'reflection': () => window.ReflectionCards,
  'calm-coloring': () => window.CalmColoring,
  'emotion-garden': () => window.EmotionGarden,
  'rain-listening': () => window.Soundscapes,
  'mood-music': () => window.Soundscapes
};
const CALM_GROUPS = [{
  label: 'Breathe & focus · تنفّس وتركيز',
  items: [{
    id: 'breathing-orb',
    icon: 'orb',
    tone: '',
    title: 'Breathing Orb',
    ar: 'كرة التنفّس',
    hint: 'Match your breath to a soft, expanding orb.'
  }, {
    id: 'star-breathing',
    icon: 'star',
    tone: 'lemon',
    title: 'Star Breathing',
    ar: 'تنفّس النجوم',
    hint: 'Connect stars slowly as you breathe.'
  }, {
    id: 'focus-timer',
    icon: 'timer',
    tone: 'blue',
    title: 'Focus Timer',
    ar: 'مؤقّت التركيز',
    hint: 'A gentle study rhythm with kind breaks.'
  }]
}, {
  label: 'Release & let go · أطلق ودَع',
  items: [{
    id: 'thought-release',
    icon: 'release',
    tone: 'rose',
    title: 'Thought Release',
    ar: 'إطلاق الفكرة',
    hint: 'Name a worry and let it drift into the sky.'
  }, {
    id: 'worry-parking',
    icon: 'parking',
    tone: '',
    title: 'Worry Parking Lot',
    ar: 'موقف القلق',
    hint: 'Park worries before studying, revisit later.'
  }, {
    id: 'gratitude-jar',
    icon: 'jar',
    tone: 'lemon',
    title: 'Gratitude Jar',
    ar: 'جرّة الامتنان',
    hint: 'Keep one good thing each day.'
  }]
}, {
  label: 'Ground & reset · ارتكز وأعد الضبط',
  items: [{
    id: 'grounding',
    icon: 'ground',
    tone: 'blue',
    title: '5-4-3-2-1 Grounding',
    ar: 'تأريض الحواس',
    hint: 'Come back to the senses, one by one.'
  }, {
    id: 'focus-pebbles',
    icon: 'pebble',
    tone: '',
    title: 'Focus Pebbles',
    ar: 'حصى التركيز',
    hint: 'Place and balance smooth stones.'
  }, {
    id: 'cloud-drift',
    icon: 'cloud',
    tone: 'blue',
    title: 'Cloud Drift',
    ar: 'انجراف الغيمة',
    hint: 'Slow racing thoughts by guiding a cloud.'
  }, {
    id: 'body-scan',
    icon: 'body',
    tone: 'rose',
    title: 'Body Scan Journey',
    ar: 'مسح الجسد',
    hint: 'Move attention gently through the body.'
  }]
}, {
  label: 'Reflect & create · تأمّل وأبدِع',
  items: [{
    id: 'reflection',
    icon: 'card',
    tone: '',
    title: 'Reflection Cards',
    ar: 'بطاقات التأمّل',
    hint: 'Soft prompts for self-compassion.'
  }, {
    id: 'calm-coloring',
    icon: 'color',
    tone: 'lemon',
    title: 'Calm Coloring',
    ar: 'تلوين هادئ',
    hint: 'Fill simple shapes with soft colour.'
  }, {
    id: 'emotion-garden',
    icon: 'garden',
    tone: '',
    title: 'Emotion Garden',
    ar: 'حديقة المشاعر',
    hint: 'Each check-in plants something living.'
  }]
}, {
  label: 'Rest & listen · استرِح واستمع',
  items: [{
    id: 'rain-listening',
    icon: 'rain',
    tone: 'blue',
    title: 'Rain Listening',
    ar: 'الإنصات للمطر',
    hint: 'Rain, ocean, wind and quiet rooms.'
  }, {
    id: 'mood-music',
    icon: 'music',
    tone: 'rose',
    title: 'Mood Soundscapes',
    ar: 'أجواء صوتية',
    hint: 'Focus, calm and sleep soundscapes.'
  }]
}];
const ACTIVITY_META = (() => {
  const m = {};
  CALM_GROUPS.forEach(g => g.items.forEach(it => {
    m[it.id] = it;
  }));
  return m;
})();
function ActivityModal({
  id,
  onClose
}) {
  useEffectCW(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  const meta = ACTIVITY_META[id];
  const Comp = ACTIVITY_COMPONENT[id] && ACTIVITY_COMPONENT[id]() || null;
  return /*#__PURE__*/React.createElement("div", {
    className: "amodal-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "amodal",
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    "aria-label": meta?.title
  }, /*#__PURE__*/React.createElement("button", {
    className: "amodal__close",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "amodal__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "amodal__eyebrow"
  }, "Calm activity"), /*#__PURE__*/React.createElement("h3", {
    className: "amodal__title"
  }, meta?.title), /*#__PURE__*/React.createElement("div", {
    className: "amodal__title-ar",
    dir: "rtl"
  }, meta?.ar)), /*#__PURE__*/React.createElement("div", {
    className: "amodal__body"
  }, Comp ? /*#__PURE__*/React.createElement(Comp, null) : /*#__PURE__*/React.createElement("div", {
    className: "amodal__foot"
  }, "This activity is resting."))));
}
function CalmActivities() {
  const [open, setOpen] = useStateCW(null);
  return /*#__PURE__*/React.createElement("section", {
    className: "calm",
    id: "dash-calm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calm__heading",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "calm__eyebrow"
  }, "Calm activities \xB7 \u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u062A\u0647\u062F\u0626\u0629"), /*#__PURE__*/React.createElement("h3", {
    className: "calm__title"
  }, "Wellness tools for a heavy day."), /*#__PURE__*/React.createElement("div", {
    className: "calm__title-ar",
    dir: "rtl"
  }, "\u0623\u062F\u0648\u0627\u062A \u0644\u0644\u0639\u0646\u0627\u064A\u0629 \u0641\u064A \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u062B\u0642\u064A\u0644\u0629."), /*#__PURE__*/React.createElement("p", {
    className: "calm__sub",
    style: {
      marginInline: 'auto'
    }
  }, "Gentle micro-experiences to reset between studying, exams and deadlines. No scores, no streaks - just a moment to breathe.")), CALM_GROUPS.map(group => /*#__PURE__*/React.createElement("div", {
    className: "calm__group",
    key: group.label
  }, /*#__PURE__*/React.createElement("div", {
    className: "calm__group-label"
  }, group.label), /*#__PURE__*/React.createElement("div", {
    className: "calm__grid"
  }, group.items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    className: `calm-tile${it.tone ? ' calm-tile--' + it.tone : ''}`,
    onClick: () => setOpen(it.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "calm-tile__icon"
  }, /*#__PURE__*/React.createElement(CalmIcon, {
    name: it.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "calm-tile__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "calm-tile__title"
  }, it.title), /*#__PURE__*/React.createElement("span", {
    className: "calm-tile__ar",
    dir: "rtl"
  }, it.ar), /*#__PURE__*/React.createElement("span", {
    className: "calm-tile__hint"
  }, it.hint))))))), open && /*#__PURE__*/React.createElement(ActivityModal, {
    id: open,
    onClose: () => setOpen(null)
  }));
}
window.CalmActivities = CalmActivities;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/wellness.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nafas/widgets.jsx
try { (() => {
// Nafas - Layered card + mood widget + companion-aware small components

function LayeredCard({
  variant = 'default',
  children,
  onClick,
  style
}) {
  const cls = `nafas-lcard${variant !== 'default' ? ' nafas-lcard--' + variant : ''}`;
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    onClick: onClick,
    style: style
  }, children);
}

// Mood widget - sits at the top of Library. Shows the user's current emotional weather.
// Companion mirrors mood. Title + whisper text reflects palette. Tapping cycles thru moods
// (in product this would be a "how are you arriving" mini check-in).
function MoodWidget({
  onTap
}) {
  const {
    mood,
    setMood
  } = useEmotional();
  const order = ['settled', 'tired', 'anxious', 'overwhelmed', 'hopeful'];
  const cycle = () => {
    const i = order.indexOf(mood.label);
    setMood(order[(i + 1) % order.length]);
    if (onTap) onTap();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "mood-widget",
    onClick: cycle,
    role: "button"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mood-widget__companion"
  }, /*#__PURE__*/React.createElement(Companion, {
    size: 92,
    label: false
  })), /*#__PURE__*/React.createElement("div", {
    className: "mood-widget__whisper"
  }, "Right now \xB7 \u0627\u0644\u0622\u0646"), /*#__PURE__*/React.createElement("div", {
    className: "mood-widget__title"
  }, "You're arriving as ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      color: 'var(--purple-600)'
    }
  }, mood.label), "."), /*#__PURE__*/React.createElement("div", {
    className: "mood-widget__title-ar"
  }, mood.labelAr), /*#__PURE__*/React.createElement("div", {
    className: "mood-widget__body"
  }, mood.whisper));
}

// Small "continuity dot" - companion floating top-right on app screens
function ContinuityCompanion() {
  return /*#__PURE__*/React.createElement(Companion, {
    floating: true
  });
}

// Soft fade-in container for screens
function ScreenFade({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'nafas-enter 600ms var(--ease-out)',
      ...style
    }
  }, children);
}
Object.assign(window, {
  LayeredCard,
  MoodWidget,
  ContinuityCompanion,
  ScreenFade
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nafas/widgets.jsx", error: String((e && e.message) || e) }); }

// ui_kits/wujood/browser-window.jsx
try { (() => {
// Chrome.jsx - Simplified Chrome browser window (dark theme, macOS)
// No dependencies, no image assets. All inline styles + inline SVG.

const CHROME_C = {
  barBg: '#202124',
  tabBg: '#35363a',
  text: '#e8eaed',
  dim: '#9aa0a6',
  urlBg: '#282a2d'
};
function ChromeTrafficLights() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '0 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#ff5f57'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#febc2e'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#28c840'
    }
  }));
}

// Single tab (active has curved scoops)
function ChromeTab({
  title = 'New Tab',
  active = false
}) {
  const curve = flip => /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "10",
    viewBox: "0 0 8 10",
    style: {
      position: 'absolute',
      bottom: 0,
      [flip ? 'right' : 'left']: -8,
      transform: flip ? 'scaleX(-1)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 10C2 9 6 8 8 0V10H0Z",
    fill: CHROME_C.tabBg
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 34,
      alignSelf: 'flex-end',
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: active ? CHROME_C.tabBg : 'transparent',
      borderRadius: '8px 8px 0 0',
      minWidth: 120,
      maxWidth: 220,
      fontFamily: 'system-ui, sans-serif',
      fontSize: 12,
      color: active ? CHROME_C.text : CHROME_C.dim
    }
  }, active && curve(false), active && curve(true), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: '#5f6368',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title));
}
function ChromeTabBar({
  tabs = [{
    title: 'New Tab'
  }],
  activeIndex = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      height: 44,
      background: CHROME_C.barBg,
      paddingRight: 8
    }
  }, /*#__PURE__*/React.createElement(ChromeTrafficLights, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      height: '100%',
      paddingLeft: 4,
      flex: 1
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement(ChromeTab, {
    key: i,
    title: t.title,
    active: i === activeIndex
  }))));
}
function ChromeToolbar({
  url = 'example.com'
}) {
  const iconDot = /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: CHROME_C.dim,
      opacity: 0.4
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      background: CHROME_C.tabBg,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '0 8px'
    }
  }, iconDot, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 30,
      borderRadius: 15,
      background: CHROME_C.urlBg,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 14px',
      margin: '0 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: CHROME_C.dim,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: CHROME_C.text,
      fontSize: 13,
      fontFamily: 'system-ui, sans-serif'
    }
  }, url)), iconDot);
}
function ChromeWindow({
  tabs = [{
    title: 'New Tab'
  }],
  activeIndex = 0,
  url = 'example.com',
  width = 900,
  height = 600,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      background: CHROME_C.tabBg
    }
  }, /*#__PURE__*/React.createElement(ChromeTabBar, {
    tabs: tabs,
    activeIndex: activeIndex
  }), /*#__PURE__*/React.createElement(ChromeToolbar, {
    url: url
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: '#fff',
      overflow: 'auto'
    }
  }, children));
}
Object.assign(window, {
  ChromeWindow,
  ChromeTabBar,
  ChromeToolbar,
  ChromeTab,
  ChromeTrafficLights
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/wujood/browser-window.jsx", error: String((e && e.message) || e) }); }

// ui_kits/wujood/components.jsx
try { (() => {
// Wujood marketing site components

function Nav() {
  const links = ['Home', 'Services', 'Programs', 'For Institutions', 'About'];
  return /*#__PURE__*/React.createElement("nav", {
    className: "wj-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-nav__brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wordmark-color.png",
    alt: "Wujood Care"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wj-nav__tagline"
  }, "Your Presence, Our Care"), /*#__PURE__*/React.createElement("div", {
    className: "wj-nav__links"
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    className: `wj-nav__link${i === 0 ? ' wj-nav__link--active' : ''}`
  }, l))), /*#__PURE__*/React.createElement("button", {
    className: "wj-nav__menu",
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 7h16M4 12h16M4 17h16"
  }))));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "wj-hero"
  }, /*#__PURE__*/React.createElement("img", {
    className: "wj-cloud wj-cloud--tl",
    src: "../../assets/cloud-billboard.png",
    alt: ""
  }), /*#__PURE__*/React.createElement("img", {
    className: "wj-cloud wj-cloud--br",
    src: "../../assets/cloud-sun.png",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "wj-hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-hero__copy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-hero__eyebrow"
  }, "Digital health \xB7 MENA"), /*#__PURE__*/React.createElement("h1", {
    className: "wj-hero__title"
  }, "Virtual", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "joy"), /*#__PURE__*/React.createElement("br", null), "that heals."), /*#__PURE__*/React.createElement("p", {
    className: "wj-hero__sub"
  }, "Wujood Care builds privacy-first, AI-powered emotional regulation systems for students in high-pressure environments across MENA. Lightweight tools, scaled for institutions, designed for anonymity."), /*#__PURE__*/React.createElement("div", {
    className: "wj-hero__cta"
  }, /*#__PURE__*/React.createElement("a", {
    className: "wj-btn wj-btn--primary",
    href: "#"
  }, "See our work"), /*#__PURE__*/React.createElement("a", {
    className: "wj-btn wj-btn--ghost-on-dark",
    href: "#"
  }, "For institutions \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "wj-hero__visual"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-hero__photo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-hero__photo-placeholder"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "64",
    height: "64",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4",
    opacity: "0.6"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "7",
    width: "20",
    height: "10",
    rx: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "12",
    r: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "12",
    r: "2"
  })), /*#__PURE__*/React.createElement("div", null, "Student + VR \xB7 photo")))))));
}
function Values() {
  const items = [{
    n: '01',
    title: 'Built for absolute privacy',
    body: 'No account, no profile, no observation. Sessions leave no trace. The system supports you without ever needing to know who you are.'
  }, {
    n: '02',
    title: 'Arabic-first, not Arabic-second',
    body: 'Emotional language is native - written gently, in the words students use. English is supportive, never primary.'
  }, {
    n: '03',
    title: 'Non-clinical by design',
    body: 'A structured emotional regulation environment, not a chatbot or therapy replacement. No diagnostic language, no alerts, no pressure.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "wj-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-section__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-section__eyebrow"
  }, "What Wujood is"), /*#__PURE__*/React.createElement("h2", {
    className: "wj-section__title"
  }, "Emotional infrastructure for high-pressure environments."), /*#__PURE__*/React.createElement("p", {
    className: "wj-section__sub"
  }, "We're a digital health company building lightweight, web-based tools that help users move through burnout, anxiety, and overload - with stability, not stimulation.")), /*#__PURE__*/React.createElement("div", {
    className: "wj-values"
  }, items.map(i => /*#__PURE__*/React.createElement("div", {
    className: "wj-value-card",
    key: i.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-value-card__num"
  }, i.n), /*#__PURE__*/React.createElement("div", {
    className: "wj-value-card__title"
  }, i.title), /*#__PURE__*/React.createElement("div", {
    className: "wj-value-card__body"
  }, i.body))))));
}
function Product() {
  return /*#__PURE__*/React.createElement("section", {
    className: "wj-product"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-product__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-product__copy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-section__eyebrow"
  }, "Meet Nafas \xB7 \u0646\u064E\u0641\u064E\u0633"), /*#__PURE__*/React.createElement("h2", {
    className: "wj-section__title",
    style: {
      marginBottom: 18
    }
  }, "A breath, a beat, a small room to land in."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--fg-2)',
      marginBottom: 16
    }
  }, "Nafas is Wujood's first consumer-facing product - a calm, Arabic-centered emotional support environment for students. No chatbot. No therapy replacement. Just structured grounding, in two minutes or twenty."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '24px 0 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Soft check-in - emotion-word picker, in Arabic', '4-7-8 breath, body scan, grounding practices', 'Voice-guided in Modern Standard + dialect Arabic', 'No account · no data leaves the device unless invited'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 999,
      background: 'var(--purple-100)',
      color: 'var(--purple-600)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L20 7"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--ink-700)'
    }
  }, t)))), /*#__PURE__*/React.createElement("a", {
    className: "wj-btn wj-btn--dark",
    href: "#"
  }, "Open Nafas")), /*#__PURE__*/React.createElement("div", {
    className: "wj-product__phone-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-mini-phone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-mini-phone__screen"
  }, /*#__PURE__*/React.createElement(MiniNafasPreview, null))))));
}

// A small static preview of the Nafas welcome screen - for use inside the marketing page.
function MiniNafasPreview() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'radial-gradient(120% 80% at 10% 0%, #efe1f5 0%, #e9d6ec 40%, #d8e9f1 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '40px 20px 24px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark-purple.png",
    alt: "",
    style: {
      width: 72,
      height: 72,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display-ar)',
      fontWeight: 700,
      fontSize: 34,
      color: 'var(--ink-900)',
      direction: 'rtl'
    }
  }, "\u062E\u064F\u0630 \u0646\u064E\u0641\u064E\u0633"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--ink-700)',
      maxWidth: 200
    }
  }, "A quiet place to land.", /*#__PURE__*/React.createElement("br", null), "There's nothing to prove here.")), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      background: 'linear-gradient(135deg,#563293,#7b4ec0)',
      color: '#fff',
      border: 'none',
      borderRadius: 999,
      padding: '14px 24px',
      font: '600 14px var(--font-display)',
      boxShadow: '0 6px 18px rgba(86,50,147,0.28)'
    }
  }, "Begin"));
}
function Institutions() {
  const stats = [{
    n: '12',
    l: 'Universities partnered across the GCC'
  }, {
    n: '24/7',
    l: 'Always-on emotional regulation, no waitlist'
  }, {
    n: '0',
    l: 'Identifying data collected from students'
  }, {
    n: '<2',
    l: 'Minutes from open to first breath'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "wj-inst"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-inst__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-section__eyebrow"
  }, "For institutions"), /*#__PURE__*/React.createElement("h2", {
    className: "wj-section__title"
  }, "Scale-able care that doesn't surveil."), /*#__PURE__*/React.createElement("p", {
    className: "wj-section__sub"
  }, "Wujood deploys with universities, employers, and ministries across MENA - providing a calm, lightweight emotional safety net to people who would never download a \"mental health app.\" We bring the regulation; they bring the access."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "wj-btn wj-btn--lemon",
    href: "#"
  }, "Talk to our team"), /*#__PURE__*/React.createElement("a", {
    className: "wj-btn wj-btn--ghost-on-dark",
    href: "#"
  }, "Read the white paper"))), /*#__PURE__*/React.createElement("div", {
    className: "wj-stats"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "wj-stat",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-stat__n"
  }, s.n), /*#__PURE__*/React.createElement("div", {
    className: "wj-stat__l"
  }, s.l)))));
}
function Quote() {
  return /*#__PURE__*/React.createElement("section", {
    className: "wj-quote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-quote__text"
  }, "\u201CThe first thing that worked, it didn't ask me anything. It just let me ", /*#__PURE__*/React.createElement("em", null, "breathe"), ".\u201D"), /*#__PURE__*/React.createElement("div", {
    className: "wj-quote__cite"
  }, "- Student, 21 \xB7 Cairo \xB7 anonymized testimony")));
}
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    className: "wj-cta-band"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "wj-cta-band__title"
  }, "A breath is enough to begin."), /*#__PURE__*/React.createElement("p", {
    className: "wj-cta-band__sub"
  }, "Open Nafas in your browser. No account. No download. Two minutes, then you're back."), /*#__PURE__*/React.createElement("div", {
    className: "wj-cta-band__buttons"
  }, /*#__PURE__*/React.createElement("a", {
    className: "wj-btn wj-btn--primary",
    href: "#"
  }, "Open Nafas"), /*#__PURE__*/React.createElement("a", {
    className: "wj-btn wj-btn--ghost-on-dark",
    href: "#"
  }, "For institutions \u2192")));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "wj-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-footer__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wj-footer__brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wordmark-color.png",
    alt: "Wujood Care"
  }), /*#__PURE__*/React.createElement("p", null, "A digital health and emotional infrastructure company. Built privately in MENA, for MENA.")), /*#__PURE__*/React.createElement("div", {
    className: "wj-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Products"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Nafas \xB7 \u0646\u064E\u0641\u064E\u0633")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Institutional Suite")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Research")))), /*#__PURE__*/React.createElement("div", {
    className: "wj-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Company"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "About")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Careers")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Press")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Contact")))), /*#__PURE__*/React.createElement("div", {
    className: "wj-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Trust"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Privacy")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Data philosophy")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Safety"))))), /*#__PURE__*/React.createElement("div", {
    className: "wj-footer__legal"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Wujood Care \xB7 Your Presence, Our Care"), /*#__PURE__*/React.createElement("span", null, "\u0627\u0644\u0631\u064A\u0627\u0636 \xB7 \u0627\u0644\u0642\u0627\u0647\u0631\u0629 \xB7 \u062F\u0628\u064A")));
}
function WujoodSite() {
  return /*#__PURE__*/React.createElement("div", {
    className: "wj-site"
  }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Values, null), /*#__PURE__*/React.createElement(Product, null), /*#__PURE__*/React.createElement(Quote, null), /*#__PURE__*/React.createElement(Institutions, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
}
Object.assign(window, {
  WujoodSite,
  Nav,
  Hero,
  Values,
  Product,
  Institutions,
  Quote,
  CTA,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/wujood/components.jsx", error: String((e && e.message) || e) }); }

})();
