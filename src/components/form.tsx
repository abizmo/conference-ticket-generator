import type { PropsWithChildren } from "preact/compat";
import { useState } from "preact/hooks";

import { validateFields } from "../schemas/ticket-schema";
import DropInput from "./drop-input";
import FormControl from "./form-control";
import FormLabel from "./form-label";
import FormMessage from "./form-message";
import styles from "./form.module.css";
import Input from "./input";

import type { FieldErrors, Key, TicketSchema } from "../schemas/ticket-schema";

export default function Form({ children }: PropsWithChildren) {
  const [fields, setFields] = useState<TicketSchema>({});
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleFile = (file?: File) => {
    setFields((state) => ({ ...state, file: file }));
    setErrors((errors) => ({ ...errors, file: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = validateFields(fields);

    if (!result.success) {
      setErrors(result.errors as FieldErrors);
      return;
    }

    const data = new FormData();
    data.append("fullName", fields.fullName as string);
    data.append("email", fields.email as string);
    data.append("ghUsername", fields.ghUsername as string);
    data.append("file", fields.file as Blob);

    const res = await fetch("/api/submit", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      setTimeout(() => (window.location.href = "/success"), 300);
    } else {
      alert("Error en el envío");
    }
  };

  const handleInput = (key: Key, value: string) => {
    setFields((state) => ({ ...state, [key]: value }));
  };

  const { file, fullName, email, ghUsername } = errors;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Upload Avatar</FormLabel>
        <DropInput onChange={handleFile} />
        <FormMessage error={file !== undefined}>
          {file ? file : "Upload your photo (JPG or PNG, max size: 500KB)."}
        </FormMessage>
      </FormControl>
      <FormControl className={styles.formControl}>
        <FormLabel>Full Name</FormLabel>
        <Input id="fullName" onInput={handleInput} error={!!fullName} />
        {fullName && <FormMessage error>{fullName}</FormMessage>}
      </FormControl>
      <FormControl className={styles.formControl}>
        <FormLabel>Email Address</FormLabel>
        <Input id="email" onInput={handleInput} error={!!email} />
        {email && <FormMessage error>{email}</FormMessage>}
      </FormControl>
      <FormControl className={styles.formControl}>
        <FormLabel>Github Username</FormLabel>
        <Input id="ghUsername" onInput={handleInput} error={!!ghUsername} />
        {ghUsername && <FormMessage error>{ghUsername}</FormMessage>}
      </FormControl>
      {children}
    </form>
  );
}
