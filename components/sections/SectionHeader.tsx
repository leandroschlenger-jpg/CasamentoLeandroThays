export function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-13">
      <span className="font-jost text-xs tracking-[0.32em] text-sage-deep uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-1.5 mb-1.5 font-script text-[clamp(40px,6vw,62px)] leading-none text-sage-deep">
        {title}
      </h2>
      <div className="mx-auto mt-5.5 mb-7.5 h-0.5 w-13.5 bg-sage" />
    </div>
  );
}
