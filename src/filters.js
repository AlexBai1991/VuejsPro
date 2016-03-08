'use strict';

import moment from 'moment';
moment.locale('zh-cn');

export function getTimeStr(value, friendly) {
  let time = moment(value);
  if (friendly) return time.fromNow();
  return time.format('YYYY-MM-DD HH:mm');
}