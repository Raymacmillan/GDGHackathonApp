import { Routes, provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./login/login.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { MotivationalQuoteComponent } from './quotes-section/quotes-section.component';
import { TodoComponentList } from './todo-list/todo-list.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'quotes', component: MotivationalQuoteComponent},
    {path: 'todo', component: TodoComponentList},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];

export const appRoutingProviders = [
    provideRouter(routes)
];
