export class InvitacionResponseDto {
  id!: number;
  email!: string;
  rol!: string;
  estado!: string;
  mensaje?: string;
  fechaInvitacion!: string;
  expiresAt!: string;
  token!: string;
}
