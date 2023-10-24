//meta
import { createHead } from 'unhead'
createHead()

// dayjs
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import { inject } from '@vercel/analytics'
inject()

import reportWebVitals from './reportWebVitals'
import { sendToVercelAnalytics } from './vitals'
reportWebVitals(sendToVercelAnalytics)
