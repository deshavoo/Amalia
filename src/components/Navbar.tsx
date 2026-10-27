"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "motion/react";

import {
    ArrowLeft,
    ChevronDown,
    Heart,
    Menu,
    Search,
    ShoppingBag,
    UserRound,
    X,
} from "lucide-react";

const mainLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "المجوهرات", href: "/#collections" },
    { label: "ذهب الأطفال", href: "/#kids" },
    { label: "الهدايا", href: "/#gifts" },
    { label: "قصتنا", href: "/#about" },
];

const categoryLinks = [
    { label: "جميع المجوهرات", href: "/#collections" },
    { label: "خواتم", href: "/#rings" },
    { label: "أساور", href: "/#bracelets" },
    { label: "سلاسل", href: "/#necklaces" },
    { label: "أقراط", href: "/#earrings" },
    { label: "مجموعة الأطفال", href: "/#kids" },
    { label: "الهدايا", href: "/#gifts" },
];

const iconLinks = [
    {
        label: "البحث",
        href: "/search",
        icon: Search,
    },
    {
        label: "حسابي",
        href: "/account",
        icon: UserRound,
    },
    {
        label: "المفضلة",
        href: "/wishlist",
        icon: Heart,
    },
    {
        label: "حقيبة التسوق",
        href: "/cart",
        icon: ShoppingBag,
    },
];

export default function Navbar() {
    const router = useRouter();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (!mobileMenuOpen && !searchOpen) return;

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setMobileMenuOpen(false);
                setSearchOpen(false);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [mobileMenuOpen, searchOpen]);

    function closeMobileMenu() {
        setMobileMenuOpen(false);
        setCategoriesOpen(false);
    }

    function handleSearchSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const query = searchQuery.trim();

        if (!query) return;

        setSearchOpen(false);

        router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    return (
        <>
            <header
                dir="rtl"
                className="amalia-header sticky top-0 z-50 w-full"
            >
                <div className="amalia-announcement">
                    <div className="mx-auto flex min-h-9 max-w-[1600px] items-center justify-center px-4">
                        <p className="text-center text-[10px] font-medium tracking-[0.12em] sm:text-xs">
                            أماليا للمجوهرات
                            <span className="mx-2 text-[#c6a575]">✦</span>
                            أناقة تدوم عبر الأجيال
                        </p>
                    </div>
                </div>

                {/* Main navigation */}
                <div className="border-b border-[#11312c]/10 bg-[#f2efeb]/95 backdrop-blur-xl">
                    <div className="mx-auto grid h-19 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-22 sm:px-8 lg:px-12">
                        {/* Mobile menu and search */}
                        <div className="flex items-center justify-start gap-1 sm:gap-2 lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                aria-label="فتح قائمة التنقل"
                                aria-expanded={mobileMenuOpen}
                                aria-controls="amalia-mobile-menu"
                                className="amalia-icon-button"
                            >
                                <Menu size={22} strokeWidth={1.5} />
                            </button>

                            <button
                                type="button"
                                onClick={() => setSearchOpen(true)}
                                aria-label="البحث"
                                className="amalia-icon-button"
                            >
                                <Search size={20} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Desktop main links */}
                        <nav
                            aria-label="التنقل الرئيسي"
                            className="hidden items-center justify-start gap-5 lg:flex xl:gap-8"
                        >
                            {mainLinks.map((link) => (
                                <Link
                                    key={link.href + link.label}
                                    href={link.href}
                                    className="amalia-nav-link"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Brand */}
                        <Link
                            href="/"
                            aria-label="Amalia Jewellery - الصفحة الرئيسية"
                            className="amalia-brand group flex flex-col items-center justify-center"
                        >
                            <span className="amalia-brand-name">
                                Amalia
                            </span>

                            <span className="amalia-brand-subtitle">
                                J E W E L L E R Y
                            </span>
                        </Link>

                        {/* Action icons */}
                        <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                            {iconLinks.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    aria-label={label}
                                    className={`amalia-icon-button ${href === "/search" ? "hidden lg:inline-flex" : ""
                                        } ${href === "/wishlist" ? "hidden sm:inline-flex" : ""
                                        }`}
                                >
                                    <Icon size={20} strokeWidth={1.5} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category navigation */}
                <div className="hidden border-b border-[#11312c]/10 bg-[#f2efeb] lg:block">
                    <nav
                        aria-label="تصنيفات المجوهرات"
                        className="mx-auto flex h-12 max-w-[1600px] items-center justify-center gap-8 px-8 xl:gap-12"
                    >
                        {categoryLinks.map((category) => (
                            <Link
                                key={category.href + category.label}
                                href={category.href}
                                className="amalia-category-link"
                            >
                                {category.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Search panel */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: shouldReduceMotion ? 0 : 0.2,
                        }}
                        className="fixed inset-0 z-70 flex items-start justify-center bg-[#11312c]/60 px-4 pt-[12vh] backdrop-blur-sm"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                setSearchOpen(false);
                            }
                        }}
                    >
                        <motion.div
                            initial={
                                shouldReduceMotion
                                    ? false
                                    : { opacity: 0, y: -16 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.2,
                            }}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="amalia-search-title"
                            className="w-full max-w-2xl bg-[#f2efeb] p-5 shadow-2xl sm:p-9"
                        >
                            <div className="mb-8 flex items-center justify-between">
                                <h2
                                    id="amalia-search-title"
                                    className="text-xl font-medium text-[#11312c] sm:text-2xl"
                                >
                                    ابحثي عن قطعتك المفضلة
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => setSearchOpen(false)}
                                    aria-label="إغلاق البحث"
                                    className="amalia-icon-button"
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            <form
                                onSubmit={handleSearchSubmit}
                                className="flex items-center gap-3 border-b border-[#11312c]/30 pb-3"
                            >
                                <Search
                                    size={21}
                                    className="shrink-0 text-[#c6a575]"
                                />

                                <input
                                    autoFocus
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                    placeholder="ابحثي عن خاتم، سلسلة، أو هدية..."
                                    aria-label="اكتبي اسم المنتج"
                                    className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#11312c] outline-none placeholder:text-[#11312c]/50 sm:text-base"
                                />

                                <button
                                    type="submit"
                                    disabled={!searchQuery.trim()}
                                    className="flex items-center gap-2 text-sm font-medium text-[#11312c] transition-colors hover:text-[#a7834f] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    بحث
                                    <ArrowLeft size={17} />
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile navigation drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="إغلاق قائمة التنقل"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.2,
                            }}
                            onClick={closeMobileMenu}
                            className="fixed inset-0 z-60 cursor-default bg-[#11312c]/55 backdrop-blur-sm"
                        />

                        <motion.aside
                            id="amalia-mobile-menu"
                            initial={
                                shouldReduceMotion
                                    ? false
                                    : { x: "100%" }
                            }
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.28,
                                ease: "easeInOut",
                            }}
                            role="dialog"
                            aria-modal="true"
                            aria-label="قائمة التنقل"
                            className="fixed inset-y-0 right-0 z-65 flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-[#f2efeb] shadow-2xl"
                        >
                            {/* Drawer header */}
                            <div className="flex min-h-22.5 items-center justify-between border-b border-[#11312c]/10 px-5">
                                <Link
                                    href="/"
                                    onClick={closeMobileMenu}
                                    className="flex flex-col items-center"
                                >
                                    <span className="amalia-brand-name text-3xl">
                                        Amalia
                                    </span>

                                    <span className="amalia-brand-subtitle">
                                        J E W E L L E R Y
                                    </span>
                                </Link>

                                <button
                                    type="button"
                                    onClick={closeMobileMenu}
                                    aria-label="إغلاق القائمة"
                                    className="amalia-icon-button"
                                >
                                    <X size={23} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Main links */}
                            <nav
                                aria-label="التنقل على الهاتف"
                                className="px-5 py-5"
                            >
                                {mainLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href + link.label}
                                        initial={
                                            shouldReduceMotion
                                                ? false
                                                : { opacity: 0, x: 12 }
                                        }
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: shouldReduceMotion ? 0 : 0.2,
                                            delay: shouldReduceMotion ? 0 : index * 0.04,
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={closeMobileMenu}
                                            className="flex min-h-13.75 items-center justify-between border-b border-[#11312c]/10 text-sm font-medium text-[#11312c] transition-colors hover:text-[#a7834f]"
                                        >
                                            {link.label}

                                            <ArrowLeft
                                                size={16}
                                                className="text-[#c6a575]"
                                            />
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Categories accordion */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCategoriesOpen((previous) => !previous)
                                    }
                                    aria-expanded={categoriesOpen}
                                    className="flex min-h-13.75 w-full items-center justify-between border-b border-[#11312c]/10 text-sm font-medium text-[#11312c]"
                                >
                                    تصفحي حسب النوع

                                    <ChevronDown
                                        size={18}
                                        className={`text-[#c6a575] transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                <AnimatePresence initial={false}>
                                    {categoriesOpen && (
                                        <motion.div
                                            initial={
                                                shouldReduceMotion
                                                    ? false
                                                    : { height: 0, opacity: 0 }
                                            }
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: shouldReduceMotion ? 0 : 0.2,
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="border-b border-[#11312c]/10 py-2 pr-4">
                                                {categoryLinks.map((category) => (
                                                    <Link
                                                        key={category.href + category.label}
                                                        href={category.href}
                                                        onClick={closeMobileMenu}
                                                        className="flex min-h-10.75 items-center text-sm text-[#11312c]/75 transition-colors hover:text-[#a7834f]"
                                                    >
                                                        {category.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </nav>

                            {/* Drawer actions */}
                            <div className="mt-auto border-t border-[#11312c]/10 px-5 py-5">
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        {
                                            label: "حسابي",
                                            href: "/account",
                                            icon: UserRound,
                                        },
                                        {
                                            label: "المفضلة",
                                            href: "/wishlist",
                                            icon: Heart,
                                        },
                                        {
                                            label: "حقيبة التسوق",
                                            href: "/cart",
                                            icon: ShoppingBag,
                                        },
                                    ].map(({ label, href, icon: Icon }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={closeMobileMenu}
                                            className="flex min-h-19 flex-col items-center justify-center gap-2 border border-[#11312c]/10 text-xs text-[#11312c] transition-colors hover:border-[#c6a575] hover:text-[#a7834f]"
                                        >
                                            <Icon size={20} strokeWidth={1.5} />
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

