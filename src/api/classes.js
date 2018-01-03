export default class {
  request;

  constructor(request) {
    this.request = request;
  }

  manageTeacher(type, divisionConfigId, yearId, divisionId, divisionClassId, day, personId, opts=null) {
    switch (type) {
      case "add":
        return this.request.post(
          '/api/classes/'+divisionClassId+'/teacher',
         {
           divisionClassId: divisionClassId,
           peopleId: personId,
           day: day
         }
        )
        .then(function (response) {
          return Promise.resolve({
            data: response.data,
            divisionConfigId: divisionConfigId,
            yearId: yearId,
            divisionId: divisionId,
            divisionClassId: divisionClassId
          });
        })
        .catch(function (response) {
          return Promise.resolve({
            data: response.data
          });
        });
      case "delete":
        return this.request.delete(
          '/api/classes/'+divisionClassId+'/teacher/'+personId
        )
        .then(function (response) {
          return Promise.resolve({
            data: response.data,
            divisionConfigId: divisionConfigId,
            yearId: yearId,
            divisionId: divisionId,
            divisionClassId: divisionClassId
          });
        })
        .catch(function (response) {
          return Promise.resolve({
            data: response.data
          });
        });
      case "confirm":
      case "unconfirm":
        return this.request.put(
          '/api/classes/'+divisionClassId+'/teacher/'+personId,
         {
           confirmed: opts.confirmed
         }
        )
        .then(function (response) {
          return Promise.resolve({
            data: response.data,
            divisionConfigId: divisionConfigId,
            yearId: yearId,
            divisionId: divisionId,
            divisionClassId: divisionClassId
          });
        })
        .catch(function (response) {
          return Promise.resolve({
            data: response.data
          });
        });
      default:
        break;

    };
  }

  updateClassAttendance(divisionClassId, day, attendanceDate, count) {
    return this.request.post(
      '/api/classes/'+divisionClassId+'/attendance/'+day,
     {
       attendanceDate: attendanceDate,
       count: count
     }
    )
    .then(function (response) {
      return Promise.resolve({
        data: response.data,
        divisionClassId: divisionClassId,
        attendanceDate: attendanceDate,
        day: day
      });
    })
    .catch(function (response) {
      return Promise.resolve({
        data: response.data
      });
    });
  }
}
