// backend/src/services/patientService.js
class PatientService {
  async createPatient(data) {
    // Generate medical record number
    const lastPatient = await Patient.findOne({
      order: [['createdAt', 'DESC']],
    });

    const year = new Date().getFullYear();
    const lastNumber = lastPatient
      ? parseInt(lastPatient.medical_record_number.split('-')[1])
      : 0;
    const newNumber = (lastNumber + 1).toString().padStart(6, '0');

    data.medical_record_number = `MR-${year}-${newNumber}`;

    return await Patient.create(data);
  }

  async getPatientsWithPagination(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (filters.search) {
      whereClause.full_name = {
        [Op.iLike]: `%${filters.search}%`,
      };
    }
    if (filters.is_active !== undefined) {
      whereClause.is_active = filters.is_active;
    }

    const { count, rows } = await Patient.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      patients: rows,
      pagination: {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        limit,
      },
    };
  }
}
