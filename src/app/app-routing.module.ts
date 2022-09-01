import {Routes} from "@angular/router";
import {ChatComponent} from "./components/chat/chat.component";

export const AppRoutes: Routes = [
  {
    path: "chat/:id", component: ChatComponent
  }
]
