export class DeletedResponseDto {
  id: string;
  isDeleted: boolean;

  constructor(id: string, isDeleted: boolean) {
    this.id = id;
    this.isDeleted = isDeleted;
  }
}
