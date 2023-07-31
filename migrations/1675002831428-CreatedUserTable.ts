import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedUserTable1675002831428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `CREATE TABLE [dbo].[roles] (
            [name] VARCHAR(16) NOT NULL,
            CONSTRAINT [PK_name] PRIMARY KEY ([name])
        )`,
    );

    queryRunner.query(
      `CREATE TABLE [dbo].[users] (
            [id] INT IDENTITY(1,1) NOT NULL,
            [name] VARCHAR(32) NOT NULL,
            [password] VARCHAR(128) NULL,
            [provider] VARCHAR(16) NULL,
            [email] VARCHAR(64) NOT NULL,
            [image] VARCHAR(128) NULL,
            [role] VARCHAR(16) NOT NULL,
            
            [createdOn] DATETIME NOT NULL DEFAULT GETDATE(),
            [createdBy] INT NOT NULL DEFAULT -1,
            [updatedOn] DATETIME NOT NULL DEFAULT GETDATE(),
            [updatedBy] INT NOT NULL DEFAULT -1,
            [deletedOn] DATETIME NULL,
            [deletedBy] INT NULL,

            CONSTRAINT [PK_email_u] PRIMARY KEY ([email]),
            CONSTRAINT [FK_role_u] FOREIGN KEY ([role]) REFERENCES [dbo].[roles] ([name])
        )`,
    );

    queryRunner.query(`INSERT INTO [dbo].[roles] ([name]) VALUES ('ADMIN'), ('VIEWER')`);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    throw new Error('Not supported');
  }
}
