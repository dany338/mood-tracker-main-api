import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'How many rows do you need',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'How many rows do you want to skip',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @ApiProperty({
    required: false,
    type: String,
    enum: ['ASC', 'DESC'],
    description: 'Order orientation (ASC or DESC)',
    default: 'ASC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @Type(() => String)
  order?: 'ASC' | 'DESC' = 'ASC';

  @ApiProperty({
    required: false,
    type: String,
    description: 'Order field',
    default: 0,
  })
  @IsOptional()
  @Type(() => String)
  orderField?: string | null;

  @ApiProperty({
    required: false,
    type: Number,
    description: 'id record',
    default: 0,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  id?: number | null;
}
