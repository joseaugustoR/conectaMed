declare module 'gapi' {
    export const client: {
      calendar: {
        events: {
          list: (params: any) => Promise<any>;
        };
      };
    };
  }
  