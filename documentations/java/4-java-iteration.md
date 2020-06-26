---
slug: java-iterations
order: 4
title: 4. Les itérations
author: Charline Unternährer
tag: java
---

# 4. Les itérations

On parle d'itération lorsqu'une série d'instructions est **répétée** et que le nombre d'itérations est **connu d'avance**. C'est notamment le cas quand on liste les cinq premiers nombres pairs.

Exemple : 

````java
/* FirstProgram.java */
// package ...
class FirstProgram {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; ++i) {
            System.out.println(2 * i);
        }
    }
}
````

Ce programme affiche : 

````java
/*
    2
    4
    6
    8
    10
*/
````

Si on regarde de plus près cette boucle `for`, nous retrouvons 3 parties : 

- le mot-clé `for` qui annonce l'itération
- les paramètres de l'itération entre les parenthèses
  - la déclaration et initialisation d'une variable (`int i = 1`), celle-ci est crée **qu'une seule fois** à la première itération et ne peut être utilisée qu'au sein de l'itération
  - la condition (`i <= 5`) qui est évaluée **avant** chaque itération
    - si la condition retourne `true`, alors les instructions entre accolades sont exécutées
    - sinon, l'itération est terminée et le programme passe à la suite
  - l'incrémentation (`++i`) qui est effectuée **après** chaque itération et pris en compte dans l'évaluation de la condition pour la prochaine itération
- les instructions entre les accolades

Schéma : 

````java
for (déclaration_initialisation; condition; incrémentation) {
    instructions;
}
````

> ![](../../assets/javadoc/attention.png) Il y a un `;` après chaque instructions du bloc entre accolades, mais il n'y en a pas après les parenthèses du mot-clé `for`.


## 4.1 Paramétrages du `for`
---

**Variable**<br>
La variable à l'intérieur de la boucle `for` est toujours de type `int` !

**Condition**<br>
La condition peut utiliser les opérateurs de comparaison et logiques vus dans le module précédent.

**Incrémentation**<br>
L'incrémentation doit être vu comme un compteur qui peut aller de 1 en 1, comme de 2 en 2, positivement, comme négativement.

Exemples : 
````java
// j prend les valeurs 0, 3, 6, 9
// rappel : j += 3 équivaut à j = j + 3
for (int j = 0; j < 10; j += 3) {
    // Bloc d'instructions
}

// k prend les valeurs 5, 4, 3, 2, 1 
for (int k = 5; k > 0; --k) {
    // Bloc d'instructions
}
````

## 4.2 Boucle infinie
---

Il faut veiller à ce que la condition permette d'être évaluée à `false` à un certaine moment. Si elle est indéfiniment `true`, alors le programme ne sortira jamais de la boucle `for`.

Deux causes sont alors possibles :

1. On s'est trompé sur la condition

    Exemple : 

    ````java
    // m prend les valeur 10, 11, 12, 13, ...
    // m sera toujours suppérieur à 0 !!
    for (int m = 10; m > 0; ++m) {
        // Bloc d'instructions
    }
    ````

2. On s'est trompé sur l'incrémentation

    Exemple : 

    ````java
    // si m est incrémenté à la place de n, alors n ne pourra jamais atteindre la valeur 10
    for (int n = 0; n < 10; ++m) {
        // Bloc d'instructions
    }
    ````