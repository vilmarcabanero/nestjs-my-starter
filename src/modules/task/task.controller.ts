import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get.user.decorator';
import { TaskService, Task, TaskPayload } from '.';

@UseGuards(AuthGuard())
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(@GetUser() user: any): Promise<Task[]> {
    return this.taskService.getTasks(user._id);
  }

  @Get('active')
  async getActiveTasks(@GetUser() user: any): Promise<Task[]> {
    return this.taskService.getActiveTasks(user._id);
  }

  @Get('complete')
  async getCompleteTasks(@GetUser() user: any): Promise<Task[]> {
    return this.taskService.getCompleteTasks(user._id);
  }

  @Get(':id')
  async getTask(@Param('id') _id: string): Promise<Task> {
    return this.taskService.getTask(_id);
  }

  @Post()
  async createTask(
    @Body() payload: TaskPayload,
    @GetUser() user: any,
  ): Promise<Task> {
    return this.taskService.createTask(user._id, payload);
  }

  @Patch('archive')
  async archiveCompleteTasks(@GetUser() user: any): Promise<any> {
    return this.taskService.archiveCompleteTasks(user._id);
  }

  @Patch('complete/:id')
  async makeCompleteTask(@Param('id') _id: string): Promise<any> {
    return this.taskService.makeCompleteTask(_id);
  }

  @Patch('incomplete/:id')
  async makeIncompleteTask(@Param('id') _id: string): Promise<any> {
    return this.taskService.makeIncompleteTask(_id);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') _id: string,
    @Body() payload: TaskPayload,
  ): Promise<any> {
    return this.taskService.updateTask(_id, payload);
  }

  @Delete(':id')
  async deleteTask(@Param('id') _id: string): Promise<any> {
    return this.taskService.deleteTask(_id);
  }
}
