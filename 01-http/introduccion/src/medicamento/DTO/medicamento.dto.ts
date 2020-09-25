import {
    IsAlpha, IsDate,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive, Matches,
    MaxLength, Min, MinDate,
    MinLength
} from "class-validator";

export class MedicamentoDto {

    @IsNotEmpty()
    @Matches(/[a-zA-Z ]+/)
    @MinLength(5)
    @MaxLength(60)
    nombre:string

    @IsOptional()
    @Matches(/[a-zA-Z ]+/)
    @MinLength(10)
    descripcion?:string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    precio:number

    @IsNotEmpty()
    @Matches(/[a-zA-Z0-9 ]+/)
    cantidadUnidades:string

    @IsNotEmpty()
    @IsDate()
    @MinDate(new Date())
    fechaCaducidad:Date

}