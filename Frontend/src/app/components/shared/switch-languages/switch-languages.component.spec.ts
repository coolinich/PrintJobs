import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchLanguagesComponent } from './switch-languages.component';

xdescribe('SwitchLanguagesComponent', () => {
  let component: SwitchLanguagesComponent;
  let fixture: ComponentFixture<SwitchLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
