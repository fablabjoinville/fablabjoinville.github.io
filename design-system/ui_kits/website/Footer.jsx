function SiteFooter() {
  const { Input, Button, Icon } = window.FabLabJoinvilleDesignSystem_83fd60;
  return <footer style={{background:'var(--surface-inverse)',color:'var(--text-inverse)'}}><div style={{maxWidth:'var(--container)',margin:'0 auto',padding:'var(--space-8) var(--gutter) var(--space-6)',display:'grid',gridTemplateColumns:'minmax(0,1.2fr) repeat(2,minmax(0,1fr))',gap:'var(--space-7)'}}>
    <div><img src="../../assets/logo/marca-branco.svg" alt="Fab Lab Joinville" style={{height:64}}/><p style={{font:'var(--type-small)',color:'var(--flj-navy-100)',maxWidth:'36ch',marginTop:20}}>Makerspace sem fins lucrativos de fabricação digital aberta em Joinville/SC.</p></div>
    <div style={{display:'grid',gap:10,alignContent:'start',font:'var(--type-small)'}}><div style={{font:'var(--type-label)',letterSpacing:'var(--ls-label)',color:'var(--flj-laser-500)'}}>// CONTATO</div>
      <span style={{display:'flex',gap:8,alignItems:'center'}}><Icon name="map-pin" size={16}/>Joinville, SC</span><span style={{display:'flex',gap:8,alignItems:'center'}}><Icon name="mail" size={16}/>contato@fablabjoinville.com.br</span><span style={{display:'flex',gap:8,alignItems:'center'}}><Icon name="instagram" size={16}/>@fablabjoinville</span></div>
    <div style={{display:'grid',gap:12,alignContent:'start'}}><div style={{font:'var(--type-label)',letterSpacing:'var(--ls-label)',color:'var(--flj-laser-500)'}}>// NOVIDADES</div>
      <p style={{margin:0,font:'var(--type-small)',color:'var(--flj-navy-100)'}}>Receba a agenda de oficinas e hackathons.</p>
      <div style={{display:'flex',gap:8}}><input placeholder="seu@email.com" style={{flex:1,minWidth:0,height:44,padding:'0 12px',border:'2px solid var(--flj-white)',background:'transparent',color:'var(--flj-white)',font:'var(--type-body)',borderRadius:'var(--radius-1)'}}/><Button variant="inverse">OK</Button></div></div>
  </div><div style={{maxWidth:'var(--container)',margin:'0 auto',padding:'16px var(--gutter)',borderTop:'1px solid var(--flj-navy-600)',font:'12px var(--font-mono)',color:'var(--flj-navy-300)'}}>© 2026 Fab Lab Joinville</div></footer>;
}
window.SiteFooter = SiteFooter;
