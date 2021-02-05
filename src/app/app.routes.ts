import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewTermComponent } from './new-term/new-term.component';
import { EditTermComponent } from './edit-term/edit-term.component';
import { EditTermResolver } from './edit-term/edit-term.resolver';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TermDetailComponent } from './term-detail/term-detail.component';

export const rootRouterConfig: Routes = [
  { path: '', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'new-term', canActivate: [AuthGuardService], component: NewTermComponent },
  { path: 'details/:id', canActivate: [AuthGuardService], component: TermDetailComponent, resolve:{data : EditTermResolver} },
  { path: 'edit/:id', canActivate: [AuthGuardService], component: EditTermComponent, resolve:{data : EditTermResolver} },
  { path: '**', redirectTo: 'home'}
];