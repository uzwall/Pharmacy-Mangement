import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { from, Observable, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../../models/dto/create-product.dto';
import { EditProductDto } from '../../models/dto/edit-product.dto';
import { ProductEntity } from '../../models/product.entity';
import { ProductI } from '../../models/product.interface';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) { }


    async create(newProduct: ProductI): Promise<ProductI> {
        const product = await this.productRepository.save(this.productRepository.create(newProduct));
        return this.findOne(product.id);

    }
    async findAll(options: IPaginationOptions): Promise<Pagination<ProductI>> {
        return paginate<ProductEntity>(this.productRepository, options);
    }

    private async findOne(id: number): Promise<ProductI> {
        return this.productRepository.findOne({ where: { id } });
    }

    async update(id: number, editProductDto: EditProductDto): Promise<Observable<any>>  {

       
        return from(this.productRepository.update(id, editProductDto)).pipe(
            switchMap(() => this.findOne(id))
        );
    }


    deleteOne(id: number): Observable<any> {
        return from(this.productRepository.delete(id));
        
    }
}
