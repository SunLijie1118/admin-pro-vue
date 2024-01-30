import Mock from 'mockjs'

import * as currentUser from './data/currentUser.json'
import * as notices from './data/notices.json'
import * as projectNotice from './data/projectNotice.json'
import * as activities from './data/activities.json'
import * as fake_chart_data from './data/fake_chart_data.json'
import * as tags from './data/tags.json'

Mock.mock('/api/currentUser', currentUser)
Mock.mock('/api/notices', notices)
Mock.mock('/api/project/notice', projectNotice)
Mock.mock('/api/activities', activities)
Mock.mock('/api/fake_chart_data', fake_chart_data)
Mock.mock('/api/tags', tags)

export default Mock
