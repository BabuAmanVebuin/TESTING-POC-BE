import type { MissingRequiredParameterError } from './MissingRequiredParameterError'
import type { TaskIDAlreadyExistsError } from './TaskIDAlreadyExistsError'
import type { TaskIDDoesntExistError } from './TaskIDDoesntExistError'
import type { PaymentRecordIDAlreadyExistsError } from './PaymentRecordIDAlreadyExistsError'
import type { PaymentRecordIDDoesntExistsError } from './PaymentRecordIDDoesntExistsError'
import type { UserNotFoundError } from './UserNotFoundError'
import type { InvalidUserTypeError } from './InvalidUserTypeError'
import type { InvalidAmountError } from './InvalidAmountError'
import type { FamilyDetailAlreadyExistsError } from './FamilyDetailsAlreadyExistsError'
import type { UserDocumentAlreadyExistsError } from './UserDocumentAlreadyExistsError'

export type ApplicationError =
  | MissingRequiredParameterError
  | TaskIDAlreadyExistsError
  | TaskIDDoesntExistError
  | PaymentRecordIDAlreadyExistsError
  | PaymentRecordIDDoesntExistsError
  | UserNotFoundError
  | InvalidUserTypeError
  | InvalidAmountError
  | FamilyDetailAlreadyExistsError
  | UserDocumentAlreadyExistsError
