import Representation from '@/api/representations/Representation';
import AddressRepresentation from '@/api/representations/AddressRepresentation';
import EducationRepresentation from '@/api/representations/EducationRepresentation';
import ExperienceRepresentation from '@/api/representations/ExperienceRepresentation';

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
      addresses: this.addresses.map(address => (
        new AddressRepresentation(address)).asViewData),
      education: this.education.map(education => (
        new EducationRepresentation(education)).asViewData),
      experiences: this.experiences.map(experience => (
        new ExperienceRepresentation(experience)).asViewData),
    };
    return transformedData;
  }

  get asUpdatePayload () {
    const clone = {
      id: this.user?.id,
      firstname: this.user?.firstname,
      middlename: this.user?.middlename,
      lastname: this.user?.lastname,
      nickname: this.user?.nickname,
      extension: this.user?.extension,
      title: this.user?.title,
      birthDate: this.user?.birthDate,
      username: this.user?.username,
      email: this.user?.email,
      gender_id: this.user?.gender_id,
      civil_status_id: this.user?.civil_status_id,
    };
    return clone;
  }
}

export default EmployeeRepresentation;
