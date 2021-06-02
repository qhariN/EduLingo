import { Progress } from "./progress";

export interface Session{
    id : string;
    name : string;
    status : number;
    number : number;
    url : string;
    url_content : string;
    progress: Progress[];
    class?: string;
};
