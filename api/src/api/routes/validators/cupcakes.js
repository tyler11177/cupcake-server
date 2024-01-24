const schema = {
    id: {
      in: ['body'],
      isInt: {
        options: { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER },
        errorMessage: 'Invalid integer value for id',
      },
      toInt: true,
    },
    name: {
      in: ['body'],
      isString: { 
        errorMessage: 'Name is required and must be a string',
        notEmpty: true, // Added to make it required
      },
    },
    description: {
      in: ['body'],
      isString: { errorMessage: 'Invalid string value for description' },
    },
    price: {
      in: ['body'],
      isFloat: { 
        errorMessage: 'Price is required and must be a number',
        notEmpty: true, // Added to make it required
      },
    },
    ingredients: {
      in: ['body'],
      isArray: { errorMessage: 'Ingredients must be an array' },
      custom: {
        options: (value) => {
          if (!Array.isArray(value)) return false;
          for (const ingredient of value) {
            if (typeof ingredient !== 'string') return false;
          }
          return true;
        },
        errorMessage: 'Ingredients must be an array of strings',
      },
    },
  };
  
  const validateSchema = () => {
    return [
      checkSchema(schema),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
    ];
  };
  
  module.exports = validateSchema;