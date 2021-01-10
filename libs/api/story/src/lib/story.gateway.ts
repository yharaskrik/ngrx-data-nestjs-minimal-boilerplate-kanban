import { InjectModel } from '@nestjs/mongoose';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { StoryDocument } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/api/shared/story';
import { Story } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';
import {
  SocketOp,
  SocketUpdateRequestPayload,
  SocketUpdateResponsePayload,
} from '@trellisorg/ngrx-data-websocket-core';
import {
  SocketEntityGatewayBase,
  SocketEventBody,
  SocketEventReturn,
} from '@trellisorg/ngrx-data-websocket-server';
import { Model } from 'mongoose';
import * as SocketIO from 'socket.io';
import { Socket } from 'socket.io';

@WebSocketGateway(80, { namespace: 'story' })
export class StoryGateway
  implements OnGatewayConnection, SocketEntityGatewayBase<Story> {
  @WebSocketServer() server: SocketIO.Server;

  constructor(@InjectModel('Story') private storyModel: Model<StoryDocument>) {}

  handleConnection(socket: Socket, ...args): any {
    console.log('Connected');

    socket.join('stories');
  }

  @SubscribeMessage(SocketOp.QUERY_ALL)
  async queryAll(
    @MessageBody() body: SocketEventBody<void>,
    @ConnectedSocket() client: Socket
  ): Promise<SocketEventReturn<SocketOp.QUERY_ALL_SUCCESS, Story[]>> {
    return {
      event: SocketOp.QUERY_ALL_SUCCESS,
      data: {
        correlationId: body.correlationId,
        data: await this.storyModel.find(),
      },
    };
  }

  @SubscribeMessage(SocketOp.SAVE_UPDATE_ONE)
  async updateOne(
    @MessageBody() body: SocketEventBody<SocketUpdateRequestPayload<Story>>,
    @ConnectedSocket() client: Socket
  ): Promise<
    SocketEventReturn<
      SocketOp.SAVE_UPDATE_ONE_SUCCESS,
      SocketUpdateResponsePayload<Story>
    >
  > {
    const id = body.data.id;
    const updated = await this.storyModel.findOneAndUpdate(
      { id },
      { $set: body.data.changes },
      { new: true }
    );

    client.to('stories').emit('ngrx-data-websocket/save/update-one/success', {
      data: {
        id,
        changes: updated,
        changed: false,
      },
    });

    return {
      event: SocketOp.SAVE_UPDATE_ONE_SUCCESS,
      data: {
        ...body,
        data: {
          id,
          changes: updated,
          changed: false,
        },
      },
    };
  }

  @SubscribeMessage(SocketOp.SAVE_ADD_ONE)
  async addOne(
    @MessageBody() body: SocketEventBody<Story>,
    @ConnectedSocket() client: Socket
  ): Promise<SocketEventReturn<SocketOp.SAVE_ADD_ONE_SUCCESS, Story>> {
    const story: StoryDocument = await this.storyModel.create({
      ...body.data,
      id: Date.now().toString(),
    });

    const data = {
      data: story,
    };

    client.to('stories').emit(SocketOp.SAVE_ADD_ONE_SUCCESS, data);

    return {
      event: SocketOp.SAVE_ADD_ONE_SUCCESS,
      data: {
        ...data,
        correlationId: body.correlationId,
      },
    };
  }

  @SubscribeMessage(SocketOp.QUERY_BY_KEY)
  async queryByKey(
    @MessageBody() body: SocketEventBody<string | number>,
    @ConnectedSocket() client: SocketIO.Socket
  ): Promise<SocketEventReturn<SocketOp.QUERY_BY_KEY_SUCCESS, Story>> {
    return {
      event: SocketOp.QUERY_BY_KEY_SUCCESS,
      data: {
        correlationId: body.correlationId,
        data: await this.storyModel.findOne({ id: body.data }),
      },
    };
  }

  @SubscribeMessage(SocketOp.QUERY_MANY)
  async queryMany(
    @MessageBody() body: SocketEventBody<Record<string, string>>,
    @ConnectedSocket() client: SocketIO.Socket
  ): Promise<SocketEventReturn<SocketOp.QUERY_MANY_SUCCESS, Story[]>> {
    return {
      event: SocketOp.QUERY_MANY_SUCCESS,
      data: {
        correlationId: body.correlationId,
        data: await this.storyModel.find(body.data),
      },
    };
  }

  @SubscribeMessage(SocketOp.SAVE_ADD_MANY)
  async saveAddMany(
    @MessageBody() body: SocketEventBody<Story[]>,
    @ConnectedSocket() client: SocketIO.Socket
  ): Promise<SocketEventReturn<SocketOp.SAVE_ADD_MANY_SUCCESS, Story[]>> {
    return {
      event: SocketOp.SAVE_ADD_MANY_SUCCESS,
      data: {
        correlationId: body.correlationId,
        data: await this.storyModel.create(body.data, {}),
      },
    };
  }

  @SubscribeMessage(SocketOp.SAVE_UPSERT_ONE)
  async upsertOne(
    @MessageBody() body: SocketEventBody<Story>,
    @ConnectedSocket() client: SocketIO.Socket
  ): Promise<SocketEventReturn<SocketOp.SAVE_UPSERT_ONE_SUCCESS, Story>> {
    const created = await this.storyModel.findOneAndUpdate(
      { id: body.data.id },
      { $set: body.data },
      { new: true, upsert: true }
    );
    return {
      event: SocketOp.SAVE_UPSERT_ONE_SUCCESS,
      data: {
        correlationId: body.correlationId,
        data: created,
      },
    };
  }

  @SubscribeMessage(SocketOp.SAVE_DELETE_ONE)
  async deleteOne(
    @MessageBody() body: SocketEventBody<string | number>,
    @ConnectedSocket() client: SocketIO.Socket
  ): Promise<
    SocketEventReturn<SocketOp.SAVE_DELETE_ONE_SUCCESS, string | number>
  > {
    const deleted = await this.storyModel.findOneAndDelete({ id: body.data });

    client
      .to('stories')
      .emit(SocketOp.SAVE_DELETE_ONE_SUCCESS, { data: body.data });

    return {
      event: SocketOp.SAVE_DELETE_ONE_SUCCESS,
      data: {
        correlationId: body.correlationId,
        data: body.data,
      },
    };
  }
}
