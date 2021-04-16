-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gestion_tours
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gestion_tours
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gestion_tours` DEFAULT CHARACTER SET utf8 ;
USE `gestion_tours` ;

-- -----------------------------------------------------
-- Table `gestion_tours`.`benefit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_tours`.`benefit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gestion_tours`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_tours`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gestion_tours`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_tours`.`location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gestion_tours`.`tour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_tours`.`tour` (
  `id` VARCHAR(20) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `duration` INT NOT NULL,
  `start_date` DATE NOT NULL,
  `price_for_person` DECIMAL(10,0) NOT NULL,
  `max_capacity` INT NOT NULL,
  `calification` INT NOT NULL,
  `Category` INT NOT NULL,
  `Location` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Tour_Category1_idx` (`Category` ASC) VISIBLE,
  INDEX `fk_Tour_Location1_idx` (`Location` ASC) VISIBLE,
  CONSTRAINT `fk_Tour_Category1`
    FOREIGN KEY (`Category`)
    REFERENCES `gestion_tours`.`category` (`id`),
  CONSTRAINT `fk_Tour_Location1`
    FOREIGN KEY (`Location`)
    REFERENCES `gestion_tours`.`location` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gestion_tours`.`picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_tours`.`picture` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Tour` VARCHAR(20) NOT NULL,
  `picture` BLOB NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Pictures_Tour1_idx` (`Tour` ASC) VISIBLE,
  CONSTRAINT `fk_Pictures_Tour1`
    FOREIGN KEY (`Tour`)
    REFERENCES `gestion_tours`.`tour` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gestion_tours`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_tours`.`user` (
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `birth_date` DATE NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gestion_tours`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_tours`.`reservation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Tour` VARCHAR(20) NOT NULL,
  `quantity` INT NOT NULL,
  `User` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Reservation_Tour1_idx` (`Tour` ASC) VISIBLE,
  INDEX `fk_Reservation_User1_idx` (`User` ASC) VISIBLE,
  CONSTRAINT `fk_Reservation_Tour1`
    FOREIGN KEY (`Tour`)
    REFERENCES `gestion_tours`.`tour` (`id`),
  CONSTRAINT `fk_Reservation_User1`
    FOREIGN KEY (`User`)
    REFERENCES `gestion_tours`.`user` (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gestion_tours`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_tours`.`review` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `calification` INT NOT NULL,
  `Tour` VARCHAR(20) NOT NULL,
  `User` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Reviews_Tour1_idx` (`Tour` ASC) VISIBLE,
  INDEX `fk_Review_User1_idx` (`User` ASC) VISIBLE,
  CONSTRAINT `fk_Review_User1`
    FOREIGN KEY (`User`)
    REFERENCES `gestion_tours`.`user` (`email`),
  CONSTRAINT `fk_Reviews_Tour1`
    FOREIGN KEY (`Tour`)
    REFERENCES `gestion_tours`.`tour` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gestion_tours`.`tour_benefit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_tours`.`tour_benefit` (
  `Tour` VARCHAR(20) NOT NULL,
  `Benefit` INT NOT NULL,
  PRIMARY KEY (`Tour`, `Benefit`),
  INDEX `fk_Tour_benefits_Tour1_idx` (`Tour` ASC) VISIBLE,
  INDEX `fk_Tour_benefits_Benefits1_idx` (`Benefit` ASC) VISIBLE,
  CONSTRAINT `fk_Tour_benefits_Benefits1`
    FOREIGN KEY (`Benefit`)
    REFERENCES `gestion_tours`.`benefit` (`id`),
  CONSTRAINT `fk_Tour_benefits_Tour1`
    FOREIGN KEY (`Tour`)
    REFERENCES `gestion_tours`.`tour` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gestion_tours`.`favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_tours`.`favorite` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(45) NOT NULL,
  `tour_id` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_favorite_user1_idx` (`user_email` ASC) VISIBLE,
  INDEX `fk_favorite_tour1_idx` (`tour_id` ASC) VISIBLE,
  CONSTRAINT `fk_favorite_user1`
    FOREIGN KEY (`user_email`)
    REFERENCES `gestion_tours`.`user` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favorite_tour1`
    FOREIGN KEY (`tour_id`)
    REFERENCES `gestion_tours`.`tour` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
