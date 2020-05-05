import { TestBed } from '@angular/core/testing';

import { SnakeServiceService } from './snake-service.service';

describe('SnakeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnakeServiceService = TestBed.get(SnakeServiceService);
    expect(service).toBeTruthy();
  });
});
