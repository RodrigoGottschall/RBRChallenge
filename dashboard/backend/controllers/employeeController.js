const Employee = require('../models/employees');

// Obter todos os funcionários
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um funcionário pelo ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo funcionário
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Bad Request
  }
};

// Atualizar um funcionário pelo ID
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retornar o documento atualizado
      runValidators: true, // Validar os dados antes de atualizar
    });
    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Excluir um funcionário pelo ID
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json({ message: 'Funcionário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
