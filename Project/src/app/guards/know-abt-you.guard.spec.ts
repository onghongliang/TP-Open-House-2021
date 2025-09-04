import { TestBed } from '@angular/core/testing';

import { KnowAbtYouGuard } from './know-abt-you.guard';

describe('KnowAbtYouGuard', () => {
  let guard: KnowAbtYouGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KnowAbtYouGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
