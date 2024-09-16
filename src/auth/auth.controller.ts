import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../utils/customDecorator/custom.decorator';
import { LoginUserDto } from 'src/user/dto/user.dto';
import { standardizeErrorResponse } from '../utils/utilityFunction';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @Public()
  @Post('login')
  async login(@Body() loginCredentials: LoginUserDto) {
    try{
      const token: string = await this.authService.login(loginCredentials);
      return token;
    }
    catch(error){
      return standardizeErrorResponse(error);
    }
  }
}

/*

SAMPLE JSON FOR POSTMAN

{
  "roleId": 1,
  "firstName": "Nitish",
  "lastName": "Rawat",
  "username": "nitish",
  "pass": "nitish",
  "email": "nitish@binmile.com",
  "contact": "1234567890"
}


{
  "firstName": "Abhishek",
  "lastName": "Singh",
  "username": "abhishek",
  "pass": "abhishek",
  "email": "abhishek@binmile.com",
  "contact": "1234567890"
}
*/