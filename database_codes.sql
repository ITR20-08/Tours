DELIMITER $$
CREATE TRIGGER after_review_insert 
AFTER INSERT ON review
FOR EACH ROW BEGIN
	SET @calification_average := (SELECT AVG(calification) FROM review WHERE Tour = NEW.Tour);
	UPDATE tour SET calification = @calification_average WHERE id = NEW.Tour;
END$$

ALTER TABLE review ADD CONSTRAINT review_calification_constraint CHECK (calification in (1,2,3,4,5));

ALTER TABLE tour ADD CONSTRAINT tour_calification_constraint CHECK (calification in (1,2,3,4,5));
    
	
	