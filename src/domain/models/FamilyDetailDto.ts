import { IsString, IsDateString, MaxLength, IsNumber } from 'class-validator'

export class FamilyDetailDto {
  @IsNumber()
  userId!: number

  @IsString()
  @MaxLength(128)
  familyMemberName!: string

  @IsString()
  @MaxLength(64)
  relation!: string

  @IsDateString()
  dateOfBirth!: string

  @IsString()
  @MaxLength(64)
  gender!: string

  @IsString()
  @MaxLength(128)
  occupation!: string

  @IsString()
  @MaxLength(128)
  address!: string
}
