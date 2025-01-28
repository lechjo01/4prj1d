# Exercice 2 - Reconnaissance optique de caractères

La reconnaissance optique de caractères (ROC, ou OCR pour l'anglais optical character recognition), ou « océrisation », désigne les procédés informatiques pour la transcription d'images de textes imprimés ou dactylographiés en fichiers de texte.

Un ordinateur réclame pour l'exécution de cette tâche un logiciel d'OCR. Celui-ci permet de récupérer le texte dans l'image d'un texte imprimé et de le sauvegarder dans un fichier pouvant être exploité dans un traitement de texte pour enrichissement, et stocké dans une base de données ou sur un autre support exploitable par un système informatique. 

Tesseract est un logiciel de reconnaissance optique de caractères sous licence Apache.

Conçu par les ingénieurs de Hewlett Packard de 1985 à 1995, son développement est abandonné pendant les dix années suivantes ; en 2005, les sources du logiciel sont publiées sous licence Apache et Google poursuit son développement. Initialement limité aux caractères ASCII, il reconnaît les caractères UTF-8 dans plus de 100 langues. 

## Installation

Cherchez votre système d'exploitation sur 
[la documentation de tessaract](https://tesseract-ocr.github.io/tessdoc/Installation.html)
et installez le sur votre machine.

1. Créez un projet java avec maven
1. Ajoutez les dépendances suivantes dans le `pom.xml`

```xml showLineNumbers

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>2.0.6</version>
    <scope>runtime</scope>
</dependency>

<dependency>
    <groupId>net.sourceforge.tess4j</groupId>
    <artifactId>tess4j</artifactId>
    <version>5.11.0</version>
</dependency>

```

1. Ajoutez dans le main `Tesseract tesseract = new Tesseract();`
sans oublier d'importer la classe `net.sourceforge.tess4j.Tesseract;`.
1. Essayez de compiler et d'exécuter votre projet.

## Les données d’entraînement

1. Téléchargez les données relatives au français 
[fra.traineddata](https://github.com/tesseract-ocr/tessdata_fast)
1. Placez le fichier dans les ressources du projet

```java showLineNumbers
    ClassLoader classLoader = Main.class.getClassLoader();
    String dataDirectory = classLoader.getResource("data").getFile();
    tesseract.setDatapath(dataDirectory);

    // Optionally set language
    tesseract.setLanguage("fra");
```

1. Essayez de compiler et d'exécuter votre projet.


## Les images à scanner

Commencer par un pdf ?

Prenez une photo de votre carte étudiant et 
déposez cette image dans un dossier extérieure
à votre projet java intitulé `data-out`.

```java showLineNumbers
String imageName = "etudiant12345.png";
File imageFile = new File("data-out/" + imageName);
if (!imageFile.exists()) {
    throw new FileNotFoundException("Fichier inexistant " + imageFile.getAbsolutePath());
}
```

:::danger Gestion des exceptions

Bloc Try-catch

```java showLineNumbers
try {

} catch (FileNotFoundException e) {
    System.out.println("Ficher inexistant " + e.getMessage());
}
```

:::


```java showLineNumbers
String result = tesseract.doOCR(imageFile);
System.out.println(result);
```

:::warning Gestion des exceptions

Une nouvelle exception doit être gérée `TesseractException`.

:::