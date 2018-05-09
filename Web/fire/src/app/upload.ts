export class Upload {
  $key: String;
  file: File;
  name: string;
  url: string;
  progress: string;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}
