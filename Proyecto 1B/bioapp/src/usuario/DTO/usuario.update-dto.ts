import {
  IsAlpha,
  IsAlphanumeric,
  IsIn,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UsuarioUpdateDto {

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

}