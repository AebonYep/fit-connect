CREATE TABLE user_accounts (id int, email varchar(99), name varchar(32), password varchar(99),goals varchar(255), type varchar(32));
ALTER TABLE user_accounts ADD CONSTRAINT PK_accounts PRIMARY KEY (id);

CREATE TABLE user_followers(user_id int, following_id int);
ALTER TABLE user_followers ADD CONSTRAINT FK_user FOREIGN KEY (user_id) references user_accounts(id);
ALTER TABLE user_followers ADD CONSTRAINT FK_following FOREIGN KEY (following_id) references user_accounts(id);

CREATE TABLE user_messages(sender_id int, sentto_id int, content varchar(255), sent datetime);

CREATE TABLE user_posts(id int DEFAULT 0, user_id int, title varchar(32), content varchar(255), tags varchar(255), date date, type varchar(32), likes int);
ALTER TABLE user_posts ADD CONSTRAINT PK_posts PRIMARY KEY (id);
ALTER TABLE user_posts ADD CONSTRAINT FK_user_id FOREIGN KEY (user_id) references user_accounts(id);

INSERT INTO user_accounts (id, email, name, password, type) VALUES (1, "admin@mail.com", "admin", "password", "admin")
