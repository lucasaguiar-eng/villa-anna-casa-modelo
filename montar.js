// Monta o index.html a partir do 3D que vem do projeto.
// Uso:  node montar.js "C:\Users\...\Downloads\Villa Anna - Casa Modelo_5.html"
// (sem argumento, usa o casa-3d.html já guardado aqui)
const fs = require('fs'), path = require('path');
const aqui = __dirname;
const origem = process.argv[2];
if (origem) fs.copyFileSync(origem, path.join(aqui, 'casa-3d.html'));

let html = fs.readFileSync(path.join(aqui, 'casa-3d.html'), 'utf8');
const modulo = fs.readFileSync(path.join(aqui, 'plantao-leads.html'), 'utf8');
if (html.includes('Mingardi · Leads')) throw new Error('O 3D já contém o módulo de leads: use o arquivo original do projeto.');

const cabeca = `<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#1d2127">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Villa Anna">
<link rel="apple-touch-icon" href="icone-192.png">
<link rel="icon" href="icone-192.png">
`;
const registro = `<script>/* PWA: guarda a casa para abrir sem internet (só em https ou localhost) */
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')) addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
</script>
`;
const iHead = html.indexOf('</head>'), iBody = html.lastIndexOf('</body>');
if (iHead < 0 || iBody < 0) throw new Error('Não achei </head> ou </body> no 3D.');
html = html.slice(0, iHead) + cabeca + html.slice(iHead, iBody) + modulo + registro + html.slice(iBody);
fs.writeFileSync(path.join(aqui, 'index.html'), html);

const versao = new Date().toISOString().replace(/\D/g, '').slice(0, 12);
const sw = fs.readFileSync(path.join(aqui, 'sw.js'), 'utf8').replace(/casa-modelo-[^']*'/, `casa-modelo-${versao}'`);
fs.writeFileSync(path.join(aqui, 'sw.js'), sw);
console.log('index.html montado · versão do cache', versao);
