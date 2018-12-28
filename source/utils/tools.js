import moment from './moment'

export function timeFormat(time=Date.now(),format='YYYY-MM-DD hh:mm:ss') {
  return moment(new Date(time)).format(format)
}
