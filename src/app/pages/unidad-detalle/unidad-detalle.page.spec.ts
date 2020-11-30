import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnidadDetallePage } from './unidad-detalle.page';

describe('UnidadDetallePage', () => {
  let component: UnidadDetallePage;
  let fixture: ComponentFixture<UnidadDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnidadDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
