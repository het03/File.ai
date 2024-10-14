import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { pdf_id } = params;
  console.log("Received pdf_id:", pdf_id);

  let jsonContent;
  try {
    // Parse JSON body
    jsonContent = await req.json();
    console.log("Parsed JSON content:", jsonContent);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json(
      {
        error: "Invalid JSON in request body",
        details: error.message,
      },
      { status: 400 }
    );
  }

  // Validate that 'query' exists in the JSON body
  const query = jsonContent.query;
  if (!query) {
    console.error("The 'query' field is missing in the request body");
    return NextResponse.json(
      {
        error: "The 'query' field is required",
      },
      { status: 400 }
    );
  }

  console.log("Query from JSON:", query);

  try {
    const encodedPdfId = encodeURIComponent(pdf_id);
    console.log("Encoded PDF ID:", encodedPdfId);

    // Make the API call to Flask
    const response = await fetch(
      `http://localhost:8080/ask_pdf/${encodedPdfId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }), // Send query to Flask API
      }
    );

    console.log("Response from Flask API:", response);

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error response from Flask API:", errorDetails);
      return NextResponse.json(
        {
          error: "Failed to fetch data from the Flask API",
          status: response.status,
        },
        { status: response.status }
      );
    }

    // Get the response from Flask API
    const result = await response.json();
    console.log("Result from Flask API:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return NextResponse.json(
      {
        error: "An error occurred while fetching data",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
