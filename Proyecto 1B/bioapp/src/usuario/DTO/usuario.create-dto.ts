import {
  IsAlpha,
  IsAlphanumeric, IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional, Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UsuarioCreateDto {

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(10)
  @MaxLength(10)
  cedula: string

  @Matches(/[a-zA-Z ]+/, { each: false })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  nombre: string

  @Matches(/[a-zA-Z ]+$/, { each: false })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  apellido: string

  @IsOptional()
  @IsAlpha()
  @IsIn([
    'Quito',
    'Cuenca',
    'Guaranda',
    'Azogues',
    'Tulcán',
    'Riobamba',
    'Latacunga',
    'Machala',
    'Esmeraldas',
    'Guayaquil',
    'Ibarra',
    'Loja',
    'Babahoyo',
    'Portoviejo',
    'Macas',
    'Tena',
    'Puyo',
    'Quito',
    'Santa Elena',
    'Santo Domingo',
    'Nueva Loja',
    'Ambato',
  ])
  ciudad?: string

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(30)
  login: string

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(5)
  password: string

  @IsOptional()
  @IsIn(['administrador','usuario'])
  tipo: string

  @IsNotEmpty()
  verificarPassword: string
}