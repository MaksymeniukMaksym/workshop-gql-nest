import { NewProductInputDTO } from './dto/new-product-input.dto';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';


@Resolver(of => Product)
export class ProductResolver {
  publicSubscriptions = new PubSub();

  constructor(private productService: ProductService) {
    this.productService.realDatabase.push({
      id: 1,
      title: 'first',
      description: 'first description',
      creationDate: new Date(),
      price: 12,
    },
      {
        id: 2,
        title: 'first2',
        description: '2 description',
        creationDate: new Date(),
        price: 22,
      },)
  }

  @Query(returns => Product)
  async product(@Args('id') id: number): Promise<Product> {
    const product = this.productService.findOneById(id);
    if (!product) {
      throw new NotFoundException()
    }
    return product;
  }

  @Mutation(returns => Product)
  addProduct(
    @Args('newProductData') newProductData: NewProductInputDTO,
  ) {
    const product = this.productService.create(newProductData)
    this.publicSubscriptions.publish('productAdded', { productAdded: product })
    return product;
  }

  @Mutation(returns => Boolean)
  async removeProduct(@Args('id') id: string) {
    return this.productService.remove(id);
  }

  @Subscription(returns => Product)
  recipeAdded() {
    return this.publicSubscriptions.asyncIterator('recipeAdded');
  }
}
