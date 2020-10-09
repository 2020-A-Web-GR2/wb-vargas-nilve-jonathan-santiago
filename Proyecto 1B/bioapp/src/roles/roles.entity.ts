import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class RolesEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
    comment: 'Identificador',
    name: 'id'
  })
  id: number;

  @Column({
    name: 'tipo',
    type: 'varchar',
    nullable: false,
    unique: true,
    length: '20'
  })
  tipo: string

}