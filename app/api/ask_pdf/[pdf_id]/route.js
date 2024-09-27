import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { pdf_id } = params;
  console.log("from api", pdf_id);

  let jsonContent;
  try {
    jsonContent = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid JSON in request body",
        details: error.message,
      },
      { status: 400 }
    );
  }

  const query = jsonContent.query;

  try {
    const encodedPdfId = encodeURIComponent(pdf_id);
    const response = await fetch(
      `http://localhost:8080/ask_pdf/${encodedPdfId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch data from the Flask API",
          status: response.status,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred while fetching data",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
