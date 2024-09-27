import { NextResponse } from "next/server";

export async function POST(req) {
  // Get the content type
  const contentType = req.headers.get("content-type") || "";

  // Check if it is a multipart form
  if (contentType.includes("multipart/form-data")) {
    const data = await req.formData(); // Use the native formData API

    // Access the uploaded file
    const file = data.get("file"); // Make sure 'file' matches the input field name in your form

    if (file) {
      // Create a new FormData object and append the file
      const formData = new FormData();
      formData.append("file", file, file.name);

      // Make a POST request to localhost:8080/pdf
      const response = await fetch("http://localhost:8080/pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return NextResponse.json(
          { message: `Failed to upload file. Status: ${response.status}` },
          { status: response.status }
        );
      }

      const result = await response.json();
      return NextResponse.json({ message: result.message });
    } else {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Invalid content type" },
      { status: 400 }
    );
  }
}
