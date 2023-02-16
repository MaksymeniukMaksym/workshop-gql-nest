import { Product } from './models/product.model';
import { Injectable } from '@nestjs/common';
import { NewProductInputDTO } from './dto/new-product-input.dto';
import { ProductArgsDTO } from './dto/product-args.dto';

@Injectable()
export class ProductService {
  /**
   * MOCK
   */
  public realDatabase = []

  async create(data: NewProductInputDTO): Promise<Product> {
    this.realDatabase.push({
      id: this.realDatabase[this.realDatabase.length - 1].id + 1,
      creationDate: new Date(),
      ...data
    })
    return this.realDatabase as any;
  }

  async findOneById(id: number): Promise<Product> {
    return this.realDatabase.find(p => p.id === id) as any;
  }

  async findAll(recipesArgs: ProductArgsDTO): Promise<Product[]> {
    return this.realDatabase as Product[];
  }

  async remove(id: string): Promise<boolean> {
    const index = this.realDatabase.findIndex((p) => p.id === id);
    this.realDatabase.splice(index, 1)
    return true;
  }
}