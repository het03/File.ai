"use client";

export default function AboutPage() {
  return (
    <section
      id="features"
      className="min-h-screen flex flex-col justify-center items-center bg-white pt-10 px-4 sm:px-2 lg:px-8"
    >
      <header className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-black py-8">
          Features
        </h1>
      </header>

      <section className="w-full max-w-8xl mx-auto mb-12 text-justify">
        {/* Feature Item 1 */}
        <div className="mb-12 text-center">
          <p className="text-3xl md:text-5xl text-black font-bold mb-4">
            Secure File Storage
          </p>
          <div className="flex justify-center items-center mb-6 mx-auto">
            <img
              src="/Group.png"
              alt="File Management"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain p-6 rounded-lg"
            />
          </div>
        </div>

        {/* Feature Item 2 */}
        <div className="mb-12 text-center">
          <p className="text-3xl md:text-5xl text-black font-bold mb-4">
            Easy Collaboration
          </p>
          <div className="flex justify-center items-center mb-6 mx-auto">
            <img
              src="/Group.png"
              alt="File Management"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain p-6 rounded-lg"
            />
          </div>
        </div>

        {/* Feature Item 3 */}
        <div className="mb-12 text-center">
          <p className="text-3xl md:text-5xl text-black font-bold mb-4">
            AI-Powered File Management
          </p>
          <div className="flex justify-center items-center mb-6 mx-auto">
            <img
              src="/Group.png"
              alt="File Management"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain p-6 rounded-lg"
            />
          </div>
        </div>

        {/* Feature Item 4 */}
        <div className="text-center">
          <p className="text-3xl md:text-5xl text-black font-bold mb-4">
            Cross-Platform Sync
          </p>
          <div className="flex justify-center items-center mx-auto">
            <img
              src="/Group.png"
              alt="File Management"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain p-6 rounded-lg"
            />
          </div>
        </div>
      </section>
    </section>
  );
}
