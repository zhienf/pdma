import { Routes } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { TranslateDescriptionComponent } from './translate-description/translate-description.component';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';
import { GenerativeAiComponent } from './generative-ai/generative-ai.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'add-driver', component: AddDriverComponent, canActivate: [authGuard]},
    {path:'list-drivers', component: ListDriversComponent, canActivate: [authGuard]},
    {path:'delete-driver', component: DeleteDriverComponent, canActivate: [authGuard]},
    {path:'update-driver', component: UpdateDriverComponent, canActivate: [authGuard]},
    {path:'add-package', component: AddPackageComponent, canActivate: [authGuard]},
    {path:'list-packages', component: ListPackagesComponent, canActivate: [authGuard]},
    {path:'delete-package', component: DeletePackageComponent, canActivate: [authGuard]},
    {path:'update-package', component: UpdatePackageComponent, canActivate: [authGuard]},
    {path:'statistics', component: StatisticsComponent, canActivate: [authGuard]},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'home', component: HomeComponent, canActivate: [authGuard]},
    {path:'invalid-data', component: InvalidDataComponent},
    {path:'page-not-found', component: PageNotFoundComponent, canActivate: [authGuard]},
    {path:'translate-description', component: TranslateDescriptionComponent, canActivate: [authGuard]},
    {path:'text-to-speech', component: TextToSpeechComponent, canActivate: [authGuard]},
    {path:'generative-ai', component: GenerativeAiComponent, canActivate: [authGuard]},
    {path:'', redirectTo: '/home', pathMatch: 'full'},
    {path:'**', redirectTo: '/page-not-found'},
];
