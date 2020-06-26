---
slug: tutoquest-aleatoire
order: 27
title: 10.2 Aléatoire
author: Olivier Perrault
tag: tutorialquest
---

## 10.2 Aléatoire
---
Il est important d'incorporer l'élément de chance à l'intérieur de notre jeu dans le but de rendre l'expérience d'un joueur unique par rapport aux autres. Nous voudrions modifier notre système de trésors afin de rendre le type et la qualité des objets aléatoire. Afin de parvenir, à cet objectif nous allons devoir recourir à un générateur de nombres aléatoires.

## 10.2.1 Pseudo-aléatoire
---
Les générateurs de nombre aléatoire sont utilise depuis très longtemps que ce soit à l'aide d'une tire à pile ou face ou du roulement d'un dé. Le générateur de nombre aléatoire utilise au sein d'un ordinateur sert aussi à générer un résultat imprévisible. Cependant, puisque l'ordinateur ne se base pas sur un phénomène physique, nous précisons qu'il est suffisant d'utiliser un résultat qui semble aléatoire et imprévisible du point de vue du joueur.

Par exemple en java, la classe `Random(long seed)` peut être utilisé, à l'aide de `System.currentTimeMillis()` comme `seed` qui servira de point de départ pour générer nos valeurs pseudo-aléatoires.

```java
Random rand = new Random(System.currentTimeMillis());
```
Afin d'obtenir des valeurs aléatoires, nous pouvons utiliser quelques-unes des fonctions utilitaires de la classe `Random`

```java
// Afin d'obtenir une valeur aléatoire entre 0 et 5
rand.nextInt(5);
```
> ## Étapes à suivre
> À l'intérieur de la classe `Character`, changez la valeur fixe par une valeur aléatoire.

```java
/* Money.java */
package com.tutorialquest.entities;
// import ...

public class Money extends Collectible {
    // ...
    // ADDED:
    public static final float COPPER_COIN_VALUE = 1f;
    public static final float COPPER_FEW_VALUE = 2f;
    public static final float SILVER_COIN_VALUE = 5;
    public static final float SILVER_FEW_VALUE = 15;
    public static final float SILVER_STACK_VALUE = 25;
    public static final float GOLD_COIN_VALUE = 50;
    public static final float GOLD_FEW_VALUE = 100;
    public static final float GOLD_STACK_VALUE = 200;
    public static final float GOLD_PILE_VALUE = 300;
    public static final float DIAMOND_VALUE = 400;

    private float value;

    public Money(Vector2 position, float amount)
    {
        super(position);

        this.value = amount;
        String texturePath = "";

        // ADDED:
        if(amount <= COPPER_COIN_VALUE) texturePath = "coin_copper.png";
        else if(amount <= COPPER_FEW_VALUE) texturePath = "coin_copper_few.png";
        else if(amount <= SILVER_COIN_VALUE) texturePath = "coin_silver.png";
        else if(amount <= SILVER_FEW_VALUE) texturePath = "coin_silver_few.png";
        else if(amount <= SILVER_STACK_VALUE) texturePath = "coin_silver_stack.png";
        else if(amount <= GOLD_COIN_VALUE) texturePath = "coin_gold.png";
        else if(amount <= GOLD_FEW_VALUE) texturePath = "coin_gold_few.png";
        else if(amount <= GOLD_STACK_VALUE) texturePath = "coin_gold_stack.png";
        else if(amount <= GOLD_PILE_VALUE) texturePath = "coin_gold_pile.png";
        else if(amount <= DIAMOND_VALUE) texturePath = "diamond.png";

        sprite = new Sprite(texturePath, SIZE);
    }

    // ..
}
```

```java
/* Enemy.java */
package com.tutorialquest.entities;
// import ...

public abstract class Enemy extends Character {
    
    @Override
    public void onDefeated()
    {
        super.onDefeated();

        // MODIFIED:
        Game.room.add(new Money(
            position,            
            // Money.COPPER_COIN_VALUE
            Money.COPPER_COIN_VALUE + Utils.random.nextInt((int)Money.DIAMOND_VALUE)));
        Game.room.remove(this);
    }

    // ...
}

```

<img class="w-50 center" src="../../assets/tutorialquest/gif/collectible-random.gif">