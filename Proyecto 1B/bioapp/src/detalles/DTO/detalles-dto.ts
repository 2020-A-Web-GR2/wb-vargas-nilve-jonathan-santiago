import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Matches,
  Max,
  Min
} from 'class-validator';

export class DetallesDto {

  @IsOptional()
  @Matches(/[a-zA-Z ]+/, { each: false })
  descripcion:string

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(12)
  cantidad:number

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  precioUnitario:number

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  precioTotal:number

}