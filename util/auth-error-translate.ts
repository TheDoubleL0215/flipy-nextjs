export function authErrorTranslate(error: string) {
    switch (error) {
        case "auth/invalid-credential":
            return "Helytelen felhasználónév vagy jelszó"
        default:
            return "Hiba történt" + error
    }
}