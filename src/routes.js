import React from 'react';
import requireAuthentication from './components/requireAuthentication';
import Loadable from 'react-loadable';
import LoadingPage from './components/LoadingPage';
const AsyncApp = Loadable({
  loader: () => import('./containers/App' /* webpackChunkName: 'App' */),
  loading: LoadingPage,
});
const AsyncAddFamilyMember = Loadable({
  loader: () => import('./views/people/AddFamilyMember' /* webpackChunkName: 'AddFamilyMember' */),
  loading: LoadingPage,
});
const AddGroupMember = Loadable({
  loader: () => import('./views/people/AddGroupMember' /* webpackChunkName: 'AddGroupMember' */),
  loading: LoadingPage,
});
const AddMember = Loadable({
  loader: () => import('./views/people/AddMember' /* webpackChunkName: 'AddMember' */),
  loading: LoadingPage,
});
const AttendanceTypes = Loadable({
  loader: () => import('./views/worship/AttendanceTypes' /* webpackChunkName: 'AttendanceTypes' */),
  loading: LoadingPage,
});
const AcademicYearDivisions = Loadable({
  loader: () => import('./views/classes/AcademicYearDivisions' /* webpackChunkName: 'AcademicYearDivisions' */),
  loading: LoadingPage,
});
const AcademicYearTimeline = Loadable({
  loader: () => import('./views/classes/AcademicYearTimeline' /* webpackChunkName: 'AcademicYearTimeline' */),
  loading: LoadingPage,
});
const AddClassDayTeacher = Loadable({
  loader: () => import('./views/classes/AddClassDayTeacher' /* webpackChunkName: 'AddClassDayTeacher' */),
  loading: LoadingPage,
});
const AddClassStudents = Loadable({
  loader: () => import('./views/classes/AddClassStudents' /* webpackChunkName: 'AddClassStudents' */),
  loading: LoadingPage,
});
const AssignJobs = Loadable({
  loader: () => import('./views/worship/AssignJobs' /* webpackChunkName: 'AssignJobs' */),
  loading: LoadingPage,
});
const Attendance = Loadable({
  loader: () => import('./views/classes/Attendance' /* webpackChunkName: 'Attendance' */),
  loading: LoadingPage,
});
const Classes = Loadable({
  loader: () => import('./views/classes/Classes' /* webpackChunkName: 'Classes' */),
  loading: LoadingPage,
});
const Class = Loadable({
  loader: () => import('./views/classes/Class' /* webpackChunkName: 'Class' */),
  loading: LoadingPage,
});
const ClassGroupings = Loadable({
  loader: () => import('./views/classes/ClassGroupings' /* webpackChunkName: 'ClassGroupings' */),
  loading: LoadingPage,
});
const ClassGroupingAcademicYears = Loadable({
  loader: () => import('./views/classes/ClassGroupingAcademicYears' /* webpackChunkName: 'ClassGroupingAcademicYears' */),
  loading: LoadingPage,
});
const AsyncDashboard = Loadable({
  loader: () => import('./views/Dashboard' /* webpackChunkName: 'Dashboard' */),
  loading: LoadingPage,
});
const DivisionClasses = Loadable({
  loader: () => import('./views/classes/DivisionClasses' /* webpackChunkName: 'DivisionClasses' */),
  loading: LoadingPage,
});
const DivisionClassesSelect = Loadable({
  loader: () => import('./views/classes/DivisionClassesSelect' /* webpackChunkName: 'DivisionClassesSelect' */),
  loading: LoadingPage,
});
const EditDayAttendance = Loadable({
  loader: () => import('./views/classes/EditDayAttendance' /* webpackChunkName: 'EditDayAttendance' */),
  loading: LoadingPage,
});
const EditWorshipAttendance = Loadable({
  loader: () => import('./views/worship/EditWorshipAttendance' /* webpackChunkName: 'EditWorshipAttendance' */),
  loading: LoadingPage,
});
const Families = Loadable({
  loader: () => import('./views/people/Families' /* webpackChunkName: 'Families' */),
  loading: LoadingPage,
});
const Family = Loadable({
  loader: () => import('./views/people/Family' /* webpackChunkName: 'Family' */),
  loading: LoadingPage,
});
const Groups = Loadable({
  loader: () => import('./views/people/Groups' /* webpackChunkName: 'Groups' */),
  loading: LoadingPage,
});
const ImportMembers = Loadable({
  loader: () => import('./views/people/ImportMembers' /* webpackChunkName: 'ImportMembers' */),
  loading: LoadingPage,
});
const Jobs = Loadable({
  loader: () => import('./views/worship/Jobs' /* webpackChunkName: 'Jobs' */),
  loading: LoadingPage,
});
const JobMembers = Loadable({
  loader: () => import('./views/worship/JobMembers' /* webpackChunkName: 'JobMembers' */),
  loading: LoadingPage,
});
const Login = Loadable({
  loader: () => import('./views/Login' /* webpackChunkName: 'Login' */),
  loading: LoadingPage,
});
const PeopleOverview = Loadable({
  loader: () => import('./views/people/PeopleOverview' /* webpackChunkName: 'PeopleOverview' */),
  loading: LoadingPage,
});
const Member = Loadable({
  loader: () => import('./views/people/Member' /* webpackChunkName: 'Member' */),
  loading: LoadingPage,
});
const MeetingDaysSelect = Loadable({
  loader: () => import('./views/classes/MeetingDaysSelect' /* webpackChunkName: 'MeetingDaysSelect' */),
  loading: LoadingPage,
});
const Members = Loadable({
  loader: () => import('./views/people/Members' /* webpackChunkName: 'Members' */),
  loading: LoadingPage,
});
const Schedules = Loadable({
  loader: () => import('./views/classes/Schedules' /* webpackChunkName: 'Schedules' */),
  loading: LoadingPage,
});
const SettingsMain = Loadable({
  loader: () => import('./views/settings/Main' /* webpackChunkName: 'SettingsMain' */),
  loading: LoadingPage,
});
const WorshipOverview = Loadable({
  loader: () => import('./views/worship/WorshipOverview' /* webpackChunkName: 'WorshipOverview' */),
  loading: LoadingPage,
});
const WorshipServices = Loadable({
  loader: () => import('./views/worship/WorshipServices' /* webpackChunkName: 'WorshipServices' */),
  loading: LoadingPage,
});
const WorshipAttendance = Loadable({
  loader: () => import('./views/worship/WorshipAttendance' /* webpackChunkName: 'WorshipAttendance' */),
  loading: LoadingPage,
});
const WorshipJobsSelect = Loadable({
  loader: () => import('./views/worship/WorshipJobsSelect' /* webpackChunkName: 'WorshipJobsSelect' */),
  loading: LoadingPage,
});

export default () => [
  {
    component: AsyncApp,
    routes: [
      {
        path: '/',
        exact: true,
        component: requireAuthentication(AsyncDashboard),
      },
      {
        path: '/dashboard',
        exact: true,
        component: requireAuthentication(AsyncDashboard),
      },
      {
        path: '/login',
        exact: true,
        component: Login,
      },
      {
        path: '/classes',
        exact: true,
        component: requireAuthentication(Classes),
      },
      {
        path: '/classes/class/:classId',
        exact: true,
        component: requireAuthentication(Class),
      },
      {
        path: '/classes/class/:classId/:yearId/students',
        exact: true,
        component: requireAuthentication(AddClassStudents),
      },
      {
        path: '/classes/schedules',
        exact: true,
        component: requireAuthentication(Schedules),
      },
      {
        path: '/classes/schedules/timeline',
        exact: true,
        component: requireAuthentication(AcademicYearTimeline),
      },
      {
        path: '/classes/schedule/manage',
        exact: true,
        component: requireAuthentication(ClassGroupings),
      },
      {
        path: '/classes/schedule/manage/:divisionConfigId/:yearId/:classId/:day',
        exact: true,
        component: requireAuthentication(AddClassDayTeacher),
      },
      {
        path: '/classes/schedule/manage/:classGroupingId',
        exact: true,
        component: requireAuthentication(ClassGroupingAcademicYears),
      },
      {
        path: '/classes/schedule/manage/academicYear/:yearId',
        exact: true,
        component: requireAuthentication(AcademicYearDivisions),
      },
      {
        path: '/classes/schedule/manage/academicYear/:yearId/meetingDays',
        exact: true,
        component: requireAuthentication(MeetingDaysSelect),
      },
      {
        path: '/classes/schedule/manage/academicYearDivision/:divisionId',
        exact: true,
        component: requireAuthentication(DivisionClasses),
      },
      {
        path: '/classes/schedule/manage/academicYearDivision/:divisionId/select',
        exact: true,
        component: requireAuthentication(DivisionClassesSelect),
      },
      {
        path: '/classes/attendance',
        exact: true,
        component: requireAuthentication(Attendance),
      },
      {
        path: '/classes/attendance/:divisionConfig/:date',
        exact: true,
        component: requireAuthentication(EditDayAttendance),
      },
      {
        path: '/people',
        exact: true,
        component: requireAuthentication(PeopleOverview),
      },
      {
        path: '/people/members',
        exact: true,
        component: requireAuthentication(Members),
      },
      {
        path: '/people/import',
        exact: true,
        component: requireAuthentication(ImportMembers),
      },
      {
        path: '/people/members/person/:id',
        exact: true,
        component: requireAuthentication(Member),
      },
      {
        path: '/people/members/person/:id',
        exact: true,
        component: requireAuthentication(AddMember),
      },
      {
        path: '/people/families',
        exact: true,
        component: requireAuthentication(Families),
      },
      {
        path: '/people/families/add',
        exact: true,
        component: requireAuthentication(Family),
      },
      {
        path: '/people/families/family/:id',
        exact: true,
        component: requireAuthentication(Family),
      },
      {
        path: '/people/families/family/:id/add',
        exact: true,
        component: requireAuthentication(AsyncAddFamilyMember),
      },
      {
        path: '/people/groups',
        exact: true,
        component: requireAuthentication(Groups),
      },
      {
        path: '/people/groups/group/:id/add',
        exact: true,
        component: requireAuthentication(AddGroupMember),
      },
      {
        path: '/worship',
        exact: true,
        component: requireAuthentication(WorshipOverview),
      },
      {
        path: '/worship/services',
        exact: true,
        component: requireAuthentication(WorshipServices),
      },
      {
        path: '/worship/services/service/:id/jobs',
        exact: true,
        component: requireAuthentication(WorshipJobsSelect),
      },
      {
        path: '/worship/services/assign/jobs',
        exact: true,
        component: requireAuthentication(AssignJobs),
      },
      {
        path: '/worship/jobs',
        exact: true,
        component: requireAuthentication(Jobs),
      },
      {
        path: '/worship/jobs/:id/members',
        exact: true,
        component: requireAuthentication(JobMembers),
      },
      {
        path: '/worship/attendance',
        exact: true,
        component: requireAuthentication(WorshipAttendance),
      },
      {
        path: '/worship/attendance/:date/:id',
        exact: true,
        component: requireAuthentication(EditWorshipAttendance),
      },
      {
        path: '/worship/attendance/types',
        exact: true,
        component: requireAuthentication(AttendanceTypes),
      },
      {
        path: '/settings',
        exact: true,
        component: requireAuthentication(SettingsMain),
      },
    ],
  },
];
