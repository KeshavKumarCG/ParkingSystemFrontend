
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestTableUserComponent } from './request-table-user.component';

describe('RequestTableUserComponent', () => {
  let component: RequestTableUserComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RequestTableUserComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(RequestTableUserComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
