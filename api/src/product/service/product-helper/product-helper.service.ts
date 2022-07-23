import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../models/dto/create-product.dto';
import { ProductI } from '../../models/product.interface';

@Injectable()
export class ProductHelperService {
   

    createProductDtoToEntity(createProductDto:CreateProductDto): ProductI{
        return {
            productname:createProductDto.productname,
            issuedate:createProductDto.issuedate,
            expiredate:createProductDto.expiredate,
            costprice:createProductDto.costprice,
            sellprice:createProductDto.sellprice,
            quantity:createProductDto.quantity,
            desc:createProductDto.desc
        }; }

}
