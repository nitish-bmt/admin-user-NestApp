import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repository/user.repository';
import { JwtPayload } from '../utils/types';
import { LoginUserDto } from '../user/dto/user.dto';
import { authFailure, errorMessages, userFailure } from '../utils/constants/errors.constant';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(username: string, password: string): Promise<User> {
    let user: User;
    try{
      user = await this.userRepository.findUser(username);
    }
    catch(error){
      throw error;
    }

    try{
      const isMatching: boolean = await bcrypt.compare(password, user.pass);
      console.log(isMatching)
      if(!isMatching) {
        throw new UnauthorizedException(userFailure.INVALID_CREDENTIALS)
      }
    }
    catch(error){
      if(error instanceof UnauthorizedException) 
        throw error;
      throw new InternalServerErrorException(errorMessages.ENCRYPTION_FAILURE);
    }

    return user;
  }

  // Generate JWT token for authenticated user
  async login(loginData: LoginUserDto): Promise<string>{

    let user: User;
    try{
      user = await this.authenticateUser(loginData.username, loginData.pass);
    }
    catch(error){
      throw error;
    }

    if(!user.isActive){
      throw new UnauthorizedException(authFailure.INACTIVE_USER)
    }

    const payload: JwtPayload = { username: user.username, userId: user.id, roleId: user.roleId };
    return this.jwtService.sign(payload);
  }

  async authenticateUser(username: string, password: string): Promise<User>{
    let user: User;

    try{
      user = await this.userRepository.findUser(username);
    }
    catch(error){
      throw error;
    }

    try{
      const isMatching: boolean = await bcrypt.compare(password, user.pass);

      if(!isMatching){
        throw new UnauthorizedException(authFailure.INVALID_CREDENTIALS);
      }
    }
    catch(error){
      if(error instanceof UnauthorizedException)
        throw error;
      throw new InternalServerErrorException(errorMessages.ENCRYPTION_FAILURE);
    }

    return user;
  }
}