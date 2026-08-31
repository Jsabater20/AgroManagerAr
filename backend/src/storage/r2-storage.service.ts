import {
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

const EXTENSION_POR_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

@Injectable()
export class R2StorageService {
  private client?: S3Client;

  constructor(private readonly configService: ConfigService) {}

  verificarConfiguracion(): void {
    this.obtenerCliente();
    this.obtenerBucket();
  }

  crearStorageKey(
    organizacionId: number,
    evidenciaId: string,
    mimeType: string,
  ): string {
    return `organizaciones/${organizacionId}/evidencias/${evidenciaId}/${this.nombreArchivo(mimeType)}`;
  }

  crearStorageKeyPerfil(usuarioId: number, mimeType: string): string {
    return `usuarios/${usuarioId}/perfil/${this.nombreArchivo(mimeType)}`;
  }

  async crearUrlDeSubida(storageKey: string, mimeType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.obtenerBucket(),
      Key: storageKey,
      ContentType: mimeType,
    });

    return getSignedUrl(this.obtenerCliente(), command, {
      expiresIn: this.obtenerDuracionUrlFirmada(),
    });
  }

  async crearUrlDeLectura(storageKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.obtenerBucket(),
      Key: storageKey,
    });

    return getSignedUrl(this.obtenerCliente(), command, {
      expiresIn: this.obtenerDuracionUrlFirmada(),
    });
  }

  async verificarArchivo(storageKey: string): Promise<{
    mimeType?: string;
    tamanoBytes: number;
  }> {
    const response = await this.obtenerCliente().send(
      new HeadObjectCommand({
        Bucket: this.obtenerBucket(),
        Key: storageKey,
      }),
    );

    return {
      mimeType: response.ContentType,
      tamanoBytes: Number(response.ContentLength ?? 0),
    };
  }

  async eliminarArchivos(storageKeys: string[]): Promise<void> {
    if (storageKeys.length === 0) return;

    await this.obtenerCliente().send(
      new DeleteObjectsCommand({
        Bucket: this.obtenerBucket(),
        Delete: {
          Objects: storageKeys.map((Key) => ({ Key })),
          Quiet: true,
        },
      }),
    );
  }

  private nombreArchivo(mimeType: string): string {
    const extension = EXTENSION_POR_MIME[mimeType];
    if (!extension) {
      throw new InternalServerErrorException('Tipo de archivo no soportado');
    }

    return `${randomUUID()}.${extension}`;
  }

  private obtenerCliente(): S3Client {
    if (this.client) return this.client;

    const accountId = this.configService.get<string>('R2_ACCOUNT_ID');
    const accessKeyId = this.configService.get<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('R2_SECRET_ACCESS_KEY');
    const endpoint = this.configService.get<string>('R2_ENDPOINT');

    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new ServiceUnavailableException('El almacenamiento de imágenes no está configurado');
    }

    this.client = new S3Client({
      region: 'auto',
      endpoint: endpoint || `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });

    return this.client;
  }

  private obtenerBucket(): string {
    const bucket = this.configService.get<string>('R2_BUCKET_NAME');
    if (!bucket) {
      throw new ServiceUnavailableException('El bucket de imágenes no está configurado');
    }

    return bucket;
  }

  private obtenerDuracionUrlFirmada(): number {
    const valor = Number(
      this.configService.get<string>('R2_SIGNED_URL_EXPIRES_SECONDS') ?? 900,
    );

    return Number.isFinite(valor) && valor >= 60 && valor <= 3600 ? valor : 900;
  }
}
