import dayjs from 'dayjs'

class Day{

  constructor() {
    this.day = dayjs()
  }

  yyyymmdd() {
    return this.day.format('YYYY-MM-DD')
  }

  yyyymm() {
    return this.day.format('YYYY-MM')
  }

  date(timestamp) {
    return this.day(timestamp).date()
  }

}

export default new Day