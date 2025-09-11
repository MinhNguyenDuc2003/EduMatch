"use client"

import apiClientService from "@/common/services/ApiClientService";
import { GenCtx } from "@/provider/GeneralContext";
import { sStore } from "@/stores";
import { onSetLoading } from "@/utils/eventBus";
import { useState } from "react";
import { useForm } from "react-hook-form";

const data = "ffffff"
export default GenCtx({
  useLogic(){
      type IForm = {
  fields: object;
  filters: object;
};
    const ss = sStore();
    const methods = useForm<IForm>({
      mode : "onSubmit",
      defaultValues: {
        fields: {},
        filters: {}
      }
    })
    const loading = useState(false);
    const meds = {
      async onGetData() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/gemini/meds');
          return ss.setJointData({ListTest: data});
        } catch (error) {
          console.error({ error });
        }finally{
          onSetLoading(false)
        }
      }
    }
    return {
      ss,
      data,
      meds
    }
  } 
})
