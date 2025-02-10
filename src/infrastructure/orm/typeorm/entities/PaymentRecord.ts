import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index
} from "typeorm";
import { User } from "./User";

export enum UserTypeEnum {
  NOVICE = "novice",
  ENTRY_LEVEL = "entry-level",
  PRE_INTERMEDIATE = "pre-intermediate",
  UPPER_INTERMEDIATE = "upper-intermediate",
  EXPERT = "expert",
  PROFICIENT = "proficient",
  MASTER = "master"
}

@Entity("payment_record")
export class PaymentRecord {
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

  @Column({ type: "varchar", length: 64, nullable: false })
  idName!: string;

  @Column({ type: "varchar", length: 128, nullable: false })
  fullName!: string;
  
  @Column({
    type: "enum",
    enum: UserTypeEnum,
    default: UserTypeEnum.NOVICE,
    nullable: false
  })
  userType!: UserTypeEnum;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  firstPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  secondPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  thirdPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  fourthPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  fifthPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  sixthPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  seventhPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  eighthPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  ninthPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  tenthPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  eleventhPayment?: number;

  @Column({ type: "decimal", precision: 20, scale: 2, nullable: true })
  twelfthPayment?: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt?: Date;

  @Column({ type: "boolean", default: false })
  isDeleted!: boolean;
}
