declare module 'gapi' {
    namespace gapi {
      namespace client {
        namespace calendar {
          interface Event {
            id: string;
            summary: string;
            start: {
              dateTime: string;
            };
            end: {
              dateTime: string;
            };
          }
  
          interface EventsListResponse {
            items: Event[];
          }
  
          function load(api: string, version: string): Promise<void>;
  
          namespace events {
            function list(request: {
              calendarId: string;
              timeMin: string;
              maxResults: number;
              singleEvents: boolean;
              orderBy: string;
            }): Promise<EventsListResponse>;
          }
        }
      }
    }
  }
  
  