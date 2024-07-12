export function authErrorTranslate(error: string) {
    switch (error) {
        case "auth/invalid-credential":
            return "Helytelen felhasználónév vagy jelszó"
        case "auth/email-already-in-use":
            return "Ez az email már használatban van"
        default:
            return "Hiba történt: " + error
    }
}