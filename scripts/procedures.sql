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
