export default function congratsMessages(procent: number) {
    const learnExcellentMessages = [
        "Gratulálok! Minden kártyát sikeresen megtanultál!",
        "Kiváló munka! Minden flashcardot tudsz már!",
        "Fantasztikus! Teljesítetted az összes kártyát!",
        "Szép munka! Minden kártya megvan!",
        "Bravó! Mindent sikeresen elsajátítottál!",
        "Nagyszerű! Az összes kártyát megtanultad!",
        "Remek! Minden flashcard a zsebedben van!",
        "Szuper! Az összes kártyát megjegyezted!",
        "Ügyes vagy! Mindent megtanultál!",
        "Hibátlan! Minden kártyát tudsz!",
    ]

    const learnGreatMessages = [
        "Szép munka! Már a kártyák nagy részét tudod!",
        "Haladsz! Még egy kis gyakorlás!",
        "Jól haladsz! A kártyák nagy részét már tudod!",
        "Csak így tovább! Már több mint a felét tudod!",
        "Szuper! Már többségét elsajátítottad!",
        "Nagyon jó! A kártyák jelentős részét már tudod!",
        "Ügyes vagy! Többet tudsz mint ezelőtt!",
        "Hajrá! Már csak egy kis gyakorlás van hátra!",
        "Kitartás! Már a nehezén túl vagy!",
        "Lendületben vagy! Már közel a cél!",
    ]

    const learnBadMessages = [
        "Ne add fel! Még egy kis gyakorlásra van szükség!",
        "Folytasd a gyakorlást, jó úton haladsz!",
        "Csak így tovább! Még van mit tanulni, de sikerülni fog!",
        "Ne csüggedj! Még egy kis erőfeszítés és menni fog!",
        "Tarts ki! Még van mit gyakorolni!",
        "Ne add fel! Még gyakorlás kell, de közel vagy!",
        "Maradj motivált! Még van néhány kártya, amit meg kell tanulni!",
        "Ne aggódj, csak gyakorlás kérdése!",
        "Türelem! Még szükséged van egy kis időre!",
        "Csak így tovább! Még nem vagy kész, de haladsz!",
    ]

    switch (true) {
        case procent == 100:
            return learnExcellentMessages[Math.floor(Math.random() * learnExcellentMessages.length)]
        case procent >= 50 && procent < 100:
            return learnGreatMessages[Math.floor(Math.random() * learnGreatMessages.length)]
        case procent < 50:
            return learnBadMessages[Math.floor(Math.random() * learnBadMessages.length)]
        default:
            return "Hiba történt"
    }
} 