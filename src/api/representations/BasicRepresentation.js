import Representation from '@/api/representations/Representation';

class BasicRepresentation extends Representation {
  constructor () {
    super({
      id: '',
      name: '',
      description: '',
    });
  }
}

export default BasicRepresentation;
