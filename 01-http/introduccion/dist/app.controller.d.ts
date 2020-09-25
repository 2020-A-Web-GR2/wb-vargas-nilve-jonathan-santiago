import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    login(res: any): any;
    loginPost(parametrosConsulta: any, response: any, session: any): any;
    protegido(response: any, session: any): any;
    logout(session: any, res: any, req: any): any;
}
