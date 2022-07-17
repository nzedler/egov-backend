import { Module } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { KeycloakAdminService } from './shared/keycloak-admin/keycloak-admin.service';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService, KeycloakAdminService],
  imports: [ApplicationsModule],
})
export class AppModule {}
