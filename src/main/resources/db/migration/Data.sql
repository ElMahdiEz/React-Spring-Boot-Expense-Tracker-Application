insert into user(name, email) values('Messi', 'leo.messi@gmail.com');
insert into user(name, email) values('Suarez', 'luis.suarez@gmail.com');
insert into user(name, email) values('Neymar', 'neymar.jr@gmail.com');

insert into category(name) values('Travel');
insert into category(name) values('Auto Loan');
insert into category(name) values('Student Loan');

insert into expense(description, expense_date, location, user_id, category_id) values('Ford Muslang', now(), 'Casablanca', 1, 2);
insert into expense(description, expense_date, location, user_id, category_id) values('Grand Camyon', now(), 'Rabat', 2, 3);
insert into expense(description, expense_date, location, user_id, category_id) values('New York', now(), 'El Jadida', 3, 1);