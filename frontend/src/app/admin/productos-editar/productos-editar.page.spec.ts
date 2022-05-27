import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductosEditarPage } from './productos-editar.page';

describe('ProductosEditarPage', () => {
  let component: ProductosEditarPage;
  let fixture: ComponentFixture<ProductosEditarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosEditarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
