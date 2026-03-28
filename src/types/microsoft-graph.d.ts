declare module "@microsoft/microsoft-graph-client" {
  export class Client {
    static init(options: any): Client;
    static initWithMiddleware(options: any): Client;
    api(path: string): any;
  }
}
