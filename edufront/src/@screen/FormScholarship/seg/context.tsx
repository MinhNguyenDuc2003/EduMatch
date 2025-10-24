'use client';

import apiClientService from '@/common/services/ApiClientService';
import { FieldType } from '@/pattern/share/AddFiled';
import { GenCtx } from '@/provider/GeneralContext';
import { sStore } from '@/stores';
import { onSetLoading } from '@/utils/eventBus';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export type DynamicField = {
  id: number;
  name: string;
  type: string;
  value?: string;
  required?: boolean;
};

type IForm = {
  Fields: {
    Field: DynamicField[];
    Type: FieldType;
    Name: string;
  };
  Filters: object;
};

export default GenCtx({
  useLogic() {
    const ss = sStore();

    const methods = useForm<IForm>({
      mode: 'onSubmit',
      defaultValues: {
        Fields: { Field: [] },
        Filters: {},
      },
    });

    const { watch } = methods;
    const { fields, append, remove, update } = useFieldArray({
      control: methods.control,
      name: 'Fields.Field',
      keyName: 'rhfId',
    });

    const addField = (field: Omit<DynamicField, 'id'>) => {
      append({ id: Date.now(), ...field });
      console.log('fields', fields);
    };

    const updateFieldName = (index: number, newName: string) => {
      const field = fields[index];
      update(index, { ...field, name: newName });
    };

    const removeField = (index: number) => {
      remove(index);
    };

    const loading = useState(false);

    const meds = {
      async onGetData() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/gemini/meds');
          return data;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
    };

    return {
      ss,
      methods,
      meds,
      loading,
      fields,
      addField,
      updateFieldName,
      removeField,
    };
  },
});
