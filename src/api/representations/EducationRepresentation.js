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
      start_at: formatDateTime(this.start_at),
      end_at: formatDateTime(this.end_at),
    };
    return transformedData;
  }
}

export default EducationRepresentation;
