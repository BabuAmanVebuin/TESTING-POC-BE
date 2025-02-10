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
export class UserDocument {
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
  documentType!: string;

  @Column({ type: "varchar", length: 512 })
  documentUrl!: string;

  @Column({ type: "varchar", length: 64 })
  documentStatus!: string;

  @Column({ type: "date" })
  expirationDate!: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  issuedBy?: string;

  @Column({ type: "date" })
  issuedDate!: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  remarks?: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
