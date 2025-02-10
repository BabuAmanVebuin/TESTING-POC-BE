import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: '32' })
  title!: string

  @Column({ length: '128' })
  description!: string

  @CreateDateColumn()
  createdDate!: Date

  @UpdateDateColumn()
  updatedDate!: Date
}
