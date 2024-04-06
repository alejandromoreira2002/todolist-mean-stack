import { Activity } from "./activity";

export interface Responses {
    "code": Number;
    "msg": String | Activity | Activity[];
}
