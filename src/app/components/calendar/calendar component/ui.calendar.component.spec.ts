import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UICalendarComponent } from './ui.calendar.component';

describe('CalendarComponent', () => {
  let component: UICalendarComponent;
  let fixture: ComponentFixture<UICalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UICalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UICalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
