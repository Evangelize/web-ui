import { observable } from 'mobx';
import { create, persist } from 'mobx-persist';

export class AttendanceType {
  @persist @observable id
  @persist @observable entityId
  @persist @observable title
  @persist @observable absent
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Batch {
  @persist @observable id
  @persist @observable entityId
  @persist @observable title
  @persist @observable open
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class ClassCoordinators {
  @persist @observable id
  @persist @observable entityId
  @persist @observable personId
  @persist @observable classId
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Classes {
  @persist @observable id
  @persist @observable entityId
  @persist @observable title
  @persist @observable description
  @persist @observable order
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class ClassFile {
  @persist @observable id
  @persist @observable entityId
  @persist @observable classId
  @persist @observable type
  @persist @observable title
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class ClassMeetingDay {
  @persist @observable id
  @persist @observable entityId
  @persist @observable divisionConfigId
  @persist @observable day
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class ClassStudent {
  @persist @observable id
  @persist @observable entityId
  @persist @observable type
  @persist @observable typeId
  @persist @observable classId
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Cohort {
  @persist @observable id
  @persist @observable entityId
  @persist @observable name
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class DivisionClassAttendance {
  @persist @observable id
  @persist @observable entityId
  @persist @observable divisionClassId
  @persist @observable dayId
  @persist @observable day
  @persist @observable attendanceDate
  @persist @observable count
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class DivisionClass {
  @persist @observable id
  @persist @observable entityId
  @persist @observable divisionId
  @persist @observable classId
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class DivisionClassTeacher {
  @persist @observable id
  @persist @observable entityId
  @persist @observable divisionClassId
  @persist @observable peopleId
  @persist @observable dayId
  @persist @observable day
  @persist @observable confirmed
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class DivisionConfig {
  @persist @observable id
  @persist @observable entityId
  @persist @observable title
  @persist @observable divisionName
  @persist @observable academicYearTitle
  @persist @observable divisonStart
  @persist @observable divisionLength
  @persist @observable divisionDayStartOrdinal
  @persist @observable divisionDayStartText
  @persist @observable divisionDayEndOrdinal
  @persist @observable divisionDayEndText
  @persist @observable order
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Division {
  @persist @observable id
  @persist @observable entityId
  @persist @observable divisionConfigId
  @persist @observable divisionYear
  @persist @observable position
  @persist @observable title
  @persist @observable start
  @persist @observable end
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class DivisionYear {
  @persist @observable id
  @persist @observable entityId
  @persist @observable divisionConfigId
  @persist @observable startDate
  @persist @observable endDate
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Entity {
  @persist @observable id
  @persist @observable title
  @persist @observable domain
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Family {
  @persist @observable id
  @persist @observable entityId
  @persist @observable name
  @persist @observable familyName
  @persist @observable address1
  @persist @observable address2
  @persist @observable city
  @persist @observable state
  @persist @observable zipCode
  @persist @observable photoUrl
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class FamilyCheckingAccount {
  @persist @observable id
  @persist @observable entityId
  @persist @observable familyId
  @persist @observable account
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class FamilyPayment {
  @persist @observable id
  @persist @observable entityId
  @persist @observable familyId
  @persist @observable accountId
  @persist @observable batchId
  @persist @observable number
  @persist @observable amount
  @persist @observable effectiveDate
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class File {
  @persist @observable id
  @persist @observable entityId
  @persist @observable peopleId
  @persist @observable title
  @persist @observable description
  @persist @observable url
  @persist @observable shared
  @persist @observable globally
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Group {
  @persist @observable id
  @persist @observable entityId
  @persist @observable title
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Job {
  @persist @observable id
  @persist @observable entityId
  @persist @observable title
  @persist @observable active
  @persist @observable priority
  @persist @observable numPeople
  @persist @observable confirm
  @persist @observable ignore
  @persist @observable duration
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class MemberAttendance {
  @persist @observable id
  @persist @observable entityId
  @persist @observable worshipServiceId
  @persist @observable personId
  @persist @observable attendanceDate
  @persist @observable day
  @persist @observable attendanceTypeId
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class MemberAvailibility {
  @persist @observable id
  @persist @observable entityId
  @persist @observable personId
  @persist @observable start
  @persist @observable end
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class MemberDevice {
  @persist @observable id
  @persist @observable entityId
  @persist @observable personId
  @persist @observable deviceId
  @persist @observable title
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class MemberGroup {
  @persist @observable id
  @persist @observable entityId
  @persist @observable groupId
  @persist @observable personId
  @persist @observable rights
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class MemberJobAssignment {
  @persist @observable id
  @persist @observable entityId
  @persist @observable worshipServiceId
  @persist @observable personId
  @persist @observable assignmentDate
  @persist @observable day
  @persist @observable jobId
  @persist @observable confirmed
  @persist @observable checkedIn
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class MemberJobPreference {
  @persist @observable id
  @persist @observable entityId
  @persist @observable personId
  @persist @observable jobId
  @persist @observable confirmed
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Note {
  @persist @observable id
  @persist @observable type
  @persist @observable entityId
  @persist @observable typeId
  @persist @observable text
  @persist @observable title
  @persist @observable reminderDate
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class OverallAttendance {
  @persist @observable id
  @persist @observable entityId
  @persist @observable worshipServiceId
  @persist @observable attendanceDate
  @persist @observable day
  @persist @observable count
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class People {
  @persist @observable id
  @persist @observable entityId
  @persist @observable familyId
  @persist @observable cohortId
  @persist @observable lastName
  @persist @observable firstName
  @persist @observable familyPosition
  @persist @observable gender
  @persist @observable homePhoneNumber
  @persist @observable workPhoneNumber
  @persist @observable cellPhoneNumber
  @persist @observable emailAddress
  @persist @observable birthday
  @persist @observable nonChristian
  @persist @observable nonMember
  @persist @observable membershipStatus
  @persist @observable deceased
  @persist @observable collegeStudent
  @persist @observable photoUrl
  @persist @observable employer
  @persist @observable occupation
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Presentation {
  @persist @observable id
  @persist @observable entityId
  @persist @observable peopleId
  @persist @observable title
  @persist @observable presentation
  @persist @observable shared
  @persist @observable globally
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Setting {
  @persist @observable id
  @persist @observable entityId
  @persist @observable value
  @persist @observable key
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Student {
  @persist @observable id
  @persist @observable entityId
  @persist @observable peopleId
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class Teacher {
  @persist @observable id
  @persist @observable entityId
  @persist @observable peopleId
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class TeacherSubstitution {
  @persist @observable id
  @persist @observable entityId
  @persist @observable personId
  @persist @observable divisionClassId
  @persist @observable day
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class ThirdPartyLogin {
  @persist @observable id
  @persist @observable entityId
  @persist @observable peopleId
  @persist @observable type
  @persist @observable externalId
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class User {
  @persist @observable peopleid
  @persist @observable entityId
  @persist @observable password
  @persist @observable active
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class WorshipServiceJob {
  @persist @observable id
  @persist @observable entityId
  @persist @observable worshipServiceId
  @persist @observable day
  @persist @observable jobId
  @persist @observable title
  @persist @observable active
  @persist @observable priority
  @persist @observable numPeople
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class WorshipService {
  @persist @observable id
  @persist @observable entityId
  @persist @observable day
  @persist @observable startTime
  @persist @observable title
  @persist @observable endTime
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class YearClassStudent {
  @persist @observable id
  @persist @observable entityId
  @persist @observable classId
  @persist @observable peopleId
  @persist @observable yearId
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}

export class YearMeetingDay {
  @persist @observable id
  @persist @observable entityId
  @persist @observable yearId
  @persist @observable dow
  @persist @observable createdAt
  @persist @observable updatedAt
  @persist @observable deletedAt
  @persist @observable revision
}
