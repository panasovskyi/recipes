export class CreateUserDto {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(body: any) {
    this.login = body.login;
    this.email = body.email;
    this.password = body.password;
    this.confirmPassword = body.passwordConfirmation;
  }
}

export class LoginDto {
  login: string;
  password: string;

  constructor(body: any) {
    this.login = body.login;
    this.password = body.password;
  }
}