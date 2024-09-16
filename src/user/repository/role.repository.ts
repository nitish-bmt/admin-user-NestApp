import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { Role } from "../entity/role.entity";

@Injectable()
export class RoleRepository extends Repository<Role>{

  constructor( 
    @InjectRepository(User) 
    private roleRepository: Repository<Role>
  ){
    super(
      roleRepository.target,
      roleRepository.manager,
      roleRepository.queryRunner,
    );
  }

}