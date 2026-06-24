import { IsOptional, IsString, MaxLength } from 'class-validator';

export class FilterVelorioDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  registro?: string;
}
