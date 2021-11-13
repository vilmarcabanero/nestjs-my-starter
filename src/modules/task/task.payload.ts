import { IsNotEmpty } from 'class-validator';

export class TaskPayload {
  @IsNotEmpty()
  task: string;
}
