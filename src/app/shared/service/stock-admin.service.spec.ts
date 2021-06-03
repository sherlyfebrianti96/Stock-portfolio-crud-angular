import { TestBed } from '@angular/core/testing';

import { StockAdminService } from './stock-admin.service';

describe('StockAdminService', () => {
  let service: StockAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
