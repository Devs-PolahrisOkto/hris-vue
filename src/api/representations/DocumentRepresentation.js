import Representation from '@/api/representations/Representation';
import { formatDateFromNow } from '@/filters/date';

class DocumentRepresentation extends Representation {
  constructor (properties) {
    super({
      id: null,
      file: '',
      name: '',
      description: '',
      is_verified: '',
      type: '',
      created_at: null,
      updated_at: null,
      deleted_at: null,
      ...properties,
    });
  }

  get asViewData () {
    const transformedData = {
      ...this,
      lastModified: formatDateFromNow(this.updated_at),
    };
    return transformedData;
  }
}

export default DocumentRepresentation;
