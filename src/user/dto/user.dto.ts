// import { Prop } from "@nestjs/mongoose";
// import { Exclude, Expose } from "class-transformer";
import { IS_NOT_EMPTY, IsEmail, IsNotEmpty, IsNumberString, IsOptional} from "class-validator";
import { OmitType, PartialType } from "@nestjs/swagger"
import { validRoleId, validRoleType } from "../entity/role.entity";
import { Exclude } from "class-transformer";


// data transfer object
export class CreateUserDto{

  @IsOptional()
  id: string;

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

  @IsNumberString()
  contact: string;
}

// to show data
export class SafeTransferUserDto extends CreateUserDto{
  @Exclude()
  @IsNotEmpty()
  pass: string;

  @Exclude()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Exclude()
  deletedAt: Date;

  @Exclude()
  @IsNotEmpty()
  roleId: validRoleId;

  @IsNotEmpty()
  role: string;

}

// data transfer object
export class UpdateUserDto extends PartialType(SafeTransferUserDto) {}

export class LoginUserDto{
  
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  pass: string;
}