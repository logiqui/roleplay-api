import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  beforeSave,
  column,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Group from './Group'

import LinkToken from './LinkToken'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public avatar: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => LinkToken, {
    foreignKey: 'userId'
  })
  public tokens: HasMany<typeof LinkToken>

  @manyToMany(() => Group, {
    pivotTable: 'groups_users'
  })
  public groups: ManyToMany<typeof Group>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) user.password = await Hash.make(user.password)
  }
}
