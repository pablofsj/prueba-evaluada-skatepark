--------------------------------------------------------------------

CREATE DATABASE skatepark;

--------------------------------------------------------------------

CREATE TABLE skaters (
    id SERIAL, 
    email VARCHAR(50) NOT NULL, 
    nombre VARCHAR(25) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    anos_experiencia INT NOT NULL, 
    especialidad VARCHAR(50) NOT NULL, 
    foto VARCHAR(255) NOT NULL, 
    estado BOOLEAN NOT NULL);

--------------------------------------------------------------------

SEEDING DE DATOS:


INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado)
VALUES 
('dannyway@gmail.com', 'Danny Way', '$2a$10$iXifOp0py.nYoKPr8sAHHOsuJPYH9uSnIMKtVY86hMa7uWXSbV4Tm', 8, 'Ollie','c0095fec-722c-4273-9358-be7a88851699', false),
('evelien@gmail.com', 'Evelien Boulliart', '$2a$10$KGtg6sS68.K8SXXePcAiH.gWT8SBYA6d2aB7wltddt0Qne.jKxKZO', 10, 'Heelflip','4d251829-b20e-42c0-b068-eae937c57797', false),
('tonyhawk@gmail.com', 'Tony Hawk', '$2a$10$c91roxMTAJe2KbQPXEkfr.fBisbodJuBiKlLxgXOxK34quhqwCLjW', 12, 'Kickflip','bde656a1-3f2b-4a83-a701-e90ca694445f', false);


---------------------------------------------------------------------


CREDENCIALES INICIO DE SESION:

email: tonyhawk@gmail.com
password: tonyhawk

email: evelien@gmail.com
password: evelien

email: dannyway@gmail.com
password: danny