import { OneDayDto } from '../../common/dto/OneDayDto';

export class DateRowDto {
  dateList: OneDayDto[] = [];

  toString() {
    return this.dateList.toString();
  }
}
