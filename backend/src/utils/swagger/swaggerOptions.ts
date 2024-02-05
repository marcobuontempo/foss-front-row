const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FOSS Front Row',
      version: '1.0.0',
    },
  },
  apis: ['./src/controllers/*.ts'],
};

export default options;