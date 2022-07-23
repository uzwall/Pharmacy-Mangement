import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controller/product.controller';
import { ProductEntity } from './models/product.entity';
import { ProductHelperService } from './service/product-helper/product-helper.service';
import { ProductService } from './service/product-service/product.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  controllers:[ProductController],
  providers: [ProductService,ProductHelperService],
  exports: [ProductService]
})
export class ProductModule {}
