CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,skills TEXT,img TEXT);
INSERT or IGNORE INTO developer VALUES (1, 'Simon', '', 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');
INSERT or IGNORE INTO developer VALUES (2, 'Max', '', 'https://pbs.twimg.com/profile_images/953978653624455170/j91_AYfd_400x400.jpg');
INSERT or IGNORE INTO developer VALUES (3, 'Ben', '', 'https://pbs.twimg.com/profile_images/1060037170688417792/vZ7iAWXV_400x400.jpg');
 
CREATE TABLE IF NOT EXISTS product(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, creatorId INTEGER);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (1, 'Ionic Academy', 1);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (2, 'Software Startup Manual', 1);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (3, 'Ionic Framework', 2);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (4, 'Drifty Co', 2);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (5, 'Drifty Co', 3);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (6, 'Ionicons', 3);

CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT, password2 TEXT);

INSERT or IGNORE INTO user(id, username, password2) VALUES (1, 'felipe', '12345');
INSERT or IGNORE INTO user(id, username, password2) VALUES (2, 'fandres', '321');

CREATE TABLE IF NOT EXISTS unidad_medida(id INTEGER PRIMARY KEY AUTOINCREMENT,codigo TEXT, descripcion TEXT, unidad_medida TEXT, fecha_creacion TEXT,fecha_modificacion TEXT);

INSERT or IGNORE INTO unidad_medida(id, codigo, descripcion,unidad_medida,fecha_creacion,fecha_modificacion) VALUES (1, 'XLSDF', 'kilo','Kilo', '30/11/2020', '');
INSERT or IGNORE INTO unidad_medida(id, codigo, descripcion,unidad_medida,fecha_creacion,fecha_modificacion) VALUES (2, 'XLSAD', 'a','Litro', '01/12/2020', '');
INSERT or IGNORE INTO unidad_medida(id, codigo, descripcion,unidad_medida,fecha_creacion,fecha_modificacion) VALUES (3, 'XLSSD', 's','Tonelada', '01/12/2020', '');


CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT,codigo TEXT, descripcion TEXT, unidad_medida TEXT, fecha_creacion TEXT,fecha_modificacion TEXT);

INSERT or IGNORE INTO items(id, codigo, descripcion,unidad_medida,fecha_creacion,fecha_modificacion) VALUES (1, 'XLSDF', 'Awa','litro', '30/11/2020', '');
INSERT or IGNORE INTO items(id, codigo, descripcion,unidad_medida,fecha_creacion,fecha_modificacion) VALUES (2, 'XLSDF', 'Container','Tonelada', '01/12/2020', '');

CREATE TABLE IF NOT EXISTS almacenes(id INTEGER PRIMARY KEY AUTOINCREMENT,codigo TEXT, descripcion TEXT, fecha_creacion TEXT,fecha_modificacion TEXT);

INSERT or IGNORE INTO almacenes(id, codigo, descripcion,fecha_creacion,fecha_modificacion) VALUES (1, 'XLSDF', 'Almacen 1', '30/11/2020', '');
INSERT or IGNORE INTO almacenes(id, codigo, descripcion,fecha_creacion,fecha_modificacion) VALUES (2, 'XLSDF', 'Almacen 2', '30/11/2020', '');
INSERT or IGNORE INTO almacenes(id, codigo, descripcion,fecha_creacion,fecha_modificacion) VALUES (3, 'XLSDF', 'Almacen 3', '30/11/2020', '');
INSERT or IGNORE INTO almacenes(id, codigo, descripcion,fecha_creacion,fecha_modificacion) VALUES (4, 'XLSDF', 'Almacen 4', '30/11/2020', '');

