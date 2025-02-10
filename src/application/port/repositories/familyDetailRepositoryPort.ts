import type * as E from 'fp-ts/Either'
import type * as O from 'fp-ts/Option'
import type { ApplicationError } from '../../errors'
import { FamilyDetailDto } from '../../../domain/models/FamilyDetailDto'

export type FamilyDetailRepositoryPort = {
  findAll: () => Promise<FamilyDetailDto[]>
  findById: (id: number) => Promise<O.Option<FamilyDetailDto>>
  findByUserIdAndRelation: (
    userId: number,
    relation: string
  ) => Promise<O.Option<FamilyDetailDto>>
  create: (
    userId: number,
    familyMemberName: string,
    relation: string,
    dateOfBirth: string,
    gender: string,
    occupation: string,
    address: string
  ) => Promise<E.Either<ApplicationError, FamilyDetailDto>>
  // update: (
  //   userId: number,
  //   familyMemberName: string,
  //   relation: string,
  //   dateOfBirth: string,
  //   gender: string,
  //   occupation: string,
  //   address: string,
  // ) => Promise<E.Either<ApplicationError, string>>;
  delete_: (id: number) => Promise<void>
}
