'use client';

import context from '@/@screen/FormScholarship/seg/context';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Content, RText, Section } from '@/lib/by/Div';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { map } from 'lodash';
import { Trash } from 'lucide-react';

export enum FieldType {
  Text = 'text',
  Email = 'email',
  Textarea = 'textarea',
  Number = 'number',
  Select = 'select',
  Switch = 'switch',
  File = 'file',
  MultiInput = 'multi-input',
}

export const FieldTypeLabels: Record<FieldType, string> = {
  [FieldType.Text]: 'Text',
  [FieldType.Email]: 'Email',
  [FieldType.Textarea]: 'Textarea',
  [FieldType.Number]: 'Number',
  [FieldType.Select]: 'Select',
  [FieldType.Switch]: 'Switch',
  [FieldType.File]: 'File',
  [FieldType.MultiInput]: 'Multi-input',
};

const AddFiled = () => {
  const {
    fields,
    addField,
    updateFieldName,
    removeField,
    methods: { setValue, getValues },
  } = context.useCtx();
  const onSave = ({ type, name }: { type: FieldType; name: string }) => {
    addField({ type, name });
    setValue('Fields.Name', '');
    setValue('Fields.Type', '' as any);
  };
  const handleSubmit = () => {
    const fields = getValues('Fields.Field');

    const values = fields.map((f) => f.value);

    const objValues = Object.fromEntries(fields.map((f) => [f.name, f.value]));

    console.log('values array:', values);
    console.log('values object:', objValues);
  };

  return (
    <Section>
      <DialogDemo onSave={onSave} />

      <Content className="grid grid-cols-2 gap-4 mt-4">
        {map(fields, (field, index) => (
          <div
            key={field.id}
            className="relative border border-gray-300 rounded-xl p-4 bg-white shadow-sm flex flex-col gap-3"
          >
            <button
              onClick={() => removeField(index)}
              className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <Trash size={14} />
            </button>

            <CustomFormField
              className="mt-5"
              name={`Fields.Field.${index}.value`}
              type={field.type as keyof typeof FieldTypeLabels}
              placeholder="Nhập giá trị..."
              isBorder
              inlineLabel
              label={
                <input
                  value={field.name}
                  onChange={(e) => updateFieldName(index, e.target.value)}
                  placeholder="Tên..."
                  size={Math.max(3, field.name.length || 1)} // auto giãn theo chữ
                  className="border-b border-gray-300 focus:border-blue-400 focus:outline-none text-sm font-medium pb-1 bg-transparent"
                />
              }
            />
          </div>
        ))}
      </Content>
      <Button onClick={handleSubmit}>Submit</Button>
    </Section>
  );
};

export default AddFiled;

export function DialogDemo({
  onSave,
}: {
  onSave: (args: { type: FieldType; name: string }) => void;
}) {
  const {
    methods: { getValues },
  } = context.useCtx();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-[#3D6CB9]">Add More Information Field</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-[#3D6CB9]">Add Information field</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 pt-2 border-t-[1px] border-black">
          <CustomFormField
            className="flex-1"
            inlineLabel
            labelClassName="flex-row"
            name="Fields.Name"
            label="Name"
            placeholder="Enter something..."
            isBorder
          />
          <CustomFormField
            className="flex-1 flex"
            type="select"
            inlineLabel
            labelClassName="flex-row"
            name="Fields.Type"
            label="Type"
            options={map(Object.values(FieldType), (type) => ({
              value: type,
              label: FieldTypeLabels[type],
            }))}
            initialValue="text"
            isBorder
          />
        </div>
        <div className="flex flex-1">
          <CustomFormField
            className="flex-1 flex"
            type="switch"
            name="isRequired"
            label="Required"
            isBorder
          />
        </div>
        <div className="flex flex-1">
          <CustomFormField
            className="flex-1 flex"
            name="Fields.Field.note"
            label="Note"
            inlineLabel
            isBorder
          />
        </div>
        <div>
          <RText className="text-[14px] font-[400]">
            Your response has been added to the scholarship application form.
          </RText>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="text-[#3D6CB9]">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              onSave({
                type: getValues('Fields.Type'),
                name: getValues('Fields.Name'),
              });
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
