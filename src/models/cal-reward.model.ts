import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CalRewardPayload {
  @IsDefined({ message: 'fieldsOfStudy has to be defined' })
  @IsNotEmpty({ message: 'fieldsOfStudy cannot be empty' })
  @IsString({ message: 'fieldsOfStudy has to be a string' })
  fieldsOfStudy: string;

  @IsDefined({ message: 'domains has to be defined' })
  @IsNotEmpty({ message: 'domains cannot be empty' })
  @IsString({ message: 'domains has to be a string' })
  domains: string;

  @IsDefined({ message: 'tasksOrMethods has to be defined' })
  @IsNotEmpty({ message: 'tasksOrMethods cannot be empty' })
  @IsString({ message: 'tasksOrMethods has to be a string' })
  tasksOrMethods: string;

  @IsDefined({ message: 'cleanOrUnclean has to be defined' })
  @IsNotEmpty({ message: 'cleanOrUnclean cannot be empty' })
  @IsString({ message: 'cleanOrUnclean has to be a string' })
  cleanOrUnclean: string;

  @IsDefined({ message: 'privateKey has to be defined' })
  @IsNotEmpty({ message: 'privateKey cannot be empty' })
  @IsString({ message: 'privateKey has to be a string' })
  privateKey: string;
}
