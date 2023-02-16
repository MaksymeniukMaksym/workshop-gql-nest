import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'product' })
export class Product {
    @Field(type => Number)
    id: number;

    // @Directive('@upper')
    @Field(type => String)
    title: string;

    @Field({ nullable: true })
    description?: string;

    @Field(type => Date)
    creationDate: Date;

    @Field(type => Number)
    price: number;
}