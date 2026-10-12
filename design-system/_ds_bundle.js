/* @ds-bundle: {"format":4,"namespace":"FabLabJoinvilleDesignSystem_83fd60","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"EventCard","sourcePath":"components/display/EventCard.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Button.jsx":"df8101b7b937","components/core/Icon.jsx":"32e4585fd9df","components/core/IconButton.jsx":"c64a5cc82770","components/display/Badge.jsx":"5cd0b57ca371","components/display/Card.jsx":"9270b5e2aee9","components/display/EventCard.jsx":"ebd52974ccf1","components/display/Tag.jsx":"a9857940e272","components/feedback/Dialog.jsx":"69c91e158b60","components/feedback/Toast.jsx":"f88693f2562d","components/feedback/Tooltip.jsx":"a0e6a9199cc4","components/forms/Checkbox.jsx":"a8f9bf2f0ddb","components/forms/Input.jsx":"2bd89837e2a4","components/forms/Radio.jsx":"113e5b17ea13","components/forms/Select.jsx":"e8854984e172","components/forms/Switch.jsx":"2dcbe58bbacc","components/navigation/Tabs.jsx":"1eff9a09724c","ui_kits/website/Events.jsx":"5280b7992dc9","ui_kits/website/Footer.jsx":"8c2f86fe34f0","ui_kits/website/Header.jsx":"cc1248b69b62","ui_kits/website/Home.jsx":"355fe1910a82","ui_kits/website/Space.jsx":"296f19eba0dd","ui_kits/website/data.js":"c61dc1fbdc6c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FabLabJoinvilleDesignSystem_83fd60 = window.FabLabJoinvilleDesignSystem_83fd60 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  style,
  ...rest
}) {
  const url = `https://unpkg.com/lucide-static@0.460.0/icons/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'inline-block',
      flex: 'none',
      width: size,
      height: size,
      background: color,
      WebkitMask: `url(${url}) center/contain no-repeat`,
      mask: `url(${url}) center/contain no-repeat`,
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    h: 36,
    px: 14,
    fs: 13
  },
  md: {
    h: 44,
    px: 20,
    fs: 14
  },
  lg: {
    h: 56,
    px: 28,
    fs: 16
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  disabled,
  fullWidth,
  children,
  onClick,
  type = 'button',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const V = {
    primary: {
      bg: 'var(--brand-primary)',
      fg: 'var(--text-inverse)',
      bd: 'var(--brand-primary)',
      sh: 'var(--shadow-offset-accent)'
    },
    accent: {
      bg: 'var(--brand-accent)',
      fg: 'var(--flj-white)',
      bd: 'var(--flj-navy-800)',
      sh: 'var(--shadow-offset-sm)'
    },
    secondary: {
      bg: 'var(--flj-white)',
      fg: 'var(--brand-primary)',
      bd: 'var(--brand-primary)',
      sh: 'var(--shadow-offset-sm)'
    },
    ghost: {
      bg: hover ? 'var(--surface-muted)' : 'transparent',
      fg: 'var(--brand-primary)',
      bd: 'transparent',
      sh: 'none'
    },
    inverse: {
      bg: 'var(--flj-white)',
      fg: 'var(--brand-primary)',
      bd: 'var(--flj-white)',
      sh: '4px 4px 0 0 var(--flj-laser-500)'
    }
  }[variant];
  const lift = variant !== 'ghost' && hover && !disabled && !press;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: s.h,
      padding: `0 ${s.px}px`,
      width: fullWidth ? '100%' : undefined,
      font: `700 ${s.fs}px/1 var(--font-display)`,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: V.fg,
      background: V.bg,
      border: `2px solid ${V.bd}`,
      borderRadius: 'var(--radius-1)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      boxShadow: lift ? V.sh : 'none',
      transform: lift ? 'translate(-3px,-3px)' : press ? 'translate(1px,1px)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.fs + 4
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.fs + 4
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  label,
  variant = 'secondary',
  size = 40,
  disabled,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  const V = {
    primary: ['var(--brand-primary)', 'var(--flj-white)', 'var(--brand-primary)'],
    secondary: ['var(--flj-white)', 'var(--brand-primary)', 'var(--brand-primary)'],
    ghost: [h ? 'var(--surface-muted)' : 'transparent', 'var(--brand-primary)', 'transparent']
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: V[0],
      color: V[1],
      border: `2px solid ${V[2]}`,
      borderRadius: 'var(--radius-1)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .4 : 1,
      padding: 0,
      boxShadow: h && variant !== 'ghost' && !disabled ? 'var(--shadow-offset-sm)' : 'none',
      transform: h && variant !== 'ghost' && !disabled ? 'translate(-2px,-2px)' : 'none',
      transition: 'all var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.5)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function Badge({
  tone = 'neutral',
  children,
  style
}) {
  const T = {
    neutral: ['var(--surface-muted)', 'var(--text-body)'],
    primary: ['var(--brand-primary)', 'var(--flj-white)'],
    accent: ['var(--brand-accent)', 'var(--flj-white)'],
    success: ['var(--status-success-bg)', 'var(--status-success)'],
    warning: ['var(--status-warning-bg)', '#7a5a00'],
    danger: ['var(--status-danger-bg)', 'var(--status-danger)'],
    info: ['var(--status-info-bg)', 'var(--status-info)']
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 8px',
      background: T[0],
      color: T[1],
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-1)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function Card({
  children,
  variant = 'outline',
  interactive,
  padding = 24,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  const V = {
    outline: ['var(--surface-card)', '2px solid var(--border-default)', 'var(--text-body)'],
    paper: ['var(--surface-paper)', '2px solid transparent', 'var(--text-body)'],
    inverse: ['var(--surface-inverse)', '2px solid var(--surface-inverse)', 'var(--text-inverse)']
  }[variant];
  const lift = interactive && h;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: V[0],
      border: V[1],
      color: V[2],
      padding,
      borderRadius: 'var(--radius-1)',
      cursor: interactive ? 'pointer' : undefined,
      boxShadow: lift ? 'var(--shadow-offset)' : 'none',
      transform: lift ? 'translate(-4px,-4px)' : 'none',
      transition: 'transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/EventCard.jsx
try { (() => {
function EventCard({
  image,
  day,
  month,
  title,
  kind,
  description,
  place,
  time,
  badge,
  badgeTone = 'accent',
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '2px solid var(--border-default)',
      borderRadius: 'var(--radius-1)',
      cursor: onClick ? 'pointer' : undefined,
      boxShadow: h ? 'var(--shadow-offset)' : 'none',
      transform: h ? 'translate(-4px,-4px)' : 'none',
      transition: 'all var(--dur) var(--ease-out)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '16/10',
      background: 'var(--surface-muted)',
      borderBottom: '2px solid var(--border-default)'
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), day && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      background: 'var(--brand-primary)',
      color: 'var(--flj-white)',
      padding: '8px 12px',
      textAlign: 'center',
      fontFamily: 'var(--font-display)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 26px/1 var(--font-display)'
    }
  }, day), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      marginTop: 4
    }
  }, month)), badge && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: badgeTone,
    style: {
      position: 'absolute',
      right: 10,
      top: 10
    }
  }, badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      flex: 1
    }
  }, kind && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, kind), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: 'var(--type-h4)',
      color: 'var(--text-strong)',
      textWrap: 'pretty'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-small)',
      color: 'var(--text-muted)'
    }
  }, description), (place || time) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 8,
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      font: '500 13px/1.3 var(--font-mono)',
      color: 'var(--text-body)'
    }
  }, time && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clock",
    size: 14
  }), time), place && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "map-pin",
    size: 14
  }), place))));
}
Object.assign(__ds_scope, { EventCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/EventCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function Tag({
  children,
  selected,
  onClick,
  onRemove
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 32,
      padding: '0 12px',
      border: '2px solid var(--border-default)',
      borderRadius: 'var(--radius-pill)',
      background: selected ? 'var(--brand-primary)' : h && onClick ? 'var(--surface-muted)' : 'var(--flj-white)',
      color: selected ? 'var(--flj-white)' : 'var(--text-body)',
      font: '500 14px/1 var(--font-body)',
      cursor: onClick ? 'pointer' : 'default',
      userSelect: 'none'
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      cursor: 'pointer',
      font: '700 14px/1 var(--font-mono)'
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
  width = 480,
  inline
}) {
  if (!open) return null;
  const panel = /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      border: '2px solid var(--border-default)',
      boxShadow: 'var(--shadow-offset-lg)',
      borderRadius: 'var(--radius-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      padding: '14px 14px 14px 20px',
      borderBottom: '2px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '700 16px/1.2 var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.02em'
    }
  }, title), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Fechar",
    variant: "ghost",
    size: 32,
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      padding: '0 20px 20px'
    }
  }, actions));
  if (inline) return panel;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(4,22,30,.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      zIndex: 1000
    }
  }, panel);
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  tone = 'success',
  title,
  children,
  onClose
}) {
  const T = {
    success: ['var(--status-success)', 'circle-check'],
    info: ['var(--status-info)', 'info'],
    warning: ['var(--status-warning)', 'triangle-alert'],
    danger: ['var(--status-danger)', 'circle-x']
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      width: 360,
      maxWidth: '100%',
      boxSizing: 'border-box',
      padding: '14px 16px',
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      borderRadius: 'var(--radius-1)',
      boxShadow: `4px 4px 0 0 ${T[0]}`
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: T[1],
    size: 20,
    color: T[0],
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px/1.3 var(--font-body)'
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-small)',
      opacity: .85,
      marginTop: 2
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      background: 'none',
      border: 0,
      color: 'inherit',
      cursor: 'pointer',
      padding: 0,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  content,
  children,
  placement = 'top',
  open
}) {
  const [h, setH] = React.useState(false);
  const show = open ?? h;
  const pos = placement === 'top' ? {
    bottom: 'calc(100% + 8px)'
  } : {
    top: 'calc(100% + 8px)'
  };
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      ...pos,
      background: 'var(--flj-navy-900)',
      color: 'var(--flj-white)',
      font: '500 12px/1.3 var(--font-mono)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-1)',
      whiteSpace: 'nowrap',
      zIndex: 10,
      pointerEvents: 'none'
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .45 : 1,
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": on,
    style: {
      width: 22,
      height: 22,
      flex: 'none',
      border: '2px solid var(--border-default)',
      borderRadius: 'var(--radius-1)',
      background: on ? 'var(--brand-primary)' : 'var(--flj-white)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--flj-white)',
      font: '800 14px/1 var(--font-mono)'
    }
  }, on ? '✓' : ''), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
const labelStyle = {
  font: 'var(--type-label)',
  letterSpacing: 'var(--ls-label)',
  textTransform: 'uppercase',
  color: 'var(--text-body)'
};
function Input({
  label,
  hint,
  error,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = 'text',
  disabled,
  multiline,
  rows = 4,
  style
}) {
  const [f, setF] = React.useState(false);
  const Tag = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, label), /*#__PURE__*/React.createElement(Tag, {
    type: multiline ? undefined : type,
    rows: multiline ? rows : undefined,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      background: disabled ? 'var(--surface-muted)' : 'var(--flj-white)',
      padding: multiline ? '10px 12px' : '0 12px',
      height: multiline ? 'auto' : 44,
      resize: 'vertical',
      border: `2px solid ${error ? 'var(--status-danger)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-1)',
      outline: 'none',
      boxShadow: f ? `3px 3px 0 0 ${error ? 'var(--status-danger)' : 'var(--focus-ring)'}` : 'none',
      transition: 'box-shadow var(--dur-fast)'
    }
  }), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-small)',
      color: error ? 'var(--status-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  name,
  options = [],
  value,
  defaultValue,
  onChange,
  direction = 'column'
}) {
  const [inner, setInner] = React.useState(defaultValue);
  const cur = value !== undefined ? value : inner;
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'flex',
      flexDirection: direction,
      gap: direction === 'row' ? 20 : 10
    }
  }, options.map(o => {
    const v = typeof o === 'string' ? o : o.value,
      l = typeof o === 'string' ? o : o.label,
      on = cur === v;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      onClick: () => {
        setInner(v);
        onChange && onChange(v);
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        font: 'var(--type-body)',
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      role: "radio",
      "aria-checked": on,
      style: {
        width: 22,
        height: 22,
        flex: 'none',
        border: '2px solid var(--border-default)',
        borderRadius: '50%',
        background: 'var(--flj-white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: 'var(--brand-primary)'
      }
    })), l);
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const labelStyle = {
  font: 'var(--type-label)',
  letterSpacing: 'var(--ls-label)',
  textTransform: 'uppercase',
  color: 'var(--text-body)'
};
function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  disabled,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      width: '100%',
      appearance: 'none',
      WebkitAppearance: 'none',
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      background: 'var(--flj-white)',
      height: 44,
      padding: '0 40px 0 12px',
      border: '2px solid var(--border-default)',
      borderRadius: 'var(--radius-1)',
      cursor: 'pointer',
      opacity: disabled ? .5 : 1
    }
  }, options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderLeft: '2px solid var(--border-default)',
      pointerEvents: 'none',
      font: '700 12px var(--font-mono)'
    }
  }, "\u25BC")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const t = () => {
    if (disabled) return;
    setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: t,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .45 : 1,
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": on,
    style: {
      width: 44,
      height: 24,
      flex: 'none',
      boxSizing: 'border-box',
      border: '2px solid var(--border-default)',
      borderRadius: 'var(--radius-1)',
      background: on ? 'var(--brand-primary)' : 'var(--flj-white)',
      position: 'relative',
      transition: 'background var(--dur)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 22 : 2,
      width: 16,
      height: 16,
      background: on ? 'var(--flj-laser-500)' : 'var(--brand-primary)',
      transition: 'left var(--dur) var(--ease-out)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange
}) {
  const [inner, setInner] = React.useState(defaultValue ?? (tabs[0] && (tabs[0].value ?? tabs[0])));
  const cur = value !== undefined ? value : inner;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 0,
      borderBottom: '2px solid var(--border-default)'
    }
  }, tabs.map(t => {
    const v = t.value ?? t,
      l = t.label ?? t,
      on = v === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => {
        setInner(v);
        onChange && onChange(v);
      },
      style: {
        height: 44,
        padding: '0 18px',
        marginBottom: -2,
        background: on ? 'var(--brand-primary)' : 'transparent',
        color: on ? 'var(--flj-white)' : 'var(--text-body)',
        border: 'none',
        borderBottom: on ? '2px solid var(--brand-primary)' : '2px solid transparent',
        font: '700 13px/1 var(--font-display)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        borderRadius: 'var(--radius-1) var(--radius-1) 0 0'
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Events.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Events({
  openEvent
}) {
  const {
    Tabs,
    Tag,
    EventCard
  } = window.FabLabJoinvilleDesignSystem_83fd60;
  const [filter, setFilter] = React.useState(null);
  const tags = ['Robótica', 'Laser', 'Impressão 3D', 'Comunidade'];
  const list = window.FLJ_EVENTS.filter(e => !filter || e.tag === filter);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--gutter) var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      color: 'var(--text-accent)',
      marginBottom: 12
    }
  }, "// AGENDA"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 0 32px',
      font: 'var(--type-h1)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-display)'
    }
  }, "Eventos & oficinas"), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Próximos', 'Passados']
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      margin: '24px 0 32px'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    selected: filter === t,
    onClick: () => setFilter(filter === t ? null : t)
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
      gap: 24
    }
  }, list.map(e => /*#__PURE__*/React.createElement(EventCard, _extends({
    key: e.id
  }, e, {
    onClick: () => openEvent(e)
  }))))));
}
function EventDetail({
  ev,
  back
}) {
  const {
    Button,
    Badge,
    Card,
    Input,
    Select,
    Checkbox,
    Radio,
    Dialog,
    Toast,
    Icon
  } = window.FabLabJoinvilleDesignSystem_83fd60;
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--space-7) var(--gutter) var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "arrow-left",
    onClick: back
  }, "Voltar"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)',
      gap: 'var(--space-7)',
      marginTop: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "primary"
  }, ev.kind), ev.badge && /*#__PURE__*/React.createElement(Badge, {
    tone: ev.badgeTone || 'accent'
  }, ev.badge)), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-display)',
      textWrap: 'balance'
    }
  }, ev.title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--text-muted)',
      maxWidth: '60ch'
    }
  }, ev.description), /*#__PURE__*/React.createElement(window.Photo, {
    label: ev.title,
    style: {
      aspectRatio: '16/9',
      border: '2px solid var(--border-default)',
      margin: '24px 0'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)'
    }
  }, "O que voc\xEA vai aprender"), /*#__PURE__*/React.createElement("ul", {
    style: {
      font: 'var(--type-body)',
      paddingLeft: 20,
      lineHeight: 1.8
    }
  }, /*#__PURE__*/React.createElement("li", null, "Seguran\xE7a e opera\xE7\xE3o das m\xE1quinas"), /*#__PURE__*/React.createElement("li", null, "Fluxo completo: arquivo \u2192 m\xE1quina \u2192 pe\xE7a"), /*#__PURE__*/React.createElement("li", null, "Boas pr\xE1ticas de documenta\xE7\xE3o do projeto"))), /*#__PURE__*/React.createElement(Card, {
    padding: 24,
    style: {
      position: 'sticky',
      top: 96,
      boxShadow: 'var(--shadow-offset)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14,
      font: '500 14px var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 18
  }), ev.day, " ", ev.month, " 2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 18
  }), ev.time), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 18
  }), ev.place), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 18
  }), "12 vagas \xB7 gratuito")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    variant: "accent",
    size: "lg",
    onClick: () => setOpen(true)
  }, "Inscrever-se")), done && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Inscri\xE7\xE3o confirmada"
  }, "Enviamos os detalhes por e-mail.")))), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    title: "Inscri\xE7\xE3o",
    onClose: () => setOpen(false),
    width: 520,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setOpen(false)
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setOpen(false);
        setDone(true);
      }
    }, "Confirmar"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nome",
    placeholder: "Seu nome completo"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "E-mail",
    placeholder: "voce@exemplo.com"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Voc\xEA \xE9",
    options: ['Estudante', 'Maker', 'Pesquisador(a)', 'Empresa']
  }), /*#__PURE__*/React.createElement(Radio, {
    options: ['Iniciante', 'Já usei as máquinas'],
    defaultValue: "Iniciante",
    direction: "row"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Aceito o regulamento e as regras de seguran\xE7a"
  })))));
}
Object.assign(window, {
  Events,
  EventDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Events.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
function SiteFooter() {
  const {
    Input,
    Button,
    Icon
  } = window.FabLabJoinvilleDesignSystem_83fd60;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--gutter) var(--space-6)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.2fr) repeat(2,minmax(0,1fr))',
      gap: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/marca-branco.svg",
    alt: "Fab Lab Joinville",
    style: {
      height: 64
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-small)',
      color: 'var(--flj-navy-100)',
      maxWidth: '36ch',
      marginTop: 20
    }
  }, "Makerspace sem fins lucrativos de fabrica\xE7\xE3o digital aberta em Joinville/SC.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      alignContent: 'start',
      font: 'var(--type-small)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      color: 'var(--flj-laser-500)'
    }
  }, "// CONTATO"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 16
  }), "Joinville, SC"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 16
  }), "contato@fablabjoinville.com.br"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 16
  }), "@fablabjoinville")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      color: 'var(--flj-laser-500)'
    }
  }, "// NOVIDADES"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-small)',
      color: 'var(--flj-navy-100)'
    }
  }, "Receba a agenda de oficinas e hackathons."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "seu@email.com",
    style: {
      flex: 1,
      minWidth: 0,
      height: 44,
      padding: '0 12px',
      border: '2px solid var(--flj-white)',
      background: 'transparent',
      color: 'var(--flj-white)',
      font: 'var(--type-body)',
      borderRadius: 'var(--radius-1)'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse"
  }, "OK")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '16px var(--gutter)',
      borderTop: '1px solid var(--flj-navy-600)',
      font: '12px var(--font-mono)',
      color: 'var(--flj-navy-300)'
    }
  }, "\xA9 2026 Fab Lab Joinville"));
}
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
function SiteHeader({
  page,
  go
}) {
  const {
    Button
  } = window.FabLabJoinvilleDesignSystem_83fd60;
  const links = [['inicio', 'Início'], ['eventos', 'Eventos'], ['espaco', 'O Espaço'], ['parceiros', 'Parceiros']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--surface-page)',
      borderBottom: '2px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      height: 'var(--header-h)',
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go('inicio'),
    style: {
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/marca-azul.svg",
    alt: "Fab Lab Joinville",
    style: {
      height: 44
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 4,
      marginLeft: 'auto'
    }
  }, links.map(([k, l]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    onClick: () => go(k),
    style: {
      cursor: 'pointer',
      textDecoration: 'none',
      padding: '8px 12px',
      font: '700 13px/1 var(--font-display)',
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      color: page === k ? 'var(--flj-white)' : 'var(--text-body)',
      background: page === k ? 'var(--brand-primary)' : 'transparent',
      borderRadius: 'var(--radius-1)'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      font: '700 12px var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "PT"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-subtle)'
    }
  }, "/ EN")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "accent",
    onClick: () => go('eventos')
  }, "Participe")));
}
window.SiteHeader = SiteHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Photo({
  label,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--flj-navy-100)',
      display: 'flex',
      alignItems: 'flex-end',
      padding: 12,
      boxSizing: 'border-box',
      font: '500 12px var(--font-mono)',
      color: 'var(--text-muted)',
      ...style
    }
  }, "[foto] ", label);
}
function Section({
  eyebrow,
  title,
  children,
  bg,
  inverse,
  action
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: bg || 'transparent',
      color: inverse ? 'var(--text-inverse)' : 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24,
      marginBottom: 'var(--space-7)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--flj-laser-500)' : 'var(--text-accent)',
      marginBottom: 12
    }
  }, "// ", eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--type-h2)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-display)',
      maxWidth: '20ch'
    }
  }, title)), action), children));
}
function Home({
  go,
  openEvent
}) {
  const {
    Button,
    EventCard,
    Card,
    Icon
  } = window.FabLabJoinvilleDesignSystem_83fd60;
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: '2px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)',
      gap: 'var(--space-8)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--ls-label)',
      color: 'var(--text-accent)',
      marginBottom: 20
    }
  }, "// MAKERSPACE \xB7 JOINVILLE/SC"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-display)',
      fontSize: 'clamp(44px,6vw,80px)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-display)'
    }
  }, "Aprenda", /*#__PURE__*/React.createElement("br", null), "fazendo."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--text-muted)',
      maxWidth: '46ch',
      margin: '24px 0 32px'
    }
  }, "Espa\xE7o aberto de fabrica\xE7\xE3o digital sem fins lucrativos. Oficinas, hackathons e eventos para estudantes, makers, pesquisadores e empresas."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => go('eventos')
  }, "Ver agenda"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => go('espaco')
  }, "Conhe\xE7a o espa\xE7o"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      margin: '0 20px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '20px -20px -20px 20px',
      border: '2px solid var(--border-default)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '10px -10px -10px 10px',
      background: 'var(--brand-primary)'
    }
  }), /*#__PURE__*/React.createElement(Photo, {
    label: "hackathon / bra\xE7os SO-101",
    style: {
      position: 'relative',
      aspectRatio: '4/3',
      border: '2px solid var(--border-default)'
    }
  })))), /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Agenda",
    title: "Pr\xF3ximos eventos",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      iconRight: "arrow-right",
      onClick: () => go('eventos')
    }, "Todos os eventos")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
      gap: 24
    }
  }, window.FLJ_EVENTS.slice(0, 3).map(e => /*#__PURE__*/React.createElement(EventCard, _extends({
    key: e.id
  }, e, {
    onClick: () => openEvent(e)
  }))))), /*#__PURE__*/React.createElement(Section, {
    eyebrow: "O que fazemos",
    title: "Do arquivo ao objeto",
    bg: "var(--surface-inverse)",
    inverse: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 24
    }
  }, [['printer', 'Impressão 3D', 'FDM e resina para protótipos e peças funcionais.'], ['scissors', 'Corte a laser', 'MDF, acrílico e tecido, do desenho vetorial à peça.'], ['bot', 'Robótica', 'Braços robóticos, Arduino e visão computacional.'], ['users', 'Comunidade', 'Hackathons e encontros abertos com universidades e indústria.']].map(([i, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      borderTop: '2px solid var(--flj-white)',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 28,
    color: "var(--flj-laser-500)"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h4)',
      margin: '16px 0 8px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-small)',
      color: 'var(--flj-navy-100)'
    }
  }, d))))), /*#__PURE__*/React.createElement(Partners, null));
}
function Partners() {
  return /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Parceiros",
    title: "Quem constr\xF3i com a gente"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
      border: '2px solid var(--border-default)'
    }
  }, ['UDESC · MobiLab', 'UFSC', 'NVIDIA', 'Creality'].map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p,
    style: {
      height: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderLeft: i ? '2px solid var(--border-default)' : 'none',
      font: '700 16px var(--font-display)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, p))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-small)',
      color: 'var(--text-subtle)',
      marginTop: 12
    }
  }, "Logos de parceiros: substituir por arquivos oficiais."));
}
Object.assign(window, {
  Home,
  Photo,
  Section,
  Partners
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Space.jsx
try { (() => {
function Space() {
  const {
    Card,
    Badge,
    Tooltip,
    IconButton
  } = window.FabLabJoinvilleDesignSystem_83fd60;
  const machines = [['Cortadora a laser', 'CO₂ 100W', '1300×900 mm', 'Laser'], ['Impressora 3D FDM', 'Creality', '300×300×400 mm', '3D'], ['Impressora 3D resina', 'MSLA 8K', '218×123×250 mm', '3D'], ['Fresadora CNC', 'Router 3 eixos', '1200×1200 mm', 'CNC'], ['Braço robótico', 'SO-101 · 6 DOF', 'LeRobot', 'Robótica'], ['Bancada de eletrônica', 'Solda, osciloscópio', 'Arduino, ESP32', 'Eletrônica']];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(window.Section, {
    eyebrow: "O espa\xE7o",
    title: "M\xE1quinas & bancadas"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
      gap: 24
    }
  }, machines.map(([n, m, a, t]) => /*#__PURE__*/React.createElement(Card, {
    key: n,
    interactive: true,
    padding: 0
  }, /*#__PURE__*/React.createElement(window.Photo, {
    label: n,
    style: {
      aspectRatio: '16/9',
      borderBottom: '2px solid var(--border-default)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h4)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13px/1.6 var(--font-mono)',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, m, " \xB7 ", a)), /*#__PURE__*/React.createElement(Badge, null, t)))))), /*#__PURE__*/React.createElement(window.Section, {
    eyebrow: "Como funciona",
    title: "Acesso aberto em 3 passos",
    bg: "var(--surface-paper)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 24
    }
  }, [['01', 'Faça uma oficina', 'Toda máquina exige uma oficina introdutória de segurança.'], ['02', 'Agende o horário', 'Reserve a máquina pela agenda do lab.'], ['03', 'Fabrique & documente', 'Compartilhe seu projeto com a comunidade.']].map(([n, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 56px/1 var(--font-display)',
      color: 'var(--brand-accent)'
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)',
      margin: '12px 0 6px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-body)',
      color: 'var(--text-muted)'
    }
  }, d))))));
}
window.Space = Space;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Space.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
window.FLJ_EVENTS = [{
  id: 'lerobot',
  day: '18',
  month: 'OUT',
  kind: 'Hackathon',
  title: 'LeRobot Arm Hackathon',
  description: '48h construindo e treinando braços robóticos SO-101 com IA.',
  place: 'Fab Lab Joinville',
  time: 'Sáb–Dom',
  badge: 'Inscrições abertas',
  tag: 'Robótica'
}, {
  id: 'laser',
  day: '25',
  month: 'OUT',
  kind: 'Oficina',
  title: 'Introdução ao corte a laser',
  description: 'Do vetor à peça: segurança, materiais e primeiro projeto.',
  place: 'Fab Lab Joinville',
  time: '14h–17h',
  badge: 'Últimas vagas',
  tag: 'Laser'
}, {
  id: 'print3d',
  day: '08',
  month: 'NOV',
  kind: 'Oficina',
  title: 'Impressão 3D para iniciantes',
  description: 'Modelagem básica, fatiamento e impressão com Creality.',
  place: 'Fab Lab Joinville',
  time: '09h–12h',
  badge: 'Iniciante',
  badgeTone: 'neutral',
  tag: 'Impressão 3D'
}, {
  id: 'openday',
  day: '15',
  month: 'NOV',
  kind: 'Evento',
  title: 'Open Lab: portas abertas',
  description: 'Conheça o espaço, as máquinas e os projetos da comunidade.',
  place: 'Fab Lab Joinville',
  time: '10h–16h',
  badge: 'Gratuito',
  badgeTone: 'success',
  tag: 'Comunidade'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.EventCard = __ds_scope.EventCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
