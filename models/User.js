export default User = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("ADMIN", "CUSTOMER"),
        defaultValue: "CUSTOMER",
      },
    },
    {
      timestamps: true,
    }
  );
};
