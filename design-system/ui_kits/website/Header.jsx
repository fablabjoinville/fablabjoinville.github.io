function SiteHeader({ page, go }) {
  const { Button } = window.FabLabJoinvilleDesignSystem_83fd60;
  const links = [['inicio','Início'],['eventos','Eventos'],['espaco','O Espaço'],['parceiros','Parceiros']];
  return <header style={{position:'sticky',top:0,zIndex:50,background:'var(--surface-page)',borderBottom:'2px solid var(--border-default)'}}>
    <div style={{maxWidth:'var(--container)',margin:'0 auto',padding:'0 var(--gutter)',height:'var(--header-h)',display:'flex',alignItems:'center',gap:32}}>
      <a onClick={()=>go('inicio')} style={{cursor:'pointer',display:'flex'}}><img src="../../assets/logo/marca-azul.svg" alt="Fab Lab Joinville" style={{height:44}}/></a>
      <nav style={{display:'flex',gap:4,marginLeft:'auto'}}>
        {links.map(([k,l])=><a key={k} onClick={()=>go(k)} style={{cursor:'pointer',textDecoration:'none',padding:'8px 12px',font:'700 13px/1 var(--font-display)',letterSpacing:'.04em',textTransform:'uppercase',color:page===k?'var(--flj-white)':'var(--text-body)',background:page===k?'var(--brand-primary)':'transparent',borderRadius:'var(--radius-1)'}}>{l}</a>)}
      </nav>
      <div style={{display:'flex',gap:6,font:'700 12px var(--font-mono)'}}><span>PT</span><span style={{color:'var(--text-subtle)'}}>/ EN</span></div>
      <Button size="sm" variant="accent" onClick={()=>go('eventos')}>Participe</Button>
    </div>
  </header>;
}
window.SiteHeader = SiteHeader;
