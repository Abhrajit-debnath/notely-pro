
import { UserRepository } from "../../repositories/auth.repository.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/auth/token.utils.js";
import { AppError } from "../../globals/error.global.js";

interface OAuthPayload {
  email: string;
  name: string;
  image?: string;
  provider: string;
  providerId: string;
}

export class OAuthService {
  constructor(private userRepository: UserRepository) {}

  handleOAuthLogin = async (payload: OAuthPayload) => {
    const { email, name, image, provider, providerId } = payload;

    // Look up existing user by email
    let user = await this.userRepository.findByEmail(email);

    if (user) {
      //  Local credentials user exists, link their OAuth provider
      if (!user.provider) {
        user = await this.userRepository.updateUser(user.id, {
          provider,
          providerId,
          image: user.image || image
        });
      } 
      //  Already an OAuth user, verify it's the correct provider
      else if (user.provider !== provider || user.providerId !== providerId) {
        throw new AppError(400, `This email is already associated with ${user.provider} sign in.`);
      }
    } else {
     //new user, create their record
      user = await this.userRepository.saveUser({
        email,
        name,
        image,
        provider,
        providerId,
        password: null 
      });
    }

    // Generate backend JWT tokens
    const tokenPayload = { userId: user.id, email: user.email };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: { id: user.id, email: user.email, name: user.name, image: user.image },
      accessToken,
      refreshToken
    };
  };
}