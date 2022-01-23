import { Tags } from '../enums/tags.enum';
export interface CreateProductDto {
  name: string;
  price: number;
  count: number;
  tags: Array<Tags>;
}
