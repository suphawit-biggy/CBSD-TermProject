import { TestBed, inject } from '@angular/core/testing';

import { UsersDataServerService } from './users-data-server.service';

describe('UsersDataServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersDataServerService]
    });
  });

  it('should ...', inject([UsersDataServerService], (service: UsersDataServerService) => {
    expect(service).toBeTruthy();
  }));
});
