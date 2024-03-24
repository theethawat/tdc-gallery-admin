import dotenv from 'dotenv';

dotenv.config();

export default {
  version: 1,
  port: process.env.PORT || 7000,
  dbConnectionString:
    process.env.MONGO_DB_URI || 'mongodb://localhost:27017/tdcmedical',
  secret: process.env.SECRET || 'TDC-CreateForBetter',
  defaultLimit: 10,
  maxUploadFileSize: 1048576000,
  azureBlobContainerName: process.env.AZURE_CONTAINER_NAME,
};
