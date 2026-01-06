interface SiteDescriptionProps {
  text?: string;
}

const SiteDescription = ({ text }: SiteDescriptionProps) => {
  const defaultText = "Tara built this website and personalized it just for you (her talents go far beyond spreadsheets!). Below you will find our favourite moments from the day, including photos that feature you! This site was lovingly built to share our joy with each guest who made our celebration unforgettable.";
  
  return (
    <section className="py-16 px-6 bg-wedding-rust">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg md:text-xl leading-relaxed text-wedding-cream">
          {text || defaultText}
        </p>
      </div>
    </section>
  );
};

export default SiteDescription;