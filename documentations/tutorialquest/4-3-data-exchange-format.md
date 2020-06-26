---
slug: tutoquest-echange-donnees
order: 10
title: 4.3 Format d'échange de données
author: Olivier Perrault
tag: tutorialquest
---

## 4.3. Formats d'échange de données
---

Lorsque vient temps de sauvegarder les changements dans `Tiled`, le fichier `levels/dungeon_demo.xml` est modifié pour refléter ces changements. Bien entendu, puisque `Tiled` ne contient pas tous les outils nécessaires pour faire un jeu, il est important que le format de fichier avec lequel `Tiled` travail est interopérable avec d'autres applications. Pour répondre à ce besoin, le fichier `levels/dungeon_demo.xml` contiens des données selon le format `XML` ce qu'on appelle un format d'échange de données. En se mettant en accord sur les spécifications d'un échange de données, plusieurs applications peuvent communiquer entre elles en se partagent des fichiers. 

```xml
<!--levels/dungeon_demo.xml-->
<?xml version="1.0" encoding="UTF-8"?>
<map version="1.2" tiledversion="1.2.5" orientation="orthogonal" renderorder="right-down" width="100" 
      height="50" tilewidth="16" tileheight="16" infinite="0" nextlayerid="11" nextobjectid="59">
 <tileset firstgid="1" source="dungeon.tsx"/>
 <tileset firstgid="1480" source="collision.tsx"/>
 <tileset firstgid="1482" source="monsters.tsx"/>
 <tileset firstgid="1566" source="avatar.tsx"/>
 <layer id="6" name="Background" width="100" height="50">
  <data encoding="csv">
</data>
 </layer>
 <layer id="8" name="Foreground" width="100" height="50">
  <data encoding="csv">
    ...
</data>
 </layer>
 <layer id="7" name="Collision" width="100" height="50" visible="0">
  <data encoding="csv">
  ...
</data>
 </layer>
 <objectgroup id="10" name="Objects">
  <object id="54" type="Avatar" gid="1567" x="360" y="240" width="32" height="32"/>
  <object id="55" type="Slime" gid="1486" x="308" y="320" width="32" height="32"/>
  <object id="56" gid="1486" x="348" y="372" width="32" height="32"/>
  <object id="57" gid="1486" x="376" y="300" width="32" height="32"/>
  <object id="58" type="Slime" gid="1486" x="292" y="388" width="32" height="32"/>
 </objectgroup>
</map>
```