import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaoMapComponent } from './gao-map.component';

describe('GaoMapComponent', () => {
  let component: GaoMapComponent;
  let fixture: ComponentFixture<GaoMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaoMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
