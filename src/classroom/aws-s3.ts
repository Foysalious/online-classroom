import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { fromBuffer } from 'file-type';
require('dotenv').config()

@Injectable()
export class AwsS3 {
    private s3: AWS.S3
    constructor() {
        this.s3 = new AWS.S3
            ({
                accessKeyId: process.env.AWS_S3_ACCESS_KEY,
                secretAccessKey: process.env.AWS_S3_KEY_SECRET,
            });
    }
    async uploadImage(image: string): Promise<AWS.S3.ManagedUpload.SendData> {
        const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64')
        const bufferFileExtension = await fromBuffer(buffer)
        return await this.upload(buffer, process.env.AWS_S3_BUCKET, bufferFileExtension.ext);
    }

    async upload(buffer: Buffer, bucket: string, extension: string): Promise<AWS.S3.ManagedUpload.SendData> {
        const params =
        {
            Bucket: bucket,
            Key: "images/" + String(Math.random() * 1000 + 'user' + new Date().getDate() + new Date().getTime()) + '.' + extension,
            Body: buffer,
            ACL: "public-read",
            ContentType: 'image/jpeg',
            ContentDisposition: "inline",
            ContentEncoding: 'base64',
            CreateBucketConfiguration:
            {
                LocationConstraint: "ap-south-1"
            }
        };

        try {
            return await this.s3.upload(params).promise();
        }
        catch (e) {
            return e
        }
    }
}
