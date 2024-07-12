import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'

type DeckTileProps = {
    name: string
    description: string
    cards: number

}

export default function DashboardDeckTile(props: DeckTileProps) {
    return (
        <div className="flex max-sm:w-full flex-col w-64 p-6 bg-secondary border border-border rounded-lg shadow hover:bg-tertitary hover:border-transparent cursor-pointer transition-colors duration-150">
            <h5 className="text-2xl font-bold tracking-tight text-text truncate">{props.name || <Skeleton />}</h5>
            {props.description ? (
                <p className="font-normal text-gray-700 dark:text-gray-400 truncate">{props.description || <Skeleton />}</p>
            ) : null}
            <p className="font-normal text-text truncate flex gap-1 pt-2">{props.cards}x <Image src="/icons/cards-icon.svg" width={20} height={20} alt="cards" /></p>
        </div>
    )
}
