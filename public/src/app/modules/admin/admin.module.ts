import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { StorageService } from 'src/app/shared/services/storage.service';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';
import { RoleComponent } from './pages/role/role.component';
import { CreateRoleComponent } from './pages/role/components/create-role/create-role.component';
import { UserComponent } from './pages/user/user.component';
import { ProjectComponent } from './pages/project/project.component';
import { TeamComponent } from './pages/team/team.component';
import { TaskComponent } from './pages/task/task.component';
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    TopbarComponent,
    LeftmenuComponent,
    RoleComponent,
    CreateRoleComponent,
    UserComponent,
    ProjectComponent,
    TeamComponent,
    TaskComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    StorageService
  ]
})
export class AdminModule { }
