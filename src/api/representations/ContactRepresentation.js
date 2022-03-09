import Representation from '@/api/representations/Representation';

class ContactRepresentation extends Representation {
  constructor (properties) {
    super({
      id: null,
      name: '',
      description: '',
      ...properties,
    });
  }
}

export default ContactRepresentation;
