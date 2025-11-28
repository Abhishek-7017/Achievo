import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Leaderboard } from './leaderboard/leaderboard';
import { authGuardGuard } from './auth-guard-guard';
import { Details } from './user/details/details';

export const routes: Routes = [
    {
        path:'',
        component:Dashboard
    },
    {
        path:'details',
        component:Details,
        canActivate:[authGuardGuard]
    },
    {
        path:'leaderboard',
        component:Leaderboard,
        canActivate:[authGuardGuard]
    }
];
