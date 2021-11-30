/**
 * Module Generator
 */

const moduleExists = require('../utils/moduleExists');

module.exports = {
  description: 'Add a module component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: (value) => {
        if (/.+/.test(value)) {
          return moduleExists(value)
            ? 'A component or module with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/index.ts',
        templateFile: './module/index.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/{{dashCase name}}.payload.ts',
        templateFile: './module/payload.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/{{dashCase name}}.schema.ts',
        templateFile: './module/schema.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/{{dashCase name}}.module.ts',
        templateFile: './module/module.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/{{dashCase name}}.controller.ts',
        templateFile: './module/controller.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/{{dashCase name}}.service.ts',
        templateFile: './module/service.ts.hbs',
        abortOnFail: true,
      },

      // {
      //   type: 'add',
      //   path: '../../app/modules/{{properCase name}}/tests/index.test.js',
      //   templateFile: './module/test.js.hbs',
      //   abortOnFail: true,
      // },
    ];

    actions.push({
      type: 'prettify',
      path: '/modules/',
    });

    return actions;
  },
};
