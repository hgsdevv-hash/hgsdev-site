# HGS Dev | Site

Site da HGS Dev, estúdio de criação de sites (landing pages, sites institucionais e portfólios).

## Estrutura

```
index.html      # a página inteira
css/style.css   # visual (cores e fontes no topo, em :root)
js/main.js      # letreiro neon, cursor de mãozinha, assistente "Monte seu site", modal de projetos
img/            # capturas dos projetos, favicon e imagem de compartilhamento
```

## Interações

- Letreiro "Sites que trazem clientes": o mouse é um holofote que acende as letras; sem ninguém mexendo, ele pisca sozinho
- Abre sempre no tema escuro; o botão na barra do topo troca para o claro durante a visita
- Seção de presença digital com teste rápido de busca no Google
- Cursor de mãozinha que balança ao mover e aperta no clique
- Janelas de projeto que rolam o site no hover e abrem ao vivo em computador ou celular
- Assistente que monta um rascunho de site e envia o pedido pronto para o WhatsApp

## Privacidade e LGPD

- `privacidade.html` (política, com a tabela de armazenamento local em #cookies) e `termos.html`, ligadas no rodapé
- Sem cookies e sem rastreamento; só `hgs-tip` e `hgs-aviso` no armazenamento local
- Fontes hospedadas no próprio site (`fonts/` + `css/fonts.css`), sem chamar o Google Fonts
- Aviso de privacidade em `js/aviso.js`
- As notas de qualidade aparecem como meta medida na entrega, sem garantia de posição no Google (ver `termos.html#resultados`)

## Pendências

- Incluir CNPJ (ou CPF, se for pessoa física) e um e-mail de contato no rodapé e na política
- Autorização por escrito dos clientes cujos sites aparecem no portfólio

## Como abrir

Abra o `index.html` no navegador. Não precisa instalar nada.
