const User = require('../models/userModel.js')
const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
    const { usuario, contraseña } = req.body;
    console.log(res)
  
    try {
      // Verificar si el usuario existe en la base de datos
      const user = await User.findOne({ where: { usuario } });
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
  
      // Comparar la contraseña
      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
  
      // Enviar una respuesta exitosa
      return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      console.error('Error en login:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  exports.registro = async (req, res) => {
  const { usuario, password, email } = req.body;
  const suscrito = false;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { usuario } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const contraseña = await bcrypt.hash(password, 10);
    // Crear un nuevo usuario en la base de datos
    const newUser = await User.create({ email, usuario, contraseña, suscrito });
    
    // Enviar una respuesta exitosa
    return res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
exports.suscribirse = async (req, res) => {
  try {
    const { id } = req.body;

    const usuario = await User.findOne({ where: { id } });
    
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    usuario.suscrito = true;
    await usuario.save();
    return res.status(200).json({ success: true, message: 'Usuario suscrito correctamente' });
  } catch (error) {
    console.error('Error al suscribirse:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
exports.unsuscribirse = async (req, res) => {
  try {
    const { id } = req.body;

    const usuario = await User.findOne({ where: { id } });
    
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    usuario.suscrito = false;
    await usuario.save();
    return res.status(200).json({ success: true, message: 'Usuario suscrito correctamente' });
  } catch (error) {
    console.error('Error al suscribirse:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
  