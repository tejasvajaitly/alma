"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Image from "next/image";
import formConfig from "./formConfig.json";

type FormField = {
  name: string;
  type: "text" | "email" | "url" | "file" | "checkbox" | "select" | "textarea";
  placeholder?: string;
  title?: string;
  image?: string;
  options?: string[];
  validation: {
    required: string;
    pattern?: {
      value: string;
      message: string;
    };
  };
};

// Generate Zod schema dynamically based on the configuration
const generateZodSchema = (fields: FormField[]) => {
  const schemaObject: { [key: string]: z.ZodType<any> } = {}; // Add type annotation for schemaObject
  fields.forEach((field) => {
    let fieldSchema = z.string();
    if (field.validation.required) {
      fieldSchema = fieldSchema.min(1, field.validation.required);
    }
    if (field.type === "email") {
      fieldSchema = fieldSchema.email({
        message: field?.validation?.pattern?.message,
      });
    }
    if (field.type === "url") {
      fieldSchema = fieldSchema.url({
        message: field?.validation?.pattern?.message,
      });
    }
    if (field.type === "file") {
      fieldSchema = z.any().refine((file) => file instanceof File, {
        message: field.validation.required,
      });
    }
    if (field.type === "checkbox") {
      fieldSchema = z
        .array(z.string())
        .min(1, { message: field.validation.required });
    }
    schemaObject[field.name] = fieldSchema;
  });
  return z.object(schemaObject);
};

const formSchema = generateZodSchema(
  formConfig.fields.map((field: FormField) => ({
    ...field,
  }))
);

export default function LeadForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formConfig.fields.reduce(
      (acc: { [key: string]: string | string[] }, field) => {
        acc[field.name] = field.type === "checkbox" ? [] : "";
        return acc;
      },
      {}
    ),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("data", data);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "file" && data[key] instanceof File) {
        formData.append(key, data[key] as File);
      } else {
        formData.append(key, data[key] as string);
      }
    });
    console.log("formData", formData);
    const res = await fetch("/api/lead", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    console.log("json", json);
    if (json.data) {
      router.push("http://localhost:3000/apply/success");
    }
  };

  const renderField = (field: FormField): JSX.Element | null => {
    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "file":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <FileUploadDropzone
                    onChange={(file) => formField.onChange(file)}
                    name={formField.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "checkbox":
        return (
          <FormItem key={field.name}>
            <h3 className="text-center text-2xl font-bold">{field.title}</h3>
            <div className="space-y-2">
              {field?.options?.map((option) => (
                <FormField
                  key={option}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={(formField.value as string[]).includes(
                            option
                          )}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              formField.onChange([
                                ...(formField.value as string[]),
                                option,
                              ]);
                            } else {
                              formField.onChange(
                                (formField.value as string[]).filter(
                                  (value) => value !== option
                                )
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel>{option}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        );
      case "select":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={formField.onChange}
                    defaultValue={formField.value[0]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "textarea":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="h-28"
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <header className="position relative lg:h-[380px] xl:h-[490px] bg-[#D9DEA5] -z-20">
        <img
          className="-z-10 h-full bg-[#D9DEA5] w-full object-cover object-left absolute top-0 -left-20 sm:left-0"
          src={formConfig.header.backgroundImage}
          alt=""
        />
        <div className="ml-20 sm:ml-40 md:ml-56 lg:ml-80 xl:ml-[325px] flex flex-col justify-center pt-8 lg:pt-14 xl:pt-24 mr-8">
          <h1>
            <img src={formConfig.header.logo} alt="Alma" />
            <span className="sr-only">Alma</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-[56px] font-extrabold mt-4 lg:mt-10 mb-8">
            {formConfig.header.title}
          </h2>
        </div>
      </header>
      <div className="flex items-center justify-center m-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-1/3"
          >
            <div className="flex items-center justify-center">
              <img src={formConfig.intro.image} alt="" />
            </div>
            <h3 className="text-center text-2xl font-bold">
              {formConfig.intro.title}
            </h3>
            <p className="text-center text-lg">
              {formConfig.intro.description}
            </p>
            {formConfig.fields.map(renderField)}
            <div>
              <Button className="w-full" type="submit">
                {formConfig.submitButton.text}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

const FileUploadDropzone = ({
  onChange,
  name,
}: {
  onChange: (file: File) => void;
  name: string;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-6 mt-2 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} name={name} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the file here...</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop a file here, or click to select a file
          </p>
        )}
      </div>
      {file && (
        <div className="mt-2 text-sm text-gray-600">
          Selected file: {file.name}
        </div>
      )}
    </div>
  );
};
