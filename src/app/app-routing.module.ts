import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {UserType} from './shared/models/user-type';
import {userTypeGuard} from './shared/guards/user-type.guard';
import {loginGuard} from './shared/guards/login.guard';

const routes: Routes = [
  { path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  { path: 'staff',
    loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
    data: {userType: UserType.Staff},
    canMatch: [userTypeGuard]
  },
  { path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    data: {userType: UserType.Student},
    canMatch: [userTypeGuard]
  },
  { path: 'parent',
    loadChildren: () => import('./parent/parent.module').then(m => m.ParentModule),
    data: {userType: UserType.Parent},
    canMatch: [userTypeGuard]
  },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
