import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { CreateProductDto } from '../models/dto/create-product.dto';
import { EditProductDto } from '../models/dto/edit-product.dto';
import { ProductI } from '../models/product.interface';
import { ProductHelperService } from '../service/product-helper/product-helper.service';
import { ProductService } from '../service/product-service/product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService,
        private productHelperService: ProductHelperService) { }



    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductI> {
        const productEntity: ProductI = this.productHelperService.createProductDtoToEntity(createProductDto); //it is not necessary to convert into entity for will be systamatic
        return this.productService.create(productEntity);

    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 100): Promise<Pagination<ProductI>> {
        limit = limit > 100 ? 100 : limit;
        return this.productService.findAll({ page, limit, route: 'http://localhost:3000/api/products' });
    }


    @Put(':id')
    async update(@Param('id') id: string, @Body() editProductDto: EditProductDto): Promise<any> {
        return this.productService.update(Number(id), editProductDto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
        return this.productService.deleteOne(Number(id));
    }


}
