USE [master]
GO

IF DB_ID('template-database') IS NOT NULL
  set noexec on 

CREATE DATABASE [template-database];
GO