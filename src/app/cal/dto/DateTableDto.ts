import { OneDayDto } from '../../common/dto/OneDayDto';
import { DateRowDto } from './DateRowDto';

export class DateTableDto {
  oneDayDto: OneDayDto;
  dateRows: DateRowDto[] = [];

  constructor(oneDayDto: OneDayDto) {
    this.oneDayDto = oneDayDto;
  }
}
