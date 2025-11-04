import mitt from "mitt";

type Events = {
  Loading: boolean;
};

export const eventBus = mitt<Events>();

let timeoutId: NodeJS.Timeout | null = null;

export const onSetLoading = (status: boolean) => {
  if (status) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      eventBus.emit("Loading", false);
      timeoutId = null;
    }, 5000);
  } else {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  eventBus.emit("Loading", status);
};
