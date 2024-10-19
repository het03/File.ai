import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log("API request received"); // Debugging: check if the request is received
  const { pdf_id } = params;
  console.log(`PDF ID received: ${pdf_id}`); // Debugging: check the pdf_id value

  const encodedPdfId = encodeURIComponent(pdf_id);
  const flaskEndpoint = `http://localhost:8080/summarize_pdf/${encodedPdfId}`;
  console.log(`Flask endpoint: ${flaskEndpoint}`); // Debugging: check the Flask endpoint

  try {
    const response = await fetch(flaskEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`Flask response status: ${response.status}`); // Debugging: check the response status from Flask

    if (!response.ok) {
      console.error(`Error from Flask API: ${response.status}`); // Debugging: log if Flask returns an error
      return NextResponse.json(
        {
          error: "Failed to fetch summary from Flask API",
          status: response.status,
        },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("Summary result:", result); // Debugging: log the result from Flask
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error occurred while fetching the summary:", error.message); // Debugging: log if an error occurs
    return NextResponse.json(
      {
        error: "An error occurred while fetching the summary",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
