import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, User, UserDocument } from '.';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private user: Model<UserDocument>,
  ) {
    super({
      secretOrKey: 'DC111321',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { _id } = payload;

    const user: User = await this.user.findById(_id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
