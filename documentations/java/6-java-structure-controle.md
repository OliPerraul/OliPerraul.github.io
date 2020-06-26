---
slug: java-structures-controle
order: 6
title: 6. Les structures de contrôle
author: Charline Unternährer
tag: java
---

# 6. Les structures de contrôle

Nous avons déjà rencontré les 3 structures de contrôles existantes : 

1. les branchements conditionnels `if`
2. les itérations `for`
3. les boucles conditionnelles `do...while` et `while`

Les structures de contrôles comportent des notions équivalents que nous allons voir ci-dessous.

## 6.1 Blocs d'instructions
---
En java, les instructions peuvent être regroupées en bloc. Elles sont ainsi délimitées par des accolades `{...}`. Et lorsqu'on parle du **corps** d'une structure de contrôle, on fait référence à son bloc d'instructions.

On dit que ces blocs ont une certaine autonomie puisqu'ils peuvent avoir leur propre déclaration et initialisation de variable.

````java
{
    int i = 1;
    ...
    i *= 2;
    ...
}
````

## 6.2 Notion de portée
---

La portée d'une variable, c'est l'ensemble des lignes où cette variable est accessible, c'est-à-dire où elle existe et où l'on peut l'utiliser.

Il existe deux types de variable en termes de portée :

- une variable dite **locale** est déclarée et initialisée à l'intérieur d'un bloc ; elle ne pourra être utilisée qu'à l'intérieur de celui-ci
- une variable dite **globale** est déclarée en dehors de la méthode `main` d'une classe ; elle est accessible dans toute la classe

> ![](../../assets/javadoc/ampoule-astuce.png) La bonne pratique est de déclarer la variable au plus près de son utilisation.
>
> ![](../../assets/javadoc/attention.png) Dans une même portée, deux variables ne peuvent pas avoir le même identificateur ! La bonne pratique est donc de ne pas donner le même nom à deux variables dans un même programme.

Exemple :

```java
/* FirstProgram.java */
// package ...
import java.util.Scanner;

class FirstProgram {
    Scanner scan = new Scanner(System.in); // variable globale

    public static void main(String[] args) {
        boolean greetings = false;
        
        // Si l'on a pas encore salué
        if (!greetings) {
            System.out.println("Salut l'ami-e");
            greetings = true;

            System.out.println("Quel age as-tu ?");
            int age = scan.nextInt(); // age est une variable locale
            // ...
        } 
        // Attention ! A partir d'ici, on ne peut plus utiliser la variable age !
    }
}
```

L'endroit où l'on déclare une variable demande une certaine réflexion. Si dans notre exemple, on n'utilise pas la variable `age` ailleurs que dans le branchement conditionnel `if`, alors ce code est correct. Par contre, si l'on aimerait utiliser la variable `age` encore après le `if`, il aurait fallu la déclarer en dehors du branchement conditionnel, soit après la déclaration de `geetings`.

Lors d'une itération, la variable déclarée entre les parenthèses du paramétrage de la boucle `for` est considérée comme locale à l'itération. Elle ne pourra donc pas être utilisé en dehors. 

````java
for (int i = 0; i < 10; ++i) {
    // ...
}
// A partir d'ici, on ne peut plus utiliser i
````

Il existe aussi les variables dites statiques, on les reconnaît au mot-clé `static` précédent la déterminaison du type de la variable. Cette sorte de variable peut être appelée depuis n'importe quel endroit du programme, même en dehors de la classe dans laquelle elle a été créée.