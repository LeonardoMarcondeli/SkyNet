# 🧠 FrontSkynet – Interface de Monitoramento Inteligente

**FrontSkynet** é o frontend moderno e responsivo do sistema de detecção de violência em tempo real. Construído com **Next.js 15**, **React 19**, **TailwindCSS 4** e **PrimeReact**, este projeto oferece uma interface amigável para visualização de alertas, histórico de incidentes e configuração do sistema de IA que roda no backend FastAPI.

---

## ✨ Tecnologias Utilizadas

- **Next.js 15** – Framework fullstack com suporte a roteamento e render SSR/CSR
- **React 19** – Biblioteca moderna e declarativa de componentes
- **Tailwind CSS 4** – Estilização utilitária de alta produtividade
- **PrimeReact 10** – Componentes visuais ricos e acessíveis
- **TypeScript 5** – Tipagem estática para segurança em tempo de desenvolvimento

---

## 📁 Estrutura do Projeto

src/
└── app/
├── components/
│ ├── About.tsx # Página sobre o projeto
│ ├── Dashboard.tsx # Dashboard principal com cards e dados
│ ├── HomeNavbar.tsx # Navbar da landing page
│ ├── Login.tsx # Componente de login
│ └── Navbar.tsx # Navbar principal logada
├── about/page.tsx # Rota: /about
├── dashboard/page.tsx # Rota: /dashboard
├── incidents/page.tsx # Rota: /incidents
├── login/page.tsx # Rota: /login
├── settings/page.tsx # Rota: /settings
├── layout.tsx # Layout global com Navbar
├── page.tsx # Página inicial
└── globals.css # Estilos globais (Tailwind importado aqui)

outros arquivos:

next.config.ts # Configurações do Next.js

tsconfig.json # Configurações do TypeScript

README.md # Este arquivo

yaml
Copy
Edit

---

## 🚀 Scripts Disponíveis

| Comando          | Descrição                                 |
|------------------|-------------------------------------------|
| `npm run dev`    | Inicia o servidor de desenvolvimento       |
| `npm run build`  | Gera o build de produção                   |
| `npm start`      | Inicia o servidor com build gerado         |
| `npm run lint`   | Verifica erros de lint com ESLint          |

---

## 🌐 Funcionalidades

- 🔒 Autenticação de acesso via tela de login
- 📊 Dashboard com estatísticas em tempo real
- 🧾 Página de incidentes com detalhes de cada alerta detectado
- ⚙️ Página de configurações para controle dos alertas
- 🧠 Página "Sobre" explicando o propósito da IA e princípios éticos

---

## ⚙️ Como Rodar

### 1. Instale as dependências

```bash
npm install
2. Inicie em modo dev
bash
Copy
Edit
npm run dev
Acesse: http://localhost:3000

🧩 Integração com o Backend (FastAPI)
Este projeto se comunica com a API FastAPI em:

http://localhost:8001/status_view

http://localhost:8001/video_feed

http://localhost:8001/incidents

http://localhost:8001/update_settings

Certifique-se que o backend está rodando corretamente antes de acessar as páginas.

💅 Estilização
Estilização baseada em Tailwind CSS para responsividade e agilidade

PrimeReact com tema adaptado para dark/light mode

Visual minimalista com foco em dados críticos

📦 Dependências
json
Copy
Edit
{
  "next": "15.3.1",
  "primereact": "^10.9.5",
  "primeicons": "^7.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
✍️ Exemplo de Página: /dashboard
Exibe cards de estatísticas usando PrimeReact/Card, conectando-se à API /status_view.

tsx
Copy
Edit
<Card title="Detecções">
  <p>Total: {stats.totalAlerts}</p>
</Card>
📚 Próximas Melhorias
Autenticação JWT + proteção de rotas

Notificações em tempo real com WebSockets

Histórico filtrável de incidentes

Painel administrativo para ajustes de IA

🧠 Propósito Ético
O FrontSkynet serve como ponte entre tecnologia e sociedade, oferecendo uma ferramenta visual transparente e ética para supervisão de IA voltada à segurança pública.

🪪 Licença
UNISAL © 2025 – FrontSkynet por Tilapia Mecânica