---
title: Variáveis e Simbologia
topic: programação
description: Descrevendo o conceito de variáveis para quem nunca programou
date: 2025-04-05
tags:
  - variaveis
  - logica-de-programacao
  - conceitos-basicos
  - programacao
  - logica
author: Vitor Hugo
---

## Variáveis e Simbologia

Depois da primeira aula envolvendo programação com Python no meu curso técnico de Desenvolvimento de Sistemas, percebi que a maior dificuldade de alguns colegas foi entender os significados de símbolos que usamos no código e os conceitos básicos de variável, então decidi descrevê-los da melhor forma que consigo, espero que ajude!

### Por que é importante entender o conceito?

Todas as linguagens de programação tem uma base conceitual padronizada para que seja possível programar o computador. Ou seja, entendendo o conceito geral você poderá usar variáveis em todas as linguagens de programação sem ter que reaprender ou travar quando o código for um pouco diferente.

Ademais, para o aprendizado da computação é necessário entender a base para que seja possível aprender conceitos mais complexos no futuro.

### O que é um programa e porque queremos criar um?

Em primeiro lugar, um programa é um apanhado de operações que transformam as informações (dados) para alcançarmos um resultado. Por exemplo, o programa mais básico do mundo, a calculadora, recebe duas informações (dois números) e realiza uma operação (adição, subtração, etc), a fim de descobrirmos o resultado.

### Simbologia na Programação

De início, é importante conhecer alguns dos símbolos e jargões comumente usados na programação, pois, não necessariamente eles tem o mesmo significado que aprendemos na escola, por exemplo, o símbolo “=” (igual) não significa igualdade, e sim, representa a atribuição de uma informação ou como aprendemos com Professor Guanabara, o símbolo “recebe”.

A seguir, a descrição e explicação dos símbolos para facilitar a compreensão do código para quem nunca teve contato com a tecnologia:

- **Parêntesis ():** Indica o começo e fim de uma instrução para a operação desejada, ou seja, os dados que serão usados na operação, pode ser um texto ou número.
- **Aspas “ ”** ou **‘ ’:** Indica o começo e o fim de um texto, seja ele usado para mostrar ao usuário ou como informação para operações.
- **Igual = (Recebe): I**ndica uma atribuição, ou seja, usado para armazenar a informação dentro de uma variável.
- **Jogo da velha #:** Representa o início de um comentário, usado para explicação.

**EXEMPLOS:**

```py
numero = 5 #Siginifica: variável numero recebe 5  
nome = "Ronaldo" #Significa: variável nome recebe o texto Ronaldo  
fruta = input("Digite uma fruta") #Variável fruta recebe uma entrada do usuário  

print(nome) #O resultado impresso no terminal seria "Ronaldo"  
            #Valor atribuído a variável nome
```

### Conceito de Variáveis

As variáveis no ambiente de programação representam um espaço para armazenamento de informações que usamos para realizar as operações necessárias para cumprir o objetivo do programa. **Pense nelas como caixas vazias que guardamos um objeto para utilizá-lo depois.**

![Imagem de um armário com gavetas representando o espaço das variáveis](https://miro.medium.com/v2/resize:fit:695/1*KY11xozS52pUO8mfibr-dA.png)

Elas podem armazenar diferentes tipos de informações, são eles:

- **Texto:** “Belo Horizonte”. (Lembre-se das aspas)
- **Número (Inteiro ou decimal):** 2 ou 2.5.
- **Valores lógicos:** Verdadeiro ou Falso.

Em resumo, elas são importantes para reutilizarmos os dados nas operações e para que não seja necessário reescrevê-los todas as vezes que executarmos uma nova operação.

### Nomes de Variáveis

As palavras ou letras usadas para se referir as variáveis (como “nome” no exemplo de código anterior) são apenas representações para o espaço onde a informação está guardada, ou seja, ao invés de _“nome”_ eu poderia usar _“celular”_ e o texto _“Ronaldo”_ ainda estaria armazenado na variável da mesma forma e o resultado seria o mesmo.

> O CEP é um exemplo de representação para a rua aonde você mora.

Em todas as linguagens de programação existem uma série de regras para definição dos nomes das variáveis, são elas:

- Uma variável deve iniciar com uma letra ou um caractere underscore \_
- Uma variável não pode ter espaço.
- Uma variável não pode começar com um número.
- O nome de uma variável pode conter apenas caracteres alfanuméricos e underscore (A-z, 0–9, e ).
- Nomes de variáveis são case sensitive (idade, Idade e IDADE são três variáveis diferentes).

### Padrões

Além disso, usamos padrões para que o código fique legível e facilite o entendimento de qual informação a variável está armazenando, ou seja, variáveis devem possuir nomes descritivos e significativos.

Se você deseja armazenar o nome do usuário, faz mais sentido a variável se chamar _“nomeDoUsuario”_ do que _“banana”_ ou _“x”,_ esta prática vai te permitir identificar rapidamente quais os dados que você vai usar na próxima operação.

### Considerações

Para encerrar, é válido dizer que entender os conceitos é mais importante que saber reproduzir um código que funciona, são eles que fazem a mágica acontecer.

Acompanhe os próximos artigos!
