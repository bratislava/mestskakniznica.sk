export default ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-ts-minio',
      providerOptions: {
        accessKey: env('MINIO_ACCESS_KEY', 'AKIAIOSFODNN7EXAMPLE'),
        secretKey: env('MINIO_SECRET_KEY', 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'),
        bucket: env('MINIO_BUCKET', 'strapi'),
        endPoint: env('MINIO_ENDPOINT', 'localhost'),
        port: env.int('MINIO_PORT', 9000),
        useSSL: env('MINIO_USE_SSL', false),
        folder: 'upload',
        isDocker: true,
        host: env('MINIO_HOST', 'localhost:9000'),
      },
    },
  },
})
