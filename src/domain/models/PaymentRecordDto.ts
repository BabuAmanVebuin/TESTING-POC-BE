import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { UserTypeEnum } from '../../infrastructure/orm/typeorm/entities/PaymentRecord'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm'

export class PaymentRecordDto {
  @IsNumber()
  id!: number

  @IsString()
  idName!: string

  @IsNumber()
  userId!: number

  @IsString()
  fullName!: string

  @IsEnum(UserTypeEnum, {
    message: `Invalid 'userType'. Must be one of: ${Object.values(
      UserTypeEnum
    ).join(', ')}`,
  })
  userType!: UserTypeEnum

  @IsOptional()
  @IsNumber()
  firstPayment?: number

  @IsOptional()
  @IsNumber()
  secondPayment?: number

  @IsOptional()
  @IsNumber()
  thirdPayment?: number

  @IsOptional()
  @IsNumber()
  fourthPayment?: number

  @IsOptional()
  @IsNumber()
  fifthPayment?: number

  @IsOptional()
  @IsNumber()
  sixthPayment?: number

  @IsOptional()
  @IsNumber()
  seventhPayment?: number

  @IsOptional()
  @IsNumber()
  eighthPayment?: number

  @IsOptional()
  @IsNumber()
  ninthPayment?: number

  @IsOptional()
  @IsNumber()
  tenthPayment?: number

  @IsOptional()
  @IsNumber()
  eleventhPayment?: number

  @IsOptional()
  @IsNumber()
  twelfthPayment?: number

  @IsOptional()
  @IsNumber()
  quarterlyContribution?: number

  @IsOptional()
  @IsNumber()
  halfYearContribution?: number

  @IsOptional()
  @IsNumber()
  yearlyContribution?: number

  @IsOptional()
  @IsNumber()
  pendingPayment?: number

  @IsOptional()
  @IsNumber()
  percentagePaid?: number

  @IsOptional()
  @IsString()
  paymentStatus?: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date

  @Column({ type: 'boolean' })
  isDeleted!: boolean
}
