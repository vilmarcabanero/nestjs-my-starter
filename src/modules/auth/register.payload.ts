import { IsNotEmpty } from 'class-validator';

export class RegisterPayload {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
