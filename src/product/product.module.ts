import { ProductResolver } from './product.resolver';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
