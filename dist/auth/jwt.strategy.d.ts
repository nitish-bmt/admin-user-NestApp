import { JwtPayload } from '../utils/types';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        userId: string;
        username: string;
        roleId: number;
    }>;
}
export {};
