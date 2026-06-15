// @ts-check

const sidebars = {
  wikiSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Home',
    },
    {
      type: 'category',
      label: 'Sobre',
      link: {
        type: 'doc',
        id: 'sobre/sobre',
      },
      items: [
        'sobre/governanca',
        'sobre/stakeholders',
      ],
    },
    {
      type: 'category',
      label: 'Guias',
      link: {
        type: 'doc',
        id: 'guias/guias',
      },
      items: [
        'guias/impressao-3d',
      ],
    },
    {
      type: 'category',
      label: 'Equipes encubadas',
      link: {
        type: 'doc',
        id: 'equipes/equipes',
      },
      items: [
        'equipes/kosmos-rocketry',
        'equipes/nisus-aerodesign',
        'equipes/botcem',
      ],
    },
    {
      type: 'category',
      label: 'Projetos Incubados',
      link: {
        type: 'doc',
        id: 'projetos/projetos',
      },
      items: [
        'projetos/precious-plastic',
        'projetos/strato-pen',
        'projetos/the-coffee-bearer',
        'projetos/kart-eletrico',
        'projetos/cesta-de-basquete-pro-lixo',
        'projetos/espelho-inteligente',
        'projetos/deimos-e-phobos',
        'projetos/morpheus',
        'projetos/ftk',
        'projetos/atelie-de-couro',
        'projetos/formula-fablab',
        'projetos/robo-que-desenha-na-parede',
        'projetos/inova',
        'projetos/cnc-de-pcb',
        'projetos/tvc-thrust-vector-control',
        'projetos/suporte-de-celular-udesc',
        'projetos/vlk',
        'projetos/ctj-baja-ufsc',
        'projetos/hot-plate',
      ],
    },
    {
      type: 'category',
      label: 'Programas da Associação',
      link: {
        type: 'doc',
        id: 'programas/programas',
      },
      items: [
        'programas/maratona-lab-code',
        'programas/festival-maker',
        'programas/arduino-day',
        'programas/agenda-saude',
        'programas/face-shields',
        'programas/hacktoberfest-2021',
        'programas/archeotech',
        'programas/scratch-nas-escolas',
        'programas/reforma-agora-tech-park-2022',
        'programas/code-like-a-girl',
        'programas/encontro-de-impressao-3d',
      ],
    },
    {
      type: 'category',
      label: 'Marca',
      link: {
        type: 'doc',
        id: 'marca/marca',
      },
      items: [
        'marca/tom-e-voz',
        'marca/linguagem',
        'marca/marcas',
        'marca/cores',
        'marca/tipografia',
        'marca/icones',
        'marca/acessibilidade',
      ],
    },
    {
      type: 'doc',
      id: 'contato',
      label: 'Contato',
    },
  ],
};

module.exports = sidebars;
