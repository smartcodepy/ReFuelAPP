import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriaCreatePage } from './categoria-create.page';

describe('CategoriaCreatePage', () => {
  let component: CategoriaCreatePage;
  let fixture: ComponentFixture<CategoriaCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
