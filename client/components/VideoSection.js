"use client";

export default function VideoSection() {
  return (
    <section
      className="px-6 py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: '#121212', fontFamily: "'Inter', 'Inter Fallback', sans-serif" }}
    >
      <div className="mx-auto max-w-[900px]">
        {/* Reference: embedded YouTube iframe, full width, 16:9 */}
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/sM7tdlFGpUA"
            title="MadMuscles workouts app"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
