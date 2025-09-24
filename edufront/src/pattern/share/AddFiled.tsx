'use client';
import { Section } from '@/lib/by/Div';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { map } from 'lodash';
import { useState } from 'react';

type Field = {
  id: number;
  name: string;
  type: string;
  value: string;
  editingLabel?: boolean;
};

const AddFiled = () => {
  const [fields, setFields] = useState<Field[]>([]);

  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: `field_${prev.length + 1}`,
        type: 'text',
        value: '',
        editingLabel: false,
      },
    ]);
  };
  const toggleEditLabel = (id: number, editing: boolean) => {
    setFields((prev) => map(prev, (f) => (f.id === id ? { ...f, editingLabel: editing } : f)));
  };

  const handleChangeLabel = (id: number, value: string) => {
    setFields((prev) => map(prev, (f) => (f.id === id ? { ...f, name: value } : f)));
  };

  return (
    <Section>
      <Button onClick={handleAddField} variant="confirm" title="Add">
        Add
      </Button>

      {map(fields, (field) => (
        <Section key={field.id} className="">
          {field.editingLabel ? (
            <input
              value={field.name}
              onChange={(e) => handleChangeLabel(field.id, e.target.value)}
              onBlur={() => toggleEditLabel(field.id, false)}
              autoFocus
              className="border-b border-gray-400 bg-transparent focus:outline-none text-sm font-medium mb-1"
            />
          ) : (
            <div
              className="text-sm font-medium cursor-pointer text-gray-700 mb-1"
              onClick={() => toggleEditLabel(field.id, true)}
            >
              {field.name}
            </div>
          )}

          <CustomFormField name={field.name} label="" placeholder='Hãy nhập vào' value={field.value} />
        </Section>
      ))}

      <pre className="text-xs bg-gray-100 mt-4 p-2 rounded">{JSON.stringify(fields, null, 2)}</pre>
    </Section>
  );
};

export default AddFiled;
