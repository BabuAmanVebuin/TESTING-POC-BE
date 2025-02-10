import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { FamilyDetail } from '../orm/typeorm/entities/FamilyDetail'
import type { Connection } from 'typeorm'
import type { ApplicationError } from '../../application/errors'
import { FamilyDetailRepositoryPort } from '../../application/port/repositories/familyDetailRepositoryPort'

export const familyDetailRepositoryMySQL = async (
  connection: Connection
): Promise<FamilyDetailRepositoryPort> => ({
  findAll: async (): Promise<FamilyDetail[]> => {
    const familyDetailRepository = connection.getRepository(FamilyDetail)
    return familyDetailRepository.find({
      relations: ['userId'],
    })
  },

  findById: async (id: number): Promise<O.Option<FamilyDetail>> => {
    const familyDetailRepository = connection.getRepository(FamilyDetail)
    const result = await familyDetailRepository.findOne({ where: { id } })
    return result === undefined ? O.none : O.some(result)
  },

  findByUserIdAndRelation: async (
    userId: number,
    relation: string
  ): Promise<O.Option<FamilyDetail>> => {
    const familyDetailRepository = connection.getRepository(FamilyDetail)
    const result = await familyDetailRepository.findOne({
      where: { userId, relation },
    })
    return result === undefined ? O.none : O.some(result)
  },

  create: async (
    userId: number,
    familyMemberName: string,
    relation: string,
    dateOfBirth: string,
    gender: string,
    occupation: string,
    address: string
  ): Promise<E.Either<ApplicationError, FamilyDetail>> => {
    const familyDetailRepository = connection.getRepository(FamilyDetail)

    const familyDetail = new FamilyDetail()
    familyDetail.userId = userId
    familyDetail.familyMemberName = familyMemberName
    familyDetail.relation = relation
    familyDetail.dateOfBirth = dateOfBirth
    familyDetail.gender = gender
    familyDetail.occupation = occupation
    familyDetail.address = address

    const result = await familyDetailRepository.save(familyDetail)
    console.log('FamilyDetail has been saved: ', familyDetail)

    return E.right(result)
  },

  // update: async (
  //   userId: number,
  //   familyMemberName: string,
  //   relation: string,
  //   dateOfBirth: string,
  //   gender: string,
  //   occupation: string,
  //   address: string
  // ): Promise<E.Either<ApplicationError, string>> => {
  //   const familyDetailRepository = connection.getRepository(FamilyDetail);

  //   // const familyDetail = await familyDetailRepository.findOne({ where: { idName } });
  //   // if (!familyDetail) {
  //   //   return E.left(missingRequiredParameterError("'idName' is not found."));
  //   // }
  //   familyDetail.userId = userId;
  //   familyDetail.familyMemberName = familyMemberName;
  //   familyDetail.relation = relation;
  //   familyDetail.dateOfBirth = dateOfBirth;
  //   familyDetail.gender = gender;
  //   familyDetail.occupation = occupation;
  //   familyDetail.address = address;

  //   await familyDetailRepository.save(familyDetail);

  //   return E.right(`PaymentRecord has been updated: ${JSON.stringify(paymentRecord)}`);
  // },

  delete_: async (id: number): Promise<void> => {
    const familyDetailRepository = connection.getRepository(FamilyDetail)
    await familyDetailRepository.delete({ id })
  },
})
