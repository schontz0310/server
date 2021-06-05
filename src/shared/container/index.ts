import { container } from 'tsyringe';

import '@shared/container/providers/index';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import UsersRepositoryKnex from '@modules/Users/infra/knex/repositories/UsersRepository';
import UsersRepositoryTypeOrm from '@modules/Users/infra/typeorm/repositories/UsersRepository';

import IMasterUsersRepository from '@modules/Users/repositories/IMasterUsersRepository';
import MasterUsersRepository from '@modules/Users/infra/knex/repositories/MasterUsersRepository';

import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import CompaniesRepositoryKnex from '@modules/Companies/infra/knex/repositories/CompaniesRepositories';
import CompaniesRepositoryTypeOrm from '@modules/Companies/infra/typeorm/repositories/CompaniesRepository';

const users = {
  Knex: UsersRepositoryKnex,
  TypeOrm: UsersRepositoryTypeOrm,
};

container.registerSingleton<IUsersRepository>('UsersRepository', users.TypeOrm);

container.registerSingleton<IMasterUsersRepository>(
  'MasterUsersRepository',
  MasterUsersRepository,
);

const repositories = {
  knex: CompaniesRepositoryKnex,
  typeOrm: CompaniesRepositoryTypeOrm,
};

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  repositories.typeOrm,
);
