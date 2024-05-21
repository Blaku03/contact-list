# Krótka Dokumentacja Projektu

## Backend (.NET C#)

### Kontrolery

- **AccountController.cs**

  - Kontroler odpowiedzialny za rejestrację i logowanie użytkowników.

- **UsersController.cs**
  - Kontroler zajmujący się zarządzaniem użytkownikami.
  - **Metoda:**
    ```csharp
    [HttpGet("{query}")] // api/users/{id or username}
    public async Task<ActionResult<DetailedUserDataDTO>> GetUser(string query)
    ```
    - Metoda do zdobycia szczegółowych informacji na temat danego użytkownika. Jako `query` może być użyte `id` użytkownika lub jego `username` (który również jest unikalny).

### Repozytoria

- **UserRepository.cs**

  - Klasa odpowiedzialna za bezpośrednie zapytania do bazy danych.
  - **Przykładowa metoda:**
    ```csharp
    public async Task<DetailedUserDataDTO?> GetDetailedUserDataByUserNameAsync(string username)
    {
        return await _context.Users
            .Where(x => x.UserName == username)
            .ProjectTo<DetailedUserDataDTO>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }
    ```
    - Metoda `ProjectTo` automatycznie mapuje dane użytkownika na klasę `DetailedUserDataDTO`.

- W folderze znajdują się również inne DTO (Data Transfer Objects), które służą do reprezentacji różnych części danych użytkownika.

### Usługi

- **TokenService.cs**
  - Klasa odpowiedzialna za tworzenie nowych tokenów podczas logowania lub rejestracji w celu autentykacji użytkownika.
  - W projekcie brak dodatkowej autoryzacji użytkownika – zalogowany użytkownik ma dostęp do wszystkich zasobów.

## Frontend (Angular)

- Aplikacja stworzona w Angular 16.
- Każdy element strony posiada swój komponent (wyświetlanie użytkowników, logowanie itp.).

### Interceptory

- **jwt.interceptor.ts**
  - Interceptor, który dodaje token JWT do zapytań HTTP wysyłanych przez zalogowanego użytkownika.
  - Token JWT jest przechowywany w `local storage` po zalogowaniu lub rejestracji, a jego obsługą zajmuje się `account.service.ts`.

### Routing i Guardy

- **authGuard**
  - Guard z folderu `_guards` zapewniający, że niezalogowany użytkownik nie może edytować innych użytkowników.
  - Dodatkowe zabezpieczenia przed nieautoryzowanym dostępem są zaimplementowane również po stronie backendu.
