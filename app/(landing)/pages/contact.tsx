"use client";

export default function ContactPage() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center py-8 bg-white px-4 sm:px-6 lg:px-8"
    >
      {/* Contact Section Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Contact Us
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Have questions? We're here to help.
        </p>
      </header>

      {/* Contact Form Section */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Whether you have a question about
            features, pricing, or anything else, our team is ready to answer
            your questions.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-xl text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a3 3 0 003.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="text-gray-600">contact@file.ai</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xl text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 6h18M3 14h18M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="text-gray-600">+1 (123) 456-7890</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xl text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0-2.21 1.79-4 4-4s4 1.79 4 4v3c0 1.38-1.12 2.5-2.5 2.5H14v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2H5.5A2.5 2.5 0 013 14v-3c0-2.21 1.79-4 4-4s4 1.79 4 4v1"
                  />
                </svg>
              </span>
              <span className="text-gray-600">
                Somewhere in the world, 12345
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-8 shadow-lg rounded-lg space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
