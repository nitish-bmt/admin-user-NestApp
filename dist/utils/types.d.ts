import { SafeTransferUserDto } from "../user/dto/user.dto";
export interface JwtPayload {
    userId: string;
    username: string;
    roleId: number;
}
export interface userEmbeddedRequest extends Request {
    user: JwtPayload;
}
export interface StandardResponse {
    status: number;
    message: string;
    success: boolean;
    response?: SafeTransferUserDto[] | SafeTransferUserDto;
}
