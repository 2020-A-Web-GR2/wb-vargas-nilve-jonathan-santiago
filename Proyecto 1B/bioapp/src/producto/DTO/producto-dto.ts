import {
  IsAlpha,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ProductoDto {

  @IsNotEmpty()
  @Matches(/[a-zA-Z ]+/, { each: false })
  @MinLength(5)
  @MaxLength(100)
  nombre:string

  @IsUrl()
  @IsNotEmpty()
  imagen:string

  @IsOptional()
  @Matches(/[a-zA-Z ]+/, { each: false })
  @MinLength(5)
  descripcion?:string

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  precio:number

}