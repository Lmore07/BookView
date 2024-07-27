"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/shadcn/ui/form";
import { Textarea } from "@/ui/shadcn/ui/textarea";
import React, { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

const TextAreaNUI = ({
  label,
  name,
  icon,
  placeholder,
  cols,
  rows,
  form,
  className = "",
}: {
  label: string;
  name: string;
  icon?: React.ReactNode;
  placeholder: string;
  cols?: number;
  rows?: number;
  form: UseFormReturn<any>;
  className?: string;
}) => {
  const [touched, setTouched] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormItem>
          <FormLabel className="block font-custom text-sm font-bold ">
            {label}
          </FormLabel>
          <FormControl className="w-full">
            <Textarea
              placeholder={placeholder}
              icon={icon}
              isValid={fieldState.isTouched}
              error={fieldState.error}
              isTouched={fieldState.isTouched}
              className={`w-full font-custom bg-bgInputText py-2 border-0 text-sm font-medium placeholder:text-gray-400 hover:placeholder:text-secondary-400 text-secondary-400 rounded-md outline-none hover:text-secondary-400 hover:border hover:border-black ${
                fieldState.error &&
                "border-red-900 border-2 focus:ring-1 focus:ring-red-900 hover:border-red-900 hover:border-2"
              } ${
                fieldState.error == undefined &&
                fieldState.isTouched &&
                "border-green-600 border-2 focus:ring-1 focus:ring-green-600 hover:border-green-600 hover:border-2"
              }`}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAreaNUI;
