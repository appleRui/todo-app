import dayjs from 'dayjs'

class Day{

  constructor() {
    this.day = dayjs()
  }

  yyyymmdd() {
    return this.day.format('YYYY-MM-DD')
  }

}

export default new Day