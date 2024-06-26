# Contact-List Application

This is a simple contact-list application built with .NET for the backend and Angular for the frontend.
![Screenshot of the app](page-screenshot.jpeg)
![Screenshot of logged user](logged-screenshot.jpeg)

## Running the project

### Prerequisites

- .NET 8.0
- Node.js ^16.14.0 || ^18.10.0 (for angular 16)

### Installing

1. Clone the repository
2. Navigate to the project directory
3. Install .NET dependencies: `dotnet restore` (in API folder)
4. Install Angular dependencies: `npm install` (in client folder)
5. Start angular frontend: `ng serve`
6. Run the .NET backend: `dotnet run`
7. App should be running on `https://localhost:4300/` (you will see error that certificate is not trusted, you can ignore it and proceed to the page or if you want you can accept the certificate using the mkcert tool [more info here](#adding-mkcert-self-signed-certificate-for-localhost))

### Example login credentials

```
 Username: fmartin
 Password: frankpass
```

## Built With

- [.NET](https://dotnet.microsoft.com/) - The backend framework
- [Angular](https://angular.io/) - The frontend framework
- [Bootstrap](https://getbootstrap.com/) - The CSS framework

### Adding mkcert self-signed certificate for localhost

1. Install mkcert [github link](https://github.com/FiloSottile/mkcert)
2. Go to client/ssl folder
3. Run `mkcert -install && mkcert localhost`
