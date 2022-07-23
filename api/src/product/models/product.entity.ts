
import { IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productname: string;

    // @Column({ type: 'date' }) 
   
    @Column()
    issuedate: Date;
   
    @Column()
    expiredate: Date;

    @Column()
    costprice: string;

    @Column()
    sellprice: string;

    @Column()
    quantity: number;

    
    @IsOptional()
    @Column()
    desc: string;
}