# Exercice 1 - Lecture et écriture de fichiers

L'utilisation de la bibliothèque Tesseract nécessite la lecture de plusieurs fichiers sur la machine. Il s'agit notamment des fichiers image à analyser pour en extraire du texte, ainsi que des fichiers de données d'entraînement, essentiels pour permettre à Tesseract d'interpréter et de reconnaître le texte recherché.
Avant d'utiliser cette librairie, il faut être capable d'écrire un programme Java qui trouve ces fichiers aux endroits souhaités.
Il faut distinguer deux situations : 
- les fichiers sont internes au programme et sont
présents dans les dossiers de celui-ci.
- les fichiers sont extérieurs au programme et fournis
par l'utilisateur.

## Ressources d'un projet maven

Maven adopte une structure de dossiers spécifique pour organiser ses 
fichiers. Le contenu du dossier `/src/main/resources` est 
systématiquement copié tel quel dans le dossier `target` lors de la compilation. 
Ce dossier est destiné à contenir les fichiers de configuration et les
données nécessaires au paramétrage du programme.

:::tip Dossier target

Dans un projet Maven, le dossier `target` est généralement créé lors de la phase de compilation et contient les fichiers compilés, tels que les 
fichiers `.class` ainsi que les artefacts générés comme les fichiers 
JAR.

Le répertoire `target/classes`, où les fichiers `.class` sont compilés
est placé dans le `classpath`.

:::

:::note Exercice

Afin de vérifiez le bon fonctionnement de cette copie, suivez les étapes suivantes :
1. Créez un projet Java avec maven comme moteur
de production intitulé `JavaSandBox`.
1. Ouvrez le dossier de gestion de ressources `/src/main/resources`.
1. Créez-y le fichier vide `config.properties`.
1. Demandez à maven de compiler votre code source.
1. Vérifiez la création du fichier `/target/classes/config.properties`.

:::

### La classe ClassLoader

Pour accéder aux ressources du programme, il faut avoir accès au chemin menant au dossier `/target/classes`. En Java, la classe `java.lang.ClassLoader` est responsable du chargement 
dynamique des classes dans la mémoire à partir de fichiers `.class`.
Lorsque vous exécutez un programme, si une classe utilisée par le 
programme n'est pas encore chargée en mémoire, le `ClassLoader` localise
le fichier `.class` correspondant et le charge.
Cette classe `java.lang.ClassLoader` fournit les mécanismes pour chercher des classes mais également des ressources.

Pour vous en covaincre commencez par ajouter à la méthode 
`public static void main(String[] args)` du projet `JavaSandBox` 
les instructions suivantes : 

```java showLineNumbers
String classpath = System.getProperty("java.class.path");
System.out.println("Classpath : " + classpath);

ClassLoader classLoader = Main.class.getClassLoader();
URL urlConfig = classLoader.getResource("config.properties");
System.out.println("Fichier config.properties : " + urlConfig);
```

Vérifiez en exécutant votre programme le chemin absolu du
fichier `config.properties`.

:::note Exercice

Déterminez la valeur retournée par la méthode `getResource`
si fichier n'existe pas.

:::

### Lecture d'un fichier
 
:::note Exercice

Remplissez le fichier `config.properties` avec les données suivantes : 

```
app.name=JavaSandBox
app.version=1.0
app.author=G12345
```

Dans votre programme, affichez le contenu du fichier `config.properties`
dans le terminal en utilisant les classes du package `java.nio.`. 
- la classe `Files` permet de lire le contenu d'un fichier.
- la classe `Path` contient le chemin vers un fichier .
- la méthode `Paths.get()` permet de construire une instance de `Path` à partir de la variable `urlConfig` de type `java.net.URL`.

:::

## Ressources extérieurs au projet

Ajoutez à la méthode `public static void main(String[] args)` 
du projet `JavaSandBox` les instructions suivantes : 

```java showLineNumbers
Path currentPath = FileSystems.getDefault().getPath(".");
System.out.println("Chemin courant " + currentPath.toAbsolutePath());
```

Si vous exécutez le programme vous constaterez que 
le dossier courant, représenté par le `.` permet 
d'accéder au répertoire de votre projet sur la machine, 
c'est à dire au dossier `JavaSandbox/` contenant 
`src`, `target` et  `pom.xml`.

### Chemin vers une ressource

Créez le dossier `external-data` à la racine de votre projet ainsi
que son fichier `students.txt`.
Vous obtenez la structure de fichiers suivantes :

```
│── external-data
│   └── students.txt
├── pom.xml
├── src
    ├── main
        ├── java
        │   └── be
        │       └── esi
        │           └── prj
        │               └── Main.java
        └── resources
            └── config.properties
```

Ajoutez à la méthode `public static void main(String[] args)` 
du projet `JavaSandBox` les instructions suivantes : 

```java showLineNumbers
Path externalPath = FileSystems.getDefault().getPath("./external-data/students.txt");
System.out.println("Chemin externe : " + externalPath.toAbsolutePath());
```

La variable `externalPath` fait référence au fichier `students.txt`.

### Écriture d'un fichier

Pour écrire des données de ce fichier, les classes du package `java.nio.file` sont toujours très utiles.
Essayez par exemple d'ajouter l'instruction : 

```java showLineNumbers
Files.write(externalPath, "G12345;Alice".getBytes(),
        StandardOpenOption.WRITE, StandardOpenOption.TRUNCATE_EXISTING);
```

Consulter la documentation pour obtenir la liste des options
`StandardOpenOption`.

<!-- ## Tests unitaires

- `/src/test/resources` : contient les données utiles pour les tests ;


1. ouvrez le dossier de gestion de ressources des tests /src/test/resources
1. créez-y le fichier vide `configTest.properties`
1. demandez à maven de compiler votre code de test
1. vérifiez la création du fichier `/target/test-classes/configTest.properties` -->
