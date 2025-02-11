import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { getPaymentRecordByIdNameUseCase } from '../../../src/application/use_cases/paymentRecord/getPaymentRecordByIdNameUseCase';
import { PaymentRecordRepositoryPort } from '../../../src/application/port/repositories/PaymentRecordRepositoryPort';
import { ApplicationError } from '../../../src/application/errors';
import { paymentRecordIDDoesntExistsError } from '../../../src/application/errors/PaymentRecordIDDoesntExistsError';
import { PaymentRecordDto } from '../../../src/domain/models/PaymentRecordDto';
import { UserTypeEnum } from '../../../src/infrastructure/orm/typeorm/entities/PaymentRecord';

describe('getPaymentRecordByIdNameUseCase', () => {
  let repository: jest.Mocked<PaymentRecordRepositoryPort>;

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByIdName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete_: jest.fn(),
    };
  });

  it('should return a payment record when found', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: 1000,
      secondPayment: 2000,
      thirdPayment: 3000,
      fourthPayment: 4000,
      fifthPayment: 5000,
      sixthPayment: 6000,
      seventhPayment: 7000,
      eighthPayment: 8000,
      ninthPayment: 9000,
      tenthPayment: 10000,
      eleventhPayment: 11000,
      twelfthPayment: 12000,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord).toEqual(expect.objectContaining({
      idName: 'test-id',
      fullName: 'Test User',
    }));
  });

  it('should return an error when payment record is not found', async () => {
    repository.findByIdName.mockResolvedValue(O.none);

    const result = await getPaymentRecordByIdNameUseCase('non-existent-id', repository);

    expect(E.isLeft(result)).toBe(true);
    expect(result).toEqual(E.left(paymentRecordIDDoesntExistsError('non-existent-id')));
  });

  it('should handle repository errors gracefully', async () => {
    const error = new Error('Repository error');
    repository.findByIdName.mockRejectedValue(error);

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    expect(E.isLeft(result)).toBe(true);
    expect(result).toEqual(E.left(error));
  });

  it('should calculate the correct payment status as Completed', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: 10000000,
      secondPayment: 10000000,
      thirdPayment: 10000000,
      fourthPayment: 10000000,
      fifthPayment: 10000000,
      sixthPayment: 10000000,
      seventhPayment: 10000000,
      eighthPayment: 10000000,
      ninthPayment: 10000000,
      tenthPayment: 10000000,
      eleventhPayment: 10000000,
      twelfthPayment: 10000000,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.paymentStatus).toBe('Completed');
  });

  it('should calculate the correct payment status as Pending', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: 1000,
      secondPayment: 2000,
      thirdPayment: 3000,
      fourthPayment: 4000,
      fifthPayment: 5000,
      sixthPayment: 6000,
      seventhPayment: 7000,
      eighthPayment: 8000,
      ninthPayment: 9000,
      tenthPayment: 10000,
      eleventhPayment: 11000,
      twelfthPayment: 12000,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.paymentStatus).toBe('Pending');
  });

  it('should calculate the correct percentage paid', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: 10000000,
      secondPayment: 10000000,
      thirdPayment: 10000000,
      fourthPayment: 10000000,
      fifthPayment: 10000000,
      sixthPayment: 10000000,
      seventhPayment: 10000000,
      eighthPayment: 10000000,
      ninthPayment: 10000000,
      tenthPayment: 10000000,
      eleventhPayment: 10000000,
      twelfthPayment: 10000000,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.percentagePaid).toBe(100);
  });

  it('should calculate the correct pending payment', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: 1000,
      secondPayment: 2000,
      thirdPayment: 3000,
      fourthPayment: 4000,
      fifthPayment: 5000,
      sixthPayment: 6000,
      seventhPayment: 7000,
      eighthPayment: 8000,
      ninthPayment: 9000,
      tenthPayment: 10000,
      eleventhPayment: 11000,
      twelfthPayment: 12000,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.pendingPayment).toBe(99970000);
  });

  it('should calculate the correct half year contribution', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: 1000,
      secondPayment: 2000,
      thirdPayment: 3000,
      fourthPayment: 4000,
      fifthPayment: 5000,
      sixthPayment: 6000,
      seventhPayment: 7000,
      eighthPayment: 8000,
      ninthPayment: 9000,
      tenthPayment: 10000,
      eleventhPayment: 11000,
      twelfthPayment: 12000,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.halfYearContribution).toBeCloseTo(136.44, 2);
  });

  it('should calculate the correct yearly contribution', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: 1000,
      secondPayment: 2000,
      thirdPayment: 3000,
      fourthPayment: 4000,
      fifthPayment: 5000,
      sixthPayment: 6000,
      seventhPayment: 7000,
      eighthPayment: 8000,
      ninthPayment: 9000,
      tenthPayment: 10000,
      eleventhPayment: 11000,
      twelfthPayment: 12000,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.yearlyContribution).toBeCloseTo(272.88, 2);
  });

  it('should calculate the correct quarterly contribution', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: 1000,
      secondPayment: 2000,
      thirdPayment: 3000,
      fourthPayment: 4000,
      fifthPayment: 5000,
      sixthPayment: 6000,
      seventhPayment: 7000,
      eighthPayment: 8000,
      ninthPayment: 9000,
      tenthPayment: 10000,
      eleventhPayment: 11000,
      twelfthPayment: 12000,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.quarterlyContribution).toBeCloseTo(45.24, 2);
  });

  it('should handle zero payments correctly', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: 0,
      secondPayment: 0,
      thirdPayment: 0,
      fourthPayment: 0,
      fifthPayment: 0,
      sixthPayment: 0,
      seventhPayment: 0,
      eighthPayment: 0,
      ninthPayment: 0,
      tenthPayment: 0,
      eleventhPayment: 0,
      twelfthPayment: 0,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.percentagePaid).toBe(0);
    expect(paymentRecord.pendingPayment).toBe(100000000);
  });

  it('should handle negative payments correctly', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: -1000,
      secondPayment: -2000,
      thirdPayment: -3000,
      fourthPayment: -4000,
      fifthPayment: -5000,
      sixthPayment: -6000,
      seventhPayment: -7000,
      eighthPayment: -8000,
      ninthPayment: -9000,
      tenthPayment: -10000,
      eleventhPayment: -11000,
      twelfthPayment: -12000,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.percentagePaid).toBe(0);
    expect(paymentRecord.pendingPayment).toBe(100000000);
  });

  it('should handle non-numeric payments correctly', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: NaN,
      secondPayment: NaN,
      thirdPayment: NaN,
      fourthPayment: NaN,
      fifthPayment: NaN,
      sixthPayment: NaN,
      seventhPayment: NaN,
      eighthPayment: NaN,
      ninthPayment: NaN,
      tenthPayment: NaN,
      eleventhPayment: NaN,
      twelfthPayment: NaN,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.percentagePaid).toBe(0);
    expect(paymentRecord.pendingPayment).toBe(100000000);
  });

  it('should handle undefined payments correctly', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: undefined,
      secondPayment: undefined,
      thirdPayment: undefined,
      fourthPayment: undefined,
      fifthPayment: undefined,
      sixthPayment: undefined,
      seventhPayment: undefined,
      eighthPayment: undefined,
      ninthPayment: undefined,
      tenthPayment: undefined,
      eleventhPayment: undefined,
      twelfthPayment: undefined,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.percentagePaid).toBe(0);
    expect(paymentRecord.pendingPayment).toBe(100000000);
  });

  it('should handle null payments correctly', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.percentagePaid).toBe(0);
    expect(paymentRecord.pendingPayment).toBe(100000000);
  });

  it('should handle mixed valid and invalid payments correctly', async () => {
    const mockPaymentRecord: PaymentRecordDto = {
      id: 1,
      idName: 'test-id',
      userId: 1,
      fullName: 'Test User',
      userType: UserTypeEnum.NOVICE,
      firstPayment: 1000,
      secondPayment: NaN,
      thirdPayment: undefined,
      fifthPayment: -5000,
      sixthPayment: 'invalid' as any,
      seventhPayment: 7000,
      eighthPayment: 8000,
      ninthPayment: 9000,
      tenthPayment: 10000,
      eleventhPayment: 11000,
      twelfthPayment: 12000,
      quarterlyContribution: 0,
      halfYearContribution: 0,
      yearlyContribution: 0,
      pendingPayment: 0,
      percentagePaid: 0,
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      isDeleted: false,
    };

    repository.findByIdName.mockResolvedValue(O.some(mockPaymentRecord));

    const result = await getPaymentRecordByIdNameUseCase('test-id', repository);

    const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
      () => { throw new Error("Expected Right but got Left"); }
    )(result);

    expect(paymentRecord.percentagePaid).toBeCloseTo(0.04, 2);
    expect(paymentRecord.pendingPayment).toBeCloseTo(99960000, 2);
  });
});