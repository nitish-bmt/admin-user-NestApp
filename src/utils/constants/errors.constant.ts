export enum errorMessages{
  INSUFFICIENT_ARGUMENTS = "Too few arguments passed",
  ENCRYPTION_FAILURE = "Encryption failed",
}

export const enum validationErrorMessages{
  IsNotEmpty = 'IsNotEmpty',
  MinLength = 'MinLength',
  MaxLength = 'MaxLength',
  StrongPassword = 'StrongPassword',
  IsEqualTo = 'IsEqualTo',
  IsString = 'IsString',
  UniqueValidate = 'UniqueValidate',
  IsEmail = 'IsEmail'
}

export enum dbFailure{
  DB_FAILURE = "COULD NOT CONNECT TO DB",
  DB_WRITE_FAILURE = "COULD NOT WRITE TO DB",
  DB_READ_FAILURE = "COULD NOT READ FROM DB",
  DB_SEARCH_FAILURE = "COULD NOT FIND DB",
  DB_ITEM_NOT_FOUND = "ITEM NOT FOUND IN DB",
  EMPTY_DB_STRING = "RECEIVED EMPTY DB STRING ",
  DB_ITEM_NOT_DELETED = "COULD NOT DELETE THE ITEM"
}

export enum userCreationFailure{
  FAILURE = "Could not register new user.",
  EMAIL_ALREADY_REGISTERED = "Email already registered. Try with another email.",
  USERNAME_ALREADY_TAKEN = "Username already taken. Try with another username.",
}

export enum userFailure{
  INVALID_CREDENTIALS = "Credentials do not match",
  USER_NOT_FOUND = "User does not exist",
  USER_NOT_DELETED = "COULD NOT DELETE THE USER",
  ADMIN_PRIVACY = "ADMIN CAN ONLY GET SUB ADMINS"
}

export enum authFailure{
  FAILURE = "Could not login",
  INACTIVE_USER = "Inactive users are not allowed",
  INVALID_CREDENTIALS = "username and password do not match",
}