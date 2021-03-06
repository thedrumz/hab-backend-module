CREATE SCHEMA `travel_diary`;

CREATE TABLE travel_diary.users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  username VARCHAR(50),
  avatar VARCHAR(50),
  active BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,
  role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
  registrationCode VARCHAR(100),
  recoverCode VARCHAR(100),
  createdAt DATETIME NOT NULL,
  modifiedAt DATETIME
);

CREATE TABLE travel_diary.entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  place VARCHAR(100) NOT NULL,
  description TEXT,
  idUser INT NOT NULL,
  FOREIGN KEY (idUser) REFERENCES users(id),
  createdAt DATETIME NOT NULL,
  modifiedAt DATETIME
);

CREATE TABLE travel_diary.entry_photos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  idEntry INT NOT NULL,
  FOREIGN KEY (idEntry) REFERENCES entries(id) ON DELETE CASCADE,
  createdAt DATETIME NOT NULL
);

CREATE TABLE travel_diary.entry_votes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  vote TINYINT NOT NULL,
  idEntry INT NOT NULL,
  FOREIGN KEY (idEntry) REFERENCES entries(id) ON DELETE CASCADE,
  idUser INT NOT NULL,
  FOREIGN KEY (idUser) REFERENCES users(id),
  createdAt DATETIME NOT NULL
);
