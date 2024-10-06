import { FooterComponent } from "@/app/ui/modules/shared/footer/footer.component";
import { HeaderComponent } from "@/app/ui/modules/shared/header/header.component";
import { HomeBodyComponent } from "@/app/ui/modules/shared/home-body/home-body.component";
import { LayoutComponent } from "@/app/ui/modules/shared/layout/layout.component";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ThousandSeparatorPipe } from "../helper/currency.pipe";


export const SharedComponentsImports = [
  CommonModule,
  RouterOutlet,
  HeaderComponent,
  FooterComponent,
  HomeBodyComponent,
  LayoutComponent,
  ThousandSeparatorPipe
]
