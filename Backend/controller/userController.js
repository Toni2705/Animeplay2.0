const User = require('../models/userModel.js')


exports.login = async (req, res) => {
    const { usuario, contraseña } = req.body;
    console.log(res)
  
    try {
      // Buscar el usuario en la base de datos
      const user = await User.findOne({ where: { usuario } });
  
      // Verificar si el usuario existe y la contraseña coincide
      if (!user || user.contraseña !== contraseña) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }
  
      // Usuario y contraseña son válidos
      return res.status(200).json({ message: 'Inicio de sesión exitoso', user: user });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  exports.registro = async (req, res) => {
  const { usuario, contraseña, email } = req.body;
  const suscrito = false;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { usuario } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

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
  