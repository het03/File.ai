import Link from "next/link";
import { Button } from "../../../components/ui/button";

export default function HomePage() {
  return (
    <section
      id="home"
      className="pt-16 bg-white h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center justify-between">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img src="holder.jpg" alt="Graphic" className="w-64" />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Streamline Your Workflow with File.ai
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            File.ai transforms how you interact with PDF documents. Ask
            questions, get instant answers, generate summaries, and navigate
            complex files effortlessly with AI-powered natural language
            processing. Designed for professionals handling large or detailed
            PDFs, File.ai simplifies document management, saving you time and
            enhancing productivity.
          </p>
          <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/sign-up" passHref>
              <Button className="px-6 py-3 text-white rounded-lg bg-red-600 hover:bg-red-500 active:bg-[#A21828]">
                Try for free
              </Button>
            </Link>
            <Link href="/how-it-works" passHref>
              <Button className="px-6 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg hover:bg-gray-100">
                See how it works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
