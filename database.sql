CREATE TABLE "koali" (
	"id" serial primary key,
	"name" varchar(80) not null,
	"gender" varchar(1) not null,
	"age" integer,
	"ready_to_transfer" boolean,
	"notes" varchar(180)
);

INSERT INTO "koali" ("id", "name", "gender", "age", "ready_to_transfer", "notes")
VALUES
    (1, 'Scotty', 'M', 4, 'Y', 'Born in Guatemala'),
    (2, 'Jean', 'F', 5, 'Y', 'Allergic to lots of things'),
    (3, 'Ororo', 'F', 7, 'N', 'Loves listening to Paula (Abdul)'),
    (4, 'Logan', 'M', 15, 'N', 'Loves the sauna'),
    (5, 'Charlie', 'M', 9, 'Y', 'Favorite band is Nirvana'),
    (6, 'Betsy', 'F', 4, 'Y', 'Has a pet iguana');