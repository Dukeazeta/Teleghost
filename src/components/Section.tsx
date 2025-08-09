export default function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="px-6 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}

