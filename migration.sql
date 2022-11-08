DROP TABLE IF EXISTS cars CASCADE;

CREATE TABLE cars (
  id serial,
  manufacture varchar,
  model varchar,
  color varchar,
  year integer,
  MSRP integer
);