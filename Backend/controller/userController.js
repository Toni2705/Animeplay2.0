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
      return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  