# NgRx Data Sample Repo with REST/WS Implementations

This is an example repo with a simple Kanban board created using NgRx Data, Nestjs, Mongoose and Websockets

There are two different pages that can be visited:

1. REST Implementation using default NgRx Data Service `localhost:4200/rest`.
2. Websocket Implementation using Socket.io and custom data service from the `@trellisorg/ngrx-data-websocket-client` package `localhost:4200/ws

The REST implementation is not doing anything special as it is implementing the `Story` entity as the docs describe to.

The websocket implementation overrides the data service for the entity and passes all calls through the websocket connection to the 
Nestjs server. This implementation uses 3 different packages to accomplish this:

1. `@trellisorg/ngrx-data-websocket-server` - A Nestjs gateway interface that can be implemented to ensure type safety when returning the 
data as a new event so that the `Store` can parse the response and update the `Store` similar to how the default data service does.
   
2. `@trellisorg/ngrx-data-websocket-client` - An Angular package that provides a data service wrapper around the Socket.io library so that all
actions can be submitted to the server through websockets instead of REST calls
   
3. `@trellisorg/ngrx-data-websocket-core` - A library that holds shared types and other information both `server` and `client` need.

## Quick Start & Documentation

Install dependencies `yarn`

Start server `yarn ng s api`

Start app `yarn ng s kanban`

Open `localhost:4200/ws` in 2 tabs or browser windows and start adding and moving stories to see it in action.
