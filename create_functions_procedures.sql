DROP PROCEDURE IF EXISTS registerPlayer;
CREATE PROCEDURE registerPlayer(
	username_in VARCHAR(255),
	password_in VARCHAR(255),
	first_name_in VARCHAR(255),
	last_name_in VARCHAR(255)
)
LANGUAGE SQL
AS $$
	INSERT INTO TCSwap_user(username, pass, first_name, last_name)
	VALUES (username_in, password_in, first_name_in, last_name_in);
 $$;


DROP PROCEDURE IF EXISTS registerStoreOwner;
CREATE PROCEDURE registerStoreOwner(
	username_in VARCHAR(255),
	password_in VARCHAR(255),
	first_name_in VARCHAR(255),
	last_name_in VARCHAR(255)
)
LANGUAGE SQL
AS $$
	INSERT INTO TCSwap_user(username, pass, first_name, last_name, role)
	VALUES (username_in, password_in, first_name_in, last_name_in, 'store owner');
 $$;


DROP PROCEDURE IF EXISTS addUserCard;
CREATE PROCEDURE addUserCard(
	card_owner_in VARCHAR(255),
	card_identifier_in VARCHAR(255),
	game_in VARCHAR(255),
	card_condition_in VARCHAR(255)
)
LANGUAGE 'plpgsql'
AS $$
BEGIN 
	IF ((SELECT count(*) FROM card WHERE card_owner = card_owner_in AND card_identifier = card_identifier_in AND card_condition = card_condition_in)>0) THEN 
		UPDATE card
		SET num_owned = num_owned +1
		WHERE card_owner = card_owner_in AND card_identifier = card_identifier_in AND card_condition = card_condition_in;
	ELSE 
		INSERT INTO card(card_owner, card_identifier, game, card_condition, num_owned)
		VALUES (card_owner_in, card_identifier_in, game_in, card_condition_in, 1);
	END IF;
END 
 $$;

DROP FUNCTION IF EXISTS getUserCards;
CREATE FUNCTION  getUserCards(
	username_in VARCHAR(255)
)
RETURNS TABLE (id INTEGER ,card_identifier VARCHAR(255), game VARCHAR(255), card_condition VARCHAR(255), num_owned INTEGER)
LANGUAGE SQL
AS $$
	SELECT id, card_identifier, game, card_condition, num_owned
	FROM card
	JOIN TCSwap_user ON (TCSwap_user.username = card.card_owner)
	WHERE TCSwap_user.username = username_in;;
 $$;

--SELECT * from getUserCards('bob99');




