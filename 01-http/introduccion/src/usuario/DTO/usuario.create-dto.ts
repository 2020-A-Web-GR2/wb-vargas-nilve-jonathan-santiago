import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsPositive,
    IsOptional,
    IsNumber,
    IsNumberString,
    MaxDate, MinDate, IsDate, Matches, IsAlpha,
} from 'class-validator'

export class UsuarioCreateDto {

    @IsOptional()
    //@Matches(/^[a-zA-Z ]+$/gi, { each: false })
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre?: string

    @IsOptional()
    //@Matches(/^[a-zA-Z ]+$/gi, { each: false })
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    apellido?: string

    @IsNotEmpty()
    @IsNumberString()
    @MinLength(10)
    @MaxLength(18)
    cedula: string

    @IsNumber()
    @IsOptional()
    @IsPositive()
    sueldo?:number

    @IsOptional()
    @IsDate()
    @MinDate(new Date(1950,1,1))
    @MaxDate(new Date())
    fechaNacimiento?:Date

    @IsOptional()
    @IsDate()
    @MinDate(new Date(1950,1,1))
    @MaxDate(new Date())
    fechaHoraNacimiento?:Date;

}