import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UploadPayload {
  @IsDefined({ message: 'walletAddress has to be defined' })
  @IsNotEmpty({ message: 'walletAddress cannot be empty' })
  @IsString({ message: 'walletAddress has to be a string' })
  walletAddress: string;

  @IsDefined({ message: 'field_of_study has to be defined' })
  @IsNotEmpty({ message: 'field_of_study cannot be empty' })
  @IsString({ message: 'field_of_study has to be a string' })
  field_of_study: string;

  @IsDefined({ message: 'domains has to be defined' })
  @IsNotEmpty({ message: 'domains cannot be empty' })
  @IsString({ message: 'domains has to be a string' })
  domains: string;

  @IsDefined({ message: 'method has to be defined' })
  @IsNotEmpty({ message: 'method cannot be empty' })
  @IsString({ message: 'method has to be a string' })
  method: string;

  @IsDefined({ message: 'is_data_clean has to be defined' })
  @IsNotEmpty({ message: 'is_data_clean cannot be empty' })
  @IsString({ message: 'is_data_clean has to be a string' })
  is_data_clean: string;

  @IsDefined({ message: 'dataset_name has to be defined' })
  @IsNotEmpty({ message: 'dataset_name cannot be empty' })
  @IsString({ message: 'dataset_name has to be a string' })
  dataset_name: string;

  @IsDefined({ message: 'file has to be defined' })
  file: Express.Multer.File;
}
