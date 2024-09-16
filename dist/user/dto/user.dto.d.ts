import { validRoleId } from "../entity/role.entity";
export declare class CreateUserDto {
    id: string;
    roleId: validRoleId;
    isActive: boolean;
    firstName: string;
    lastName: string;
    username: string;
    pass: string;
    email: string;
    contact: string;
}
export declare class SafeTransferUserDto extends CreateUserDto {
    pass: string;
    email: string;
    deletedAt: Date;
    roleId: validRoleId;
    role: string;
}
declare const UpdateUserDto_base: any;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class LoginUserDto {
    username: string;
    pass: string;
}
export {};
