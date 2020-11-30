import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
 
export interface Dev {
  id: number,
  name: string,
  skills: any[],
  img: string
}

export interface Unidad_Medida {
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
  unidad_medidas = new BehaviorSubject([]);
 
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
        })
        .catch(e => console.error(e));
    });
  }
  loadDevelopers() {
    return this.database.executeSql('SELECT * FROM developer', []).then(data => {
      let developers: Dev[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let skills = [];
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          }
 
          developers.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name, 
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
        for (var i = 0; i < data.rows.length; i++) {
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

  addUnidadM(codigo, unidad_medida, descripcion) {
    let f = new Date();
    let fechaCreacion = f.getDate() + '/' + f.getMonth() + '/' + f.getFullYear();
    let data = [codigo, unidad_medida, descripcion,fechaCreacion];
    return this.database.executeSql('INSERT INTO unidad_medida (codigo, unidad_medida, descripcion, fecha_creacion) VALUES (?, ?, ?, ?)', data).then(data => {
      this.loadUnidadMedida();
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

  getUser(username,password): Promise<User> {
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

    let f = new Date();
    let fechaMod = f.getDate() + '/' + f.getMonth() + '/' + f.getFullYear();

    let data = [udm.codigo, udm.descripcion, udm.unidad_medida, fechaMod];
    return this.database.executeSql(`UPDATE unidad_medida SET codigo = ?, descripcion = ?, unidad_medida = ?, fecha_modificacion= ? WHERE id = ${udm.id}`, data).then(data => {
      this.loadUnidadMedida();
    })
  }

  deleteUnidadM(id) {
    return this.database.executeSql('DELETE FROM unidad_medida WHERE id = ?', [id]).then(_ => {
      this.loadUnidadMedida();
    });
  }
 
  loadProducts() {
    let query = 'SELECT product.name, product.id, developer.name AS creator FROM product JOIN developer ON developer.id = product.creatorId';
    return this.database.executeSql(query, []).then(data => {
      let products = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
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
}

