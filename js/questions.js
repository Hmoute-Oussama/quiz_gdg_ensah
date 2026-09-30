const questionPool = [
    // -------------------------------------------------------------------------
    // ANNEE 1 : FONDAMENTAUX (1, 2)
    // -------------------------------------------------------------------------
    {
        id: 1, years: [1, 2], topic: "Programmation", difficulty: "easy",
        question: "Qu'est-ce qu'une variable ?",
        answers: ["Un emplacement permettant de stocker une valeur", "Un ordinateur", "Un serveur distant", "Un système d'exploitation"],
        correct: 0
    },
    {
        id: 2, years: [1, 2], topic: "Web", difficulty: "easy",
        question: "Que signifie HTML ?",
        answers: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
        correct: 0
    },
    {
        id: 3, years: [1, 2], topic: "Programmation", difficulty: "easy",
        question: "À quoi sert généralement une boucle 'for' ?",
        answers: ["Définir une fonction", "Répéter des instructions un nombre défini de fois", "Afficher une image", "Se connecter à une base de données"],
        correct: 1
    },
    {
        id: 4, years: [1, 2], topic: "Git", difficulty: "easy",
        question: "Quelle commande Git permet d'ajouter des fichiers à l'index (staging area) ?",
        answers: ["git commit", "git push", "git add", "git init"],
        correct: 2
    },
    {
        id: 5, years: [1, 2], topic: "Linux", difficulty: "easy",
        question: "Quelle commande Linux est utilisée pour afficher le répertoire courant ?",
        answers: ["cd", "pwd", "ls", "rm"],
        correct: 1
    },
    {
        id: 6, years: [1, 2], topic: "Cybersécurité", difficulty: "easy",
        question: "Qu'est-ce que le 'phishing' (hameçonnage) ?",
        answers: ["Un langage de programmation", "Une méthode pour tromper un utilisateur et obtenir ses mots de passe", "Une base de données sécurisée", "Un antivirus gratuit"],
        correct: 1
    },
    {
        id: 7, years: [1, 2], topic: "Programmation", difficulty: "easy",
        question: "Que signifie 'IDE' en développement ?",
        answers: ["Internet Data Exchange", "Internal Disk Encryption", "Integrated Development Environment", "Interface Design Element"],
        correct: 2
    },
    {
        id: 8, years: [1, 2], topic: "Web", difficulty: "easy",
        question: "À quoi sert CSS dans une page web ?",
        answers: ["Stocker les données utilisateur", "Gérer la logique de la page", "Définir l'apparence et le style", "Créer la structure HTML"],
        correct: 2
    },
    {
        id: 9, years: [1, 2], topic: "Réseaux", difficulty: "easy",
        question: "Que signifie 'IP' dans Adresse IP ?",
        answers: ["Internet Protocol", "Internal Protocol", "Information Provider", "Interconnected PCs"],
        correct: 0
    },
    {
        id: 10, years: [1, 2], topic: "Programmation", difficulty: "easy",
        question: "Comment appelle-t-on une erreur dans un programme informatique ?",
        answers: ["Un bug", "Un virus", "Un cookie", "Un spam"],
        correct: 0
    },
    {
        id: 11, years: [1, 2], topic: "Web", difficulty: "easy",
        question: "Où place-t-on généralement la balise <title> en HTML ?",
        answers: ["Dans <body>", "Dans <footer>", "Dans <head>", "Dans <script>"],
        correct: 2
    },
    {
        id: 12, years: [1, 2], topic: "Programmation", difficulty: "medium",
        question: "Qu'est-ce qu'une fonction de rappel (callback) ?",
        answers: ["Une fonction qui appelle un numéro de téléphone", "Une fonction passée en argument à une autre fonction", "Une erreur de compilation", "Un type de variable stockant du texte"],
        correct: 1
    },

    // -------------------------------------------------------------------------
    // ANNEE 2 : INTERMEDIAIRE (1, 2, 3)
    // -------------------------------------------------------------------------
    {
        id: 13, years: [2, 3], topic: "Programmation", difficulty: "medium",
        question: "En Programmation Orientée Objet, qu'est-ce que l'encapsulation ?",
        answers: ["Cacher les détails d'implémentation et protéger les données", "Créer plusieurs objets identiques", "Détruire un objet", "Compiler le code source"],
        correct: 0
    },
    {
        id: 14, years: [2, 3], topic: "Bases de données", difficulty: "medium",
        question: "Que signifie SQL ?",
        answers: ["Structured Query Language", "Simple Question Language", "Strong Query Logic", "Systematic Query Language"],
        correct: 0
    },
    {
        id: 15, years: [2, 3], topic: "Linux", difficulty: "medium",
        question: "Que fait la commande 'chmod' ?",
        answers: ["Elle change le mot de passe utilisateur", "Elle modifie les permissions d'un fichier", "Elle redémarre le système", "Elle supprime un répertoire"],
        correct: 1
    },
    {
        id: 16, years: [2, 3], topic: "C/C++", difficulty: "medium",
        question: "En C/C++, qu'est-ce qu'un pointeur ?",
        answers: ["Une variable contenant une valeur flottante", "Une variable contenant l'adresse mémoire d'une autre variable", "Un type de boucle", "Une fonction système"],
        correct: 1
    },
    {
        id: 17, years: [2, 3, 4], topic: "Git", difficulty: "medium",
        question: "A quoi sert la commande 'git merge' ?",
        answers: ["Supprimer une branche", "Annuler un commit", "Fusionner une branche avec la branche courante", "Envoyer son code sur GitHub"],
        correct: 2
    },
    {
        id: 18, years: [2, 3], topic: "Base de données", difficulty: "medium",
        question: "Qu'est-ce qu'une clé primaire dans un SGBD relationnel ?",
        answers: ["Un identifiant unique pour chaque enregistrement d'une table", "Le mot de passe de la base de données", "La première colonne d'une table", "Une fonction de jointure"],
        correct: 0
    },
    {
        id: 19, years: [2, 3], topic: "Web", difficulty: "medium",
        question: "Quelle méthode HTTP est généralement utilisée pour envoyer des données de formulaire de manière masquée ?",
        answers: ["GET", "POST", "PUT", "DELETE"],
        correct: 1
    },
    {
        id: 20, years: [2, 3], topic: "Algorithmique", difficulty: "medium",
        question: "Quelle est la complexité temporelle moyenne du tri rapide (Quicksort) ?",
        answers: ["O(1)", "O(n)", "O(n log n)", "O(n²)"],
        correct: 2
    },
    {
        id: 21, years: [2, 3], topic: "Réseaux", difficulty: "medium",
        question: "À quelle couche du modèle OSI appartient le protocole IP ?",
        answers: ["Couche Application", "Couche Transport", "Couche Réseau", "Couche Liaison de données"],
        correct: 2
    },
    {
        id: 22, years: [2, 3], topic: "Programmation", difficulty: "hard",
        question: "Qu'est-ce que le polymorphisme en POO ?",
        answers: ["Le fait qu'une classe puisse hériter de plusieurs interfaces", "La capacité d'un objet à prendre plusieurs formes (ex: redéfinition de méthodes)", "L'interdiction de modifier une variable", "Le nettoyage de la mémoire"],
        correct: 1
    },
    {
        id: 23, years: [2, 3], topic: "Base de données", difficulty: "hard",
        question: "Parmi ces types de jointures, laquelle retourne TOUTES les lignes de la table de gauche, avec les correspondances de la table de droite ?",
        answers: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "FULL OUTER JOIN"],
        correct: 2
    },

    // -------------------------------------------------------------------------
    // ANNEE 3 : INTERMEDIAIRE / AVANCÉ (3, 4)
    // -------------------------------------------------------------------------
    {
        id: 24, years: [3, 4], topic: "Docker", difficulty: "medium",
        question: "Qu'est-ce qu'un conteneur Docker ?",
        answers: ["Une machine virtuelle complète avec son propre OS", "Un environnement isolé partageant le noyau de l'hôte", "Un type de base de données NoSQL", "Un langage de programmation"],
        correct: 1
    },
    {
        id: 25, years: [3, 4], topic: "Web", difficulty: "medium",
        question: "Quels sont les principes d'une API RESTful ?",
        answers: ["Utiliser exclusivement du XML", "Être sans état (stateless) et baser les opérations sur les méthodes HTTP", "Stocker toujours l'état du client sur le serveur", "Générer uniquement du HTML"],
        correct: 1
    },
    {
        id: 26, years: [3, 4], topic: "Cloud", difficulty: "medium",
        question: "Que signifie IaaS ?",
        answers: ["Infrastructure as a Service", "Internet as a Server", "Information as a System", "Intranet Application Software"],
        correct: 0
    },
    {
        id: 27, years: [3, 4], topic: "DevOps", difficulty: "medium",
        question: "Que signifie CI/CD ?",
        answers: ["Centralized Infrastructure / Core Development", "Continuous Integration / Continuous Deployment", "Code Improvement / Code Delivery", "Control Interface / Command Directive"],
        correct: 1
    },
    {
        id: 28, years: [3, 4], topic: "Python", difficulty: "medium",
        question: "Que permet le mot-clé 'yield' en Python ?",
        answers: ["Arrêter immédiatement le programme", "Créer un générateur qui retourne une valeur à la fois", "Déclarer une variable globale", "Importer une bibliothèque"],
        correct: 1
    },
    {
        id: 29, years: [3, 4], topic: "Linux", difficulty: "medium",
        question: "À quoi sert la commande 'grep' ?",
        answers: ["Rechercher un modèle de texte dans un fichier", "Afficher la mémoire vive disponible", "Créer des archives zip", "Changer de répertoire"],
        correct: 0
    },
    {
        id: 30, years: [3, 4], topic: "Sécurité", difficulty: "hard",
        question: "Qu'est-ce que l'attaque par Injection SQL ?",
        answers: ["Insérer des balises HTML malveillantes", "Saturer la bande passante du réseau", "Insérer du code SQL dans une entrée utilisateur non filtrée", "Voler les cookies de session"],
        correct: 2
    },
    {
        id: 31, years: [3, 4], topic: "Git", difficulty: "hard",
        question: "Que fait 'git rebase' par rapport à 'git merge' ?",
        answers: ["Il supprime les commits non voulus", "Il réécrit l'historique en appliquant vos commits pardessus la cible", "Il crée un nouveau dépôt", "Il est strictement équivalent à 'git merge'"],
        correct: 1
    },
    {
        id: 32, years: [3, 4], topic: "Base de données", difficulty: "medium",
        question: "MongoDB est un exemple de base de données de quel type ?",
        answers: ["Relationnel (SQL)", "Graphe", "Documentaire (NoSQL)", "Clé-Valeur"],
        correct: 2
    },
    {
        id: 33, years: [3, 4], topic: "Architecture", difficulty: "medium",
        question: "Quel design pattern garantit qu'une classe n'a qu'une seule instance ?",
        answers: ["Factory", "Observer", "Singleton", "Decorator"],
        correct: 2
    },
    {
        id: 34, years: [3, 4, 5], topic: "Machine Learning", difficulty: "medium",
        question: "Qu'est-ce que l'overfitting (surapprentissage) ?",
        answers: ["Quand le modèle ne s'entraîne pas assez vite", "Quand le modèle apprend par cœur les données d'entraînement et généralise mal", "Un manque de données pour entraîner le modèle", "Quand le modèle trouve la solution optimale d'un coup"],
        correct: 1
    },

    // -------------------------------------------------------------------------
    // ANNEE 4 : AVANCÉ (3, 4, 5)
    // -------------------------------------------------------------------------
    {
        id: 35, years: [4, 5], topic: "Kubernetes", difficulty: "hard",
        question: "Dans Kubernetes, quelle est la plus petite unité de calcul déployable ?",
        answers: ["Un Node", "Un Pod", "Un Cluster", "Un Service"],
        correct: 1
    },
    {
        id: 36, years: [3, 4, 5], topic: "DevOps", difficulty: "hard",
        question: "Qu'est-ce que Terraform ?",
        answers: ["Un CMS pour créer des sites web", "Un outil Cloud IaaS de Microsoft", "Un outil d'Infrastructure as Code (IaC)", "Une alternative à Docker"],
        correct: 2
    },
    {
        id: 37, years: [4, 5], topic: "Architecture", difficulty: "hard",
        question: "Quel est l'avantage principal d'une architecture Microservices par rapport au Monolithe ?",
        answers: ["Complexité réduite au niveau du réseau", "Facilité de transaction globale", "Meilleure scalabilité indépendante des composants", "Aucune documentation requise"],
        correct: 2
    },
    {
        id: 38, years: [4, 5], topic: "Bases de données", difficulty: "hard",
        question: "Que signifie le théorème CAP en systèmes distribués ?",
        answers: ["Cohérence, Accessibilité, Parallélisme", "Consistency, Availability, Partition tolerance", "Cloud, API, Provisioning", "Create, Alter, Persist"],
        correct: 1
    },
    {
        id: 39, years: [4, 5], topic: "Sécurité", difficulty: "hard",
        question: "Qu'est ce que OAuth 2.0 ?",
        answers: ["Un protocole de chiffrement de disque dur", "Un protocole d'autorisation standard ouvert", "Une base de données open-source", "Un langage de requête pour bases graphes"],
        correct: 1
    },
    {
        id: 40, years: [4, 5], topic: "Web", difficulty: "hard",
        question: "Qu'est ce que les WebSockets ?",
        answers: ["Une méthode pour compresser les images", "Un protocole de communication bidirectionnelle en temps réel", "Un type de cookie persistant", "Un framework JavaScript"],
        correct: 1
    },
    {
        id: 41, years: [4, 5], topic: "Génie Logiciel", difficulty: "medium",
        question: "Que signifie SOLID en développement logiciel ?",
        answers: ["5 modèles de bases SQL", "5 principes pour créer des logiciels orientés objet compréhensibles et maintenables", "Security, Optimization, Logic, Injection, Debug", "Le nom d'un langage de Google"],
        correct: 1
    },
    {
        id: 42, years: [4, 5], topic: "Cloud", difficulty: "medium",
        question: "Lequel de ces services AWS est principalement utilisé comme stockage d'objets ?",
        answers: ["EC2", "RDS", "S3", "Lambda"],
        correct: 2
    },
    {
        id: 43, years: [4, 5], topic: "Linux", difficulty: "hard",
        question: "Qu'est-ce qu'un inode sous Linux ?",
        answers: ["Un nœud internet décentralisé", "Une structure de données qui stocke les métadonnées d'un fichier", "Le processus principal (PID 1)", "Un module noyau pour réseau"],
        correct: 1
    },
    {
        id: 44, years: [4, 5], topic: "Réseaux", difficulty: "hard",
        question: "Pour quelle raison utilise-t-on le protocole BGP dans les réseaux informatiques ?",
        answers: ["Pour router le trafic entre différents systèmes autonomes sur Internet", "Pour chiffrer les requêtes DNS", "Pour assigner des adresses IP dynamiquement", "Pour vérifier l'arrivée d'un paquet TCP"],
        correct: 0
    },

    // -------------------------------------------------------------------------
    // ANNEE 5 : PRO / EXPERT (5)
    // -------------------------------------------------------------------------
    {
        id: 45, years: [5], topic: "Distributed Systems", difficulty: "hard",
        question: "Dans le contexte de bases de données distribuées, que résout l'algorithme Paxos ou Raft ?",
        answers: ["L'optimisation des index", "Le consensus pour s'assurer que les nœuds s'accordent sur l'état des données", "La recherche plein texte", "L'équilibrage de charge entre les clients web"],
        correct: 1
    },
    {
        id: 46, years: [5], topic: "Architecture", difficulty: "hard",
        question: "Qu'est-ce que le 'Event Sourcing' ?",
        answers: ["Stocker l'état de l'application sous forme d'une séquence d'événements immuables", "Créer un calendrier synchronisé", "Remplacer le backend par des appels API externes", "Supprimer les base de données pour tout stocker en RAM"],
        correct: 0
    },
    {
        id: 47, years: [5], topic: "Kubernetes", difficulty: "hard",
        question: "Comment Kubernetes gère-t-il la configuration et les secrets ?",
        answers: ["Il compile les secrets dans les images Docker", "En utilisant des ConfigMaps et des Secrets montés en volume ou en variable d'environnement", "Il n'y a pas de gestion, il faut utiliser un système externe", "En écrivant les secrets en clair dans le code source"],
        correct: 1
    },
    {
        id: 48, years: [5], topic: "DevOps", difficulty: "hard",
        question: "Qu'est-ce qu'un Service Mesh (ex: Istio) dans une architecture Microservices ?",
        answers: ["Un système de mise en page frontend", "Un bus de données Hadoop", "Une couche d'infrastructure gérant les communications sécurisées entre microservices", "Un logiciel pour dessiner des graphes"],
        correct: 2
    },
    {
        id: 49, years: [5], topic: "Cloud / Scalabilité", difficulty: "hard",
        question: "Quelle est la différence entre scalabilité horizontale (Scale-out) et verticale (Scale-up) ?",
        answers: ["Verticale ajoute du CPU/RAM, Horizontale ajoute de nouvelles machines", "Verticale ajoute des machines, Horizontale ajoute du CPU/RAM", "C'est la même chose, seul le coût change", "Horizontale est pour les bases de données, Verticale pour les serveurs web"],
        correct: 0
    },
    {
        id: 50, years: [5], topic: "Machine Learning / MLOps", difficulty: "hard",
        question: "En MLOps, qu'est-ce que le Data Drift ?",
        answers: ["Un algorithme d'apprentissage renforcé", "La perte physique d'un disque dur", "Le changement de distribution des données modèles par rapport aux données d'entraînement", "Une fonction coût de gradient"],
        correct: 2
    },
    {
        id: 51, years: [5], topic: "Cybersecurity", difficulty: "hard",
        question: "Qu'est-ce qu'une attaque 'Zero-Day' ?",
        answers: ["Une attaque qui ne dure qu'une seule journée", "L'exploitation d'une vulnérabilité informatique par des pirates avant qu'un correctif de sécurité n'ait été publié", "Un ransomware demandant 0 centime de rançon", "Le fait d'éteindre un serveur distant"],
        correct: 1
    },
    {
        id: 52, years: [5], topic: "System Design", difficulty: "hard",
        question: "Qu'est-ce que le 'Sharding' (partitionnement) de base de données ?",
        answers: ["Mettre en cache toutes les requêtes SQL", "Multiplier la mémoire vive par 4", "Découper la base de données horizontalement en fragments répartis sur différents serveurs", "Supprimer les données inactives"],
        correct: 2
    },
    {
        id: 53, years: [5], topic: "Performance", difficulty: "hard",
        question: "Qu'est-ce qu'un CDN (Content Delivery Network) ?",
        answers: ["Un réseau de diffusion de contenu qui rapproche géographiquement les ressources statiques de l'utilisateur", "Un langage backend ultra-rapide", "Une base de donnée temps réel en mémoire", "Un outil de monitoring DevOps"],
        correct: 0
    },
    {
        id: 54, years: [5], topic: "Réseaux / Web", difficulty: "hard",
        question: "Que fait le 'Reverse Proxy' (ex: Nginx, HAProxy) ?",
        answers: ["Il inverse les adresses IP sortantes", "Il intercepte les requêtes des clients, les transmet aux serveurs backend et gère notamment le SSL", "Il permet d'accéder au Dark Web", "Il remplace le serveur DNS mondial"],
        correct: 1
    },
    
    // Pour remplir les quotas de l'année 1, 2, 3, 4 manquants
    {
        id: 55, years: [1], topic: "Algorithmie", difficulty: "easy",
        question: "Quelle structure permet d'exécuter un code selon une condition ?",
        answers: ["Générateur", "if / else", "Tableau", "Classe"],
        correct: 1
    },
    {
        id: 56, years: [1, 2], topic: "Git", difficulty: "easy",
        question: "Que fait 'git clone' ?",
        answers: ["Copie un fichier local", "Créé une branche", "Récupère un dépôt distant pour le copier sur l'ordinateur local", "Supprime un dépôt"],
        correct: 2
    },
    {
        id: 57, years: [1], topic: "Web", difficulty: "easy",
        question: "Quelle méthode HTTP est utilisée pour demander une page Web (lecture) ?",
        answers: ["POST", "PUT", "GET", "DELETE"],
        correct: 2
    },
    {
        id: 58, years: [1, 2], topic: "Linux", difficulty: "easy",
        question: "Comment s'appelle l'utilisateur système ayant tous les droits sur Linux ?",
        answers: ["Admin", "SuperUser", "Root", "Master"],
        correct: 2
    },
    {
        id: 59, years: [2, 3], topic: "Web", difficulty: "medium",
        question: "Que signifie DOM dans le contexte JavaScript ?",
        answers: ["Data Object Method", "Document Object Model", "Direct Over Memory", "Digital Output Machine"],
        correct: 1
    },
    {
        id: 60, years: [3, 4], topic: "Linux", difficulty: "medium",
        question: "Pour terminer un processus Linux bloqué, quelle commande utilise-t-on le plus souvent avec son PID ?",
        answers: ["stop", "kill", "close", "end"],
        correct: 1
    },
    {
        id: 61, years: [3, 4], topic: "Base de données", difficulty: "medium",
        question: "Qu'est-ce que l'ACID en base de données ?",
        answers: ["Atomicité, Cohérence, Isolation, Durabilité", "Accès Complet et Insertion Dynamique", "Une technologie de chiffrement", "Un langage concurrent de SQL"],
        correct: 0
    },
    {
        id: 62, years: [4, 5], topic: "Architecture", difficulty: "hard",
        question: "Dans un broker de messages (RabbitMQ / Kafka), à quoi sert un 'Consumer' ?",
        answers: ["A stocker les messages de façon permanente", "A définir le format du message JSON", "A s'abonner et lire les messages publiés dans la file", "Uniquement à faire des logs"],
        correct: 2
    },
    {
        id: 63, years: [4, 5], topic: "Web", difficulty: "hard",
        question: "Quelle protection empêche généralement des requêtes AJAX provenant d'un domaine externe non autorisé ?",
        answers: ["SSL", "Le pare-feu Linux", "CORS (Cross-Origin Resource Sharing)", "VPN"],
        correct: 2
    },
    {
        id: 64, years: [1, 2, 3], topic: "Programmation", difficulty: "easy",
        question: "Qu'est-ce que JSON (JavaScript Object Notation) ?",
        answers: ["Un OS créé par JavaScript", "Un format d'échange de données structurées, semblable textuellement à des objets JS", "Un moteur de base de données web", "Une bibliothèque Python"],
        correct: 1
    },
    {
        id: 65, years: [2, 3], topic: "Algorithmique", difficulty: "medium",
        question: "Qu'est ce qu'une table de hachage (HashMap) ?",
        answers: ["Une structure de donnée associant des clés à des valeurs pour un accès rapide", "Un tableau contenant uniquement des nombres", "Un script de chiffrement AES", "Une arborescence d'héritage"],
        correct: 0
    },
    {
        id: 66, years: [1, 2], topic: "Web", difficulty: "easy",
        question: "À quoi sert la balise HTML <a> ?",
        answers: ["Afficher une image", "Créer un lien hypertexte (ancre)", "Déclarer une variable", "Structurer un paragraphe"],
        correct: 1
    },
    {
        id: 67, years: [3, 4], topic: "Python", difficulty: "medium",
        question: "À quoi sert l'outil 'pip' en Python ?",
        answers: ["À formater le code", "À installer et gérer des paquets extérieurs", "À lancer l'interpréteur graphique", "À compiler Python en C"],
        correct: 1
    },
    {
        id: 68, years: [5], topic: "DevOps / Monitoring", difficulty: "hard",
        question: "Qu'est-ce que Prometheus est principalement utilisé pour faire ?",
        answers: ["Lancer des conteneurs via CRI", "Pousser le code en production", "Collecter, stocker et interroger des métriques de monitoring sous forme de séries temporelles", "Fournir un DNS local"],
        correct: 2
    },
    {
        id: 69, years: [5], topic: "Kubernetes", difficulty: "hard",
        question: "A quoi sert le composant 'Kubelet' dans un cluster K8s ?",
        answers: ["C'est l'interface graphique du cluster", "Il tourne sur chaque nœud et garantit que les conteneurs s'exécutent dans les Pods", "C'est la base de données principale (etcd)", "C'est un routeur matériel"],
        correct: 1
    },
    {
        id: 70, years: [4, 5], topic: "Sécurité", difficulty: "hard",
        question: "En sécurité asymétrique, quelle clé est utilisée pour chiffrer un message que seul le propriétaire pourra déchiffrer ?",
        answers: ["La clé privée", "La clé publique", "La clé AES 256", "La clé Hashing"],
        correct: 1
    },
    
    // Suppléments pour s'assurer que les quotas de "facile", "moyen", "difficile" sont couverts.
    {
        id: 71, years: [1], topic: "Cybersécurité", difficulty: "easy",
        question: "Qu'est-ce qu'un firewall (pare-feu) ?",
        answers: ["Un logiciel supprimant les virus", "Un système protégeant un réseau local de potentielles attaques extérieures", "Un câble réseau", "Un programme qui refroidit les serveurs"],
        correct: 1
    },
    {
        id: 72, years: [1], topic: "Web", difficulty: "easy",
        question: "Quel langage est exécuté côté client (dans le navigateur) ?",
        answers: ["PHP", "JavaScript", "SQL", "Python"],
        correct: 1
    },
    {
        id: 73, years: [2, 3], topic: "Bases de données", difficulty: "medium",
        question: "Dans SQL, quelle clause permet de filtrer les résultats d'un SELECT ?",
        answers: ["ORDER BY", "WHERE", "GROUP", "LIMIT"],
        correct: 1
    },
    {
        id: 74, years: [2, 3], topic: "Programmation", difficulty: "medium",
        question: "En Java, quel mot-clé indique qu'une méthode ne retourne rien ?",
        answers: ["null", "empty", "void", "static"],
        correct: 2
    },
    {
        id: 75, years: [3, 4], topic: "Programmation", difficulty: "medium",
        question: "Qu'est-ce qui caractérise un langage à 'typage dynamique' ?",
        answers: ["Le type d'une variable peut changer en cours d'exécution", "Toutes les variables sont des nombres", "Le type est déterminé définitivement à la compilation", "Le langage n'a pas de variable"],
        correct: 0
    },
    {
        id: 76, years: [4, 5], topic: "Architecture", difficulty: "hard",
        question: "Quel rôle tient un 'API Gateway' dans une architecture microservices ?",
        answers: ["Il est le moteur de base de données principal", "Il sert de point d'entrée unique qui gère l'authentification, le routage et le throttling", "C'est un simple VPN", "Il déploie automatiquement les conteneurs"],
        correct: 1
    },
    {
        id: 77, years: [4, 5], topic: "Bases de données", difficulty: "hard",
        question: "Quelle méthode est couramment utilisée pour contourner les verrous et pertes de performances dans un SELECT massif sous SQL ?",
        answers: ["Utiliser le mot-clé READ NO-LOCK (Nolock)", "Ne pas mettre de filtre WHERE", "Faire des SELECT * tout le temps", "Changer de SGBD pendant l'exécution"],
        correct: 0
    },
    {
        id: 78, years: [4, 5], topic: "DevOps", difficulty: "hard",
        question: "Sur un playbook Ansible, comment définit-on généralement les tâches à exécuter ?",
        answers: ["Via un pipeline Bash", "En YAML", "En Python natif", "En SQL"],
        correct: 1
    },
    {
        id: 79, years: [5], topic: "Data", difficulty: "hard",
        question: "Qu'est-ce qu'un Data Lake par rapport à un Data Warehouse ?",
        answers: ["Un lac de données qui stocke en vrac de la donnée structurée, semi-structurée et non structurée (brute)", "Un entrepôt qui rejette toute donnée textuelle", "Un composant matériel pour processeurs", "Le nouveau nom du Big Data"],
        correct: 0
    },
    {
        id: 80, years: [5], topic: "Distributed Systems", difficulty: "hard",
        question: "En architecture réactive, qu'est ce que la résilience (Resilient) ?",
        answers: ["Le système répond vite en toutes circonstances", "Le système reste interactif malgré les pannes (tolérance absolue aux défaillances graves)", "Il résiste au piratage", "Le code peut s'adapter en s'autocorrigeant"],
        correct: 1
    }

];