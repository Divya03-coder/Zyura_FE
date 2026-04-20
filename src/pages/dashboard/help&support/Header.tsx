export default function Header() {
  return (
    <header className="">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">
            Dashboard
          </a>
          <span>/</span>
          <span className="text-foreground font-medium">Help & Support</span>
        </nav>
      </div>
    </header>
  )
}
