import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  OPTIONS_TYPE_OF_CONTENT,
  OPTIONS_TYPE_OF_MEDIA,
} from "./constants/constants";
import { schedulingFormSchema } from "./schema";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function SchedulingForm() {
  const { control, watch, handleSubmit } = useForm<
    z.input<typeof schedulingFormSchema>
  >({
    resolver: zodResolver(schedulingFormSchema),
  });

  const isPublishNow = watch("publishNow");

  const handleFormSubmit = handleSubmit(() => {
    console.log("submit");
  });

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="max-w-100 mx-auto p-4 gap-3 flex flex-col"
      >
        <h1>Nova Postagem</h1>
        <FormInput label="Title" control={control} name="title" />
        <FormCheckbox control={control} name="publishNow" label="Publish Now" />
        {!isPublishNow && (
          <>
            <FormCheckbox
              control={control}
              name="isRecurrent"
              label="Is Recurrent"
            />
            <FormInput
              label="Scheduled Datetime"
              control={control}
              name="scheduledDatetime"
              type="datetime-local"
            />
          </>
        )}
        <div>Platforms</div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="whatsapp" />
              <Label htmlFor="whatsapp">Whatsapp</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="facebook" />
              <Label htmlFor="facebook">Facebook</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="instagram" />
              <Label htmlFor="instagram">Instagram</Label>
            </div>
          </div>
        </div>
        <FormSelect
          control={control}
          name="typeOfContent"
          label="Type of Content"
          selectItems={OPTIONS_TYPE_OF_CONTENT}
        />
        <FormSelect
          control={control}
          name="typeOfMedia"
          label="Type of Media"
          selectItems={OPTIONS_TYPE_OF_MEDIA}
        />
        <FormInput control={control} name="media" label="Media" type="file" />
        <FormTextarea control={control} name="caption" label="Caption" />
        <div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
