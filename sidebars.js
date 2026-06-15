// @ts-check

const sidebars = {
  wikiSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Home',
    },
    {
      type: 'doc',
      id: 'guias/guias',
      label: 'Guias',
    },
    {
      type: 'category',
      label: 'Marca',
      items: [
        'marca/marca',
        'marca/tom-e-voz',
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
