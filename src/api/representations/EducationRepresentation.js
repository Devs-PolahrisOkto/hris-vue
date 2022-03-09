import Representation from '@/api/representations/Representation';
import { formatDateToString, formatDateTime } from '@/filters/date';

class EducationRepresentation extends Representation {
  constructor (properties) {
    super({
      id: null,
      user_id: null,
      school: '',
      degree: '',
      description: '',
      start_at: null,
      end_at: null,
      ...properties,
    });
  }

  // eslint-disable-next-line camelcase
  get start_at () {
    return this._start_at;
  }

  // eslint-disable-next-line camelcase
  set start_at (value) {
    this._start_at = value ? new Date(value) : null;
  }

  // eslint-disable-next-line camelcase
  get end_at () {
    return this._end_at;
  }

  // eslint-disable-next-line camelcase
  set end_at (value) {
    this._end_at = value ? new Date(value) : null;
  }

  get asViewData () {
    const transformedData = {
      ...this,
      inclusiveDates: `(${formatDateToString(this.start_at)} - ${formatDateToString(this.end_at)})`,
    };
    return transformedData;
  }

  get asPayload () {
    const transformedData = {
      ...this,
      start_at: formatDateTime(this._start_at),
      end_at: formatDateTime(this._end_at),
    };
    delete transformedData._start_at;
    delete transformedData._end_at;
    return transformedData;
  }
}

export default EducationRepresentation;
