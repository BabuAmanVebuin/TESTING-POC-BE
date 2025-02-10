import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsDateString,
  MaxLength,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator'
import { Type } from 'class-transformer'
import { UserDocumentDto } from './UserDocumentDto'
import { FamilyDetailDto } from './FamilyDetailDto'
import { PaymentRecordDto } from './PaymentRecordDto'

export class UserDto {
  @IsNumber()
  id!: number

  @IsString()
  @MaxLength(128)
  fullName!: string

  @IsEmail()
  @MaxLength(256)
  email!: string

  @IsPhoneNumber()
  @MaxLength(64)
  phoneNumber!: string

  @IsOptional()
  @IsString()
  @MaxLength(64)
  username?: string

  @IsDateString()
  dateOfBirth!: string

  @IsString()
  @MaxLength(256)
  address!: string

  @IsOptional()
  @IsString()
  @MaxLength(128)
  profileImage?: string

  @IsString()
  @MaxLength(128)
  nationality!: string

  @IsString()
  @MaxLength(64)
  gender!: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentRecordDto)
  paymentRecords?: PaymentRecordDto[]

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDocumentDto)
  userDocuments?: UserDocumentDto[]

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FamilyDetailDto)
  familyDetails?: FamilyDetailDto[]
}
