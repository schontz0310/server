import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IMasterUsersRepository from '@modules/Users/repositories/IMasterUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import MasterUser from '@modules/Users/infra/typeorm/entities/UserMaster';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: MasterUser;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('MasterUsersRepository')
    private masterUsersRepository: IMasterUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.masterUsersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const { secret, expiresIn } = authConfig.masterSecret;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
