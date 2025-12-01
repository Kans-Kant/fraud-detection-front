import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Admin } from './features/admin/admin';
import { RoleGuard } from './core/guards/role.guard';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        //canActivate: [LoginGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'admin',
        component: Admin,
        canActivate: [RoleGuard],
        data: { role: 'ADMIN' },
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
    }
];
