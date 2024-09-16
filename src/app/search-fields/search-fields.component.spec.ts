import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFields } from './search-fields.component';

describe('SearchFieldsComponent', () => {
  let component: SearchFields;
  let fixture: ComponentFixture<SearchFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFields);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
