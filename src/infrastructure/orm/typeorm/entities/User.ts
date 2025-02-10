import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
  } from "typeorm";
import { FamilyDetail } from "./FamilyDetail";
import { UserDocument } from "./UserDocument";
import { PaymentRecord } from "./PaymentRecord";
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "varchar", length: 128 })
    fullName!: string;
  
    @Column({ type: "varchar", length: 256, unique: true })
    email!: string;
  
    @Column({ type: "varchar", length: 64 })
    phoneNumber!: string;
  
    @Column({ type: "varchar", length: 64, nullable: true })
    username?: string;
  
    @Column({ type: "date" })
    dateOfBirth!: string;
  
    @Column({ type: "varchar", length: 256 })
    address!: string;
  
    @Column({ type: "varchar", length: 128, nullable: true })
    profileImage?: string;
  
    @Column({ type: "varchar", length: 128 })
    nationality!: string;
  
    @Column({ type: "varchar", length: 64 })
    gender!: string;

    @OneToMany(() => PaymentRecord, (paymentRecord) => paymentRecord.userId)
    paymentRecords!: PaymentRecord[];

    @OneToMany(() => FamilyDetail, (familyDetail) => familyDetail.userId)
    familyDetails!: FamilyDetail[];
  
    @OneToMany(() => UserDocument, (userDocument) => userDocument.userId)
    userDocument!: UserDocument[];
  
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
  
    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deletedAt?: Date;
  }
  