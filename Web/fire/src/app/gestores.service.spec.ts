import { TestBed, inject } from '@angular/core/testing';

import { GestoresService } from './gestores.service';

describe('GestoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestoresService]
    });
  });

  it('should be created', inject([GestoresService], (service: GestoresService) => {
    expect(service).toBeTruthy();
  }));
});
