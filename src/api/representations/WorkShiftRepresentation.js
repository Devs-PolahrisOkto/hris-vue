import Representation from '@/api/representations/Representation';

class WorkShiftRepresentation extends Representation {
  constructor () {
    super({
      date: null,
      timeIn: null,
      timeOut: null,
      morningBreakIn: null,
      morningBreakOut: null,
      lunchBreakIn: null,
      lunchBreakOut: null,
      afternoonBreakIn: null,
      afternoonBreakOut: null,
    });
  }
}

export default WorkShiftRepresentation;
