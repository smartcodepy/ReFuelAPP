import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagosListPage } from './pagos-list.page';

describe('PagosListPage', () => {
  let component: PagosListPage;
  let fixture: ComponentFixture<PagosListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
