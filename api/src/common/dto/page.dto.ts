import { ApiProperty } from '@nestjs/swagger';

export default class Page<T> {
  @ApiProperty({ type: [Object], description: 'The data of the page' })
  data: T[];
  @ApiProperty({ type: 'integer', description: 'The current page' })
  current: number;
  @ApiProperty({ type: 'integer', description: 'The total of items' })
  total: number;
  @ApiProperty({ type: 'integer', description: 'The size of the page' })
  size: number;
}
