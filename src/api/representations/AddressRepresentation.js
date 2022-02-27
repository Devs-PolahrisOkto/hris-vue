import Representation from '@/api/representations/Representation';

class AddressRepresentation extends Representation {
  constructor (properties) {
    super({
      id: null,
      name: '',
      address1: '',
      address2: '',
      barangay_id: '',
      province_id: '',
      region_id: '',
      state_id: '',
      country_id: '',
      address_type_id: '',
      ...properties,
    });
  }

  get asViewData () {
    const transformedData = {
      ...this,
      address: `${this.address1} ${this.barangay_id} ${this.province_id} ${this.region_id} ${this.state_id} ${this.country_id}`,
      type: this.address_type_id?.name,
    };
    return transformedData;
  }

  get asPayload () {
    const transformedData = {
      ...this,
      address_type_id: this.address_type_id?.id,
    };
    return transformedData;
  }
}

export default AddressRepresentation;
