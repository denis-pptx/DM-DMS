# Create user procedure
DELIMITER //
CREATE PROCEDURE CreateUser(
    IN p_username VARCHAR(20),
    IN p_password VARCHAR(100),
    IN p_email VARCHAR(254),
    IN p_is_active TINYINT(1),
    IN p_is_superuser TINYINT(1),
    IN p_is_staff TINYINT(1)
)
BEGIN
    DECLARE existing_user INT;

    SELECT COUNT(*) INTO existing_user
    FROM user
    WHERE username = p_username OR email = p_email;
    
    IF existing_user = 0 THEN
        INSERT INTO user(username, password, email, is_active, is_superuser, is_staff)
        VALUES (p_username, SHA2(p_password, 256), p_email, p_is_active, p_is_superuser, p_is_staff);
        
        SELECT 'User created successfully' AS result;
    ELSE
        SELECT 'Username or email already exists' AS result;
    END IF;
END; 
//
DELIMITER ;

# Test procedure
# CALL CreateUser("denis_test", "test_password", "qwe@mail.ru", 1, 0, 0);




# Books by parameters procedure
DELIMITER //
CREATE PROCEDURE GetBooksByParameters(
    IN p_language_id INT,
    IN p_author_id INT,
    IN p_genre_id INT,
    IN p_publisher_id INT
)
BEGIN
    SELECT DISTINCT b.*
    FROM book b
    LEFT JOIN book_language bl ON b.id = bl.book_id
    LEFT JOIN book_author ba ON b.id = ba.book_id
    LEFT JOIN book_genre bg ON b.id = bg.book_id
    WHERE
        (p_language_id IS NULL OR bl.language_id = p_language_id)
        AND (p_author_id IS NULL OR ba.author_id = p_author_id)
        AND (p_genre_id IS NULL OR bg.genre_id = p_genre_id)
        AND (p_publisher_id IS NULL OR b.publisher_id = p_publisher_id);
END;
//
DELIMITER ;

# Test procedure
# CALL GetBooksByParameters(NULL, 1, 3, NULL);