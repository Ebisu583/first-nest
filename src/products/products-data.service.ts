import { Injectable } from '@nestjs/common';
import { Product } from './db/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TagRepository } from './db/tag.repository';
import { ProductRepository } from './db/product.repository';
import { Tag } from './db/tag.entity';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
  ) {}

  async addProduct(item: CreateProductDto): Promise<Product> {
    const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
    const productToSave = new Product();
    productToSave.name = item.name;
    productToSave.price = item.price;
    productToSave.count = item.count;
    productToSave.tags = tags;
    return await this.productRepository.save(productToSave);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async updateProduct(id: string, item: UpdateProductDto): Promise<Product> {
    const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
    const productToUpdate = await this.getProductById(id);

    productToUpdate.name = item.name;
    productToUpdate.price = item.price;
    productToUpdate.count = item.count;
    productToUpdate.tags = tags;

    await this.productRepository.save(productToUpdate);

    return await this.getProductById(id);
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }
}
