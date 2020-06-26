---
slug: tutoquest-perdre
order: 46
title: 18.1 Terminer la partie
author: Olivier Perrault
tag: tutorialquest
---

# 18.1 Terminer la partie
> | Téléchargement fichiers référence |
> | ------------- |:-------------:|
> | <a href="" download>desktop.zip</a> |
> | <a href="" download>core.src.zip</a> |
> | <a href="" download>core.assets.zip</a> |

Présentement, le joueur peut perdre toutes ses vies, mais le joueur est incapable de retenter sa chance! Le seul moyen est de redémarrer l'application ce qui n'est pas très élégant.

<img class="w-50 center" src="../../assets/tutorialquest/gif/boss-game-over.gif">

Nous voulons donner l'option au joueur de recommencer la partie, lorsqu'il a perdu la partie. Nous pouvons afficher du texte de la même manière que nous avons fait dans l'inventaire.

---
> ### Étapes à suivre
> 1. ajoutez la classe `GameOverDisplay`
> 2. ajoutez la composante à l'interface `HUD`

```java
/* GameOverDisplay.java */
package com.tutorialquest.ui;
// import ..

public class GameOverDisplay 
{    
    private static final String LOSE_TEXT = "Game Over";
    private static final String REPLAY_TEXT = "Press any key to restart.";
    private static final int FONT_SCALE = 1;
    private static final float REPLAY_TIME_LIMIT = 4f;

    private BitmapFont font;
    private GlyphLayout glyphLayout = new GlyphLayout();
    private boolean enabled = false;
    private String text = LOSE_TEXT;

    private float elapsedTime = 0;

    public void disable()
    {
        this.enabled = false;
        elapsedTime = 0;
    }

    public void enable()
    {
        this.enabled = true;
        text = LOSE_TEXT;
        elapsedTime = 0;
    }

    public GameOverDisplay()
    {
        font = new BitmapFont(Gdx.files.internal("fonts/player2_small.fnt"));
        font.setColor(Color.DARK_GRAY);
        font.getData().setScale(FONT_SCALE);
    }

    public void update(float deltaTime)
    {
        if(enabled) elapsedTime += deltaTime;
    }

    public void render(
        SpriteBatch spriteBatch, 
        Vector2 position) 
    {
        if(!enabled) return;

        spriteBatch.begin();
        glyphLayout.setText(font, text);
        font.setColor(Color.WHITE);
        font.draw(
            spriteBatch,
            text,
            position.x - glyphLayout.width/2,
            position.y + glyphLayout.height,
            glyphLayout.width,
            Align.left,
            true);
        spriteBatch.end();

        if(elapsedTime < REPLAY_TIME_LIMIT)
            return;

        spriteBatch.begin();
        glyphLayout.setText(font, REPLAY_TEXT);
        font.draw(
            spriteBatch,
            REPLAY_TEXT,
            position.x - glyphLayout.width/2,
            position.y - glyphLayout.height,
            glyphLayout.width,
            Align.left,
            true);
        spriteBatch.end();
    }
}
```

```java
/* HUD.java */
package com.tutorialquest.ui;
// import ..

public class HUD {

    // AJOUT:
    public GameOverDisplay gameOverDisplay = new GameOverDisplay();    

    public void update(float deltaTime) {                        
        // ...
        // AJOUT:
        gameOverDisplay.update(deltaTime);
    }

    public void render() {
        // ...    
        position = new Vector2(
            camera.position.x,
            camera.position.y);

        // AJOUT:
        gameOverDisplay.render(spriteBatch, position);
    }
}
```
Il reste à activer la composante lorsque le joueur perd la partie et permettre au joueur de recommencer.

---
> ### Étapes à suivre
> 1. ajoutez les méthodes `finish` et `restart` à la classe `Game`
> 2. invoquez `finish` à l'intérieur de la méthode `onDefeat` de la classe `Avatar`.

```java
/* Game.java */
package com.tutorialquest;
// import ..

public class Game extends ApplicationAdapter {

    // ...

    // AJOUT:
    public static boolean finished = false;

    // AJOUT:
    public static void finish() {
        finished = true;
        level.avatar.input.disable(-1);
        hud.input.disable(2);
        if(!isDefeat) Game.level.win();
        hud.gameOverDisplay.enable();
    }

    // AJOUT:
    public static void restart() {
        finished = false;
        hud.input.disable(-1);
        hud.gameOverDisplay.disable();
        load("levels/overworld.tmx");
        hud.onAvatarHealthChanged(level.avatar);
        hud.onAvatarMoneyChanged(level.avatar);
    }

    @Override
    public void render() {
        // ...
        // AJOUT:
        if (finished && hud.input.isAnyJustPressed()) restart();
    }
}

```


