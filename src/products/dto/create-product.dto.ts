import {
  Min,
  Max,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Tags } from '../enums/tags.enum';

export class CreateProductDto {
  @IsNotEmpty()
  @Min(0)
  @Max(25)
  name: string;
  @Min(0)
  @IsNumber()
  price: number;
  @Min(0)
  @IsNumber()
  count: number;
  @IsEnum({ each: true })
  @IsArray()
  tags: Array<Tags>;
}
