import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAnimePage } from './add-anime.page';

describe('AddAnimePage', () => {
  let component: AddAnimePage;
  let fixture: ComponentFixture<AddAnimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAnimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
