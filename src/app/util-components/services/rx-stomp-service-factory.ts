import { myRxStompConfig } from "../rx-stomp.config";
import { WebSocketService } from "./websocket.service";

export function rxStompServiceFactory(){
    const rxStomp = new WebSocketService;
    rxStomp.configure(myRxStompConfig);
    rxStomp.activate();
    return rxStomp;
}