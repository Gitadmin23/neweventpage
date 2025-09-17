// bus.ts
import mitt from "mitt";

type Events = {
  REFRESH: string; // payload = name of the infinite scroll hook
};

export const bus = mitt<Events>();
