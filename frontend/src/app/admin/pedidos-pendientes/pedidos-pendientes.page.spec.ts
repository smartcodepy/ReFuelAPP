import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidosPendientesPage } from './pedidos-pendientes.page';

describe('PedidosPendientesPage', () => {
  let component: PedidosPendientesPage;
  let fixture: ComponentFixture<PedidosPendientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosPendientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosPendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
