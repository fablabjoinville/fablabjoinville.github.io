---
title: Conselho
date: 2016-10-03T23:10:12+00:00
author: Alan Fachini
layout: page
conselho:
  - pic: /uploads/2016/10/alan-150x150.jpg
    nome: Alan Rafael Fachini
  - pic: /uploads/2016/10/bruno-150x150.jpg
    nome: Bruno Fuentes
  - pic: /uploads/2016/10/cedric-150x150.png
    nome: Cédric Craze
  - pic: /uploads/2016/10/daniel-150x150.jpg
    nome: Daniel Camargo
  - pic: /uploads/2016/10/diogo-150x150.jpg
    nome: Diogo Trentini
  - pic: /uploads/2016/10/felipe-150x150.jpg
    nome: Felipe Silveira Nunes
  - pic: /uploads/2016/10/guilherme-150x150.jpg
    nome: Guilherme Defreitas Juraszek
  - pic: /uploads/2016/10/jeferson-150x150.jpg
    nome: Jeferson Batista
  - pic: /uploads/2016/10/rogers-150x150.jpg
    nome: Rogers Pereira
  - pic: /uploads/2016/10/romulo-150x150.png
    nome: Romulo Bahiense
  - pic: /uploads/2016/10/13227599_10153645786953225_429195537479665797_o-150x150.jpg
    nome: Wyllian H. Kohn
---

## CONSELHO

O **Fab Lab Joinville** é administrado por um conselho voluntário de diretores. O
conselho é responsável por alcançar a missão da associação e pela saúde
financeira da organização. Qualquer membro do Fab Lab Joinville pode concorrer
ao conselho. Membros são convidados a comparecer às reuniões do conselho.
Verifique nosso calendário de eventos para saber as datas e horários das nossas
reuniões. Caso queria enviar sugestões ou tirar dúvidas com o conselho, nos
envie um email para <contato@fablabjoinville.com.br>.

[Arquivo de Atas](//bit.ly/fablabjoinville-atas){:.btn.btn-primary}
[Seja um Voluntário!](mailto:contato@fablabjoinville){:.btn.btn-primary}

<div class="conselho-membros" style="display: flex; flex-wrap: wrap; max-width: 100%; margin-top: 40px">
{% for membro in page.conselho %}
    <div style="width: 20%; padding: 0 10px; margin-bottom: 20px">
        <img style="border-radius: 50%" src="{{site.baseurl}}{{membro.pic}}"><br>
        <center>{{membro.nome}}</center>
    </div>
{% endfor %}
</div>
