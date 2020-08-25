import {
    MinLength,
    MaxLength,
    IsPositive,
    IsOptional,
    IsNumber
    , IsDate, MinDate, MaxDate, Matches, IsAlpha
} from 'class-validator'

export class UsuarioUpdateDto {
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