import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { BenefitsApi } from "./data/benefits";
import { UsersApi } from "./data/users";
import { ChatsApi } from "./data/chats";

import { BenefitService } from "./service/benefit.service";
import { UserService } from "./service/user.service";
import { ChatService } from "./service/chat.service";

import { throwIfAlreadyLoaded } from "./import-guard";

const DATA_SERVICES = [
  { provide: BenefitsApi, useClass: BenefitService },
  { provide: UsersApi, useClass: UserService },
  { provide: ChatsApi, useClass: ChatService }
];

export const CORE_PROVIDERS = [...DATA_SERVICES];

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...CORE_PROVIDERS]
    };
  }
}
