import { TestBed, inject } from '@angular/core/testing';

import { ModulosService } from './modulos.service';

describe('ModulosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModulosService]
    });
  });

  it('should be created', inject([ModulosService], (service: ModulosService) => {
    expect(service).toBeTruthy();
  }));
});
