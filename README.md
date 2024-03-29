# Projeto IPM

Este projeto foi realizado para a disciplina de Interação Pessoa Máquina.

## BakeOff 1

### Protótipo
[Visualizar Protótipo do BakeOff 1](https://www.figma.com/proto/wuEETwEaNcJHcjdmQUdEqs/IPM3L12_G44?type=design&node-id=353-6712&t=VnNytFYOwZUNoWyx-1&scaling=scale-down&page-id=353%3A2040&starting-point-node-id=353%3A6709&mode=design), um protótipo interativo para o redesign da interface do usuário do site [Quizzes-Tutor](https://quizzes-tutor.tecnico.ulisboa.pt/) do IST.

### Objetivo
O objetivo do primeiro bake-off era criar uma interface móvel que suportasse as funcionalidades do sistema Quizzes-Tutor para estudantes. O objetivo era projetar um protótipo interativo de alta fidelidade com uma interface fácil, rápida e atrativa.

Do ponto de vista do aluno, o sistema Quizzes-Tutor permite acesso e conclusão de quizzes de disciplinas inscritas. Cada quiz está associado a datas de início e término, datas de publicação de resultados, ordem de tarefas (linear ou aleatória) e a capacidade de retroceder (sim ou não). Após a conclusão dos quizzes, os alunos podem ver os resultados, incluindo o número de respostas incorretas em relação ao total de questões.

## BakeOff 2

### Objetivo

O objetivo do segundo bake-off era diminuir o tempo de seleção de alvos em uma interface densa (80 alvos). Um [código-fonte](https://editor.p5js.org/IPM23-24/sketches/4iqKAYgI0) em p5.js foi disponibilizado que:

1. Exibe uma grade 8x10 de alvos para os usuários;
2. Atribui uma etiqueta a cada alvo aleatoriamente no início da execução do programa;
3. Indica qual etiqueta de alvo selecionar;
4. Quantifica o desempenho do usuário com base na precisão (0-100%), tempo total da tarefa (segundos), tempo médio por alvo (segundos) e tempo médio por alvo com penalidade (segundos) se a precisão do usuário não for 100%;
5. Salva essas métricas de desempenho na plataforma Firebase.

Para vencer este bake-off, os participantes precisavam modificar o código-fonte fornecido para que os usuários pudessem selecionar os alvos o mais rapidamente possível, considerando a penalidade por erros de seleção.

### Guia de Instalação e Uso

#### Visual Studio Code

Para utilizar este projeto no Visual Studio Code, é necessário instalar a extensão [p5.vscode](https://marketplace.visualstudio.com/items?itemName=samplavigne.p5-vscode). Depois de instalada, execute o comando para criar um projeto p5.js pressionando *(Control + Shift + P no Windows)* e selecionando ``Create p5.js project``. Para visualizar e testar o site, clique em "Go Live" no canto inferior direito e o site estará disponível em localhost:_(porta indicada pelo VS Code)_.
