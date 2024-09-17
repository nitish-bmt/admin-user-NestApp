import { Role } from "../entity/role.entity";
import { Repository } from "typeorm";
export declare class RoleRepository extends Repository<Role> {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
}
