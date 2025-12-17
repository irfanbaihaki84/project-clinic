const patients = require('../models/patient');

exports.getAllPatients = async (req, res) => {
  try {
    const patient = await patients.findAll();
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const patient = await patients.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await patients.findByPk(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const [updated] = await patients.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPatient = await patients.findByPk(req.params.id);
      res.json(updatedPatient);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const deleted = await patients.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.inActivePatient = async (req, res) => {
  try {
    const [updated] = await patients.update(
      { is_active: false },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedPatient = await patients.findByPk(req.params.id);
      res.json(updatedPatient);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.activePatient = async (req, res) => {
  try {
    const [updated] = await patients.update(
      { is_active: true },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedPatient = await patients.findByPk(req.params.id);
      res.json(updatedPatient);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
