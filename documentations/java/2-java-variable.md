---
slug: java-variables
order: 2
title: 2. Les variables
author: Charline Unternährer
tag: java
---

# 2. Les variables

## 2.1 Introduction
---

Une variable possède trois caractéristiques :

1. Son identificateur qui lui sert de nom et qui permet son utilisation.
2. Son type qui définit de quel « genre » est la donnée contenue dans la variable.
3. Sa valeur.

**Nommage** : l'identificateur permet à la variable d'être référée à différents endroits du programme. Lorsque l'on nomme une variable, il y a plusieurs règles à respecter.

- Le nom est composé uniquement de lettres (sans accent), de chiffres et seulement deux symboles sont autorisés : _ et $
- Le nom ne contient pas d'espace
- Le premier caractère est obligatoirement une lettre ou un symbole
- Les majuscules et minuscules sont autorisées, mais ne sont pas équivalentes
  - nom ≠ Nom ≠ NOM
- Le nom ne doit pas être un mot-clé réservé par le langage Java

Tu ne connais pas encore de mot-clé réservé, mais tu en apprendras un certain nombre au fur et à mesure.<br> Exemple de mots-clés : `int`, `double`, etc.

> ![](../../assets/javadoc/ampoule-astuce.png) Bonne pratique : bien que ce ne soit pas obligatoire, il existe une convention que tout bon développeur utilise. Il s'agit de nommer une variable en commençant par une minuscule, puis de mettre une majuscule aux mots suivants.<br>
> Exemple : `myNewVariable` <br>
> Plutôt que : `MyNewVariable` ou `my_new_variable`

Exemples de noms de variables corrects : 

- `myVariable`
- `exemple1`
- `num_12`

Exemples de noms de variables incorrects : 

- `my variable` --> Contient un espace
- `my-variable` --> Contient le symbole `-`
- `1exemple`    --> Commence pour un chiffre

**Typage** : lorsqu'on crée une variable, on lui définit un type. Celui-ci ne pourra plus être modifié par la suite et la valeur attribuée doit obligatoirement correspondre au type défini.<br>

Voici les principaux types élémentaires : 

- `int` pour les valeurs entières
  - Exemple : `int n = 1;`
- `double` pour les valeurs décimales (chiffre à virgule)
  - Exemple : `double m = 1.0;`
  - Tu remarqueras qu'on met un `.` (point) et non une virgule
- `char` pour les caractères (lettres, chiffres ou symboles)
  - Exemple : `char c = 'A';`
  - `char` ne peut contenir qu'un seul caractère
- ...

> ![](../../assets/javadoc/ampoule-astuce.png) Astuce : on peut imager une variable par une boîte qui porte un nom et dans laquelle on peut mettre du contenu.
>
> <img class="center" src="../../assets/javadoc/variable.png"/>


## 2.2 Déclaration
---

La déclaration d'une variable permet de créer une variable. C'est à ce moment-là que le développeur détermine l'identificateur et le type de la variable.<br>

Pour déclarer une variable, il suffit de suivre l'un de ces deux schémas :

````
type identificateur;
````

ou

````
type identificateur = valeur;
````

Il y a deux choses à retenir : premièrement, chaque ligne de code se termine par un `;`, et deuxièmement, une fois défini, le type de la variable ne peut plus changer.

> ![](../../assets/javadoc/ampoule-astuce.png) Astuce : on peut déclarer plusieurs variables de même type en même temps, c'est-à-dire sur la même ligne.<br>
> 
> ![](../../assets/javadoc/attention.png) Néanmoins, il ne faut pas en abuser, et pour des raisons de lisibilité, nous préférons ne pas utiliser ce raccourci.

````java
int x, y;
double a = 2.5, b;
````

## 2.3 Initialisation
---

On parle d'initialisation lorsqu'une valeur est donnée à la variable pendant la déclaration. 

> ![](../../assets/javadoc/attention.png) L'initialisation est très importante puisqu'une variable qui ne contient pas de valeur ne peut pas être utilisée !

Différence entre une simple déclaration et une initialisation.

````java
// Ici on déclare une variable y qui n'a pas encore de valeur, elle ne pourra pas être utilisée tout de suite
int x ;
````

<img class="center" src="../../assets/javadoc/variable-x.png"/>

````java
// Et là on déclare une variable x qui prend 2 comme valeur, elle peut alors être utilisée
int y = 2 ;
````

<img class="center" src="../../assets/javadoc/variable-y.png"/>


## 2.4 Affectation
---
Une affectation est une instruction qui permet à la variable de *changer de valeur*. Si une variable n'a pas été initialisée, mais simplement déclarée, alors grâce à l'affection, on pourra donner une valeur à notre variable puis l'utiliser.

L'affection d'une variable suit toujours le même schéma : 

````
variable = expression;
````

L'exécution d'une affection se déroule toujours en deux temps : 

1. L'expression est évaluée.
2. Le résultat de l'expression est stockée dans la variable et devient sa nouvelle valeur.

> ![](../../assets/javadoc/attention.png) Encore une fois, le résultat de l'expression doit être de même type que la variable, sinon une erreur sera déclenchée et le programme s'arrêtera.


## 2.5 Expressions
---
Une expression peut être simplement une valeur littérale ou une formule qui utilise des opérateurs.<br>
Exemples d'expression : 

- Valeurs littérales
  - `1` de type `int`
  - `1.0` de type `double`
- Formules
  - `n * n` 
  - `x + 3 * y`

> ![](../../assets/javadoc/attention.png) Attention à ne pas confondre une affectation avec une égalité mathématique. Tous les deux utilisent le signe égal `=`, mais l'affectation est un mécanisme dynamique.

De même, ces deux instructions ne sont pas équivalentes : 

````java
a = b; // Copie la valeur de b dans a
b = a; // Copie la valeur de a dans b
````

**En mathématique :**<br>
"b = a + 1" signifie que b est égal à a + 1 quel que soit a, b.

**En Java :**<br>
````java
a = 4; // a prend la valeur de 5
b = a + 1; // b prend la valeur de a + 1, c'est-à-dire 5
a = 1; // a prend la valeur de 1 sans que b soit changé
````

On peut aussi écrire des affectations telles que `a = a + 1;`<br><br>
A condition que `a` ait comme type `int`, cette instruction prend la valeur de `a`, lui ajoute `1`, et met le résultat dans `a`. En somme, la valeur de `a` est incrémentée et l'on peut représenter `a` comme étant une sorte de compteur. Ceci est très utilisé en programmation.

**Opérateurs** : il existe 4 opérateurs principaux.

- `+` pour l'addition
- `-` pour la soustraction
- `*` pour la multiplication
- `/` pour la division

> ![](../../assets/javadoc/attention.png) Si la division se fait entre deux entier (`int`), il s'agit alors de la division entière. 
> 
> Par exemple :<br>
> `1 / 2` vaut `0`<br>
> `5 / 2` vaut `2`<br>
> 
> Par contre, il suffit que le dividende et/ou le diviseur soit un nombre décimal (`double`) pour que le quotient soit aussi un nombre décimal. 
> 
> Par exemple :<br>
> `1 / 2.0` vaut `0.5`<br>
> `5.0 / 2` vaut `2.5`<br>
> `7.0 / 2.0` vaut `3.5`

On dispose également des opérateurs `+=`, `-=`, `*=` et `/=` qui peuvent être considérés comme des raccourcis : 

- `a += 1` est équivalent à `a = a + 1`
- `b -= 2` est équivalent à `b = b - 2`
- `c *= 3` est équivalent à `c = c * 3`
- `d /= 4` est équivalent à `d = d / 4`

Il existe encore deux opérateurs qui peuvent être utilisés avec les nombres entiers (`int`). Ils ont la notation  `++` ainsi que `--` et ils permettent d'incrémenter et de décrementer, c'est-à-dire d'ajouter et de soustraire 1.

Par exemple, l'instruction `++i` est équivalente à `i = i + 1`. Ces opérateurs sont importants à retenir puisqu'ils sont souvent utilisés dans les boucles que nous verrons plus tard.


## 2.6 Constantes
---

Il peut arriver que la valeur d'une variable ne doivent pas changer après son initialisation. Dans ce cas, on va utiliser le mot-clé `final` devant la déclaration de la variable.

```java
final type identificateur = valeur;
```

Par exemple, lorsque le programme a besoin de pi, on va pouvoir déclarer une variable `final` pour laquelle la valeur ne pourra plus être modifié. Et si l'on essaie de modifier sa valeur, alors une erreur sera générée.

```java
final double PI = 3.14;
```

## 2.7 Écrire à l'écran
---
Lorsqu'on parle d'écrire à l'écran, il s'agit en fait d'écrire sur le terminal. 

Fonction d'affichage : `System.out.println();`<br>

Exemple d'utilisation : `System.out.println("La variable y contient " + y + ".");`

- Ce qui est entre guillements (`"..."`) est affiché littéralement
- Les différents éléments sont séparés par le symbole `+`
- `y` fait référence à sa valeur, il ne sera pas affiché `y`

Résultat : `La variable y contient 2.`

> ![](../../assets/javadoc/ampoule-astuce.png) La fonction `System.out.println();` fait un retour à la ligne, le prochain affichage se fera donc sur la ligne suivante dans la fenêtre du terminal. 
> 
> Il existe une variante qui ne fait pas de retour à la ligne : `System.out.print();`

On peut afficher du texte uniquement, simplement une variable, une expression ou un mélange de tout ça.

- `System.out.println("Hello World");`
  - `Hello World`
- `System.out.println(y);`
  - `2`
- `System.out.println(y * 2);`
  - `4`
- `System.out.println("y * 2 = " + y * 2);`
  - `y * 2 = 4`

> ![](../../assets/javadoc/attention.png) Si on veut afficher une somme, il faut mettre des parenthèses : 
> 
> `System.out.println("y + 3 = " + (y + 3));`<br>
> Résultat : `y + 3 = 5`


## 2.8 Lire au clavier
---

On a vu comment il est possible d'écrire avec le programme dans le terminal. Nous allons maintenant voir comment récupérer une information du terminal, par exemple lorsqu'on demande à l'utilisateur de nous transmettre une donnée.

Pour lire une valeur au clavier, il y a trois étapes à effectuer : 

1. Importer la classe `Scanner`
   -  `import java.util.Scanner;`
2. Créer un objet `Scanner`, par exemple :
   - `Scanner keyb = new Scanner(System.in);`
3. On peut maintenant utiliser la variable `keyb` pour demander des valeurs au clavier, par exemple : 
   - `int n = keyb.nextInt();`
     - Cette instruction arrête momentanément le programme,
     - Elle attend que l'utilisateur entre une valeur au clavier et qu'il appuie sur la touche `return`,
     - Puis elle affecte la valeur entrée par l'utilisateur à la variable `n`,
     - Enfin le programme continue.

`nextInt()` est une méthode de la classe `Scanner`. Il existe une autre méthode pour demander un nombre décimal à l'utilisateur : `nextDouble()`.

Nous verrons en détail plus tard ce qu'est une classe et une méthode de classe. Pour l'instant, nous pouvons garder en tête que ce sont des utilitaires à disposition des développeurs.