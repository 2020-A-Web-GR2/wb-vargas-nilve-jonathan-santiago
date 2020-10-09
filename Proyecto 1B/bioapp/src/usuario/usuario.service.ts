import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { FindManyOptions, getConnection, getManager, Repository } from 'typeorm';
import { RolesEntity } from '../roles/roles.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private repositorio: Repository<UsuarioEntity>
  ) {
    
  }
  crearUsuario(nuevoUsuario:UsuarioEntity){
    return this.repositorio.save(nuevoUsuario) //devuelve una promesa
  }
  buscarUno(id:number){
    return this.repositorio.findOne(id);
  }
  editarUsuario(usuarioEditado:UsuarioEntity){
    return this.repositorio.save(usuarioEditado)
  }
  eliminarUsuario(id:number){
    this.repositorio.delete(id)
  }
  buscarTodos(){
    return this.repositorio.find()
  }

  async selectQuery(tipo:string){
    const rol = await getManager()
      .createQueryBuilder(RolesEntity, "roles")
      .where("roles.tipo = :tipo", { tipo })
      .getOne();

    return rol.id
  }

  async insertQuery(userId:number,rolId:number){
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('usuario_roles_roles')
      .values([
        { usuarioId: userId, rolesId: rolId }
      ])
      .execute();
  }

  buscarUsuarioPorLogin(login:string){

    const consulta : FindManyOptions<UsuarioEntity> = {
      where:{
        login:login,
      }
    }
    return this.repositorio.findOne(consulta)
  }


}