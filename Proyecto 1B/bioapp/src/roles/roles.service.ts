import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Repository } from 'typeorm';
import { RolesEntity } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(RolesEntity)
              private repositorio: Repository<RolesEntity>) {
  }
  
}