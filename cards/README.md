# Cards Collection

Esta pasta contém todos os tipos de cards SVG disponíveis, cada um em sua própria pasta com arquivos organizados.

## Estrutura

Cada card tem sua própria pasta com:

- `github-api.ts`: Cliente da API do GitHub
- `svg-generator.ts`: Gerador do SVG
- `types.ts`: Definições de tipos TypeScript
- `README.md`: Documentação específica do card

## Cards Disponíveis

### 📊 GitHub Stats

**Pasta:** `github-stats/`
**API:** `/api/stats`
**Descrição:** Estatísticas gerais do GitHub (repos, estrelas, forks, seguidores)

## Como Adicionar Novos Cards

1. Crie uma nova pasta em `cards/`
2. Adicione os arquivos:
   - `svg-generator.ts`: Função que gera o SVG
   - `types.ts`: Tipos TypeScript específicos
   - `github-api.ts`: Cliente da API (se necessário)
   - `README.md`: Documentação
3. Crie o endpoint da API em `app/api/`
4. Atualize este README

## Exemplo de Estrutura

```
cards/
├── github-stats/
│   ├── github-api.ts
│   ├── svg-generator.ts
│   ├── types.ts
│   └── README.md
└── README.md
```
