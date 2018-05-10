import { TestBed, inject } from '@angular/core/testing';

import { ContenidosService } from './contenidos.service';

describe('ContenidosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContenidosService]
    });
  });

  it('should be created', inject([ContenidosService], (service: ContenidosService) => {
    expect(service).toBeTruthy();
  }));
});
