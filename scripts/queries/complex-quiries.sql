USE library;

-- All info about books [1]
SELECT b.id as book_id, b.title, 
	   GROUP_CONCAT(DISTINCT l.name SEPARATOR ', ') as languages,
       GROUP_CONCAT(DISTINCT CONCAT_WS(' ', a.first_name, a.last_name) SEPARATOR ', ') as authors,
       GROUP_CONCAT(DISTINCT g.name SEPARATOR ', ') as genres,
       p.name as publisher
FROM book b 
	INNER JOIN book_language bl ON b.id = bl.book_id
	INNER JOIN language l ON l.id = bl.language_id
    
    INNER JOIN book_author ba ON b.id = ba.book_id
    INNER JOIN author a ON a.id = ba.author_id
    
    INNER JOIN book_genre bg ON b.id = bg.book_id
    INNER JOIN genre g ON g.id = bg.genre_id
    
	INNER JOIN publisher p on p.id = b.publisher_id
GROUP BY b.id;

-- All info about books [2]
SELECT b.id as book_id, b.title,
	(SELECT GROUP_CONCAT(l.name SEPARATOR ', ')
     FROM book_language bl INNER JOIN language l ON bl.language_id = l.id 
	 WHERE bl.book_id = b.id) as languages,
     
	(SELECT GROUP_CONCAT(CONCAT_WS(' ', a.first_name, a.last_name) SEPARATOR ', ')
	 FROM book_author ba INNER JOIN author a ON ba.author_id = a.id
	 WHERE ba.book_id = b.id) as authors,
     
	(SELECT GROUP_CONCAT(g.name SEPARATOR ', ')
	 FROM book_genre bg INNER JOIN genre g ON bg.genre_id = g.id
     WHERE bg.book_id = b.id) as genres,
     
	(SELECT p.name
     FROM publisher p
     WHERE b.publisher_id = p.id) publisher
FROM book b;