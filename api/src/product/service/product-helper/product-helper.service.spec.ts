import { Test, TestingModule } from '@nestjs/testing';
import { ProductHelperService } from './product-helper.service';

describe('ProductHelperService', () => {
  let service: ProductHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductHelperService],
    }).compile();

    service = module.get<ProductHelperService>(ProductHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
