import { Routes } from '@angular/router';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { AgGridInfiniteComponent } from './components/ag-grid-infinite/ag-grid-infinite.component';

export const routes: Routes = [
    {path: '', component: AgGridInfiniteComponent},
    {path:  'profile/:name', component: ProfileViewComponent}
];
