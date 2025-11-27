import { Routes } from '@angular/router';
import { Profile } from './profile/profile';
import { Dashboard } from './dashboard/dashboard';
import { Leaderboard } from './leaderboard/leaderboard';
import { authGuardGuard } from './auth-guard-guard';

export const routes: Routes = [
    {
        path:'',
        component:Dashboard
    },
    {
        path:'details',
        component:Profile,
        canActivate:[authGuardGuard]
    },
    {
        path:'leaderboard',
        component:Leaderboard,
        canActivate:[authGuardGuard]
    }
];
