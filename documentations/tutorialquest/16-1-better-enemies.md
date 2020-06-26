---
slug: tutoquest-ennemis-intelligents
order: 37
title: 16. Ennemis plus intelligents
author: Olivier Perrault
tag: tutorialquest
---

# 16. Ennemis plus intelligents

> | Téléchargement fichiers référence |
> | ------------- |:-------------:|
> | <a href="" download>desktop.zip</a> |
> | <a href="" download>core.src.zip</a> |
> | <a href="" download>core.assets.zip</a> |

De retour à l'intérieur du donjon, nous voulons maintenant améliorer le comportement des ennemis afin qu'ils semblent plus intelligents. En particulier, à la place de continuellement pourchasser le joueur nous voulons incorporer un nombre d'**états** différents dans le comportement des ennemis.

Dans le cadre de ce projet, nous définirons les états
* `Wander` qui permet aux ennemis de se promener sans but prédéterminé
* `Idle` qui permet aux ennemis de rester immobiles pour une durée limite
* `Chase` qui permet aux ennemis de pourchasser le joueur

<img class="w-50 center" src="../../assets/tutorialquest/gif/better-enemies.gif">

---
> ### Étapes à suivre
> Modifiez la classe `Enemy` en ajoutant les états définis ci-dessus

> 1. ajoutez une la classe `StateUtils` qui défini les états de l'ennemi 
> 2. ajoutez les constantes permettant de configurer les états de l'ennemi
> 3. ajoutez une méthode `setState` permettant l'initialisation d'un état
>     * Pour chaque état, l'initialisation permet d'immobiliser l'ennemi afin de partir à zéro.
>     * Pour l'état `Wander` l'initialisation permet de choisir une destination aléatoirement
> 4. ajoutez une méthode `updateState` permettant la mise à jour de l'état
>     * Imposez une limite de temps à chaque état à l'aide de la variable `stateTime`
>     * Déterminez les transitions nécessaires entre les états lorsque le joueur passe suffisamment proche de l'ennemi ou lorsque la limite de temps est écoulée.  

```java
/* Enemy.java */
package com.tutorialquest.entities;
// import ..

public class Enemy extends Character {

    // AJOUT:
    public class StateUtils
    {
        public static final int IDLE = 0;
        public static final int CHASE = 1;
        public static final int WANDER = 2;
    }

    // AJOUT:
    // Constantes pour configurer les états de l'ennemi
    public static final float IDLE_TIME_LIMIT = 2f;
    public static final float WANDER_DISTANCE_RANGE = 96f;
    public static final float WANDER_TIME_LIMIT = 5f;
    public static final float CHASE_DETECTION_RANGE = 64f;
    public static final float DESTINATION_DISTANCE_EPSILON = 0.1f;

    // AJOUT:
    private PhysicalObject chaseTarget = null;
    private Vector2 wanderTarget = new Vector2();
    public int state = StateUtils.IDLE;
    // Variable qui sert à imposer une limite de temps à un état
    private float stateTime = 0;

    // AJOUT:
    // Initialisation de l'état    
    public void setState(int state)
    {
        stateTime = 0;
        switch (state)
        {
            case StateUtils.CHASE:
                controlAxes.setZero();
                locomotionVelocity.setZero();
                break;

            case StateUtils.IDLE:
                controlAxes.setZero();
                locomotionVelocity.setZero();
                break;

            case StateUtils.WANDER:
                controlAxes.setZero();
                locomotionVelocity.setZero();
                // Choix de la destination de promenade aléatoire
                wanderTarget
                    .set(position)
                    .add(new Vector2()
                        .setToRandomDirection()
                        .scl(WANDER_DISTANCE_RANGE));
                break;
        }

        this.state = state;
    }

    // AJOUT:
    public void updateState(float deltaTime)
    {
        stateTime += deltaTime;
        switch (state)
        {
            // Mouvement en direction du joueur
            case StateUtils.CHASE:
                if(
                    chaseTarget == null ||
                    position.dst(chaseTarget.position) > CHASE_DETECTION_RANGE)
                {
                    setState(StateUtils.IDLE);
                    return;
                }

                controlAxes
                    .set(chaseTarget.position)
                    .sub(position)
                    .nor();

                locomotionVelocity
                    .set(controlAxes)
                    .scl(speed);

                break;

            // Imobilisation
            case StateUtils.IDLE:

                if(
                    chaseTarget != null &&
                    position.dst(chaseTarget.position) < CHASE_DETECTION_RANGE)
                {
                    setState(StateUtils.CHASE);
                    return;
                }

                if(stateTime >= IDLE_TIME_LIMIT)
                {
                    setState(StateUtils.WANDER);
                    return;
                }

                break;

            // Déplacement en direction de la destination de promenade
            case StateUtils.WANDER:

                if(
                    chaseTarget != null &&
                    position.dst(chaseTarget.position) < CHASE_DETECTION_RANGE)
                {
                    setState(StateUtils.CHASE);
                    return;
                }

                if(
                    stateTime >= WANDER_TIME_LIMIT ||
                    position.epsilonEquals(wanderTarget, DESTINATION_DISTANCE_EPSILON))
                {
                    setState(StateUtils.IDLE);
                    return;
                }

                controlAxes
                    .set(wanderTarget)
                    .sub(position)
                    .nor();

                locomotionVelocity
                    .set(controlAxes)
                    .scl(speed);

                break;

        }
    }

    public Enemy(Vector2 position) {
        // ...
        // AJOUT:
        // État initial
        setState(StateUtils.IDLE);
    }

    @Override
    public void update(float deltaTime) {
        super.update(deltaTime);
        
        // AJOUT:
        updateState(deltaTime);
        
        // ...
    }
}
```