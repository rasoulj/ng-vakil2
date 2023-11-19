import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';


import { LawTablesComponent } from './law-tables/law-tables.component';
import { TextLawyerComponent } from './lawyers-view/text-lawyer/text-lawyer.component';
import { CallLawyerComponent } from './lawyers-view/call-lawyer/call-lawyer.component';
import { HomeComponent } from './home/home.component';
import { LoginButtonComponent } from './_modules/shared/components/login-button/login-button.component';
import { LoginComponent } from './login/login.component';
import { NgIf } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { PipesModule } from './_modules/pipes/pipes.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileModule } from './_modules/profile/profile.module';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LawyerRegisterComponent } from './lawyer-register/lawyer-register.component';
import { CheckOtpComponent } from './check-otp/check-otp.component';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { VerifyComponent } from './lawyer-register/verify/verify.component';
import { ConfirmComponent } from './lawyer-register/confirm/confirm.component';
import { SharedModule } from './_modules/shared/shared.module';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { SearchLawyersComponent } from './lawyers-view/search-lawyers/search-lawyers.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SearchPanelComponent } from './lawyers-view/search-panel/search-panel.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './_providers/paginator.provider';
import { LawyersPanelComponent } from './lawyers-view/lawyers-panel/lawyers-panel.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LawTablesComponent,
    TextLawyerComponent,
    CallLawyerComponent,
    HomeComponent,
    LoginButtonComponent,
    LoginComponent,
    FooterComponent,
    LawyerRegisterComponent,
    CheckOtpComponent,
    VerifyComponent,
    ConfirmComponent,
    UploadAvatarComponent,
    SearchLawyersComponent,
    SearchPanelComponent,
    LawyersPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatPaginatorModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatExpansionModule,
    MatSidenavModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressBarModule,

    PipesModule,
    ProfileModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
