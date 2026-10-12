function Space() {
  const { Card, Badge, Tooltip, IconButton } = window.FabLabJoinvilleDesignSystem_83fd60;
  const machines = [['Cortadora a laser','CO₂ 100W','1300×900 mm','Laser'],['Impressora 3D FDM','Creality','300×300×400 mm','3D'],['Impressora 3D resina','MSLA 8K','218×123×250 mm','3D'],['Fresadora CNC','Router 3 eixos','1200×1200 mm','CNC'],['Braço robótico','SO-101 · 6 DOF','LeRobot','Robótica'],['Bancada de eletrônica','Solda, osciloscópio','Arduino, ESP32','Eletrônica']];
  return <main>
    <window.Section eyebrow="O espaço" title="Máquinas & bancadas">
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:24}}>
        {machines.map(([n,m,a,t])=><Card key={n} interactive padding={0}>
          <window.Photo label={n} style={{aspectRatio:'16/9',borderBottom:'2px solid var(--border-default)'}}/>
          <div style={{padding:20,display:'flex',justifyContent:'space-between',gap:12,alignItems:'flex-start'}}><div>
            <div style={{font:'var(--type-h4)'}}>{n}</div><div style={{font:'500 13px/1.6 var(--font-mono)',color:'var(--text-muted)',marginTop:4}}>{m} · {a}</div></div><Badge>{t}</Badge></div>
        </Card>)}
      </div>
    </window.Section>
    <window.Section eyebrow="Como funciona" title="Acesso aberto em 3 passos" bg="var(--surface-paper)">
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:24}}>
        {[['01','Faça uma oficina','Toda máquina exige uma oficina introdutória de segurança.'],['02','Agende o horário','Reserve a máquina pela agenda do lab.'],['03','Fabrique & documente','Compartilhe seu projeto com a comunidade.']].map(([n,t,d])=>
          <div key={n}><div style={{font:'800 56px/1 var(--font-display)',color:'var(--brand-accent)'}}>{n}</div><h3 style={{font:'var(--type-h3)',margin:'12px 0 6px'}}>{t}</h3><p style={{margin:0,font:'var(--type-body)',color:'var(--text-muted)'}}>{d}</p></div>)}
      </div>
    </window.Section>
  </main>;
}
window.Space = Space;
