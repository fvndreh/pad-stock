import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlmacenesPage } from './almacenes.page';

describe('AlmacenesPage', () => {
  let component: AlmacenesPage;
  let fixture: ComponentFixture<AlmacenesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlmacenesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
