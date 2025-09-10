"use client"
import apiClientService from "@/src/common/services/ApiClientService";
import { GenCtx } from "@/src/provider/GeneralContext";
import { sStore } from "@/src/stores"
import { onSetLoading } from "@/src/utils/eventBus";
import { useState } from "react";
import { useForm } from "react-hook-form";

const data = "ffffff"
export default GenCtx({
  useLogic(){
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
      data
    }
  } 
})
