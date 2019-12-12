# Blackjack

## Desenvolvimento

O jogo é feito com javascript puro, tentando aplicar alguns conceitos de orientação à objetos e alguns conceitos de programação no geral.

Conforme eu for fazendo, vou estudando alguns conceitos e aplicando no projeto, para posteriormente usar como exemplo em artigos. Por exemplo, irei tentar aplicar alguns design patterns. Eu sei que o ideal é fazer já com isso em mente desde o começo, mas acredito que refatorar o código vai ser muito benéfico.

### 1.0.0

Na primeira versão, desenvolvi a lógica de uma forma mais direta, mas nas outras versões, irei fazendo um code review do meu próprio código, corrigindo erros e refinando algumas partes da aplicação.

Além disso, para a primeira versão, deixei somente a lógica; o ambiente de desenvolvimento e a parte visual ficarão para os próximos releases.

### 1.1.0

Na segunda versão, eu componentizei o código da aplicação e configurei o ambiente de desenvolvimento com o Webpack. Como a ideia era apenas componentizar, ainda não defini a questão de models e controllers, que fazem mais sentido para esse paradigma.

## Objetivo do jogo

O objetivo do jogo é ganhar do croupier, superando-o em valor de pontos sem ultrapassar 21 ou vendo-o ultrapassar 21. Quem passa de 21 perde.  

## Regras

### Valor das cartas

- Cada carta numerada de 2 a 10 tem o seu valor nominal (igual ao número da carta)
- Os valetes, as damas e os reis - as figuras - , têm o valor de 10 pontos
- O Ás vale 1 ponto ou 11 pontos, à escolha do jogador

### Distribuição

- O jogador recebe duas cartas viradas para cima
- O Croupier recebe duas cartas, uma virada para cima e outra para baixo
- Se o jogador tiver um blackjack (21), irá ganhar o jogo, a menos que o croupier também tenha

### Jogador

- O croupier pergunta se o jogador deseja mais alguma carta além das duas recebidas
- O jogador pode pedir (hit) quantas cartas quiser, desde que não exceda 21
- Se estiver satisfeito, o jogador pede para ficar (stand) e é a vez do croupier

### Croupier

- O croupier revela sua carta escondida e há verificação de vencedor; se não houver, segue o jogo
- O croupier irá tirar cartas até que ultrapasse 21, perdendo o jogo, até que chegue a 21, vencendo o jogo, ou até que chegue em 17*, pedindo para ficar (stand)

> Na maioria dos casinos, o croupier deve continuar a tirar até que obtenha um valor de pelo menos 17, aí ficará.

## O jogo

1. User e Croupier recebem 2 cartas, uma das cartas do Croupier é virada
2. Verifica se o User conseguiu Blackjack
3. User começa pedindo cartas (ou passando a vez)
4. Vez do Croupier, pega carta ou passa a vez
5. Volta pro User
6. Compara pontos e revela vencedor
7. Novo jogo
