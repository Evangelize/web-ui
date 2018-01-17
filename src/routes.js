import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import AddFamilyMember from './views/members/AddFamilyMember';
import AddGroupMember from './views/members/AddGroupMember';
import AddMember from './views/members/AddMember';
import AttendanceTypes from './views/worship/AttendanceTypes';
import AcademicYearDivisions from './views/classes/AcademicYearDivisions';
import AcademicYearTimeline from './views/classes/AcademicYearTimeline';
import AddClassDayTeacher from './views/classes/AddClassDayTeacher';
import AddClassStudents from './views/classes/AddClassStudents';
import AssignJobs from './views/worship/AssignJobs';
import Attendance from './views/classes/Attendance';
import Classes from './views/classes/Classes';
import Class from './views/classes/Class';
import ClassGroupings from './views/classes/ClassGroupings';
import ClassGroupingAcademicYears from './views/classes/ClassGroupingAcademicYears';
import Dashboard from './views/Dashboard';
import DivisionClasses from './views/classes/DivisionClasses';
import DivisionClassesSelect from './views/classes/DivisionClassesSelect';
import EditDayAttendance from './views/classes/EditDayAttendance';
import EditWorshipAttendance from './views/worship/EditWorshipAttendance';
import Families from './views/members/Families';
import Family from './views/members/Family';
import Groups from './views/members/Groups';
import ImportMembers from './views/members/ImportMembers';
import Jobs from './views/worship/Jobs';
import JobMembers from './views/worship/JobMembers';
import Login from './views/Login';
import Member from './views/members/Member';
import MeetingDaysSelect from './views/classes/MeetingDaysSelect';
import Members from './views/members/Members';
import Schedules from './views/classes/Schedules';
import WorshipServices from './views/worship/WorshipServices';
import WorshipAttendance from './views/worship/WorshipAttendance';
import WorshipJobsSelect from './views/worship/WorshipJobsSelect';

export default (auth) => {
  const requireAuth = (nextState, replace, callback) => {
    if (!auth.authenticated) {
      replace('/login');
    }
    callback();
  };
  const redirect = (nextState, replace, callback) => {
    if (auth.authenticated) {
      replace('/dashboard');
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} onEnter={requireAuth} />
      <Route
        path="login"
        exact
        component={Login}
        onEnter={redirect}
      />
      <Route
        exact
        path="dashboard"
        component={Dashboard}
        onEnter={requireAuth}
      />
      <Route
        exact
        path="classes"
        component={Classes}
        onEnter={requireAuth}
      />
      <Route
        exact
        path="classes/:classId"
        component={Class}
        onEnter={requireAuth}
      />
      <Route
        exact
        path="classes/:classId/:yearId/students"
        component={AddClassStudents}
        onEnter={requireAuth}
      />
      <Route
        exact
        path="members/search"
        component={Members}
        onEnter={requireAuth}
      />
      <Route
        exact
        path="members/import"
        component={ImportMembers}
        onEnter={requireAuth}
      />
      <Route
        exact
        path="members/person/:id"
        component={Member}
        onEnter={requireAuth}
      />
      <Route
        path="members/add/person"
        component={AddMember}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="members/add/family"
        component={Family}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="members/families"
        component={Families}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="members/family/:id"
        component={Family}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="members/family/:id/add"
        component={AddFamilyMember}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="members/groups"
        component={Groups}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="members/group/:id/add"
        component={AddGroupMember}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="schedules"
        component={Schedules}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="schedules/timeline"
        component={AcademicYearTimeline}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="attendance"
        component={Attendance}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="attendance/:divisionConfig/:date"
        component={EditDayAttendance}
        exact
      />
      <Route
        path="schedule/:divisionConfigId/:yearId/:classId/:day"
        component={AddClassDayTeacher}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="schedule/manage"
        component={ClassGroupings}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="schedule/:classGroupingId"
        component={ClassGroupingAcademicYears}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="schedule/academicYear/:yearId"
        component={AcademicYearDivisions}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="schedule/academicYear/:yearId/meetingDays"
        component={MeetingDaysSelect}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="schedule/academicYearDivision/:divisionId"
        component={DivisionClasses}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="schedule/academicYearDivision/:divisionId/select"
        component={DivisionClassesSelect}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="worship/services/list"
        component={WorshipServices}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="worship/services/:id/jobs"
        component={WorshipJobsSelect}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="worship/jobs/list"
        component={Jobs}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="worship/jobs/:id/members"
        component={JobMembers}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="worship/assign"
        component={AssignJobs}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="worship/attendance"
        exact
        component={WorshipAttendance}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="worship/attendance/:date/:id"
        exact
        component={EditWorshipAttendance}
        onEnter={requireAuth}
        exact
      />
      <Route
        path="worship/attendanceTypes/manage"
        exact
        component={AttendanceTypes}
        onEnter={requireAuth}
        exact
      />
      
    </Route>
  );
};
