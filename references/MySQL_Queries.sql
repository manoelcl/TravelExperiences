CREATE DATABASE travel_experiences;

USE travel_experiences;

CREATE TABLE user (
    id INT UNSIGNED AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(100)NOT NULL UNIQUE,
    role ENUM("user", "admin") DEFAULT "user" NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


CREATE TABLE recommendation(
    id INT UNSIGNED AUTO_INCREMENT,
    id_user INT UNSIGNED NOT NULL,
    title VARCHAR(100) NOT NULL,
    class ENUM("travel", "experience") DEFAULT "travel" NOT NULL,
    location VARCHAR(100) NOT NULL,
    abstract VARCHAR(300) NOT NULL,
    content TINYTEXT NOT NULL,
    photo VARCHAR(100) NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user) REFERENCES user(id)
);

CREATE TABLE comment(
    id INT UNSIGNED AUTO_INCREMENT,
    id_user INT UNSIGNED NOT NULL,
    id_recommendation INT UNSIGNED NOT NULL,
    content VARCHAR(300) NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_recommendation) REFERENCES recommendation(id)
);

CREATE TABLE vote(
    id_user INT UNSIGNED NOT NULL,
    id_recommendation INT UNSIGNED NOT NULL,
    rating INT UNSIGNED NOT NULL,
    CHECK (rating <= 5),
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_recommendation) REFERENCES recommendation(id),
    PRIMARY KEY (id_user,id_recommendation)
);


INSERT INTO user (email, password, username, role)
VALUES ("pepe@pepe.com", "pepepe", "pepemola", "admin"),
	("pe2321pe@pepe.com", "pep92epe", "pepemola2321", "user"),
    ("pep1424e@pepe.com", "pepe92pe", "pepe1232mola", "user"),
    ("peasdsape@pepe.com", "pepe28442pe", "l337", "user"),
    ("tobias@pepe.com", "tob32918i", "tobias69", "admin"); 
