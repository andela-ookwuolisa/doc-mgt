export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Role already exists'
      },
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Alphanumeric characters only'
        }
      }
    }

  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Roles.hasMany(models.Users, {
          foreignKey: 'roleID',

        });
      }
    }
  });
  return Roles;
};
