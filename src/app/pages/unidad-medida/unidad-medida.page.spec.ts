import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnidadMedidaPage } from './unidad-medida.page';

describe('UnidadMedidaPage', () => {
  let component: UnidadMedidaPage;
  let fixture: ComponentFixture<UnidadMedidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadMedidaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnidadMedidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
