const socialLinks = [
  { href: "https://www.instagram.com/Leafalco", label: "📱 @Leafalco (Leandro)" },
  { href: "https://www.instagram.com/tvpontes", label: "📱 @tvpontes (Thays)" },
  { href: "https://maps.google.com/?q=-23.920406,-45.452049", label: "🗺️ Casa Maritacas" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream-2 px-6.5 py-13 text-center">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8 flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-4 py-2 font-jost text-sm text-sage-deep no-underline transition-all hover:bg-sage-deep/10 hover:text-ocean"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mb-4 font-jost text-[13px] text-ink-soft">
          WhatsApp:{" "}
          <a href="https://wa.me/5511982748823" className="text-sage-deep">
            (11) 9827-48823
          </a>{" "}
          • Email:{" "}
          <a href="mailto:leandroschlenger@gmail.com" className="text-sage-deep">
            leandroschlenger@gmail.com
          </a>
        </div>

        <div className="mt-6 border-t border-line pt-5 text-xs text-ink-soft/70">
          © 2026 Leandro & Thays • v2.0 • Desenvolvido com ❤️ e ⛵
        </div>
      </div>
    </footer>
  );
}
