export function InfoCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white px-6 py-6.5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage hover:shadow-lg">
      <span className="mb-3 block text-3xl">{icon}</span>
      <h3 className="mb-2 text-xl text-ink">{title}</h3>
      <p className="text-[15px] leading-relaxed text-ink-soft">{description}</p>
    </div>
  );
}
