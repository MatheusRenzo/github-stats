# GitHub Stats Generator

Um gerador de estatísticas do GitHub em formato SVG, construído com Next.js e TypeScript.

## 🚀 Funcionalidades

- **Múltiplos cards** organizados por tipo
- **3 temas disponíveis**: Dark, Light e Radical
- **Dados em tempo real** da API do GitHub
- **Interface moderna** e responsiva
- **Estrutura modular** para fácil manutenção

## 📊 O que o card mostra

- ⭐ Total de stars
- 📦 Número de repositórios
- 👥 Seguidores
- 🔀 Total de forks
- 🔤 Top 3 linguagens mais usadas
- 📅 Idade da conta

## 🛠️ Como usar

### 1. Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure a variável de ambiente:
   ```bash
   cp env.example .env.local
   ```
4. Adicione seu token do GitHub no arquivo `.env.local`:
   ```
   GITHUB_TOKEN=seu_token_aqui
   ```

### 2. Executar

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

### 3. Usar o card

Acesse: `http://localhost:3000`

Digite um username do GitHub, escolha um tema e gere o card!

## 📝 Exemplo de uso no README

```markdown
![GitHub Stats](https://seu-dominio.com/api/stats?username=seu-username&theme=dark)
```

## 🎨 Temas disponíveis

- `dark` - Tema escuro (padrão)
- `light` - Tema claro
- `radical` - Tema colorido

## 🔧 API

### Endpoint

```
GET /api/stats?username={username}&theme={theme}
```

### Parâmetros

- `username` (obrigatório): Username do GitHub
- `theme` (opcional): Tema do card (dark, light, radical)

### Exemplo

```
GET /api/stats?username=octocat&theme=dark
```

## 📄 Licença

MIT
