# fullcycle-desafio-node-nginx
Desafio: Containers Docker rodando Node com Nginx como proxy reverso, trazendo uma página listando dados inseridos em tabela mysql.
- Baixar e rodar o comando no diretório raiz.
- docker-compose up -d

>A primeira execução, quando não há a pasta mysql criada ainda na máquina, e o node precisa esperar o db ficar pronto, pode levar algum tempo a mais para ficar pronto, mas aguardando a mensagem "magic happens on " no logs do node, vai funcionar.