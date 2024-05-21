import {Routes} from '@angular/router';
import {WelcomePageComponent} from "./pages/welcome-page/welcome-page.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";

export const routes: Routes = [
    {path: '', component: WelcomePageComponent},
    {path: 'user-profile', component: UserProfileComponent}
];
