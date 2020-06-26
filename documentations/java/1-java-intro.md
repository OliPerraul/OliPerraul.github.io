---
slug: java-intro
order: 1
title: 1. Introduction à Java
author: Charline Unternährer
tag: java
---

# Apprendre à programmer en Java

## Table des matières
---

1. Introduction à la programmation
2. Les variables
3. Les branchements conditionnels
4. Les itérations
5. Les boucles conditionnelles
6. Les structures de contrôle
7. Les types de données
8. Les structures de données
9. Les méthodes
10. La programmation orientée objet


## 1.1. Introduction à la programmation
---

Toutes les applications que nous utilisons quotidiennement sont créées grâce à la programmation. Mais qu'est-ce que la programmation ? Il s'agit d'instructions bien précises que l'on transmet à l'ordinateur pour qu'il puisse faire ce qu'on lui demande.

Ce qui est important de garder en tête, c'est que l'ordinateur exécute bêtement ce qu'on lui dit, ligne par ligne. On peut comparer un programme informatique à une recette de cuisine. Si on veut réussir notre plat, il faut qu'on lise les informations les unes après les autres et qu'on respecte dans l'ordre les instructions à accomplir.

Nous allons donc découvrir différents éléments de programmation et faire des petits exercices pratiques au fur et à mesure. Ne faites pas de copier-coller, mais écrivez à chaque fois par vous-mêmes. Il y a deux raisons pour lesquelles on vous demande d'éviter de copier : 

1. Beaucoup d'erreurs dans un programme proviennent d'un copier-coller non attentif, c'est-à-dire mal fait.
2. Pour apprendre, il faut s'exercer et pratiquer !

Avant de commencer, voici l'exemple d'un petit programme : 

````java
class FirstProgram {
    public static void main(String[] args) {
        // TODO
        System.out.println("Hello World");
    }
}
````

lors de l'exécution de ce programme, vous obtiendrez le résultat suivant affichez à  la console:
```
> Hello World
``` 

N'ayez pas peur si vous ne comprenez pas tout ce qui est écrit. À ce stade, la seule chose à comprendre, c'est que tout programme a un contexte. Le tout est dans une classe `FirstProgram` qui possède une méthode `main`. C'est à l'intérieur de cette méthode que nous allons pouvoir écrire du code (à la suite du `TODO`).

<img class="w-50 center" src="../../assets/tutorialquest/gif/win-game-over.gif">
