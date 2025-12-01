import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Admin } from './admin';
import { Profile } from './profile/profile';
import { Clients } from './clients/clients';
import { Users } from './users/users';
import { Cards } from './cards/cards';
import { Banks } from './banks/banks';
import { Transactions } from './transactions/transactions';
import { Frauds } from './frauds/frauds';
import { Settings } from './settings/settings';
import { Merchant } from './merchant/merchant';
import { AddUser } from './add-user/add-user';
import { UpdateUser } from './update-user/update-user';
import { AddClient } from './add-client/add-client';
import { UpdateClient } from './update-client/update-client';

export const adminRoutes: Routes = [

    {
        path: "",
        component: Dashboard
    },
    {
        path: "profile",
        component: Profile
    },
    {
        path: "clients",
        component: Clients
    },
    {
        path: "clients/add",
        component: AddClient
    },
    {
        path: "clients/update/:id",
        component: UpdateClient
    },
    {
        path: "users",
        component: Users
    },
    {
        path: "users/add",
        component: AddUser
    },
    {
        path: "users/update/:id",
        component: UpdateUser
    },
    {
        path: "cards",
        component: Cards
    },
    {
        path: "banks",
        component: Banks
    },
    {
        path: "transactions",
        component: Transactions
    },
    {
        path: "merchants",
        component: Merchant
    },
    {
        path: "frauds",
        component: Frauds
    },
    {
        path: "settings",
        component: Settings
    }
];