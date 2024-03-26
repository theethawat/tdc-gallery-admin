import dotenv from 'dotenv';
import { BlobServiceClient } from '@azure/storage-blob';
import _ from 'lodash';
import config from '../configs/app';

dotenv.config();

const { AZURE_STORAGE_CONNECTION_STRING } = process.env;

export const uploadService = async (file, fileSize) => {
  try {
    const {
      // fieldname,
      originalname,
      // encoding,
      mimetype,
      // size,
      buffer,
    } = file;

    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error('Azure Storage Connection string not found');
    }

    // Initial Azure Blob Service Client
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING,
    );

    const containerClient = blobServiceClient.getContainerClient(
      config.azureBlobContainerName,
    );

    // Checking if it is exist if not create new
    const isExist = await containerClient.exists();
    if (!isExist) {
      await containerClient.create();
    }

    const blobName = originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.log(
      `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`,
    );

    console.log('File Size', fileSize);
    console.log('File', file);
    let contentType = 'application/octet-stream';

    if (_.endsWith(originalname, '.png')) {
      contentType = 'image/png';
    }

    if (_.endsWith(originalname, '.jpg')) {
      contentType = 'image/jpeg';
    }

    const uploadBlobResponse = await blockBlobClient.upload(buffer, fileSize, {
      blobHTTPHeaders: {
        blobContentType: contentType,
      },
    });

    console.log(
      `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`,
    );

    return blockBlobClient.url;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export default uploadService;
