import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagosEditPage } from './pagos-edit.page';

describe('PagosEditPage', () => {
  let component: PagosEditPage;
  let fixture: ComponentFixture<PagosEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagosEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
