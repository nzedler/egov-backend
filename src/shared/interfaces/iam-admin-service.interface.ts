import { User } from 'src/register/interfaces/user.interface';

/*
 * Interface for the IAM Admin Service
 */
export interface IIamAdminService {
  /*
   * Register a new user with a user object
   * @param user                        - The user object to register
   * @returns {Promise<{ id: string }>} - The id of the created user
   * @memberof KeycloakAdminService
   * @method registerUser
   */
  registerUser: (user: User) => Promise<{ id: string }>;
}
