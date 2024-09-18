export declare enum ErrorMessages {
    INSUFFICIENT_ARGUMENTS = "TOO FEW ARGUMENTS PASSED",
    ENCRYPTION_ERROR = "ENCRYPTION FAILED"
}
export declare const enum ValidationErrorMessages {
    VALID_PHONE_NUMBER = "ADD A VALID INDIAN PHONE NUMBER WITH COUNTRY CODE",
    COUNTRY_CODE_REQUIRED = "ADD COUNTRY CODE WITH CONTACT NUMBER",
    IS_NOT_EMPTY = "IS NOT EMPTY",
    MIN_LENGTH = "MIN LENGTH",
    MAX_LENGTH = "MAX LENGTH",
    STRONG_PASSWORD = "PASSWORD MUST CONTAIN AT LEAST 1 LOWERCASE LETTER, AT LEAST 1 UPPERCASE LETTER, AT LEAST 1 NUMBER, AT LEAST 1 SPECIAL CHARACTER",
    IS_EQUAL_TO = "IS EQUAL TO",
    IS_STRING = "IS STRING",
    UNIQUE_VALIDATE = "UNIQUE VALIDATE",
    IS_EMAIL = "IS EMAIL"
}
export declare enum DbError {
    CONNECTION_ERROR = "COULD NOT CONNECT TO DB",
    WRITE_ERROR = "COULD NOT WRITE TO DB",
    READ_ERROR = "COULD NOT READ FROM DB"
}
export declare enum UserCreationError {
    ERROR = "COULD NOT REGISTER NEW USER",
    EMAIL_ALREADY_REGISTERED = "EMAIL ALREADY REGISTERED. TRY WITH ANOTHER EMAIL",
    USERNAME_ALREADY_TAKEN = "USERNAME ALREADY TAKEN. TRY WITH ANOTHER USERNAME"
}
export declare enum UserError {
    INVALID_CREDENTIALS = "CREDENTIALS DO NOT MATCH",
    USER_NOT_CREATED = "COULD NOT CREATE THE USER",
    USER_NOT_FOUND = "USER DOES NOT EXIST",
    USER_NOT_DELETED = "COULD NOT DELETE THE USER",
    ADMIN_PRIVACY = "ADMIN CAN ONLY GET SUB ADMINS"
}
export declare enum AuthError {
    ERROR = "COULD NOT LOGIN",
    INACTIVE_USER = "INACTIVE USERS ARE NOT ALLOWED",
    DELETED_USER = "USER HAS BEEN DELETED",
    INVALID_CREDENTIALS = "USERNAME AND PASSWORD DO NOT MATCH"
}
