import {
  IsDate, IsIn, IsInt, IsNotEmpty, IsNumber,
  IsOptional, IsPositive,
  Matches, MaxLength, MinLength,
} from 'class-validator';


export class FacturaDto {

  @IsNotEmpty()
  @IsDate()
  fecha:Date

  @IsNotEmpty()
  @IsIn(['carrito','factura'])
  tipo

}