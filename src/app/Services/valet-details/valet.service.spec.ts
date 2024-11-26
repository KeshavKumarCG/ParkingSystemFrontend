import { TestBed } from '@angular/core/testing';

import { ValetService } from './valet-details/valet.service';

describe('ValetService', () => {
  let service: ValetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
