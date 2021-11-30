import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get.user.decorator';
import { AuthService } from '.';
import { RegisterPayload } from './register.payload';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() payload: RegisterPayload): Promise<object> {
    return this.authService.register(payload);
  }

  @Post('/login')
  async login(@Body() payload: RegisterPayload): Promise<object> {
    return this.authService.login(payload);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  async getUser(@GetUser() user: any): Promise<any> {
    return this.authService.getUser(user._id);
  }
}
