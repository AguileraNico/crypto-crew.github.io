import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule {}
