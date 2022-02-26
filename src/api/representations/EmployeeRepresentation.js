import Representation from '@/api/representations/Representation';

class EmployeeRepresentation extends Representation {
  constructor (properties) {
    super({
      user: {
        firstname: '',
        middlename: '',
        lastname: '',
        nickname: '',
        extension: '',
        title: '',
        birthDate: null,
        username: '',
        email: '',
        password: '',
        gender_id: '',
        employment_type_id: '',
        branch_id: '',
        civil_status_id: '',
      },
      company_id: '',
      department_id: '',
      positions: [],
      documents: [],
      contacts: [],
      addresses: [],
      education: [],
      experiences: [],
      profile_photo: null,
      ...properties,
    });
  }

  get asViewData () {
    const transformedData = {
      ...this,
      user: {
        ...this.user,
        birthDate: new Date(this.user?.birthDate),
      },
      fullname: `${this.user?.firstname} ${this.user?.lastname}`,
      primaryPosition: this.positions?.[0]?.name,
      employmentType: this.user?.employment_type?.name,
    };
    return transformedData;
  }
}

export default EmployeeRepresentation;
