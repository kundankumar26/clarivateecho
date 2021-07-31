import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatFormFieldModule, MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { listentoastComponent } from './listentoast.component';

describe('listentoastComponent', () => {
  let component: listentoastComponent;
  let fixture: ComponentFixture<listentoastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, BrowserAnimationsModule, MatFormFieldModule, HttpClientModule, MatSnackBarModule],
      declarations: [listentoastComponent],
      providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(listentoastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
