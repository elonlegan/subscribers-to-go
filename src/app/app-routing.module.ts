import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);

const subscriberModule = () =>
  import('./subscribers/subscribers.module').then((m) => m.SubscribersModule);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'subscribers',
  },
  {
    path: 'subscribers',
    loadChildren: subscriberModule,
  },
  { path: 'account', loadChildren: accountModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
