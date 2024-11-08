import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appRoutingProviders } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule,  // Add HttpClientModule here
    ...appRoutingProviders
  ]
}).catch(err => console.error(err));
