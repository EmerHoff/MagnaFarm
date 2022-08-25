

# NestJS - MagnaFarm Back-end

[![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/saluki/nestjs-template/blob/master/LICENSE)

This project was developed in conjunction with a satellite image processing company, where the objective was to provide rural producers with an application with maps and information about their properties.

Developed using the NestJS and TypeORM framework, it was possible to deliver a system that helps producers in decision-making, helping to increase productivity.

## Getting started

### - Requirements

Before starting, make sure you have those components on your workstation:

- NodeJS and NPM
- PostgreSQL

### - Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/EmerHoff/MagnaFarm
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./MagnaFarm
npm install
```

### - Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh
# Perform migrations in your database using TypeORM
npm run migration:run

# Launch the Admin Application
npm run start

```

Now your server is runnig in `http://localhost:3333/`
