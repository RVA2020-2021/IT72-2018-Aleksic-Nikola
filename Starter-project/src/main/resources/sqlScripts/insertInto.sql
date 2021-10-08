INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (1, '2021-04-19', 'kartica');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (2, '2021-04-19', 'kes');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (3, '2021-04-19', 'kartica');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (4, '2021-04-19', 'kes');
INSERT INTO "racun" ("id", "datum", "nacin_placanja")
VALUES (-100, '2021-04-19', 'test');

INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (1, 'President', 'Gakovacki put bb, Sombor', '0123456789');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (2, 'Imlek', 'Industrijsko naselje bb, Beograd', '0123456789');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (3, 'Zlatiborac', 'Mojkovacka 58, Beograd', '0123456789');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (4, 'Fructal', 'Tovarniska cesta 7, Ajdovscina', '0123456789');
INSERT INTO "proizvodjac" ("id", "naziv", "adresa", "kontakt")
VALUES (-100, 'Test naziv', 'Test adresa', '0123456789');

INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (1, 'Mladi sir', 1);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (2, 'Mleko', 2);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (3, 'Cajna kobasica', 3);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (4, 'Sok od jabuke', 4);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (-100, 'Mleko', -100);

INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (1, 1, 1, 'kg', 200, 1, 1);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (2, 2, 1, 'l', 100, 2, 2);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (3, 3, 1, 'kg', 200, 3, 3);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (4, 4, 1, 'l', 100, 3, 3);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "proizvod", "racun")
VALUES(-100, 30, 15, 'kg', 100, -100, -100);