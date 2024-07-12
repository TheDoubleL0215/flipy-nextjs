import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { X, Menu as MenuIcon, Bell, Plus, UserRound, } from 'lucide-react'
import { Button } from './ui/Button'
import { deleteCookie } from 'cookies-next'
import { usePathname, useRouter } from 'next/navigation'
import { deleteUserCookie } from '@/hooks/deleteUserCookie'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config'
import Image from 'next/image'

const navigation = [
    { name: 'Paklik', href: '/', current: true },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function NavBar() {
    const router = useRouter();
    const handleSignOut = () => {
        deleteUserCookie();
        router.push("/login");
    };
    const pathname = usePathname()

    const [user] = useAuthState(auth);


    return (
        <Disclosure as="nav" className="bg-secondary sticky top-0 z-50 mb-3 transition-all duration-150">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className=" group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-tertitary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <X aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Flipy Logo"
                                src="./app-logo.svg"
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4 items-center">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? ' text-primary-500 font-semibold text-lg' : 'text-gray-300 hover:bg-tertitary hover:text-white',
                                            'rounded-md px-3 py-2 font-medium text-lg',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                                {pathname != '/new-deck' ? <Button variant="primary" onClick={() => router.push('/new-deck')} className='flex items-center gap-1'>
                                    <Plus />
                                    Új pakli létrehozása
                                </Button> : null}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-tertitary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tertitary">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    {user?.photoURL ? (
                                        <Image alt="User Profile" loading="lazy" src={user.photoURL} width={40} height={40} className="h-10 w-10 rounded-full" />
                                    ) : (
                                        <UserRound className="h-10 w-10 text-text p-1  rounded-full" />
                                    )}
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 border border-neutral-800 origin-top-right rounded-md bg-secondary py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-text data-[focus]:bg-tertitary">
                                        Profil
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-text data-[focus]:bg-tertitary">
                                        Beállítások
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" onClick={handleSignOut} className="block px-4 py-2 text-sm text-text data-[focus]:bg-tertitary">
                                        Kijelentkezés
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden transition-all duration-150">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'text-primary-500 text-lg font-semibold text-center' : 'text-gray-300 hover:bg-tertitary hover:text-white',
                                'block rounded-md px-3 py-2 text-lg text-center font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                    {pathname !== '/new-deck' ? <Button variant="primary" onClick={() => router.push('/new-deck')} className='flex items-center gap-1 w-full justify-center'>
                        <Plus />
                        Új pakli létrehozása
                    </Button> : null}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
