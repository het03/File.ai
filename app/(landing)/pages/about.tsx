"use client";

import Link from "next/link";
import { Button } from "../../../components/ui/button";

export default function AboutPage() {
  return (
    <section
      id="about"
      className="pt-16 bg-red-700 min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8"
    >
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-white">About File.ai</h1>
        <p className="mt-4 text-2xl text-white">
          Discover more about what makes File.ai your go-to AI solution.
        </p>
      </header>
      <section className="w-full max-w-8xl mx-auto mb-12 px-4 text-justify">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0 flex justify-center">
            <img
              src="/mission.jpg"
              alt="Our Mission"
              className="w-full max-w-[350px] h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-red-100 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-200 text-lg mb-6">
              At File.ai, our mission is to simplify file management and enhance
              productivity through cutting-edge AI technology. We aim to provide
              a seamless experience that allows users to organize, access, and
              manage their files effortlessly. Our goal is to empower
              individuals and organizations with tools that make file handling
              more efficient and intuitive.
            </p>
            <p className="text-gray-200 text-lg mb-6">
              We are committed to innovation and constantly seek to refine our
              technology to better serve our users. By leveraging advanced AI
              techniques, we strive to offer solutions that not only meet but
              exceed expectations, ensuring a smooth and productive file
              management experience.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full max-w-8xl mx-auto mb-12 px-4 text-justify">
        <div className="flex flex-col md:flex-row-reverse items-center justify-center">
          <div className="md:w-1/2 md:pl-8 mb-6 md:mb-0 flex justify-center">
            <img
              src="/story.jpg"
              alt="Our Story"
              className="w-full max-w-[350px] h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-red-100 mb-4">Our Story</h2>
            <p className="text-gray-200 text-lg mb-6">
              Founded by a team of passionate engineers and designers, File.ai
              began with a vision to revolutionize the management of digital
              assets. Over time, our product has evolved through dedicated
              efforts and user feedback, transforming into a robust solution for
              file management challenges. Our journey has been marked by
              continuous growth and improvement, driven by our commitment to
              addressing the needs of our users.
            </p>
            <p className="text-gray-200 text-lg mb-6">
              Looking ahead, we are excited to explore new technological
              advancements and expand our offerings. Our focus remains on
              providing exceptional value and enhancing the way our users
              interact with their digital files. We are determined to continue
              delivering innovative solutions that make a difference.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
