import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    this.s3 = new AWS.S3();
  }

  /**
   * Uploads a file to S3
   * @param bucket The S3 bucket name
   * @param fileKey The file key within the S3 bucket
   * @param fileStream A stream of the file to upload
   * @returns The URL of the uploaded file
   */
  async uploadFile(bucket: string, fileKey: string, fileStream: Readable): Promise<string> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucket,
      Key: fileKey,
      Body: fileStream,
    };

    try {
      const data: ManagedUpload.SendData = await this.s3.upload(params).promise();

      if (!data || !data.Location) {
        throw new Error('Failed to upload file.');
      }

      return data.Location;
    } catch (error) {
      throw new Error('Failed to upload file.');
    }
  }
}
