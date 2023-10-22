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

import { H } from 'highlight.run';
H.init('6glr2klg', {
    environment: 'production',
    version: 'commit:abcdefg12345',
	networkRecording: {
		enabled: true,
		recordHeadersAndBody: true,
        urlBlocklist: [
            // insert full or partial urls that you don't want to record here
			// Out of the box, Highlight will not record these URLs (they can be safely removed):
			"https://www.googleapis.com/identitytoolkit",
			"https://securetoken.googleapis.com",
        ],
	},
});