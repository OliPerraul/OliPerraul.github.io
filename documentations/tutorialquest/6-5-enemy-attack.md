---
slug: tutoquest-ennemis-attaque
order: 17
title: 6.5 Dommages infligés par les ennemis
author: Olivier Perrault
tag: tutorialquest
---

## 6.5. Dommages infligés par les ennemis
---

Nous voulons donner la capacité aux ennemis d'endommager l'avatar au contact. À l'aide du code écrit jusqu'à présent il est facile d'obtenir cette fonctionnalité.

---
> ### Étapes à suivre
> 1. Creez la classe `DirectAttack` pour encapsulez les dommages
> 2. Ajoutez la methode `collisionAttack` à `Enemy`
> 3. Ajoutez la methode `onAttacked` à l'interieur de `Character`

```java
/* Attack.java */
package com.tutorialquest;
// import ..

public class Attack
{
    public float damage = 10;        

    public Attack(float damage)
    {
        this.damage = damage;
    }
}

```

```java
/* Enemy.java */
package com.tutorialquest.entities;
// import ...

public class Enemy extends Character {

    // Endommagez les objets avec lesquels l'ennemi entre en contact
    public void collisionAttack() {
        List<PhysicalObject> results = new LinkedList<>();
        if (collider.getObjectCollisions(
            this,
            velocity.x,
            velocity.y,
            results))
        {            
            results.iterator().next()
                .onAttacked(new DirectAttack(damage)); 
        }
    }

    @Override
    public void update(float deltaTime) {
        super.update(deltaTime);
        control();
        turn();
        updateVelocity(deltaTime);
        // AJOUT:
        collisionAttack();
        move();
    }
}
```

```java
/* Character.java */
package com.tutorialquest;
// import ..

public class Character : PhysicalObject {
            
    // ..
    
    // AJOUT: 
    // lorsqu'un personnage n'a plus de points vie
    // On le retire du niveau
    @Override
    public void onAttacked(Attack attack)
    {
        health -= attack.damage;
        if(health <= 0)
        {
            health = 0;
            Game.room.remove(this);
        }
    }
}
```
La solution paraît simple, mais un problème persiste puisque les ennemis ne sont pas capables de distinguer l'avatar d'un autre ennemi!

<img class="w-50 center" src="../../assets/tutorialquest/gif/kill-each-other.gif">