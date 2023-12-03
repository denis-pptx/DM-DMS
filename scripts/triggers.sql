USE library;

# check_book_availability - reviews only for available books
DELIMITER // 
CREATE TRIGGER check_book_availability
BEFORE INSERT ON review
FOR EACH ROW
BEGIN
    DECLARE is_book_available TINYINT;
    SELECT is_available INTO is_book_available FROM book WHERE id = NEW.book_id;
    IF is_book_available = 0 THEN
        SIGNAL SQLSTATE '45000' # unhandled user-defined exception
        SET MESSAGE_TEXT = 'Cannot add review for an unavailable book';
    END IF;
END;
//
DELIMITER ;

# Test check_book_availability
/*
UPDATE book
SET is_available = 1
WHERE id = 1;

INSERT INTO review (text, rating, user_id, book_id) 
VALUES 
	("Test text",  5, 10, 1); 
*/

