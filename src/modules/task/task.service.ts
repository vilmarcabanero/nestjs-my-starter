import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskPayload } from './task.payload';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private task: Model<TaskDocument>) {}

  async getTasks(userId: string): Promise<Task[]> {
    const tasks = await this.task.find({ userId });
    return tasks;
  }

  async getActiveTasks(userId: string): Promise<Task[]> {
    const filter = {
      userId,
      isActive: true,
    };

    const tasks = await this.task.find(filter);
    return tasks;
  }

  async getCompleteTasks(userId: string): Promise<Task[]> {
    const filter = {
      userId,
      complete: true,
    };

    const tasks = await this.task.find(filter);
    return tasks;
  }

  async getTask(_id: string): Promise<Task> {
    const task = await this.task.findById(_id);
    return task;
  }

  async createTask(userId: string, payload: TaskPayload): Promise<Task> {
    const task = new this.task({ ...payload, userId });
    return task.save();
  }

  async makeCompleteTask(_id: string): Promise<any> {
    const updates = {
      complete: true,
    };

    await this.task.findByIdAndUpdate(_id, updates);
    return {
      message: `Task with id of ${_id} has been updated.`,
    };
  }

  async makeIncompleteTask(_id: string): Promise<any> {
    const updates = {
      complete: false,
    };

    await this.task.findByIdAndUpdate(_id, updates);
    return {
      message: `Task with id of ${_id} has been updated.`,
    };
  }

  async updateTask(_id: string, payload: TaskPayload): Promise<any> {
    const updates = {
      task: payload.task,
    };

    await this.task.findByIdAndUpdate(_id, updates);
    return {
      message: `Task with id of ${_id} has been updated.`,
    };
  }

  async archiveCompleteTasks(userId: string): Promise<any> {
    const filter = {
      userId,
      complete: true,
    };

    const updates = {
      isActive: false,
    };

    await this.task.updateMany(filter, updates);
    return {
      message: 'Completed tasks have been successfully archived.',
    };
  }

  async deleteTask(_id: string): Promise<any> {
    return this.task.findByIdAndDelete(_id);
  }
}
