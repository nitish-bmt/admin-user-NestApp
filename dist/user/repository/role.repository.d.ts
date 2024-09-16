import { Repository } from "typeorm";
import { Role } from "../entity/role.entity";
export declare class RoleRepository extends Repository<Role> {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
}
