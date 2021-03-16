import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnimelistPage } from './animelist.page';

describe('AnimeListPage', () => {
  let component: AnimelistPage;
  let fixture: ComponentFixture<AnimelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
