import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'developers', loadChildren: './pages/developers/developers.module#DevelopersPageModule' },
  { path: 'developers/:id', loadChildren: './pages/developer/developer.module#DeveloperPageModule' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'unidad-medida',
    loadChildren: () => import('./pages/unidad-medida/unidad-medida.module').then( m => m.UnidadMedidaPageModule)
  },
  { path: 'unidad-medida/:id', loadChildren: './pages/unidad-detalle/unidad-detalle.module#UnidadDetallePageModule'},
  {
    path: 'item',
    loadChildren: () => import('./pages/item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'almacenes',
    loadChildren: () => import('./pages/almacenes/almacenes.module').then( m => m.AlmacenesPageModule)
  },
  {
    path: 'stock',
    loadChildren: () => import('./pages/stock/stock.module').then( m => m.StockPageModule)
  },
  {
    path: 'stock-almacen',
    loadChildren: () => import('./pages/stock-almacen/stock-almacen.module').then( m => m.StockAlmacenPageModule)
  },
  {
    path: 'unidad-detalle',
    loadChildren: () => import('./pages/unidad-detalle/unidad-detalle.module').then( m => m.UnidadDetallePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
