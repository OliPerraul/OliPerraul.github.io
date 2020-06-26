---
slug: tutoquest-ennemis-comportement
order: 15
title: 6.3 Comportement des ennemis
author: Olivier Perrault
tag: tutorialquest
---

## 6.3 Comportement des ennemis
---

Il existe plusieurs manières possibles de programmer un ennemi pour qu'il soit arbitrairement intelligent. Un comportement simple plutôt stupide consiste à programmer les ennemis afin qu'ils foncent en ligne droite vers l'avatar.


---
> ### Étapes à suivre
> 1. dans la méthode `start` de l'ennemi, obtenez la référence à `Avatar` dans le niveau
> 2. ajoutez une méthode `control` qui dirige l'ennemi directement vers le joueur.

```java
/* Enemy.java */
package com.tutorialquest.entities;
// import ..

public class Enemy extends Character {    
    // ..
    // AJOUT:
    private PhysicalObject target;
    // AJOUT:
    @Override
    public void control()
    {
        if(target == null) controlAxes.setZero();
        else if(position.dst(target.position) > DETECTION_RANGE) controlAxes.setZero();
        else controlAxes
                .set(target.position)
                .sub(position)
                .nor();

        velocity
            .set(controlAxes)
            .scl(speed);
    }

    @Override
    public void start()
    {
        target = Game.level.avatar;
    }

    @Override
    public void update(float deltaTime) {
        super.update(deltaTime);
        // AJOUT:
        control();
        turn();        
        move();
    }
}

```

<img class="w-50 center" src="../../assets/tutorialquest/gif/enemy-behaviour.gif">