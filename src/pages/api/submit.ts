import { put } from "@vercel/blob";

import type { APIRoute } from "astro";

const BLOB_TOKEN =
  import.meta.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;

const generateTicketId = () => {
  const random = Math.floor(Math.random() * 99999) + 1;
  return random.toString().padStart(5, "0");
};

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const fullName = formData.get("fullName")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const ghUsername = formData.get("ghUsername")?.toString() ?? "";
  const file = formData.get("file") as File;
  const ticketId = generateTicketId();

  if (!file || !file.name)
    return new Response("Archivo inválido", { status: 400 });

  try {
    const filename = `${Date.now()}-${file.name}`;
    // const buffer = Buffer.from(await file.arrayBuffer());
    const blob = await put(filename, file, {
      access: "public",
      token: BLOB_TOKEN,
    });
    // const uploadPath = path.resolve("public/uploads", filename);
    // await fs.writeFile(uploadPath, buffer);

    // Guardar datos en cookies
    cookies.set("fullName", fullName, { path: "/", maxAge: 300 });
    cookies.set("email", email, { path: "/", maxAge: 300 });
    cookies.set("ghUsername", ghUsername, { path: "/", maxAge: 300 });
    cookies.set("ticketId", ticketId, { path: "/", maxAge: 300 });
    cookies.set("fileUrl", blob.url, { path: "/", maxAge: 300 });

    // return redirect("/success")
    return new Response(JSON.stringify({ success: true, url: blob.url }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error al subir el fichero", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error al procesar el archivo" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
