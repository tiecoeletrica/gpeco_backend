# gpeco_backend
Backend em node.js da aplicação de gestão de produção (GPECO)
- planjeamento das tabelas do banco de dados [link](https://drawsql.app/teams/ecoeletrica/diagrams/gpeco)
- Planejamento das rotas [link](https://www.notion.so/Planejamento-Backend-Rotas-Resumido-1ce4520dbe1148b5bc47e93d8bc7772b?pvs=4)
- npx insomnia-documenter --config insomnia.json
``` response:201
tacar resposta aqui
```

### rota: /autenticacao

## Descrição

Gera um token de autenticação que dura 1 dia quando a verificação de email e senha são validados

## Parâmetros de envio

A requisição recebe os parâmetros "email" e "senha" através do formato json

| Parâmetro |  Tipo  |  Descrição  |
|:-----------:|:------:|:---------------:|
|     email |string |**Obrigatório**. Email do usuário|
|     senha |string |**Obrigatório**. Senha do usuário|

## Parâmetros de resposta

A requisição retorna um objeto no formato json

```response:201

{
	"colaborador": {
		"id": 8,
		"nome": "otavio",
		"cpf": 12345678,
		"email": "otavio@ecoeletrica.com.br",
		"equipe_id": null,
		"tipo": "ADM",
		"status": 1
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDE4NjIwNjcsImV4cCI6MTcwMTk0ODQ2Nywic3ViIjoiOCJ9.24IlHh-ug65P4Lmfkm8NdyI5qQnA5Bdm-yeIFqXNgZs"
}

```

| Status |  Descrição  |
|:-----------:|:---------------:|
|     200 |cadastro sucedido|
|     400 |erro de cadastro|
|     404 |não autorizado|
