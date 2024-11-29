# Frontapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Eslint instalation

`ng add @angular-eslint/schematics`

Personally I like to configure eslint to avoid explicit any error.
In rules add:
`"@typescript-eslint/no-explicit-any": "off",`

## Husky

`npm install --save-dev husky npx husky init`
The init command simplifies setting up husky in a project. It creates a pre-commit script in .husky/ and updates the prepare script in
package.json. Modifications can be made later to suit your workflow.

## Pettier

`npm install --save-dev prettier`
To do this, we’ll create a file named .prettierrc in the root of the project directory
