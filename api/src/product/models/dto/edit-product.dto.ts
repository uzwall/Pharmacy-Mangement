import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditProductDto {

    @IsString()
    @IsNotEmpty()
    productname: string;

    @IsNotEmpty()
    issuedate: Date;

    @IsNotEmpty()
    expiredate: Date;


    @IsNotEmpty()
    costprice: string;


    @IsNotEmpty()
    sellprice: string;


    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsOptional()
    desc: string;
}