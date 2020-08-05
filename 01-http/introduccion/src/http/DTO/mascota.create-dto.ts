import {
    IsAlpha,
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsBoolean,
    IsEmpty,
    IsInt,
    IsPositive,
    IsOptional,
    IsNumber
} from "class-validator";



export class MascotaCreateDto {

    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre:string


    @IsNotEmpty()
    @IsInt()
    @IsPositive()
 //   @IsNumber()
    edad:number

    @IsNotEmpty()
    @IsBoolean()
    casada:string

 //   @IsEmpty()
    @IsBoolean()
    @IsOptional()
    ligada?:boolean //opcional

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    peso: number




}