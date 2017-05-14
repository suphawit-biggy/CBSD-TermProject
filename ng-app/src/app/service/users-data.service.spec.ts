import { TestBed, inject } from '@angular/core/testing';

import { UsersDataService } from './users-data.service';

describe('UsersDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersDataService]
    });
  });

  it('should ...', inject([UsersDataService], (service: UsersDataService) => {
    expect(service).toBeTruthy();
  }));
});
