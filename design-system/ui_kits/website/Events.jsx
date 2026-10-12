function Events({ openEvent }) {
  const { Tabs, Tag, EventCard } = window.FabLabJoinvilleDesignSystem_83fd60;
  const [filter, setFilter] = React.useState(null);
  const tags = ['Robótica','Laser','Impressão 3D','Comunidade'];
  const list = window.FLJ_EVENTS.filter(e => !filter || e.tag === filter);
  return <main><div style={{maxWidth:'var(--container)',margin:'0 auto',padding:'var(--space-8) var(--gutter) var(--space-9)'}}>
    <div style={{font:'var(--type-label)',letterSpacing:'var(--ls-label)',color:'var(--text-accent)',marginBottom:12}}>// AGENDA</div>
    <h1 style={{margin:'0 0 32px',font:'var(--type-h1)',textTransform:'uppercase',letterSpacing:'var(--ls-display)'}}>Eventos & oficinas</h1>
    <Tabs tabs={['Próximos','Passados']}/>
    <div style={{display:'flex',gap:8,flexWrap:'wrap',margin:'24px 0 32px'}}>{tags.map(t=><Tag key={t} selected={filter===t} onClick={()=>setFilter(filter===t?null:t)}>{t}</Tag>)}</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:24}}>{list.map(e=><EventCard key={e.id} {...e} onClick={()=>openEvent(e)}/>)}</div>
  </div></main>;
}
function EventDetail({ ev, back }) {
  const { Button, Badge, Card, Input, Select, Checkbox, Radio, Dialog, Toast, Icon } = window.FabLabJoinvilleDesignSystem_83fd60;
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  return <main><div style={{maxWidth:'var(--container)',margin:'0 auto',padding:'var(--space-7) var(--gutter) var(--space-9)'}}>
    <Button variant="ghost" size="sm" icon="arrow-left" onClick={back}>Voltar</Button>
    <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.6fr) minmax(0,1fr)',gap:'var(--space-7)',marginTop:24,alignItems:'start'}}>
      <div>
        <div style={{display:'flex',gap:8,marginBottom:16}}><Badge tone="primary">{ev.kind}</Badge>{ev.badge && <Badge tone={ev.badgeTone||'accent'}>{ev.badge}</Badge>}</div>
        <h1 style={{margin:0,font:'var(--type-h1)',textTransform:'uppercase',letterSpacing:'var(--ls-display)',textWrap:'balance'}}>{ev.title}</h1>
        <p style={{font:'var(--type-body-lg)',color:'var(--text-muted)',maxWidth:'60ch'}}>{ev.description}</p>
        <window.Photo label={ev.title} style={{aspectRatio:'16/9',border:'2px solid var(--border-default)',margin:'24px 0'}}/>
        <h3 style={{font:'var(--type-h3)'}}>O que você vai aprender</h3>
        <ul style={{font:'var(--type-body)',paddingLeft:20,lineHeight:1.8}}><li>Segurança e operação das máquinas</li><li>Fluxo completo: arquivo → máquina → peça</li><li>Boas práticas de documentação do projeto</li></ul>
      </div>
      <Card padding={24} style={{position:'sticky',top:96,boxShadow:'var(--shadow-offset)'}}>
        <div style={{display:'grid',gap:14,font:'500 14px var(--font-mono)'}}>
          <span style={{display:'flex',gap:10,alignItems:'center'}}><Icon name="calendar" size={18}/>{ev.day} {ev.month} 2026</span>
          <span style={{display:'flex',gap:10,alignItems:'center'}}><Icon name="clock" size={18}/>{ev.time}</span>
          <span style={{display:'flex',gap:10,alignItems:'center'}}><Icon name="map-pin" size={18}/>{ev.place}</span>
          <span style={{display:'flex',gap:10,alignItems:'center'}}><Icon name="users" size={18}/>12 vagas · gratuito</span>
        </div>
        <div style={{marginTop:24}}><Button fullWidth variant="accent" size="lg" onClick={()=>setOpen(true)}>Inscrever-se</Button></div>
        {done && <div style={{marginTop:16}}><Toast tone="success" title="Inscrição confirmada">Enviamos os detalhes por e-mail.</Toast></div>}
      </Card>
    </div>
    <Dialog open={open} title="Inscrição" onClose={()=>setOpen(false)} width={520}
      actions={<><Button variant="ghost" onClick={()=>setOpen(false)}>Cancelar</Button><Button onClick={()=>{setOpen(false);setDone(true);}}>Confirmar</Button></>}>
      <div style={{display:'grid',gap:16}}>
        <Input label="Nome" placeholder="Seu nome completo"/><Input label="E-mail" placeholder="voce@exemplo.com"/>
        <Select label="Você é" options={['Estudante','Maker','Pesquisador(a)','Empresa']}/>
        <Radio options={['Iniciante','Já usei as máquinas']} defaultValue="Iniciante" direction="row"/>
        <Checkbox label="Aceito o regulamento e as regras de segurança"/>
      </div>
    </Dialog>
  </div></main>;
}
Object.assign(window, { Events, EventDetail });
