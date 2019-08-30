import "reflect-metadata";
import "../polyfills";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { AppRoutingModule } from "./app-routing.module";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { HomeModule } from "./home/home.module";

import { AppComponent } from "./app.component";
import { ModulesModule } from "./modules/modules.module";

import { MatNativeDateModule } from "@angular/material/core";
import { MaterialModule } from "./material.module";
import { TableHttpExampleModule } from "./table-http-example/table-http-example.module";

import { DatabaseService } from "./services/database.service";
import { initDatabase } from "./services/database.service";
import {
  APP_BASE_HREF,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { PipesModule } from "./pipes/pipes.module";
import { ComponentsModule } from "./components/components.module";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    TableHttpExampleModule,
    ModulesModule,
    ComponentsModule,
    AppRoutingModule,
    MatNativeDateModule,
    MaterialModule,
    PipesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initDatabase,
      multi: true,
      deps: []
    },
    DatabaseService,
    { provide: APP_BASE_HREF, useValue: "/" },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
