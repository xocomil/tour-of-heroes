import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeoresListComponent } from './heores-list.component';

describe('HeoresListComponent', () => {
  let component: HeoresListComponent;
  let fixture: ComponentFixture<HeoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeoresListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
