-- MySQL dump 10.13  Distrib 8.4.7, for Win64 (x86_64)
--
-- Host: localhost    Database: studymate_ai
-- ------------------------------------------------------
-- Server version	8.4.7

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `subject_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `subject_id` (`subject_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (8,1,15,'what is the meaning interface in java','2026-09-06 06:02:31','2026-09-06 06:02:39'),(7,1,15,'what is your name','2026-09-06 05:57:48','2026-09-06 05:57:52'),(6,1,15,'hello, how are you','2026-09-06 05:54:10','2026-09-06 05:54:23'),(9,1,16,'hello','2026-09-07 14:45:59','2026-09-07 14:47:25');
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int NOT NULL,
  `sender` enum('user','ai') COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (11,6,'user','hello, how are you','2026-09-06 05:54:10'),(12,6,'ai','🌐 From general knowledge:\n\nHello! I\'m doing great and ready to help you with your studies. How can I assist you with your notes on **DataClean Pro** or any other questions today?','2026-09-06 05:54:23'),(13,7,'user','what is your name','2026-09-06 05:57:48'),(14,7,'ai','🌐 From general knowledge:\n\nI am **StudyMate AI**, your helpful study assistant! I am here to answer your questions, explain concepts, and help you review your uploaded study notes.','2026-09-06 05:57:52'),(15,8,'user','what is the meaning interface in java','2026-09-06 06:02:31'),(16,8,'ai','🌐 From general knowledge:\n\nIn Java, an **interface** is a reference type (similar to a class) that acts as a **blueprint or contract** for what a class must do, without defining *how* it does it. \n\nIt is primarily used to achieve **abstraction** and **multiple inheritance** in Java.\n\n---\n\n### 🔑 Key Characteristics of an Interface\n\n1. **Contract/Blueprint:** If a class implements an interface, it promises to provide an implementation (body) for all the abstract methods declared in that interface.\n2. **Abstract Methods:** By default, methods in an interface are `public` and `abstract` (meaning they have no method body).\n3. **Constants:** Any variables declared inside an interface are automatically `public`, `static`, and `final` (constants).\n4. **Keyword:** You define an interface using the `interface` keyword and use it in a class using the `implements` keyword.\n\n---\n\n### 💡 Why Use Interfaces?\n\n* **Total Abstraction:** It hides the implementation details and only exposes the method signatures.\n* **Multiple Inheritance:** A class in Java cannot extend more than one class, but it can implement **multiple interfaces**.\n* **Loose Coupling:** It allows components to interact with each other without depending on specific underlying class implementations.\n\n---\n\n### 📝 Code Example\n\n```java\n// Define the interface\ninterface Animal {\n    void makeSound(); // Abstract method (no body)\n}\n\n// Implement the interface in a class\nclass Dog implements Animal {\n    // Providing the implementation for the interface method\n    public void makeSound() {\n        System.out.println(\"Bark bark!\");\n    }\n}\n```','2026-09-06 06:02:39'),(17,9,'user','hello','2026-09-07 14:45:59'),(18,9,'ai','Hello! How can I help you today?','2026-09-07 14:46:13'),(19,9,'user','how are u','2026-09-07 14:46:19'),(20,9,'ai','I\'m doing well, thank you for asking! How are you doing today? How can I help you?','2026-09-07 14:47:25');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_id` int NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_path` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extracted_text` longtext COLLATE utf8mb4_unicode_ci,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (9,15,'DataCleanPro Abstarct.pdf','application/pdf','uploads/DataCleanPro Abstarct.pdf','DataClean Pro: An Automated Data Cleaning \nSystem \n \nABSTRACT \nData cleaning is an important step before data analysis, as raw datasets \noften contain duplicate records, missing values, inconsistent formatting, \nunnecessary spaces, and empty rows. Cleaning such data manually is \ntime-consuming and prone to errors. \nThe DataClean Pro: An Automated Data Cleaning System  is a web-\nbased application that automates common data cleaning tasks. Users can \nupload a CSV file, select the required cleaning operations, and receive a \ncleaned dataset along with a summary of the changes made. T he \napplication is developed using React, Flask, MySQL, and Pandas , \nproviding a simple and efficient solution for improving data quality while \ndemonstrating file handling, database integration, API communication, \nand automated data preprocessing. \n ','2026-09-01 13:06:37'),(10,16,'Sphoorti_Assignment4.pdf','application/pdf','uploads/Sphoorti_Assignment4.pdf','                                     Assignment 4 \n1. What happens if you use list comprehension without \nassigning it to a variable?\na) Raises a syntax error\nb) It creates a list but doesn\'t store it\nc) It modifies the original list\nd) It returns a generator object\nAnswer: b) It creates a list but doesn\'t store it\n2. In a list comprehension, what does the expression \nrepresent?\na) The iterable being traversed\nb) The condition for filtering elements\nc) The value to be included in the new list\nd) The index of the current element\nAnswer: c) The value to be included in the new list\n3. What is the role of if class in list comprehension?\na) It sets the value of expression\nb) It creates the filter for element\nc) It is used for iteration\nd) It reverses the order of elements\nAnswer: b) It creates the filter for element\n4. Which statement is true about an OrderedDict?\na) It does not maintain the order of elements\nb) It raises a KeyError if the key is missing\nc) It remembers the order in which keys are inserted\nd) It allows only numerical keys\nAnswer: c) It remembers the order in which keys are \ninserted\n5. What happens when you try to access a missing key in defaultdict?\na) It returns None\nb) It raises a KeyError\nc) It removes the key from dictionary\nd) It returns the default value set for the dictionary\nAnswer: d) It returns the default value set for the \ndictionary\n6. Which of the following is not part of the collections\nmodule?\na) Counter\nb) OrderedDict\nc) ArrayList\nd) deque\nAnswer: c) ArrayList\n--------------------------------------------------------\n---------------------------------------\n# write a program that iterates over elements as many \ntimes as its count\nprint(\"Program that iterates over elements as many times\nas its count:\")\nl=[1,2,3,4,4,2,3,1,3,2,1,2]\nd={}\nfor i in l:\n    if i in d:\n        d[i]+=1\n    else:\n        d[i]=1\nfor key,value in d.items():\n    for i in range(value):\n        print(key)\nprint(\"--------------------------------------------------------------------------\")\n# write a program that iterates through words/elements \nand displays only the element at a given index and \nbreaks at the third index\nprint(\"iterates over specified index and breaks at third\nindex: \")\ns=input(\"enter a string:\")\nl=s.split()\nind=int(input(\"enter the index:\"))\nfor i in range(len(l)):\n    if i == ind:\n        print(l[i])\n    if i ==3:\n        break\nprint(\"-------------------------------------------------\n-------------------------\")\n# to find the occurence of 10 most common words\nprint(\"Occurrence of 10 most common words:\")\nfrom collections import Counter\ntxt=input(\"Enter text: \").lower().split()\ncount=Counter(txt)\nfor word,c in count.most_common(10):\n    print(word,\"-\",c)\nprint(\"-------------------------------------------------\n-------------------------\")\n# create a deque and perform append , remove and reverse\noperations\nprint(\"Operations on deque:\")\nfrom collections import deque\nd=deque([12,23,34,45])print(\"Original deque: \",d)\nd.append(56)\nprint(\"After appending: \",d)\nd.remove(34)\nprint(\"After removing: \",d)\nd.reverse()\nprint(\"Reverse: \",d)\nprint(\"-------------------------------------------------\n-------------------------\")\n# creating a set of duplicates from list\nprint(\"Set of duplicate elements of a list:\")\nl=eval(input(\"Enter a list:\"))\nl1=[x for x in l if l.count(x)>1]\ns=set(l1)\nprint(s)\nprint(\"-------------------------------------------------\n-------------------------\")\n# total revenue product-wise\nprint(\"Product - wise total revenue: \")\nsales=[(\"Rice\",1300),\n      (\"Wheat\",2600),\n      (\"Ragi\",900),\n      (\"Wheat\",1100),\n      (\"Rice\",2800)\n      ]\nd={}\nfor i in sales:\n    if i[0] in d:\n        d[i[0]]+=i[1]\n    else:\n        d[i[0]]=i[1]print(d)\nprint(\"-------------------------------------------------\n-------------------------\")','2026-09-22 03:52:55');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_subject_user` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (16,'DBMS','2026-09-04 14:33:46',1),(15,'AI','2026-09-01 13:06:11',1);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashed_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sphoorti','patilsphoorti13@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$irumCYGMY+TFtDCJVHyguA$ABN2RSFAM8gamr4geR55F5gHWnARpo02FeFnewd2k2c','2026-08-24 13:59:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-22 19:57:09
