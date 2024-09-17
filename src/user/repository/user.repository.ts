import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { dbFailure, errorMessages } from "../../utils/constants/errors.constant";
import { validRoleId } from "../entity/role.entity";

@Injectable()
export class UserRepository extends Repository<User> {

  constructor(
    // @InjectRepository(User) 
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target, 
      userRepository.manager, 
      userRepository.queryRunner,
    );
  }

  // Find a user by username or email
  async findUser(username?: string, email?: string): Promise<User> {
    const whereClause: Partial<User> = {};

    // Add search conditions based on input
    if (username) whereClause.username = username;
    else if (email) whereClause.email = email;
    else throw new BadRequestException(errorMessages.INSUFFICIENT_ARGUMENTS);

    let user: User;
    try {
      user = await this.userRepository.findOne({ where: whereClause });
      if (!user) 
        throw new NotFoundException(dbFailure.DB_ITEM_NOT_FOUND);
    } 
    catch (error) {
      // Handling database errors
      throw new InternalServerErrorException(dbFailure.DB_FAILURE);
    }

    return user;
  }

  // Retrieve all users with the role of subAdmin
  async getAllSubAdmins(): Promise<User[]> {
    let users: User[];
    try {
      users = await this.userRepository.find({
        where: {
          roleId: validRoleId.subAdmin,
        },
      });
      if (!users) 
        throw new NotFoundException(dbFailure.DB_ITEM_NOT_FOUND);
    } 
    catch (error) {
      // Handling database errors
      throw new InternalServerErrorException(dbFailure.DB_FAILURE);
    }

    return users;
  }

  // Add a new user
  async addUser(newUserData: CreateUserDto) {
    let newUser: User;
    try {
      const usr = this.userRepository.create(newUserData);
      newUser = await this.userRepository.save(usr);
    } 
    catch (error) {
      // Handling database errors
      console.log(error);
      throw new InternalServerErrorException(dbFailure.DB_WRITE_FAILURE);
    }

    return newUser;
  }

  // Update an existing user
  async updateUser(username: string, updateData: UpdateUserDto): Promise<User> {
    let user: User;
    try {
      user = await this.findUser(username);
    } 
    catch (error) {
      // errors are already handled with proper response message in the findUser() itself
      // just need to re-throw the already handled error here
      throw error;
    }

    // Hash password if it needs to be updated
    if (updateData.pass) {
      try {
        updateData.pass = await bcrypt.hash(updateData.pass, Number(process.env.SALT_ROUNDS));
      } 
      catch (error) {
        // Handling encryption errors
        throw new Error(errorMessages.ENCRYPTION_FAILURE);
      }
    }

    // Update user data
    Object.assign(user, updateData);

    let updatedUser: User;
    try {
      updatedUser = await this.userRepository.save(user);
    } 
    catch (error) {
      // Handling database errors
      throw new InternalServerErrorException(dbFailure.DB_WRITE_FAILURE);
    }

    return updatedUser;
  }
}