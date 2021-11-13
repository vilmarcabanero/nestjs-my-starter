import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskController, TaskSchema, TaskService } from '.';
import { AuthModule } from '../auth';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    AuthModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
