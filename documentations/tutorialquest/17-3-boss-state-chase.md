---
slug: tutoquest-pourchasser
order: 40
title: 17.3 Pourchasser l'avatar
author: Olivier Perrault
tag: tutorialquest
---

## 17.3. Pourchasser l'avatar
---

Les premiers états que nous ajouterons sont les états `Chase` et `Waypoint`.

### `Chase`

Comme nous avons vu, dans cet état le *boss* pourchasse le joueur de façons similaires au comportement de l'ennemi.

<img class="w-50 center" src="../../assets/tutorialquest/gif/boss-state-chase.gif">

Utiliser la classe `State` se fait très facilement, il s'agit de copier le code de l'ennemi à l'intérieur de la méthode `update` de la nouvelle classe `ChaseState`

---
> ### Étapes à suivre
> 1. ajoutez une la classe `ChaseState`
> 2. ajoutez une instance de `ChaseState` à l'intérieur de la méthode `initStateMachine` du *boss*

```java
/* ChaseState.java */
package com.tutorialquest.entities.boss;
// import ..

public static class ChaseState extends BossState 
{
    private float timeLimitChase = 0.5f;
    public static final float SPEED = 60f;

    public ChaseState(Boss boss, StateMachine stateMachine, int id, float probability, float timeLimit, int timeoutState) {
        super(boss, stateMachine, id, probability, timeLimit, timeoutState);
    }

    @Override
    public String getName() {
        return "Chase";
    }

    @Override
    public boolean update(float deltaTime) {
        if (!super.update(deltaTime)) return false;

        // Ne plus pourchasser le joueur lorsque la partie est termine
        if(Game.level.avatar == null) 
        {
            boss.locomotionVelocity.setZero();
            boss.controlAxes.setZero();
            return false;
        }

        // Déplacement en direction de l'avatar
        boss.direction
            .set(Game.level.avatar.position)
            .sub(boss.position)
            .nor();
        boss.controlAxes.set(boss.direction);
        boss.locomotionVelocity
            .set(boss.direction)
            .scl(SPEED);

        return true;
    }
}

```