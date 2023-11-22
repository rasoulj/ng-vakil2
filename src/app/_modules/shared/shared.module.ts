import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './components/logout/logout.component';
import { PipesModule } from '../pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { ToolBarButtonComponent } from './components/tool-bar-button/tool-bar-button.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from './components/avatar/avatar.component';
import { MatCardModule } from '@angular/material/card';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { LawyerOnlineViewComponent } from './components/lawyer-online-view/lawyer-online-view.component';
import { LawyerViewComponent } from './components/lawyer-view/lawyer-view.component';
import { MatMenuModule } from '@angular/material/menu';
import { UsersPanelComponent } from './components/users-panel/users-panel.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './providers/paginator.provider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FavoriteLawyersComponent } from './components/favorite-lawyers/favorite-lawyers.component';
import { MyQuestionsComponent } from './components/my-questions/my-questions.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { QuestionRowComponent } from './components/my-questions/question-row/question-row.component';
import { MatRippleModule } from '@angular/material/core';
import { ViewQuestionComponent } from './components/my-questions/view-question/view-question.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewAnswerComponent } from './components/my-questions/view-question/view-answer/view-answer.component';


@NgModule({
  declarations: [
    LogoutComponent,
    ToolBarComponent,
    ToolBarButtonComponent,
    AvatarComponent,
    ErrorMessageComponent,
    NoDataComponent,
    LawyerOnlineViewComponent,
    LawyerViewComponent,
    UsersPanelComponent,
    FavoriteLawyersComponent,
    MyQuestionsComponent,
    ListItemComponent,
    QuestionRowComponent,
    ViewQuestionComponent,
    ViewAnswerComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    MatProgressBarModule,
    MatRippleModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    LogoutComponent,
    ToolBarComponent,
    ToolBarButtonComponent,
    AvatarComponent,
    ErrorMessageComponent,
    NoDataComponent,
    LawyerOnlineViewComponent,
    LawyerViewComponent,
    UsersPanelComponent,
    FavoriteLawyersComponent,
    ViewQuestionComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }
  ]
})
export class SharedModule { }
