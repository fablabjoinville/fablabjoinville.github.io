function Photo({ label, style }) {
  return <div style={{background:'var(--flj-navy-100)',display:'flex',alignItems:'flex-end',padding:12,boxSizing:'border-box',font:'500 12px var(--font-mono)',color:'var(--text-muted)',...style}}>[foto] {label}</div>;
}
function Section({ eyebrow, title, children, bg, inverse, action }) {
  return <section style={{background:bg||'transparent',color:inverse?'var(--text-inverse)':'var(--text-body)'}}><div style={{maxWidth:'var(--container)',margin:'0 auto',padding:'var(--space-9) var(--gutter)'}}>
    <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:24,marginBottom:'var(--space-7)',flexWrap:'wrap'}}><div>
      {eyebrow && <div style={{font:'var(--type-label)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:inverse?'var(--flj-laser-500)':'var(--text-accent)',marginBottom:12}}>// {eyebrow}</div>}
      <h2 style={{margin:0,font:'var(--type-h2)',textTransform:'uppercase',letterSpacing:'var(--ls-display)',maxWidth:'20ch'}}>{title}</h2></div>{action}</div>
    {children}</div></section>;
}
function Home({ go, openEvent }) {
  const { Button, EventCard, Card, Icon } = window.FabLabJoinvilleDesignSystem_83fd60;
  return <main>
    <section style={{borderBottom:'2px solid var(--border-default)'}}><div style={{maxWidth:'var(--container)',margin:'0 auto',padding:'var(--space-9) var(--gutter)',display:'grid',gridTemplateColumns:'minmax(0,1.1fr) minmax(0,1fr)',gap:'var(--space-8)',alignItems:'center'}}>
      <div>
        <div style={{font:'var(--type-label)',letterSpacing:'var(--ls-label)',color:'var(--text-accent)',marginBottom:20}}>// MAKERSPACE · JOINVILLE/SC</div>
        <h1 style={{margin:0,font:'var(--type-display)',fontSize:'clamp(44px,6vw,80px)',textTransform:'uppercase',letterSpacing:'var(--ls-display)'}}>Aprenda<br/>fazendo.</h1>
        <p style={{font:'var(--type-body-lg)',color:'var(--text-muted)',maxWidth:'46ch',margin:'24px 0 32px'}}>Espaço aberto de fabricação digital sem fins lucrativos. Oficinas, hackathons e eventos para estudantes, makers, pesquisadores e empresas.</p>
        <div style={{display:'flex',gap:16,flexWrap:'wrap'}}><Button variant="accent" size="lg" iconRight="arrow-right" onClick={()=>go('eventos')}>Ver agenda</Button><Button variant="secondary" size="lg" onClick={()=>go('espaco')}>Conheça o espaço</Button></div>
      </div>
      <div style={{position:'relative',margin:'0 20px 20px 0'}}>
        <div style={{position:'absolute',inset:'20px -20px -20px 20px',border:'2px solid var(--border-default)'}}></div>
        <div style={{position:'absolute',inset:'10px -10px -10px 10px',background:'var(--brand-primary)'}}></div>
        <Photo label="hackathon / braços SO-101" style={{position:'relative',aspectRatio:'4/3',border:'2px solid var(--border-default)'}}/>
      </div></div></section>
    <Section eyebrow="Agenda" title="Próximos eventos" action={<Button variant="ghost" iconRight="arrow-right" onClick={()=>go('eventos')}>Todos os eventos</Button>}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:24}}>
        {window.FLJ_EVENTS.slice(0,3).map(e=><EventCard key={e.id} {...e} onClick={()=>openEvent(e)}/>)}</div>
    </Section>
    <Section eyebrow="O que fazemos" title="Do arquivo ao objeto" bg="var(--surface-inverse)" inverse>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:24}}>
        {[['printer','Impressão 3D','FDM e resina para protótipos e peças funcionais.'],['scissors','Corte a laser','MDF, acrílico e tecido, do desenho vetorial à peça.'],['bot','Robótica','Braços robóticos, Arduino e visão computacional.'],['users','Comunidade','Hackathons e encontros abertos com universidades e indústria.']].map(([i,t,d])=>
          <div key={t} style={{borderTop:'2px solid var(--flj-white)',paddingTop:20}}><Icon name={i} size={28} color="var(--flj-laser-500)"/><h3 style={{font:'var(--type-h4)',margin:'16px 0 8px'}}>{t}</h3><p style={{margin:0,font:'var(--type-small)',color:'var(--flj-navy-100)'}}>{d}</p></div>)}
      </div>
    </Section>
    <Partners/>
  </main>;
}
function Partners() {
  return <Section eyebrow="Parceiros" title="Quem constrói com a gente">
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',border:'2px solid var(--border-default)'}}>
      {['UDESC · MobiLab','UFSC','NVIDIA','Creality'].map((p,i)=><div key={p} style={{height:110,display:'flex',alignItems:'center',justifyContent:'center',borderLeft:i?'2px solid var(--border-default)':'none',font:'700 16px var(--font-display)',textTransform:'uppercase',color:'var(--text-muted)'}}>{p}</div>)}
    </div>
    <p style={{font:'var(--type-small)',color:'var(--text-subtle)',marginTop:12}}>Logos de parceiros: substituir por arquivos oficiais.</p>
  </Section>;
}
Object.assign(window, { Home, Photo, Section, Partners });
