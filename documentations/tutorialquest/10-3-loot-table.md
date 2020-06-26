---
slug: tutoquest-distribution
order: 28
title: 10.3 Table de distribution des trésors
author: Olivier Perrault
tag: tutorialquest
---

## 10.3 Table de distribution des trésors
---

Comme vous pouvez le constater, notre avatar se trouve plutôt chanceux durant cette session de jeu. En effet, puisque la fonction `Random` utilise une distribution uniforme, il y a présentement autant de chance de découvrir un diamant qui vaut beaucoup plus de points que quelques pièces de cuivre.

Afin de pouvoir augmenter l'impact de certaines récompenses, nous voudrions ajuster la distribution des récompenses afin qu'il soit plus rare de découvrir un diamant plutôt qu'une simple pièce de cuivre. Une solution simple pour ce mécanisme est d'utiliser une table de récompenses (`LootTable`).

<img class="w-50 center" src="../../assets/tutorialquest/gif/lucky.gif">

> ## Étapes à suivre
> ---
> 1. Créez la classe `LootTable` dans laquelle il est possible de configurer la distribution des trésors pour un ennemi.
>    * Utilisez la méthode `add` pour ajouter les éléments nécessaires à la table de distribution
>    * La méthode `take` permet d'un prendre un maximum d'objet `amount` avec chacun obtenu selon une probabilité configurée dans la table.
> 2. ajoutez la méthode `drop` à `Level` afin de permettre de plus facilement laisser tomber des trésors.
> 3. ajoutez une instance de `LootTable` à l'intérieur de l'ennemi et configurer la table de l'ennemi à vos besoins.
> 4. ajustez la méthode `onDefeated` à l'intérieur de `Enemy` afin d'utiliser `LootTable`


```java
/* LootTable.java */
package com.tutorialquest;
// import ..

public class LootTable {

    public static class Loot
    {
        public Collectible.Type type;
        public float value;
        public float probability;
    }

    public List<Loot> loots;

    public LootTable() {}

    public void add(Loot ... loots)
    {
        this.loots = Arrays.asList(loots);
    }

    // Filtre la table de trésor selon le pourcentage de chance des éléments
    public List<Loot> Take(int amount)
    {
        LinkedList<Loot> taken = new LinkedList<>();
        if(loots.isEmpty()) return taken;

        int trials = amount;
        while(trials > 0) {
            if(Utils.random.nextInt(amount) <  trials)
            {
                Loot loot = loots.get(Utils.random.nextInt(loots.size()));
                if(
                    loot.probability < 0 ||
                    Utils.random.nextFloat() <= loot.probability)
                {
                    trials--;
                    taken.add(loot);
                    continue;
                }
            }
        }

        return taken;
    }
}
```

```java
/* Level.java */
package com.tutorialquest;
// import ..

public class Level {

    // ...

    public void drop(
        LootTable lootTable, 
        int amount, 
        Vector2 position, 
        float range)
    {
        if (lootTable == null)
            return;

        for (LootTable.Loot loot : lootTable.Take(amount)) {
            Vector2 destination =
                new Vector2()
                    .setToRandomDirection()
                    .scl(range)
                    .add(position);

            switch (loot.type) {
                case Money:
                    Game.level.add(new Money(
                        destination,
                        loot.value));
                    break;
                case Health:
                    Game.level.add(new Health(
                        destination,
                        loot.value));
                    break;
            }
        }
    }
}
```

```java
/* Enemy.java */
package com.tutorialquest.entities;
// import ..

public abstract class Enemy extends Character 
{
    // ..
    public static final int DROP_AMOUNT = 4;
    public static final float DROP_DISTANCE_RANGE = 5f;
    public LootTable lootTable;

    // ..

    public void initLootTable()
    {
        // ADDED:
        lootTable = new LootTable();
        lootTable.add(
            new LootTable.Loot()
            {{
                type = Collectible.Type.Money;
                probability = 0.8f;
                value = Money.COPPER_COIN_VALUE;
            }},
            new LootTable.Loot()
            {{
                type = Collectible.Type.Money;
                probability = 0.5f;
                value = Money.SILVER_COIN_VALUE;
            }},
            new LootTable.Loot()
            {{
                type = Collectible.Type.Money;
                probability = 0.3f;
                value = Money.GOLD_COIN_VALUE;
            }},
            new LootTable.Loot()
            {{
                type = Collectible.Type.Money;
                probability = 0.1f;
                value = Money.DIAMOND_VALUE;
            }}
        );
    }

    public void onDefeated()
    {
        Game.level.remove(this);
        Game.level.drop(lootTable, DROP_AMOUNT, position, DROP_DISTANCE_RANGE);
    }
    
    // ..
}

```

<img class="w-50 center" src="../../assets/tutorialquest/gif/collectible-random.gif">