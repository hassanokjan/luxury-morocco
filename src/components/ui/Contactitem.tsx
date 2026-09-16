import { Link } from "@/i18n/routing";

type ContactCtaProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export default function ContactCta({
  title = "We'd Love to Hear From You",
  description = "Please feel free to get in touch with us at any time.",
  buttonLabel = "Contact Us",
}: ContactCtaProps = {}): React.JSX.Element {
  return (
    <section className="bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:px-8">
        {/* Text */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-semibold leading-tight text-heading sm:text-4xl">
            {title}
          </h2>

          <p className="mt-3 text-base text-primary sm:text-lg">
            {description}
          </p>
        </div>

        {/* Button */}
        <Link
          href="/contact"
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover sm:px-10"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
