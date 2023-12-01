import request from "@/utils/require";

const messageApi = {
  CurrentUser: '/api/currentUser',
  Notices: '/api/notices',
  ProjectNotice: '/api/project/notice',
  Activities: '/api/activities',
  FakeChartData: '/api/fake_chart_data'
};

export const getCurrentUser = () => {
  return request({
    url: messageApi.CurrentUser,
    method: 'get'
  });
}

export const getNotices = () => {
  return request({
    url: messageApi.Notices,
    method: 'get'
  });
}

export const getProjectNotice = () => {
  return request({
    url: messageApi.ProjectNotice,
    method: 'get'
  });
}

export const getActivities = () => {
  return request({
    url: messageApi.Activities,
    method: 'get'
  });
}

export const FakeChartData = () => {
  return request({
    url: messageApi.FakeChartData,
    method: 'get'
  });
}
