import { IsAlpha, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

export class CategoriaDto {


  @IsNotEmpty()
  @IsAlpha()
  @MinLength(5)
  @MaxLength(30)
  nombre:string

  @IsOptional()
  @Matches(/[a-zA-Z ]+/, { each: false })
  @MinLength(5)
  descripcion?:string

}