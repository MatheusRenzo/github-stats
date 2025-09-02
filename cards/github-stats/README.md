# GitHub Stats Card

Este card gera estatísticas do GitHub em formato SVG.

## Funcionalidades

- 📊 Estatísticas básicas (repos, estrelas, forks, seguidores)
- 🔤 Top 3 linguagens mais usadas
- 📅 Idade da conta
- 🎨 5 temas disponíveis (Dark, Light, Radical, Neon, Cyber)

## Como usar

### URL da API

```
/api/stats?username=SEU_USERNAME&theme=TEMA
```

### Parâmetros

- `username`: Nome de usuário do GitHub (obrigatório)
- `theme`: Tema do card (opcional, padrão: "dark")
  - `dark`: Tema escuro com efeitos sutis
  - `light`: Tema claro e limpo
  - `radical`: Tema radical com cores vibrantes
  - `neon`: Tema neon com efeitos brilhantes
  - `cyber`: Tema cyberpunk futurista

### Exemplo

```
/api/stats?username=MatheusRenzo&theme=dark
```

### Markdown

```markdown
![GitHub Stats](https://seu-dominio.com/api/stats?username=MatheusRenzo&theme=dark)
```

## Arquivos

- `github-api.ts`: Cliente da API do GitHub
- `svg-generator.ts`: Gerador do SVG
- `types.ts`: Definições de tipos TypeScript
- `README.md`: Documentação
