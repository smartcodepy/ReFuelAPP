import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagosCreatePage } from './pagos-create.page';

describe('PagosCreatePage', () => {
  let component: PagosCreatePage;
  let fixture: ComponentFixture<PagosCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagosCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
