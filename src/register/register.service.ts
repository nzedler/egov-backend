import { Injectable } from '@nestjs/common';
import { KeycloakAdminService } from 'src/shared/keycloak-admin/keycloak-admin.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class RegisterService {
  constructor(private keycloakAdminService: KeycloakAdminService) {}
  public registerUser(createUserDto: RegisterUserDto): Promise<{ id: string }> {
    const user: User = {
      title: createUserDto.title,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      password: createUserDto.password,
    };
    return this.keycloakAdminService.registerUser(user);
  }
}
