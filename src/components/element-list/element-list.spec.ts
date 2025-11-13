import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementList } from './element-list';

describe('ElementList', () => {
  let component: ElementList;
  let fixture: ComponentFixture<ElementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
