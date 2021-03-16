import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: '',
        redirectTo: 'home/feed',
        pathMatch: 'full'
    },
    {
        path: 'register',
        loadChildren: () => import('./aRegister/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./aLogin/login.module').then(m => m.LoginPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
