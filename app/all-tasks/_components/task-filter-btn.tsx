"use client";

import * as React from "react";

import { FilterIcon, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
// import { useForm } from "react-hook-form";
import { priorityOptions } from "./task-modal";
import { useFormContext } from "react-hook-form";

export function TaskFilterBtn({
  selectedValues,
}: {
  selectedValues: Set<string>;
}) {
  const form = useFormContext();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="text-[#0055FF]">
          <FilterIcon />
          Filter
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="outline"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="outline"
                    className="rounded-sm px-1 font-normal bg-white"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  priorityOptions
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="outline"
                        key={option.value}
                        className="rounded-sm px-1 font-normal bg-white"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2 " align="start">
        <Form {...form}>
          {priorityOptions.map((item, id) => (
            <FormField
              key={id}
              control={form.control}
              name={"selectedFilters"}
              render={({ field }) => {
                return (
                  <FormItem
                    key={id}
                    className="flex flex-row items-start space-x-3 space-y-0 px-1.5 py-2 rounded hover:bg-primary-foreground"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </Form>
      </PopoverContent>
      {selectedValues.size > 0 && (
        <Button variant="outline" onClick={() => form.reset()}>
          <X />
          Reset
        </Button>
      )}
    </Popover>
  );
}
