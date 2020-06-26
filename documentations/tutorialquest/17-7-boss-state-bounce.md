---
slug: tutoquest-rebonds
order: 44
title: 17.7 Bounce
author: Olivier Perrault
tag: tutorialquest
---

## 17.7 Projectiles
---

### `Bounce`

<img class="w-50 center" src="../../assets/tutorialquest/gif/boss-state-bounce.gif">

Le dernier état que nous allons ajoute est l'état `Bounce` dans lequel le *boss* rebondit sur les bordures du niveau de plus en plus vite. Ce comportement est relativement facile à incorporer puisque nous pouvons tous simplement réutiliser le travail accompli dans la classe `Collider`. Lorsque le boss atteint le mur, il nous suffit de trouver un vecteur oppose à la direction courante afin de simuler un rebondissement.

---
> ### Étapes à suivre
> 1. ajoutez la méthode `isColliding` dans la classe `Collider`
>     * Il est simplement question d'utiliser les méthodes `getObjectCollisions` et `isCollidingTilemapVertical` pour vérifier si une collision a lieu.
> 2. ajoutez la classe `ShootState`

```java
/* Collider.java */
package com.tutorialquest;
// import ..

public class Collider {

    // AJOUT:
    public boolean isColliding(
        PhysicalObject object, 
        Vector2 velocity, 
        int collisionMask)
    {
        float vx = MathUtils.ceil(Math.abs(velocity.x)) * Math.signum(velocity.x);
        float vy = MathUtils.ceil(Math.abs(velocity.y)) * Math.signum(velocity.y);

        float horizontalSide = vx > 0 ?
            RectangleUtils.right(rect) :
            RectangleUtils.left(rect);
        float verticalSide = vy > 0 ?
            RectangleUtils.top(rect) :
            RectangleUtils.bottom(rect);

        if (isCollidingTilemapHorizontal(vx, horizontalSide) ||
            isCollidingTilemapVertical(vy, verticalSide) ||
            getObjectCollisions(object, vx, 0, collisionMask, results) ||
            getObjectCollisions(object, 0, vy, collisionMask, results))
        {
            return true;
        }

        return false;
    }

    // ...
}  
```

```java 
/* BounceState.java */
package com.tutorialquest.entities.boss;
// import ..

public static class BounceState extends BossState {

    public static final float SPEED = 100f;

    public static final int NUM_BOUNCE = 5;
    public static final float BOUNCE_FACTOR_DELTA = 1.1f;
    public float bounceFactor = 1;
    public int numBounce = 0;

    public BounceState(Boss boss, StateMachine stateMachine, int id, float probability, float timeLimit, int timeoutState) {
        super(boss, stateMachine, id, probability, timeLimit, timeoutState);
    }
    
    @Override
    public String getName() {
        return "Bounce";
    }

    @Override
    public void enter() {
        super.enter();
        numBounce = 0;
        bounceFactor = 1;
        boss.direction.setToRandomDirection();
        boss.controlAxes.set(boss.direction);
        boss.locomotionVelocity
            .set(boss.direction)
            .scl(SPEED * bounceFactor);
    }

    @Override
    public boolean update(float deltaTime) {
        if (!super.update(deltaTime)) return false;

        if (boss.collider.isColliding(boss, boss.velocity, Collider.FLAG_NONE)) {
            if (numBounce >= NUM_BOUNCE) {
                stateMachine.setCurrentState(STATE_WAYPOINT);
                return true;
            }

            for (int i = 0; i < 100; i++) {
                boss.direction.setToRandomDirection();
                boss.controlAxes.set(boss.direction);
                boss.locomotionVelocity
                    .set(boss.direction)
                    .scl(SPEED * bounceFactor);
                boss.updateVelocity(deltaTime);

                if (!boss.collider.isColliding(boss, boss.velocity, Collider.FLAG_NONE)) {
                    break;
                }
            }

            bounceFactor += BOUNCE_FACTOR_DELTA;
            numBounce++;
        }

        return true;
    }
}
```
