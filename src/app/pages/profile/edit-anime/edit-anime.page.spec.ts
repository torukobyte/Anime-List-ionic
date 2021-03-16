import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAnimePage } from './edit-anime.page';

describe('EditAnimePage', () => {
  let component: EditAnimePage;
  let fixture: ComponentFixture<EditAnimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAnimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
