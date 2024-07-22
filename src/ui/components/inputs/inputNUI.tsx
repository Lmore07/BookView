"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputForm,
} from "@/ui/shadcn/ui/form";
import { Input } from "@/ui/shadcn/ui/input";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

const InputNUI = ({
  label,
  name,
  icon,
  placeholder,
  maxLength = 10,
  type,
  form,
  className = "",
}: {
  label: string;
  name: string;
  icon?: React.ReactNode;
  placeholder: string;
  form: UseFormReturn<any>;
  type: string;
  maxLength?: number;
  className?: string;
}) => {
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
            <Input
              icon={icon}
              maxLength={maxLength}
              error={fieldState.error}
              type={type}
              isValid={fieldState.isTouched}
              isTouched={fieldState.isTouched}
              className={`w-full font-custom bg-bgInputText py-2 border-0 text-sm font-medium placeholder:text-gray-400 hover:placeholder:text-secondary-400 text-secondary-400 rounded-md outline-none hover:text-secondary-400 hover:border hover:border-black ${
                fieldState.error &&
                "border-red-900 border-2 focus:ring-1 focus:ring-red-900 hover:border-red-900 hover:border-2"
              } ${
                fieldState.error == undefined &&
                fieldState.isTouched &&
                "border-green-600 border-2 focus:ring-1 focus:ring-green-600 hover:border-green-600 hover:border-2"
              }`}
              placeholder={placeholder}
              {...field}
              onBlur={() => {
                field.onBlur();
                form.trigger(name);
              }}
              onChange={(e) => {
                field.onChange(e);
                form.trigger(name);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputNUI;
