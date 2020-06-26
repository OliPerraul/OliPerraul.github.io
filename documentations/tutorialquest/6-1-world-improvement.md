---
slug: tutoquest-monde-amelioration
order: 13
title: 6.1 Ennemis
author: Olivier Perrault
tag: tutorialquest
---

# 6. Ennemis

> | Téléchargement fichiers référence |
> | ------------- |:-------------:|
> | <a href="" download>desktop.zip</a> |
> | <a href="" download>core.src.zip</a> |
> | <a href="" download>core.assets.zip</a> |

## 6.2 Amélioration au monde
---
Lorsque nous avons écrit la classe `Level`, nous avions négligé un problème qui peut se poser lorsque nous ajoutons des entités et les retirons du monde. En effet, présentement, il est impossible d'ajouter des instances de `Entity` au monde ou de les retirer depuis la méthode `update` d'une autre entité. Ce genre de situation arrive par exemple lorsque l'avatar doit vaincre des ennemis, ou encore lorsque celui-ci doit ramasser un objet. 

La raison pour laquelle nous avons ce problème est qu'il est impossible de modifier les objets d'une liste lorsque nous sommes en train d'itérer sur cette même liste.

```java
/* Level.java */
package com.tutorialquest;
// import ...

public class Level
{
    // ...
    public void remove(Entity entity) {
        entities.remove(entity);
    }

    public void update(float deltaTime) {
        
        for (Entity entity : entities) {
            // `Entity` retire soi-même ou ajouté à la liste 
            // lors de l'exécution de update
            entity.update(deltaTime);
        }
    }
}
```

```java
/* Avatar.java */
package com.tutorialquest;
// import ...

public class Avatar
{
    public void update(float deltaTime) {
        // ..
        if(attacking) enemy.onAttacked(attack);
    }
}
```

```java
/* Enemy.java */
package com.tutorialquest.entities;
// import ...

public class Enemy
{
    // ...    
    @Override
    public void onAttacked(Attack attack){
        // ..
        // e.g.
        // ERROR: java.util.ConcurrentModificationException
        if(health <= 0)
            Game.room.remove(this);        
    }
}
```
Un moyen pour remédier à ce problème est d'utiliser une liste intermédiaire pour les ajouts et les retraits au monde. De cette manière, les ajouts et les retraits ne prendront effet qu'à partir de la prochaine itération ce qui évitera les accès en concurrence à `entities`.

---
> ### Étapes à suivre
> 1. ajoutez deux listes d'entités, `added` et `removed`
> 2. modifiez les méthodes `add` et `remove` afin d'ajouter aux listes
> 3. après l'itération sur les entités
>     * Mettre à jour le contenu de `entities` par rapport a `added` et `removed`
> 4. effacez le contenu de `added` et `removed`

```java
public class Level
{
    // ...

    // AJOUT:
    private List<Entity> added = new ArrayList<Entity>();
    private List<Entity> removed = new ArrayList<Entity>();
    
    // ...

    // AJOUT:
    public void add(Entity entity) {
        if(entity == null)
            return;
        added.add(entity);
    }

    // AJOUT:
    public void remove(Entity entity){
        if(entity == null)
            return;
        removed.add(entity);
    }

    public void update(float deltaTime) {
        
        // ...

        for (Entity entity : entities) {
            entity.update(deltaTime);
        }

        // AJOUT:
        // Mettre à jour la liste avec 'added'
        for(Entity ent : added) {
            entities.add(ent);
        }

        // AJOUT:
        // Mettre à jour la liste avec 'removed'
        for(Entity ent : removed)
        {
            entities.remove(ent);
        }

        // AJOUT:
        // Signaler l'objet qu'il est prêt pour commencer 'start'
        for(Entity ent : added) {
            ent.start();
        }

        // AJOUT:
        // Signaler l'objet qu'il a été retirer
        for(Entity ent : removed) {
            ent.dispose();
        }

        // AJOUT:
        // Effacez le contenu de `added` et `removed`
        added.clear();
        removed.clear();
    }
}
```