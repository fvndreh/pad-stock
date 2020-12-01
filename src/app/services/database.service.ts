import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Dev {
   // tslint:disable: semicolon
  id: number,
  name: string,
  skills: any[],
  img: string
}
export interface Almacenes {
id: number,
codigo: string,
descripcion: string,
fecha_creacion: string,
fecha_modificacion: string

}

// tslint:disable: class-name
export interface Unidad_Medida {
  id: number,
  codigo: string,
  descripcion: string,
  unidad_medida: string,
  fecha_creacion: string,
  fecha_modificacion: string
}
export interface Item {
  id: number,
  codigo: string,
  descripcion: string,
  unidad_medida: string,
  fecha_creacion: string,
  fecha_modificacion: string
}

export interface User {
  id: number,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);
  unidades = new BehaviorSubject([]);
  almacenes = new BehaviorSubject([]);
  // tslint:disable: variable-name
  unidad_medidas = new BehaviorSubject([]);
  item = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadDevelopers();
          this.loadProducts();
          this.loadUnidadMedida();
          this.dbReady.next(true);
          this.loadItem();
          this.loadUnidades();
          this.loadAlmacen();
        })
        .catch(e => console.error(e));
    });
  }
  loadDevelopers() {
    return this.database.executeSql('SELECT * FROM developer', []).then(data => {
      // tslint:disable: prefer-const
      let developers: Dev[] = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          let skills = [];
          // tslint:disable: triple-equals
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          }

          developers.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            // tslint:disable: object-literal-shorthand
            skills: skills,
            img: data.rows.item(i).img
           });
        }
      }
      this.developers.next(developers);
    });
  }

  loadUnidadMedida() {
    return this.database.executeSql('SELECT * FROM unidad_medida', []).then(data => {
      let unidad_medidas: Unidad_Medida[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          unidad_medidas.push({
            id: data.rows.item(i).id,
            codigo: data.rows.item(i).codigo,
            descripcion: data.rows.item(i).descripcion,
            unidad_medida: data.rows.item(i).unidad_medida,
            fecha_creacion: data.rows.item(i).fecha_creacion,
            fecha_modificacion: data.rows.item(i).fecha_modificacion

           });
        }
      }
      this.unidad_medidas.next(unidad_medidas);
    });
  }
  loadAlmacen() {
    return this.database.executeSql('SELECT * FROM almacenes', []).then(data => {
      let almacenes: Almacenes[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          almacenes.push({
            id: data.rows.item(i).id,
            codigo: data.rows.item(i).codigo,
            descripcion: data.rows.item(i).descripcion,
            fecha_creacion: data.rows.item(i).fecha_creacion,
            fecha_modificacion: data.rows.item(i).fecha_modificacion

           });
        }
      }
      this.almacenes.next(almacenes);
    });
  }
  loadItem() {
    return this.database.executeSql('SELECT * FROM items', []).then(data => {
      let item_: Item[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          item_.push({
            id: data.rows.item(i).id,
            codigo: data.rows.item(i).codigo,
            descripcion: data.rows.item(i).descripcion,
            unidad_medida: data.rows.item(i).unidad_medida,
            fecha_creacion: data.rows.item(i).fecha_creacion,
            fecha_modificacion: data.rows.item(i).fecha_modificacion

           });
        }
      }
      this.item.next(item_);
    });
  }

  loadUnidades() {
    let query =
    'SELECT id, unidad_medida from unidad_medida';
    return this.database.executeSql(query, []).then(data => {
      let unidades = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          unidades.push({
            id: data.rows.item(i).id,
            unidad_medida: data.rows.item(i).unidad_medida,
           });
        }
      }
      this.unidades.next(unidades);
    });
  }

  addUnidadM(codigo, unidad_medida, descripcion) {
    const f = new Date();
    const fechaCreacion = f.getDate() + '/' + f.getMonth() + '/' + f.getFullYear();
    let data = [codigo, unidad_medida, descripcion, fechaCreacion];
    return this.database.executeSql(
      // tslint:disable: no-shadowed-variable
      'INSERT INTO unidad_medida (codigo, unidad_medida, descripcion, fecha_creacion) VALUES (?, ?, ?, ?)', data).then(data => {
      this.loadUnidadMedida();
    });
  }
  addAlmacen(codigo, descripcion) {
    const f = new Date();
    const fechaCreacion = f.getDate() + '/' + f.getMonth() + '/' + f.getFullYear();
    let data = [codigo, descripcion, fechaCreacion];
    return this.database.executeSql(
      // tslint:disable: no-shadowed-variable
      'INSERT INTO almacenes (codigo, descripcion, fecha_creacion) VALUES (?, ?, ?)', data).then(data => {
      this.loadAlmacen();
    });
  }
  addItem(codigo, descripcion, unidad_medida) {
    const f = new Date();
    const fechaCreacion = f.getDate() + '/' + f.getMonth() + '/' + f.getFullYear();
    let data = [codigo, descripcion, unidad_medida, fechaCreacion];
    return this.database.executeSql(
      // tslint:disable: no-shadowed-variable
      'INSERT INTO items (codigo, descripcion, unidad_medida, fecha_creacion) VALUES (?, ?, ?, ?)', data).then(data => {
      this.loadItem();
    });
  }

  getUnidadM(id): Promise<Unidad_Medida> {
    return this.database.executeSql('SELECT * FROM unidad_medida WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        codigo: data.rows.item(0).codigo,
        descripcion: data.rows.item(0).descripcion,
        unidad_medida: data.rows.item(0).unidad_medida,
        fecha_creacion: data.rows.item(0).fecha_creacion,
        fecha_modificacion: data.rows.item(0).fecha_modificacion
      }
    });
  }
  getAlmacen(id): Promise<Almacenes> {
    return this.database.executeSql('SELECT * FROM almacenes WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        codigo: data.rows.item(0).codigo,
        descripcion: data.rows.item(0).descripcion,
        fecha_creacion: data.rows.item(0).fecha_creacion,
        fecha_modificacion: data.rows.item(0).fecha_modificacion
      }
    });
  }
  getItemM(id): Promise<Item> {
    return this.database.executeSql('SELECT * FROM items WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        codigo: data.rows.item(0).codigo,
        descripcion: data.rows.item(0).descripcion,
        unidad_medida: data.rows.item(0).unidad_medida,
        fecha_creacion: data.rows.item(0).fecha_creacion,
        fecha_modificacion: data.rows.item(0).fecha_modificacion
      }
    });
  }
  addDeveloper(name, skills, img) {
    let data = [name, JSON.stringify(skills), img];
    return this.database.executeSql('INSERT INTO developer (name, skills, img) VALUES (?, ?, ?)', data).then(data => {
      this.loadDevelopers();
    });
  }

  getDeveloper(id): Promise<Dev> {
    return this.database.executeSql('SELECT * FROM developer WHERE id = ?', [id]).then(data => {
      let skills = [];
      if (data.rows.item(0).skills != '') {
        skills = JSON.parse(data.rows.item(0).skills);
      }

      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name,
        skills: skills,
        img: data.rows.item(0).img
      }
    });
  }

  getUser(username, password): Promise<User> {
    let data = [username, password];
    return this.database.executeSql('SELECT * FROM user WHERE username = ? AND password2 = ?', data).then(data => {

      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name,
      }
    });
  }

  deleteDeveloper(id) {
    return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
      this.loadDevelopers();
      this.loadProducts();
    });
  }

  updateDeveloper(dev: Dev) {
    let data = [dev.name, JSON.stringify(dev.skills), dev.img];
    return this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadDevelopers();
    })
  }

  updateUnidadM(udm: Unidad_Medida) {

    const f = new Date();
    const fechaMod = f.getDate() + '/' + f.getMonth() + '/' + f.getFullYear();

    let data = [udm.codigo, udm.descripcion, udm.unidad_medida, fechaMod];
    return this.database.executeSql(`UPDATE unidad_medida SET codigo = ?, descripcion = ?, unidad_medida = ?, fecha_modificacion= ? WHERE id = ${udm.id}`, data).then(data => {
      this.loadUnidadMedida();
    })
  }
  updateAlmacen(alm: Almacenes) {

    const f = new Date();
    const fechaMod = f.getDate() + '/' + f.getMonth() + '/' + f.getFullYear();

    let data = [alm.codigo, alm.descripcion, fechaMod];
    return this.database.executeSql
    (`UPDATE almacenes SET codigo = ?, descripcion = ?, fecha_modificacion= ? WHERE id = ${alm.id}`, data).then(data => {
      this.loadAlmacen();
    })
  }
  updateItem(item: Item) {

    const f = new Date();
    const fechaMod = f.getDate() + '/' + f.getMonth() + '/' + f.getFullYear();

    let data = [item.codigo, item.descripcion, item.unidad_medida, fechaMod];
    return this.database.executeSql(`UPDATE items SET codigo = ?, descripcion = ?, unidad_medida = ?, fecha_modificacion= ? WHERE id = ${item.id}`, data).then(data => {
      this.loadItem();
    })
  }

  deleteUnidadM(id) {
    return this.database.executeSql('DELETE FROM unidad_medida WHERE id = ?', [id]).then(_ => {
      this.loadUnidadMedida();
    });
  }
  deleteAlmacen(id) {
    return this.database.executeSql('DELETE FROM almacenes WHERE id = ?', [id]).then(_ => {
      this.loadAlmacen();
    });
  }
  deleteItem(id) {
    return this.database.executeSql('DELETE FROM items WHERE id = ?', [id]).then(_ => {
      this.loadItem();
    });
  }

  loadProducts() {
    let query =
    'SELECT product.name, product.id, developer.name AS creator FROM product JOIN developer ON developer.id = product.creatorId';
    return this.database.executeSql(query, []).then(data => {
      let products = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          products.push({
            name: data.rows.item(i).name,
            id: data.rows.item(i).id,
            creator: data.rows.item(i).creator,
           });
        }
      }
      this.products.next(products);
    });
  }
  addProduct(name, creator) {
    let data = [name, creator];
    return this.database.executeSql('INSERT INTO product (name, creatorId) VALUES (?, ?)', data).then(data => {
      this.loadProducts();
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }
  getDevs(): Observable<Dev[]> {
    return this.developers.asObservable();
  }
  getProducts(): Observable<any[]> {
    return this.products.asObservable();
  }

  getUnidadMedida(): Observable<Unidad_Medida[]> {
    return this.unidad_medidas.asObservable();
  }
  getItem(): Observable<Item[]> {
    return this.item.asObservable();
  }
  getUnidades(): Observable<any[]> {
    return this.unidades.asObservable();
  }
  getAlmacenes(): Observable<Almacenes[]> {
    return this.almacenes.asObservable();
  }

}

