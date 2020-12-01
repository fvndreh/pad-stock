import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlmacenesDetallePage } from './almacenes-detalle.page';

describe('AlmacenesDetallePage', () => {
  let component: AlmacenesDetallePage;
  let fixture: ComponentFixture<AlmacenesDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenesDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlmacenesDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
