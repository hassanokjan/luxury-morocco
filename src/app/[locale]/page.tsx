import Faq from "@/components/sections/Home/Faq";
import Hero from "@/components/sections/Home/Hero";
import InstagramSection from "@/components/ui/Instgramme";
import Tripadvisor from "@/components/ui/Tripadvisor";

export default async function Home({params}: {params: {locale: string}}) {
  const { locale } =await params;
  return (
    <>
    <Hero />
    <Tripadvisor locale={locale} />
    <InstagramSection />
    <Faq locale={locale} />
    </>
  );
}
