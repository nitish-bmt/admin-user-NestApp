import { HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException} from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import * as bcrypt from "bcrypt";
import { CreateUserDto, SafeTransferUserDto, UpdateUserDto } from "./dto/user.dto";
import { validRoleId } from "./entity/role.entity";
import { User } from "./entity/user.entity";
import { plainToClass } from "class-transformer";
import { RoleRepository } from "./repository/role.repository";
import { dbFailure, errorMessages, userFailure } from "../utils/constants/errors.constant";
import { UpdateResult } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ){}

  userEntityToShareableDto(user: User): SafeTransferUserDto{
    return plainToClass(SafeTransferUserDto, {...user, role: validRoleId[user.roleId]});
  }

  async getAllSubAdmins(): Promise<User[]>{
    try{
      return await this.userRepository.getAllSubAdmins();
    }
    catch(error) {
      throw error;
    }
  }

  async getUser(username: string): Promise<User>{
    try{
      return (await this.userRepository.findUser(username));    
    }
    catch(error){
      throw error;
    }
  }

  async getUserIfSubAdmin(username: string): Promise<User|null>{
    let user: User;
    try{
      user = await this.userRepository.findUser(username);
    }
    catch(error){
      throw error;
    }

    if(user.roleId == validRoleId.admin){
      throw new UnauthorizedException(userFailure.ADMIN_PRIVACY)
    }

    return user;
  }

  async addNewUser(newUserData: CreateUserDto): Promise<User>{
    // console.log(newUserData);
    newUserData.roleId = newUserData.roleId ? ( newUserData.roleId) : (validRoleId.subAdmin);

    try{
      newUserData.pass = await bcrypt.hash(newUserData.pass, Number(process.env.SALT_ROUNDS));
    }
    catch(error){
      throw new InternalServerErrorException(errorMessages.ENCRYPTION_FAILURE);
    }

    let newUser: User;
    try{
      newUser = await this.userRepository.addUser(newUserData);
    }
    catch(error){
      throw dbFailure.DB_WRITE_FAILURE;
    }

    return newUser;
  }
  
  async updateUser(username: string, dataToUpdate: UpdateUserDto) {
    let updatedUser: User;

    try{
      updatedUser = await this.userRepository.updateUser(username, dataToUpdate);
    }
    catch(error){
      throw error;
    }

    return updatedUser;
  }

  async deleteUser(username: string): Promise<UpdateResult>{

    let user: User;
    try{
      user = await this.userRepository.findUser(username);
      console.log(user, "user");
    }
    catch(error){
      throw error;
    }

    let deletionResult: UpdateResult;
    try{
      deletionResult = (await this.userRepository.softDelete(user));
    }
    catch(error){
      console.log(error)
    }

    return deletionResult;
  }
}