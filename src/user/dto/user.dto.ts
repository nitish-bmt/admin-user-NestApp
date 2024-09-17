// import { Prop } from "@nestjs/mongoose";
// import { Exclude, Expose } from "class-transformer";
import { IS_NOT_EMPTY, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber} from "class-validator";
import { OmitType, PartialType } from "@nestjs/swagger"
import { validRoleId, validRoleType } from "../entity/role.entity";
import { Exclude } from "class-transformer";
import { User } from "../entity/user.entity";


// data transfer object
export class CreateUserDto{

  @IsOptional()
  roleId: validRoleId;

  @IsOptional()
  isActive: boolean;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  pass: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsPhoneNumber('IN')
  contact: string;
}

// to show data
export class SafeTransferUserDto extends User{
  @Exclude()
  pass: string;

  @Exclude()
  deletedAt: Date;
}

// data transfer object
export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsOptional()
  pass?: string;

  @IsOptional()
  @Exclude()
  deletedAt?: Date;

  @IsOptional()
  @Exclude()
  roleId?: validRoleId;
}

export class LoginUserDto{
  
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  pass: string;
}