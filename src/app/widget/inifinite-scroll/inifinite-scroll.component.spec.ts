import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InifiniteScrollingComponent } from './inifinite-scroll.component';

describe('InifiniteScrollFetchingComponent', () => {
  let component: InifiniteScrollingComponent;
  let fixture: ComponentFixture<InifiniteScrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InifiniteScrollingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InifiniteScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
