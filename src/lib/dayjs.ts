import DayJs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import objectSupport from 'dayjs/plugin/objectSupport'

import 'dayjs/locale/id'
DayJs.extend(customParseFormat)
DayJs.extend(objectSupport)
DayJs.locale('en')
DayJs.locale('id')

const dayjs = DayJs

export default dayjs
