import type { PropsWithChildren } from "preact/compat";
import { useState } from "preact/hooks";
import { z } from "zod";

import DropInput from "./drop-input";
import FormLabel from "./form-label";
import FormMessage from "./form-message";

const schema = z.object({
  file: z
    .instanceof(File, { message: "A photo is required." })
    .refine(
      (file) => file.size <= 500 * 1024,
      "File too large. Please upload a photo under 500KB.",
    ),
});

export default function Form({ children }: PropsWithChildren) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file?: File) => {
    setFile(file || null);
    setError(null);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const result = schema.safeParse({ file });

    if (!result.success) {
      setError(result.error.format().file?._errors[0] ?? "Error desconocido");
      return;
    }

    // ✅ archivo válido
    console.log("Archivo válido:", result.data.file);

    // Aquí podrías subir el archivo con fetch o FormData
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormLabel>Upload Avatar</FormLabel>
      <DropInput onChange={handleFile} />
      {/* <div
        class="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="preview" class="preview" />
        ) : (
          <p>Arrastra un archivo aquí o haz clic</p>
        )}
        <input
          type="file"
          id="avatar"
          ref={inputRef}
          class="hidden"
          onChange={handleChange}
        />
      </div> */}
      <FormMessage error={error !== null}>
        {error ? error : "Upload your photo (JPG or PNG, max size: 500KB)."}
      </FormMessage>

      {children}
    </form>
  );
}
