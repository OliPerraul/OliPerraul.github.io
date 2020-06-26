---
slug: tutoquest-boss-interface
order: 45
title: 17.8 Interface pour le Boss
author: Olivier Perrault
tag: tutorialquest
---

## 17.8 Interface pour le Boss 
---
### `Bounce`

Puisqu'il s'agit d'un ennemi spécial, nous voulons ajouter une composante pour l'interface au moment du *boss*. Nous aurons recours à une technique similaire à la technique du *nine slice* explorée dans un exercice précédent afin de représenter la barre de vie du *boss*.

<img class="w-50 center" src="../../assets/tutorialquest/gif/boss-ui.gif">

LibGDX donne accès à la méthode `TiledDrawable` qui permet de dessiner une image à répétition.

---
> ### Étapes à suivre
> 1. ajoutez la classe `BossHealthBar`
> 2. chargez les textures:
>     * `objects/boss_icon.png`
>     * `ui/health_tiled.png`
> 3. ajoutez une instance de `TiledDrawable` qui permet de dessiner `ui/health_tiled.png` à répétition.
> 4. affichez les textures à l'intérieur de la méthode `render`

```java
/* BossHealthBar.java */
package com.tutorialquest.ui;
// import ..

public class BossHealthBar {

    public static int WIDTH = 256;
    public static int HEIGHT = 24;
    public static int TEXTURE_SIZE = 24;

    private TextureRegion[][] healtBarTextures;
    private Texture iconTexture;
    private float fillAmount = 1;
    protected Texture arrowTexture;
    protected TextureRegion[][] textures;
    private TiledDrawable backTiledDrawable;
    private TiledDrawable fillTiledDrawable;
    private boolean enabled = false;

    public BossHealthBar(){
        iconTexture = new Texture("objects/boss_icon.png");
        textures = TextureRegion.split(new Texture("ui/health_tiled.png"), TEXTURE_SIZE/3, TEXTURE_SIZE);
        backTiledDrawable = new TiledDrawable(textures[0][1]);
        fillTiledDrawable = new TiledDrawable(textures[0][4]);
    }

    public void enable(boolean enabled)
    {
        this.enabled = enabled;
    }

    public void render(SpriteBatch spriteBatch, Vector2 position)
    {
        if(!enabled) return;

        spriteBatch.begin();
        backTiledDrawable.draw(
            spriteBatch,
            position.x,
            position.y,
            WIDTH,
            HEIGHT);

        spriteBatch.end();

        spriteBatch.begin();
        fillTiledDrawable.draw(
            spriteBatch,
            position.x,
            position.y,
            WIDTH * fillAmount,
            HEIGHT);

        spriteBatch.end();

        spriteBatch.begin();
        spriteBatch.draw(
            iconTexture,
            position.x - 4,
            position.y + 4,
            16,
            16);
        spriteBatch.end();
    }
}

```

---
> ### Étapes à suivre
> Utilisez la technique de l'observateur explique dans l'exercice précédent afin de mettre à jour l'interface lorsque l'ennemi prend des dommages.

```java
/* BossHealthBar.java */
package com.tutorialquest.ui;
// import ..

public class BossHealthBar 
{
    public void onBossHealthChanged(Character character) {
        fillAmount = character.health / character.maxHealth;
    }
}
```

```java
package com.tutorialquest.entities.boss;
// import ...

public class Boss extends Character {

    @Override
    public void start() {
        super.start();
        Game.hud.bossHealthBar.enable(true);
        onHealthChangedHandler.subscribe(Game.hud::onBossHealthChanged);
        Game.hud.onBossHealthChanged(this);
    }
}

```

---
> ### Étapes à suivre
> 1. Ajoutez `BossHealthBar` au tableau de bord
> 2. incorporez a la méthode `render`

```java
/* HUD.java */
package com.tutorialquest.ui;
// import ..

public class HUD {    
    // AJOUT:
    public BossHealthBar bossHealthBar = new BossHealthBar();

    // ...

    public void render() {
        Vector2 position;
        // ...
        position = new Vector2(
            camera.position.x - bossHealthBar.WIDTH/2,
            camera.position.y -96);

        bossHealthBar.render(spriteBatch, position);
    }
}
```
<img class="w-50 center" src="../../assets/tutorialquest/gif/lose-game-over.gif">