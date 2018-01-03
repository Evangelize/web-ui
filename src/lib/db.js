import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import flow from 'lodash.flow';
import concat from 'lodash.concat';
import moment from 'moment';
import * as tables from './tables';

export class Database {
  @persist('map', tables.AttendanceType) @observable attendanceTypes = observable.map()
  @persist('map', tables.ClassMeetingDay) @observable classMeetingDays = observable.map()
  @persist('map', tables.Classes) @observable classes = observable.map()
  @persist('map', tables.DivisionClassAttendance) @observable divisionClassAttendance = observable.map()
  @persist('map', tables.DivisionClassTeacher) @observable divisionClassTeachers = observable.map()
  @persist('map', tables.DivisionClasse) @observable divisionClasses = observable.map()
  @persist('map', tables.DivisionConfig) @observable divisionConfigs = observable.map()
  @persist('map', tables.DivisionYear) @observable divisionYears = observable.map()
  @persist('map', tables.Division) @observable divisions = observable.map()
  @persist('map', tables.Family) @observable families = observable.map()
  @persist('map', tables.FamilyCheckingAccount) @observable familyCheckingAccounts = observable.map()
  @persist('map', tables.FamilyPayment) @observable familyPayments = observable.map()
  @persist('map', tables.Job) @observable jobs = observable.map()
  @persist('map', tables.MemberAttendance) @observable memberAttendance = observable.map()
  @persist('map', tables.MemberJobAssignment) @observable memberJobAssignments = observable.map()
  @persist('map', tables.MemberJobPreference) @observable memberJobPreferences = observable.map()
  @persist('map', tables.Note) @observable notes = observable.map()
  @persist('map', tables.People) @observable people = observable.map()
  @persist('map', tables.Presentation) @observable presentations= observable.map()
  @persist('map', tables.Student) @observable students = observable.map()
  @persist('map', tables.Teacher) @observable teachers = observable.map()
  @persist('map', tables.ThirdPartyLogin) @observable thirdPartyLogins = observable.map()
  @persist('map', tables.User) @observable users = observable.map()
  @persist('map', tables.WorshipServiceJob) @observable worshipServiceJobs= observable.map()
  @persist('map', tables.WorshipService) @observable worshipServices = observable.map()
  @persist('map', tables.YearClassStudent) @observable yearClassStudents = observable.map()
  @persist('map', tables.YearMeetingDay) @observable yearMeetingDays= observable.map()
  @persist @observable lastUpdate
  @persist @observable lastFullUpdate

  initialize(data) {
    const self = this;
    this.setLastUpdate();
    Object.keys(data).forEach((table) => {
      const newData = data[table];
      const id = (table === 'users') ? 'peopleId' : 'id';
      if (newData.length) {
        console.log(table, id);
        const existing = self[table];
        const values = new Map(newData.map((i) => [i[id], i]));
        existing.merge(values);
      }
    });
    return this;
  }

  filter(table, funcs) {
    return flow(...concat([], funcs))(this[table].values());
  }

  update(table, record) {
    const id = (table === 'users') ? 'peopleId' : 'id';
    const existing = this[table];
    this.setLastUpdate();
    existing.set(record[id], record);
    return record;
  }

  setLastUpdate() {
    const now = moment().unix();
    if (!this.lastUpdate) {
      this.lastFullUpdate = now;
    }
    this.lastUpdate = now;
    console.log('db updated', this.lastUpdate);
  }
}
