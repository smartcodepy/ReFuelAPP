import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductosCrearPage } from './productos-crear.page';

describe('ProductosCrearPage', () => {
  let component: ProductosCrearPage;
  let fixture: ComponentFixture<ProductosCrearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosCrearPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
