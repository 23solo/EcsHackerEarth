import { CheckoutComponent } from './../checkout/checkout.component';
import { MenuComponent } from './../menu/menu.component';
import { Routes } from '@angular/router';

export const routes: Routes =[
    {path: 'home', component: MenuComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: '', redirectTo :'/home', pathMatch: 'full'}
]