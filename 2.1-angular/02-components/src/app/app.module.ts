import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageComponent } from './components/image/image.component';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from './components/title/title.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [AppComponent, ImageComponent, TitleComponent, ProductComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}