import { Injectable } from '@nestjs/common';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import { User } from 'src/register/interfaces/user.interface';
import { IIamAdminService } from 'src/shared/interfaces/iam-admin-service.interface';

@Injectable()
export class KeycloakAdminService implements IIamAdminService {
  private kcAdminClient: KcAdminClient;

  constructor() {
    this.kcAdminClient = new KcAdminClient();
    this.kcAdminClient.setConfig({
      baseUrl: process.env.KC_BASE_URL,
      realmName: process.env.KC_REALM,
    });
  }

  /*
   * Authorize the Keycloak Admin Client
   * @description - user name and password are provided in environment variables
   * @returns {Promise<void>}
   * @memberof KeycloakAdminService
   * @method authorize
   */
  private async authorize(): Promise<void> {
    await this.kcAdminClient.auth({
      username: process.env.KC_ADMIN_USERNAME,
      password: process.env.KC_ADMIN_PASSWORD,
      grantType: 'password',
      clientId: process.env.KC_CLIENT_ID,
    });
  }

  /*
   * Register a new user with a user object
   * @param user                        - The user object to register
   * @returns {Promise<{ id: string }>} - The id of the created user
   * @memberof KeycloakAdminService
   * @method registerUser
   */
  public async registerUser(user: User): Promise<{ id: string }> {
    await this.authorize();
    return this.kcAdminClient.users.create({
      realm: process.env.KC_REALM,
      username: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      emailVerified: false,
      credentials: [
        {
          type: 'password',
          value: user.password,
          temporary: false,
        },
      ],
      attributes: { title: user.title },
    });
  }
}
