import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { pdf_id } = params;

  const encodedPdfId = encodeURIComponent(pdf_id);
  const flaskEndpoint = `http://localhost:8080/summarize_pdf/${encodedPdfId}`;

  try {
    const response = await fetch(flaskEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch summary from Flask API",
          status: response.status,
        },
        { status: response.status }
      );
    }
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred while fetching the summary",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
