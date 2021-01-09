import { Injectable } from '@nestjs/common';
import { Message } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
