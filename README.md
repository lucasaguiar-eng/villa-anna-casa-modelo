# Villa Anna · Casa Modelo

Casa modelo 3D interativa da Villa Anna (Mingardi & Elias), pensada como produto de venda para o empreendimento.

## O que tem aqui

| Arquivo | Para que serve |
|---|---|
| `index.html` | A casa pronta para publicar: 3D + botão "Quero esta casa" + modo plantão + app (PWA). **Gerado pelo `montar.js`, não editar à mão.** |
| `casa-3d.html` | O 3D original do projeto (versão mais recente recebida). |
| `plantao-leads.html` | Módulo de leads e do modo plantão, injetado no 3D. |
| `manifest.webmanifest`, `sw.js`, `icone-*.png` | Transformam a casa num aplicativo instalável que abre sem internet. |
| `placa.html` | Arte da placa A5 do stand, com QR code. |
| `montar.js` | Junta tudo no `index.html`. |

## Atualizar o 3D

```
node montar.js "C:\Users\...\Downloads\Villa Anna - Casa Modelo_5.html"
```

Gera o `index.html` novo e troca a versão do cache: tablets e celulares pegam a versão nova sozinhos na próxima abertura com internet.

## Três formas de acesso

1. **Celular do cliente (QR / NFC):** placa no stand e divulgação apontando para
   `https://lucasaguiar-eng.github.io/villa-anna-casa-modelo/?wa=55DDDNUMERO`
2. **Tablet do stand (aplicativo):** abrir o link no Chrome do tablet → menu ⋮ → *Instalar app* / *Adicionar à tela inicial*. O ícone abre direto no modo plantão, em tela cheia e sem internet. Depois, fixar o app na tela (Android: *Configurações → Segurança → Fixar app*) para o visitante não sair dele.
3. **Plataforma M&E (interno):** a definir — receber os leads no banco da Plataforma.

## Parâmetros do link

| Parâmetro | Efeito |
|---|---|
| `?plantao` | Modo plantão: tela "Toque para começar", tela cheia, volta ao decorado após 3 min parado |
| `&ocioso=120` | Tempo (s) até voltar ao decorado |
| `&wa=5516...` | WhatsApp do comercial que recebe os leads (fica gravado no aparelho) |
| `?corretor` | Abre o painel do corretor (também: 5 toques no título "Villa Anna") |

## Placa do stand

Abrir `placa.html`, conferir o link, *Imprimir (A5)*. Imprimir em PVC/ACM fosco.

**Etiqueta NFC:** comprar NTAG213 ou NTAG215 adesiva, instalar o app *NFC Tools* no celular → *Gravar* → *Adicionar registro* → *URL* → colar o mesmo link da placa → aproximar da etiqueta. Colar a etiqueta atrás do ícone de NFC da placa.

## Leads

- Vão pelo WhatsApp do comercial (mensagem pronta com a casa montada) e ficam guardados no aparelho.
- Painel do corretor → *Exportar planilha (.csv)*. Exportar com frequência: limpar os dados do navegador apaga os leads do aparelho.
- O cliente marca a autorização de contato (LGPD) antes de enviar.
