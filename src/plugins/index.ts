//meta
import { createHead } from 'unhead'
createHead()

// 滚动条
import 'simplebar'
import 'simplebar/dist/simplebar.min.css'

// dayjs
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')


import { inject } from '@vercel/analytics';
inject();