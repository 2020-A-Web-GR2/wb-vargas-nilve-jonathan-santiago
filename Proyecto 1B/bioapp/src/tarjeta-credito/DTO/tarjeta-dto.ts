import {
  IsCreditCard, IsDate, IsIn,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinDate,
  MinLength,
} from 'class-validator';


export class TarjetaDto {

  @IsNotEmpty()
  @IsIn(['VISA','MasterCard','American Express','Discover'])
  tipo:string

  @IsCreditCard()
  @IsNumberString()
  @IsNotEmpty()
  numero:string

  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  fechaCaducidad:Date

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(3)
  @MaxLength(3)
  cvv:string
  
}