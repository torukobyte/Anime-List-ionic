import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
                    },
                ]
            },
            {
                path: 'feed',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/feed/feed.module').then(m => m.FeedPageModule)
                    },
                ]
            },
            {
                path: 'animelist',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/animelist/animelist.module').then(m => m.AnimelistModule)
                    },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule {
}
