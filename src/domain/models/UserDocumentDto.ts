import { IsString, IsDateString, MaxLength, IsOptional } from 'class-validator'

export class UserDocumentDto {
  @IsString()
  @MaxLength(128)
  documentType!: string

  @IsString()
  @MaxLength(512)
  documentUrl!: string

  @IsString()
  @MaxLength(64)
  documentStatus!: string

  @IsDateString()
  expirationDate!: string

  @IsOptional()
  @IsString()
  @MaxLength(128)
  issuedBy?: string

  @IsDateString()
  issuedDate!: string

  @IsOptional()
  @IsString()
  @MaxLength(128)
  remarks?: string
}
