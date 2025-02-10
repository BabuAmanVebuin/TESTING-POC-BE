import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from "typeorm";
  import { User } from "./User";
  
  @Entity()
  export class FamilyDetail {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => User, (user) => user.id, {
      nullable: false,
      onDelete: "CASCADE",
      onUpdate: "RESTRICT"
    })
    @JoinColumn({ name: "userId" })
    @Index()
    userId!: number;
  
    @Column({ type: "varchar", length: 128 })
    familyMemberName!: string;
  
    @Column({ type: "varchar", length: 64 })
    relation!: string;
  
    @Column({ type: "date" })
    dateOfBirth!: string;
  
    @Column({ type: "varchar", length: 64 })
    gender!: string;
  
    @Column({ type: "varchar", length: 128 })
    occupation!: string;
  
    @Column({ type: "varchar", length: 128 })
    address!: string;
  
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
  }
  