import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPushComponent } from './notification-push.component';

describe('NotificationPushComponent', () => {
  let component: NotificationPushComponent;
  let fixture: ComponentFixture<NotificationPushComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationPushComponent]
    });
    fixture = TestBed.createComponent(NotificationPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
